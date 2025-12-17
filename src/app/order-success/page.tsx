'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import type { Order, Shoe } from '@/lib/types';

export default function OrderSuccessPage() {
  const { dispatch } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  
  // Clear cart and update stock on mount
  useEffect(() => {
    // Get order details from session storage to update stock
    const storedOrder = sessionStorage.getItem('orderDetails');
    if (storedOrder) {
      const parsedOrder: Order = JSON.parse(storedOrder);
      setOrder(parsedOrder);

      // Update stock in localStorage
      const storedShoesRaw = localStorage.getItem('shoes');
      if (storedShoesRaw) {
        let storedShoes: Shoe[] = JSON.parse(storedShoesRaw);
        
        parsedOrder.items.forEach(orderItem => {
          storedShoes = storedShoes.map(shoe => {
            if (shoe.id === orderItem.shoe.id) {
              const newStock = (shoe.stock ?? 0) - orderItem.quantity;
              return { ...shoe, stock: Math.max(0, newStock) }; // Ensure stock doesn't go below 0
            }
            return shoe;
          });
        });
        
        localStorage.setItem('shoes', JSON.stringify(storedShoes));
      }
    }

    // Clear cart context and remove order details from session
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-6">Thank You For Your Order!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Your payment has been received and your order is confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We have sent a confirmation and invoice to your email address. Our artisans will now begin crafting your custom shoes. We'll notify you again once your order has been shipped.
          </p>
          <p className="text-sm text-muted-foreground">
            The remaining balance will be due upon delivery.
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}