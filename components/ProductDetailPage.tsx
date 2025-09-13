import React, { useState, useEffect, useRef } from 'react';
import { Saree, ColorVariant } from '../types';
import { CONTACT_INFO } from '../constants';
import { WhatsAppIcon } from './Icons';

interface ProductDetailPageProps {
  saree: Saree;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ saree, onBack }) => {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(saree.colorVariants[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Refs for swipe gesture
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  useEffect(() => {
    // When the selected color changes, reset the image index to the first image of the new color
    setCurrentImageIndex(0);
  }, [selectedColor]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = 0; // reset end position
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === 0 || touchEndX.current === 0) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentImageIndex < selectedColor.imageUrls.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
    } else if (isRightSwipe && currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
    }
    
    // Reset refs
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleWhatsAppOrder = () => {
    const imageUrl = selectedColor.imageUrls[currentImageIndex];
    const message = `I would like to order the "${saree.name}" (Product Code: ${saree.productCode}) in ${selectedColor.name} color.\n\nPrice: ₹${saree.price}\nProduct Image: ${imageUrl}\n\nPlease let me know the next steps.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Use the short link if available, otherwise fall back to the phone number link.
    const baseWhatsappUrl = CONTACT_INFO.whatsappShortLink
      ? CONTACT_INFO.whatsappShortLink
      : `https://wa.me/${CONTACT_INFO.whatsapp}`;
      
    const whatsappUrl = `${baseWhatsappUrl}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-semibold">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Collection
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Image Gallery */}
          <div>
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {selectedColor.imageUrls.map((url, index) => (
                  <img 
                    key={index}
                    src={url} 
                    alt={`${saree.name} - ${selectedColor.name} - view ${index + 1}`}
                    className="w-full h-full object-cover object-center flex-shrink-0"
                    draggable="false" // prevent default browser drag behavior
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-3 space-x-1.5">
              {selectedColor.imageUrls.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-red-600 w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold font-lora text-gray-900">{saree.name}</h1>
            <p className="text-xl md:text-2xl font-semibold text-red-700 my-3">
              ₹{saree.price.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-700 leading-normal mb-5">
              {saree.description}
            </p>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-base font-bold text-gray-800 mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-gray-700">
                <div><span className="font-semibold text-gray-800">Fabric:</span> {saree.specifications.Fabric}</div>
                <div><span className="font-semibold text-gray-800">Work:</span> {saree.specifications.Work}</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-base font-bold text-gray-800 mb-3">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {saree.colorVariants.map(variant => (
                  <button 
                    key={variant.name}
                    onClick={() => setSelectedColor(variant)}
                    className={`px-2 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selectedColor.name === variant.name 
                      ? 'bg-red-700 border-red-700 text-white shadow-sm' 
                      : 'bg-white border-gray-300 hover:border-red-400'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">Selected: <span className="font-semibold text-gray-800">{selectedColor.name}</span></p>
            </div>

            <div className="mt-auto pt-6">
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center text-base"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Order on WhatsApp
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                See It. Love It. Order Instantly on WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
