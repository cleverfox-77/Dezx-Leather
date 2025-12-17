'use client';

import React from 'react';
import { useWishlist } from '@/context/wishlist-context';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartCrack } from 'lucide-react';

export default function WishlistPage() {
  const { state } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Your Wishlist</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your saved favorites. Ready to make one yours?
        </p>
      </div>

      {state.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {state.items.map((shoe) => (
            <ProductCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <HeartCrack className="mx-auto h-24 w-24 text-muted-foreground" />
          <h2 className="mt-8 text-3xl font-headline">Your Wishlist is Empty</h2>
          <p className="mt-4 text-muted-foreground">
            You haven't added any items to your wishlist yet.
          </p>
          <Button asChild className="mt-8">
            <Link href="/shop">Explore the Collection</Link>
          </Button>
        </div>
      )}
    </div>
  );
}