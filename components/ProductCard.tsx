import React from 'react';
import { Saree } from '../types';

interface ProductCardProps {
  saree: Saree;
  onCardClick: (saree: Saree) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ saree, onCardClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
      onClick={() => onCardClick(saree)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick(saree)}
      aria-label={`View details for ${saree.name}`}
    >
      <div className="relative">
        <img 
          src={saree.colorVariants[0].imageUrls[0]} 
          alt={saree.name} 
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-md font-semibold text-gray-800">{saree.name}</h3>
        <p className="text-lg font-bold text-red-700 mt-1">₹{saree.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

export default ProductCard;