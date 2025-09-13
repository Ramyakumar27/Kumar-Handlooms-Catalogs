import React from 'react';
import { CONTACT_INFO } from '../constants';
import { InstagramIcon, HeartIcon } from './Icons';

interface ContactProps {
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const { instagramUrl } = CONTACT_INFO;

  const socialLinks = [
    { href: instagramUrl, icon: <InstagramIcon className="w-5 h-5 text-white" />, bgColor: 'bg-pink-500', name: 'Instagram' },
    { href: '#', icon: <HeartIcon className="w-5 h-5 text-white" />, bgColor: 'bg-red-500', name: 'Wishlist' },
  ];

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
      // You can add wishlist functionality here in the future
    }
  };

  return (
    <footer id="contact" className="bg-white/30 backdrop-blur-sm border-t border-orange-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Brand Info / About */}
          <div className="md:col-span-1">
            <h3 className="text-xm font-bold text-black-800 tracking-wider font-lora mb-3">
              KUMAR HANDLOOMS
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Preserving the art of traditional Indian handloom weaving since 1993. Each saree tells a story of heritage, craftsmanship, and timeless elegance.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-black-800 mb-3 font-lora">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-gray-600 hover:text-orange-800">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('sarees'); }} className="text-gray-600 hover:text-orange-800">Sarees</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="text-gray-600 hover:text-orange-800">About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-gray-600 hover:text-orange-800">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-black-800 mb-3 font-lora">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target={link.href === '#' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${link.bgColor}`}
                  onClick={(e) => handleSocialClick(e, link.href)}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-orange-100 mt-8 pt-4 text-center text-black-500 text-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2">
            <span>© 2025 Kumar Handlooms. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center justify-center">
              Made with
              <HeartIcon className="w-4 h-4 text-red-500 mx-1.5" />
              for traditional craftsmanship.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;