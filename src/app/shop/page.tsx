'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { useAdmin } from '@/context/admin-context';
import { ShoeManagementTable } from '@/components/admin/shoe-management-table';
import { getShoes as getDefaultShoes } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';
import type { Shoe } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { SearchX } from 'lucide-react';

function ShopContent() {
  const [allShoes, setAllShoes] = useState<Shoe[]>([]);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const loadShoes = async () => {
    const dbShoes = await fetchProducts();
    if (dbShoes.length > 0) {
      setAllShoes(dbShoes);
    } else {
      // Fallback or seed? For now fallback to static
      setAllShoes(getDefaultShoes());
    }
  };

  useEffect(() => {
    loadShoes();
  }, []);

  const handleShoesUpdate = (updatedShoes: Shoe[]) => {
    // This legacy prop might be used by children to optimistically update or we should just reload
    // Use the updated list directly to avoid a network call if passed, 
    // but ideally we should fetch fresh data to be sure.
    // For now, let's accept the update to `allShoes` state to be snappy, but also maybe background refresh?
    setAllShoes(updatedShoes);
  };

  const handleRefresh = () => {
    loadShoes();
  }

  const filteredShoes = useMemo(() => {
    let result = allShoes;

    // Filter by Search Query
    if (searchQuery) {
      result = result.filter(shoe =>
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Category Query
    const categoryQuery = searchParams.get('category');
    if (categoryQuery) {
      result = result.filter(shoe =>
        shoe.category.toLowerCase() === categoryQuery.toLowerCase()
      );
    }

    return result;
  }, [allShoes, searchQuery, searchParams]);

  const shoesByCategory = useMemo(() => {
    // If a category is selected, we don't want to group by all categories, just show the filtered list
    // But to keep consistent layout, we can just group the already filtered result.
    // If filtering by specific category, it will just result in one group.

    return filteredShoes.reduce((acc, shoe) => {
      const category = shoe.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(shoe);
      return acc;
    }, {} as Record<string, Shoe[]>);
  }, [filteredShoes]);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-headline font-bold">
            {isAdmin ? 'Shoe Management' : 'Our Collection'}
          </h1>
          <p className="mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {isAdmin
              ? 'Add, edit, or remove products from your inventory.'
              : 'Each pair is a masterpiece of design and craftsmanship, ready to be tailored to your unique preference.'
            }
          </p>
        </div>

        {isAdmin ? (
          <ShoeManagementTable shoes={allShoes} onShoesUpdate={handleRefresh} />
        ) : (
          <div className="space-y-16">
            {(searchQuery || searchParams.get('category')) && filteredShoes.length === 0 && (
              <div className="text-center py-16">
                <SearchX className="mx-auto h-16 w-16 md:h-24 md:w-24 text-muted-foreground" />
                <h2 className="mt-8 text-2xl md:text-3xl font-headline">No Results Found</h2>
                <p className="mt-4 text-muted-foreground">
                  We couldn't find any shoes matching your criteria.
                </p>
              </div>
            )}
            {Object.entries(shoesByCategory).map(([category, shoes]) => (
              <div key={category}>
                <h2 className="text-2xl md:text-3xl font-headline mb-4 md:mb-6">{category}</h2>
                <Separator className="mb-6 md:mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {shoes.map((shoe) => (
                    <ProductCard key={shoe.id} shoe={shoe} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
