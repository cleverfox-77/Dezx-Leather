'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Shoe } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';

type ProductCardProps = {
  shoe: Shoe;
};

export function ProductCard({ shoe }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${shoe.slug}`} aria-label={`View details for ${shoe.name}`}>
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={shoe.images[0]}
              alt={shoe.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="leather shoe"
            />
          </div>
          <div className="p-4 border-t">
            <h3 className="font-headline text-lg font-semibold truncate">{shoe.name}</h3>
            <p className="text-accent font-semibold mt-1">BDT {shoe.price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
