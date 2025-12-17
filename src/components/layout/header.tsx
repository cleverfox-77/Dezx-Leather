'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, LogIn, LogOut, Heart } from 'lucide-react';
import Image from 'next/image';

import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { CartSheet } from '../cart-sheet';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import React,
{
  useState,
  useEffect
} from 'react';
import { useAdmin } from '@/context/admin-context';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '../ui/input';
import { getShoes as getDefaultShoes } from '@/lib/data';
import type { Shoe } from '@/lib/types';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useCart();
  const { isAdmin, logout } = useAdmin();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allShoes, setAllShoes] = useState<Shoe[]>([]);
  const [suggestions, setSuggestions] = useState<Shoe[]>([]);

  useEffect(() => {
    const storedShoes = localStorage.getItem('shoes');
    if (storedShoes) {
      setAllShoes(JSON.parse(storedShoes));
    } else {
      setAllShoes(getDefaultShoes());
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allShoes
        .filter(shoe =>
          shoe.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, allShoes]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setIsSearchOpen(false);
  }
  
  const handleSuggestionClick = (slug: string) => {
    router.push(`/products/${slug}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };


  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('items-center space-x-6 text-sm font-medium', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <div className="flex flex-col space-y-4">
                <Link href="/" className="mb-4">
                   <SheetClose asChild>
                    <Logo />
                   </SheetClose>
                </Link>
                {navLinks.map(link => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className={cn(
                      'text-lg',
                      pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}>
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
               </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-start">
           <div className="md:hidden">
            <Link href="/">
                <Logo />
            </Link>
           </div>
           <div className="hidden md:flex">
            <NavLinks />
           </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <form onSubmit={handleSearchSubmit}>
                 <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Search Products</h4>
                    <p className="text-sm text-muted-foreground">
                      Find your perfect pair of shoes.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Input 
                      placeholder="e.g. Classic Oxford..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                     {suggestions.length > 0 && (
                      <div className="mt-2 max-h-60 overflow-y-auto rounded-md border">
                        {suggestions.map(shoe => (
                          <div
                            key={shoe.id}
                            onClick={() => handleSuggestionClick(shoe.slug)}
                            className="flex items-center gap-4 p-2 hover:bg-accent cursor-pointer rounded-sm"
                          >
                             <Image
                              src={shoe.images[0]}
                              alt={shoe.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover aspect-square"
                              data-ai-hint="leather shoe"
                            />
                            <span className="text-sm">{shoe.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </PopoverContent>
          </Popover>
          
           <Button asChild variant="ghost" size="icon">
                <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                </Link>
           </Button>
          
          {isAdmin ? (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button asChild variant="ghost" size="icon">
              <Link href="/login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}