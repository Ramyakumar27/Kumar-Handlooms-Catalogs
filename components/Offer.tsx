import React, { useState, useEffect, useRef } from 'react';

interface OfferProps {
    onNavigate: (page: string) => void;
    imageUrls: string[];
}

const Offer: React.FC<OfferProps> = ({ onNavigate, imageUrls }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isResetting, setIsResetting] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const effectiveImageUrls = imageUrls && imageUrls.length > 0 ? imageUrls : ['https://i.imgur.com/g0FN2s2.png'];
    // Clone the first slide to the end to create the seamless loop effect
    const slides = effectiveImageUrls.length > 1 ? [...effectiveImageUrls, effectiveImageUrls[0]] : effectiveImageUrls;

    const cleanupInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const startInterval = () => {
        cleanupInterval();
        if (slides.length > 1) {
            intervalRef.current = window.setInterval(() => {
                setCurrentIndex(prev => prev + 1);
            }, 4000);
        }
    };
    
    useEffect(() => {
        startInterval();
        return cleanupInterval;
    }, [slides.length]);

    useEffect(() => {
        // This effect handles the seamless loop.
        // When we reach the cloned slide at the end...
        if (currentIndex === slides.length - 1) {
            // ...wait for the slide animation to finish.
            const timer = setTimeout(() => {
                setIsResetting(true); // This will disable transitions via the style prop
                setCurrentIndex(0);    // Instantly jump back to the beginning
            }, 500); // This MUST match the transition duration below
            return () => clearTimeout(timer);
        }
        
        // After jumping, re-enable transitions for the next slide.
        if (isResetting) {
            // A minimal timeout allows React to render the jump before transitions are back on.
            const timer = setTimeout(() => setIsResetting(false), 20);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isResetting, slides.length]);


    // If only one image, render it statically without carousel logic.
    if (effectiveImageUrls.length <= 1) {
        return (
            <section className="bg-transparent py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div 
                        onClick={() => onNavigate('sarees')}
                        className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100"
                        role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onNavigate('sarees')}
                        aria-label="View our special offer and shop the collection"
                    >
                        <img src={effectiveImageUrls[0]} alt="Special Offer from Kumar Handlooms" className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                </div>
            </section>
        );
    }
    
    const handleGoToSlide = (e: React.MouseEvent, slideIndex: number) => {
        e.stopPropagation();
        setCurrentIndex(slideIndex);
        startInterval();
    }

    // The active dot should reflect the real image index.
    const activeDotIndex = currentIndex % effectiveImageUrls.length;

    return (
        <section className="bg-transparent py-16 px-4">
            <div 
                className="container mx-auto max-w-5xl relative group"
                onMouseEnter={cleanupInterval}
                onMouseLeave={startInterval}
            >
                <div 
                    onClick={() => onNavigate('sarees')}
                    className="cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100"
                    role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onNavigate('sarees')}
                    aria-label="View our special offer and shop the collection"
                >
                    <div 
                        className="flex"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isResetting ? 'none' : 'transform 0.5s ease-out',
                        }}
                    >
                        {slides.map((url, index) => (
                            <img 
                                key={index}
                                src={url} 
                                alt={`Special Offer ${index + 1}`}
                                className="w-full h-auto object-cover flex-shrink-0"
                                aria-hidden={index !== activeDotIndex}
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {effectiveImageUrls.map((_, slideIndex) => (
                        <button 
                            key={slideIndex}
                            onClick={(e) => handleGoToSlide(e, slideIndex)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeDotIndex === slideIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                            aria-label={`Go to offer ${slideIndex + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offer;