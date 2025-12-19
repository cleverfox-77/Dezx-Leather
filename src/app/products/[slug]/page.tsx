'use client';
import { getShoeBySlug as getStaticShoeBySlug } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { ProductDetails } from '@/components/product-details';
import { useEffect, useState } from 'react';
import { fetchProductBySlug } from '@/lib/supabase';
import type { Shoe } from '@/lib/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [shoe, setShoe] = useState<Shoe | null | undefined>(null);

  useEffect(() => {
    async function loadShoe() {
      if (!slug) return;

      // 1. Try Supabase
      const dbShoe = await fetchProductBySlug(slug);

      if (dbShoe) {
        setShoe(dbShoe);
      } else {
        // 2. Fallback to static data
        const staticShoe = getStaticShoeBySlug(slug);
        setShoe(staticShoe); // staticShoe returns Shoe | undefined
      }
    }
    loadShoe();
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
