'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Crafting timeless leather shoes with a modern touch. Made for you, made to last.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
               <li><Link href="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and a first look at our new collections.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-background" />
              <Button type="submit" variant="outline">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Dezx Leather. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="https://www.instagram.com/dezx_leather/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            <Link href="https://www.facebook.com/profile.php?id=61577725392496" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}