import React, { useState, useEffect } from 'react';
import { Saree } from '../types';
import { CONTACT_INFO } from '../constants';
import { WhatsAppIcon } from './Icons';

interface ProductModalProps {
  saree: Saree;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ saree, onClose }) => {
  // Fix: Property 'imageUrls' does not exist on type 'Saree'. Initializing with the first image of the first color variant.
  const [activeImage, setActiveImage] = useState(saree.colorVariants[0].imageUrls[0]);

  useEffect(() => {
    // Reset active image when saree changes
    // Fix: Property 'imageUrls' does not exist on type 'Saree'. Using the first image of the first color variant.
    setActiveImage(saree.colorVariants[0].imageUrls[0]);
  }, [saree]);

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Add event listener for escape key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleWhatsAppOrder = () => {
    const selectedColor = saree.colorVariants[0];
    const message = `I would like to order the "${saree.name}" (Product Code: ${saree.productCode}) in ${selectedColor.name} color, Price: ₹${saree.price}. Please let me know the next steps.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Use the short link if available, otherwise fall back to the phone number link.
    const baseWhatsappUrl = CONTACT_INFO.whatsappShortLink
      ? CONTACT_INFO.whatsappShortLink
      : `https://wa.me/${CONTACT_INFO.whatsapp}`;
      
    const whatsappUrl = `${baseWhatsappUrl}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 p-4">
          <div className="aspect-square mb-3">
             <img src={activeImage} alt={`Main view of ${saree.name}`} className="w-full h-full object-cover rounded-lg"/>
          </div>
          <div className="flex space-x-2">
            {/* Fix: Property 'imageUrls' does not exist on type 'Saree'. Mapping over images of the first color variant. */}
            {saree.colorVariants[0].imageUrls.map((url, index) => (
              <button 
                key={index} 
                className={`w-1/4 aspect-square rounded-md overflow-hidden border-2 ${activeImage === url ? 'border-rose-500' : 'border-transparent'}`}
                onClick={() => setActiveImage(url)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={url} alt={`${saree.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <div className="flex-grow">
            <h2 id="product-modal-title" className="text-3xl font-bold text-gray-800 font-lora">{saree.name}</h2>
            <p className="text-xs text-gray-400 mt-1">Code: {saree.productCode}</p>
            <p className="text-2xl font-semibold text-gray-900 my-4">₹{saree.price.toLocaleString('en-IN')}</p>
            <p className="text-gray-600 leading-relaxed">{saree.description}</p>
          </div>
          <button 
            onClick={handleWhatsAppOrder}
            className="w-full mt-6 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center text-lg"
          >
            <WhatsAppIcon className="w-6 h-6 mr-2" />
            Order on WhatsApp
          </button>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          aria-label="Close product details"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default ProductModal;