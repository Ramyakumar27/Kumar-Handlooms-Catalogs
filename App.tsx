import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Offer from './components/Offer';
import AboutUs from './components/AboutUs';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import ContactPage from './components/ContactPage';
import Contact from './components/Contact';
import { Saree, ColorVariant } from './types';
import { GOOGLE_SHEETS_CSV_URLS } from './constants';

/**
 * Parses a custom string format for color variants into a structured array.
 * The expected format is: "Color Name (url1, url2); Color Name 2 (url3, ...)"
 * It also handles pre-formatted JSON strings as a fallback.
 * @param colorString The string from the Excel cell.
 * @returns An array of ColorVariant objects.
 */
const parseColorVariantsString = (colorString: string | any): ColorVariant[] => {
  if (!colorString || typeof colorString !== 'string') {
    return [];
  }
  
  // First, try to parse it as JSON in case it's already correctly formatted.
  try {
    const parsed = JSON.parse(colorString);
    if (Array.isArray(parsed)) {
      if (parsed.every(item => typeof item === 'object' && item !== null && 'name' in item && 'imageUrls' in item)) {
        return parsed as ColorVariant[];
      }
    }
  } catch (e) {
    // Not a valid JSON string, so proceed with custom parsing.
  }

  // Custom parser for the "Color (url1, url2); ..." format
  return colorString
    .split(';')
    .map(part => part.trim())
    .filter(part => part)
    .map(variantPart => {
      const match = variantPart.match(/(.*?)\s*\((.*?)\)/);
      if (match && match[1] && match[2]) {
        const name = match[1].trim();
        const imageUrls = match[2].split(',').map(url => url.trim()).filter(Boolean);
        if (name && imageUrls.length > 0) {
          return { name, imageUrls };
        }
      }
      return null;
    })
    .filter((variant): variant is ColorVariant => variant !== null);
};

/**
 * A robust CSV parser that handles quoted fields containing commas.
 * @param csvText The raw CSV string.
 * @returns An array of objects, where each object represents a row.
 */
const parseCSV = (csvText: string): Record<string, any>[] => {
  const lines = csvText.trim().replace(/\r/g, '').split('\n');
  if (lines.length < 2) return []; // Must have header + at least one data row

  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    // This regex splits by comma, but ignores commas inside double quotes.
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    return headers.reduce((obj, header, index) => {
      let value = (values[index] || '').trim();
      // Remove quotes from the start and end of the string if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      obj[header] = value;
      return obj;
    }, {} as Record<string, any>);
  });
  return rows;
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offerImageUrls, setOfferImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let sareeData: Saree[] = [];
        const { SAREES: sareesUrl, CONFIG: configUrl } = GOOGLE_SHEETS_CSV_URLS;
        let isSheetsDataLoaded = false;

        // Attempt to fetch from Google Sheets if URLs are provided
        if (sareesUrl) {
          try {
            const response = await fetch(sareesUrl);
            if (!response.ok) {
              throw new Error(`HTTP error fetching sarees sheet! status: ${response.status}`);
            }
            const csvText = await response.text();
            const jsonData = parseCSV(csvText);

            const formattedSarees = jsonData.map((row: any): Saree | null => {
              if (!row.id || !row.name) return null;
              try {
                const colorVariants = parseColorVariantsString(row.colorVariants);
                if (colorVariants.length === 0 || colorVariants[0].imageUrls.length === 0) {
                  console.warn(`Skipping saree with id ${row.id} due to missing/invalid color variants.`);
                  return null;
                }
                return {
                  id: Number(row.id),
                  name: row.name,
                  description: row.description,
                  price: Number(row.price),
                  productCode: row.productCode,
                  category: row.category,
                  specifications: {
                    Fabric: row.Fabric,
                    Work: row.Work,
                  },
                  colorVariants,
                };
              } catch (e) {
                console.error(`Error processing row with id ${row.id}:`, e);
                return null;
              }
            });
            sareeData = formattedSarees.filter((saree): saree is Saree => saree !== null);
            isSheetsDataLoaded = sareeData.length > 0;

            // Fetch config if URL is provided
            if (configUrl) {
              try {
                const configResponse = await fetch(configUrl);
                if (configResponse.ok) {
                  const configCsvText = await configResponse.text();
                  const configData = parseCSV(configCsvText);
                  
                  // Find all keys starting with 'discountImageUrl' and sort them
                  const imageUrlRows = configData
                    .filter(row => row.key && row.key.startsWith('discountImageUrl'))
                    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));

                  const urls = imageUrlRows.map(row => row.value).filter(Boolean);
                  setOfferImageUrls(urls);
                }
              } catch (configError) {
                console.warn("Could not load config from Google Sheet.", configError);
              }
            }
          } catch (sheetsError) {
            console.error("Error fetching from Google Sheets, will fall back to local data.", sheetsError);
            const message = sheetsError instanceof Error ? sheetsError.message : 'Unknown error';
            setError(`Could not load from Google Sheets. Please check your config. Error: ${message}`);
          }
        }

        // Fallback to JSON if Google Sheets fetch fails or is not configured
        if (!isSheetsDataLoaded) {
          if (sareesUrl) {
            console.warn("Google Sheets fetch failed or returned no data. Falling back to 'sarees.json'.");
          } else {
            console.log("No Google Sheets URL provided. Loading from local 'sarees.json'.");
          }
          const response = await fetch('/sarees.json');
          if (!response.ok) {
            throw new Error(`Failed to load sarees.json as well. Status: ${response.status}`);
          }
          sareeData = await response.json();
          if (error) setError(null); // Clear any previous Sheets-related error
        }
        
        if (sareeData.length === 0) {
          setError("No sarees could be loaded. Please check your data source.");
        }
        
        setSarees(sareeData);

      } catch (e) {
        console.error("Failed to fetch or parse any saree data:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(`Could not load collection: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setSelectedSaree(null); // Clear selection when changing main pages
    window.scrollTo(0, 0);
  };

  const handleSareeSelect = (saree: Saree) => {
    setSelectedSaree(saree);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (currentPage === 'sarees' && selectedSaree) {
      return <ProductDetailPage saree={selectedSaree} onBack={() => setSelectedSaree(null)} />;
    }
    
    // Display loading or error messages
    if (isLoading) {
      return <div className="text-center py-40 text-gray-500 font-semibold">Loading our beautiful collection...</div>;
    }

    if (error) {
       return <div className="text-center py-40 text-red-600 font-semibold">{error}</div>;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={navigate} />
            <Offer onNavigate={navigate} imageUrls={offerImageUrls} />
          </>
        );
      case 'sarees':
        return <ProductGrid sarees={sarees} onSareeSelect={handleSareeSelect} />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactPage />;
      default: // Default to home
        return (
          <>
            <Hero onNavigate={navigate} />
            <Offer onNavigate={navigate} imageUrls={offerImageUrls} />
          </>
        );
    }
  };

  // The footer should not show on the 'about' or 'sarees' pages (grid and detail).
  // It should only show on the home and contact pages.
  const shouldShowFooter = !(
    currentPage === 'about' || 
    currentPage === 'sarees'
  );

  return (
    <div className="bg-transparent text-gray-800 flex flex-col min-h-screen">
      <Header onNavigate={navigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      {shouldShowFooter && <Contact onNavigate={navigate} />}
    </div>
  );
};

export default App;