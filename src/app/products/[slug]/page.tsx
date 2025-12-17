'use client';
import { getShoeBySlug } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { ProductDetails } from '@/components/product-details';
import { useEffect, useState } from 'react';
import type { Shoe } from '@/lib/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [shoe, setShoe] = useState<Shoe | null | undefined>(null);

  useEffect(() => {
    // On the client, we need to check localStorage first
    const storedShoesRaw = localStorage.getItem('shoes');
    if (storedShoesRaw) {
      const storedShoes: Shoe[] = JSON.parse(storedShoesRaw);
      const foundShoe = storedShoes.find((s) => s.slug === slug);
      setShoe(foundShoe);
    } else {
      // Fallback to static data if nothing in localStorage
      const defaultShoe = getShoeBySlug(slug);
      setShoe(defaultShoe);
    }
  }, [slug]);

  if (shoe === null) {
    // Still loading
    return <div>Loading...</div>;
  }

  if (shoe === undefined) {
    notFound();
  }

  return <ProductDetails shoe={shoe} />;
}
