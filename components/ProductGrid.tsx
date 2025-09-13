import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Saree } from '../types';

interface ProductGridProps {
  onSareeSelect: (saree: Saree) => void;
  sarees: Saree[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ onSareeSelect, sarees }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamically generate categories from saree data.
  // useMemo prevents recalculating this on every render.
  const categories = useMemo(() => {
    const allCategories = sarees.map(saree => saree.category);
    return ['All', ...Array.from(new Set(allCategories)).sort()];
  }, [sarees]);

  // Memoize the filtering logic for performance
  const filteredSarees = useMemo(() => {
    if (activeCategory === 'All') {
      return sarees;
    }
    return sarees.filter(saree => saree.category === activeCategory);
  }, [sarees, activeCategory]);


  return (
    <>
      <section id="products" className="container mx-auto px-4 py-16 text-center bg-white/40 backdrop-blur-md rounded-2xl shadow-lg my-16">
        <h2 className="text-2xl font-bold text-red-800 font-lora mb-4">Our Saree Collection</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
          Sarees that Speak the Language of Festivity, designed to embrace heritage while celebrating your unique style
        </p>

        {/* Filter Buttons */}
        <div className="bg-white/50 rounded-xl p-4 md:p-6 mb-8 inline-block">
            <div className="flex justify-center flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 border ${
                    activeCategory === category
                    ? 'bg-red-700 text-white border-red-700 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-400'
                }`}
                >
                {category}
                </button>
            ))}
            </div>
        </div>

        <p className="text-gray-500 mb-8">Showing {filteredSarees.length} sarees</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredSarees.map((saree) => (
            <ProductCard 
              key={saree.id} 
              saree={saree} 
              onCardClick={onSareeSelect} 
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductGrid;