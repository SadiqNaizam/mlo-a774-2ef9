import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <LogIn className="h-5 w-5 text-primary" />
          <span>SwiftLogin</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;