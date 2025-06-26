import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <LogIn className="h-5 w-5 text-primary" />
            <span>SwiftLogin</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;