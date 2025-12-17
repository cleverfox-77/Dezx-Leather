'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import type { Shoe, Customization } from '@/lib/types';
import { shoeSizes, toeShapes, soleHeightOptions } from '@/lib/data';
import { useWishlist } from '@/context/wishlist-context';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast"
import { Check, Heart, ShoppingCart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';


type ProductDetailsProps = {
  shoe: Shoe;
};

export function ProductDetails({ shoe }: ProductDetailsProps) {
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { toast } = useToast();
  const [customization, setCustomization] = useState<Customization>({
    toeShape: '',
    shoeSize: null,
    soleHeight: 3, // Default sole height
  });
  const [selectedImage, setSelectedImage] = useState(shoe.images[0]);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const isCustomizationComplete = customization.shoeSize && customization.toeShape && customization.soleHeight;

  useEffect(() => {
    setIsFavorited(wishlistState.items.some(item => item.id === shoe.id));
  }, [wishlistState.items, shoe.id]);


  const handleAddToCart = () => {
    if (!isCustomizationComplete) {
      toast({
        variant: "destructive",
        title: "Incomplete Customization",
        description: "Please select your foot shape, shoe size and sole height.",
      });
      return;
    }
    cartDispatch({ type: 'ADD_ITEM', payload: { shoe, customization, quantity: 1 } });
    toast({
        title: "Added to Cart",
        description: `${shoe.name} has been added to your cart.`,
        action: (
           <div className="w-full flex items-center">
             <Check className="h-5 w-5 text-green-500 mr-2" />
             <span>Success</span>
           </div>
        ),
    })
  };

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: shoe });
      toast({ title: 'Removed from Wishlist' });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: shoe });
      toast({ title: 'Added to Wishlist' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
             <Image
                src={selectedImage}
                alt={shoe.name}
                fill
                className="object-cover"
                data-ai-hint="leather shoe"
              />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {shoe.images.map((img, index) => (
                <div key={index} 
                     className={`aspect-square relative rounded-md overflow-hidden border-2 cursor-pointer ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                     onClick={() => setSelectedImage(img)}>
                    <Image
                        src={img}
                        alt={`${shoe.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint="leather shoe"
                    />
                </div>
            ))}
          </div>
        </div>

        {/* Product Info & Customization */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-bold">{shoe.name}</h1>
          <p className="text-2xl text-accent font-semibold my-4">BDT {shoe.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed">
            {shoe.description}
          </p>
          <Separator className="my-6" />

          {/* Customization Form */}
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">1. Select Foot Shape</Label>
              <RadioGroup
                value={customization.toeShape}
                onValueChange={(value) => setCustomization({ ...customization, toeShape: value })}
                className="mt-2 grid grid-cols-3 gap-4"
              >
                {toeShapes.map((shape) => (
                  <Label
                    htmlFor={`toe-shape-${shape}`}
                    key={shape}
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <RadioGroupItem value={shape} id={`toe-shape-${shape}`} className="sr-only" />
                    <span>{shape}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="shoe-size" className="text-base font-semibold">2. Select Shoe Size</Label>
                <Select
                  onValueChange={(value) => setCustomization({ ...customization, shoeSize: Number(value) })}
                >
                  <SelectTrigger id="shoe-size" className="mt-2">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {shoeSizes.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        EU {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="sole-height" className="text-base font-semibold">3. Select Sole Height</Label>
                <Select
                  onValueChange={(value) => setCustomization({ ...customization, soleHeight: Number(value) })}
                  defaultValue={String(customization.soleHeight)}
                >
                  <SelectTrigger id="sole-height" className="mt-2">
                    <SelectValue placeholder="Select height" />
                  </SelectTrigger>
                  <SelectContent>
                    {soleHeightOptions.map((height) => (
                      <SelectItem key={height} value={String(height)}>
                        {height}"
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!isCustomizationComplete}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" aria-label="Add to wishlist" onClick={handleFavoriteToggle}>
                <Heart className={cn("h-5 w-5", isFavorited && "fill-red-500 text-red-500")} />
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {shoe.details.map(detail => <li key={detail}>{detail}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free worldwide shipping. Returns are accepted within 30 days of receipt for unworn, non-customized items. Customized shoes are final sale.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}