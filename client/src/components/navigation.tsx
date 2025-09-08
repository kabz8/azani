import { Link, useLocation } from "wouter";
import { CurrencyToggle } from "./currency-toggle";
import { ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/custom-orders", label: "Custom Orders" },
    { href: "/ready-shop", label: "Ready Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="glass-effect border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0" data-testid="link-home">
            <h1 className="text-3xl font-serif font-bold text-gradient">Azani</h1>
            <p className="text-xs text-muted-foreground mt-1">Nairobi Couture</p>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`smooth-hover font-medium ${
                    location === link.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <CurrencyToggle />
            
            <button className="text-foreground hover:text-primary smooth-hover" data-testid="button-cart">
              <ShoppingBag className="h-6 w-6" />
              <span className="sr-only">Shopping cart</span>
            </button>
            
            <button
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium ${
                    location === link.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
