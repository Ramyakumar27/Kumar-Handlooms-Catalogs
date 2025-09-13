import React from 'react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="bg-transparent text-center py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-6xl font-bold text-black-800 tracking-wider font-lora">
          KUMAR HANDLOOMS
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 font-lora italic">
          From Loom to Love – Handcrafted Sarees for Every Occasion
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-gray-600">
          Explore our curated saree collection, where timeless weaves meet modern elegance — each drape a celebration of heritage and style
        </p>
        <button 
          onClick={() => onNavigate('sarees')}
          className="mt-10 inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-lg"
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;