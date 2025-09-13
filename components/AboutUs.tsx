import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="bg-transparent py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-6 font-lora">About Kumar Handlooms</h2>
          <div className="text-gray-600 leading-relaxed space-y-4 text-center text-sm">
            <p>
            For generations, <strong>Kumar Handlooms</strong> has been synonymous with exquisite craftsmanship and timeless elegance. Established in <strong>1993</strong>, our journey began as the dream of a single passionate weaver in a humble workshop. Over the past 32 years, that dream has flourished into a thriving family of more than 35 skilled artisans, each dedicated to preserving the rich heritage of Indian handloom sarees.
            </p>
            <p>
            From our workshop in <strong>Elaiyur, Ariyalur</strong>, we continue to weave sarees that carry forward tradition with unmatched authenticity. Each piece is a labor of love, crafted with the finest threads and age-old techniques passed down through generations. Today, our sarees are not only cherished in Tamil Nadu but also find pride of place across significant regions of Andhra Pradesh.
            </p>
            <p>
            Specializing in a diverse range — from breathable <strong>cottons</strong> and elegant <strong>soft silks</strong> to luxurious <strong>pure silks</strong> and heritage weaves — Kumar Handlooms stands as a testament to quality, artistry, and timeless tradition.
            </p>
            <p>
            We believe a saree is not just an attire, but a story of art, culture, and grace. We invite you to explore our collection and become a part of our legacy.
            </p>
            <p>
            <strong>Handpicked. Handwoven. Heartfelt.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;