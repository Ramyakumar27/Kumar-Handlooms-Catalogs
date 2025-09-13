
import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon } from './Icons';

interface HeaderProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: 'Home', page: 'home', href: '#' },
    { name: 'Sarees', page: 'sarees', href: '#' },
    { name: 'About', page: 'about', href: '#' },
    { name: 'Contact', page: 'contact', href: '#' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
      e.preventDefault();
      onNavigate(page);
      setIsMenuOpen(false); // Always close mobile menu on click
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white/30 py-4 px-4 md:px-8 border-b border-orange-100 sticky top-0 z-40 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Container for left-aligned items */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - moved to left */}
          <div className="md:hidden">
            <button
              ref={buttonRef}
              id="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-gray-700 hover:text-orange-800 z-50"
            >
              <MenuIcon className="w-7 h-7" />
            </button>
          </div>

          {/* Brand Name */}
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="text-xl font-bold text-red-800 tracking-wider font-lora">
            KUMAR HANDLOOMS
          </a>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.page)}
              className={`text-gray-700 hover:text-orange-800 transition-colors ${
                (currentPage === link.page) ? 'text-orange-800 font-semibold' : ''
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Dropdown - adjusted for left alignment */}
        <div
          ref={menuRef}
          className={`absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-orange-100 md:hidden transition-all duration-300 ease-in-out origin-top-left ${
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
        >
          <nav className="flex flex-col p-2" role="none">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 font-lora text-lg py-2 px-3 rounded-md hover:bg-orange-50 transition-colors"
                onClick={(e) => handleNavClick(e, link.page)}
                role="menuitem"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
