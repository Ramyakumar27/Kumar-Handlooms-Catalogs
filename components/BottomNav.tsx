
import React from 'react';
import { HomeIcon, InfoIcon, ContactIcon, HeartIcon, GridIcon } from './Icons';

interface BottomNavProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, currentPage }) => {
  const navItems = [
    { page: 'home', icon: HomeIcon, label: 'Home' },
    { page: 'sarees', icon: GridIcon, label: 'Sarees' },
    { page: 'about', icon: InfoIcon, label: 'About' },
    { page: 'contact', icon: ContactIcon, label: 'Contact' },
    { page: 'wishlist', icon: HeartIcon, label: 'Wishlist' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, page: string) => {
    e.preventDefault();
    if (page === 'wishlist') {
      // Placeholder for wishlist functionality
      alert('Wishlist feature coming soon!');
      return;
    }
    onNavigate(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-30 border-t border-gray-200">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.label}
              onClick={(e) => handleNavClick(e, item.page)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center transition-colors duration-300 w-1/5 pt-1 ${
                isActive ? 'text-orange-700' : 'text-gray-500 hover:text-orange-600'
              }`}
            >
              <Icon className="w-7 h-7" />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;