'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { processOrder } from '@/app/actions/order';
import type { Order } from '@/lib/types';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BkashPage() {
  const { dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('orderDetails');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    } else {
      // If no order details, redirect to checkout, as they can't be here.
      router.replace('/checkout');
    }
  }, [router]);
  
  const handleConfirmPayment = async () => {
    if (!orderDetails) return;
    if (!transactionId.trim()) {
      toast({
        variant: 'destructive',
        title: "Transaction ID Required",
        description: "Please enter the bKash transaction ID to proceed.",
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: "Processing Order...",
      description: "Please wait while we confirm your order.",
    });

    const finalOrderDetails: Order = {
      ...orderDetails,
      bkashTransactionId: transactionId,
    };

    try {
      const result = await processOrder(finalOrderDetails);
      
      if (result.success) {
        // Clear cart and stored order details
        dispatch({ type: 'CLEAR_CART' });
        sessionStorage.removeItem('orderDetails');

        toast({
          title: "Order Placed Successfully!",
          description: "Your order has been confirmed.",
        });
        
        // Redirect to success page, replacing history so user can't go "back" to payment page
        router.replace('/order-success');
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: "Order Failed",
        description: error.message || "Could not process your order. Please try again.",
      });
    }
  };

  if (!orderDetails) {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
             <p>Loading order details...</p>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <Card className="overflow-hidden">
        <CardHeader className="bg-pink-600 text-white p-4 flex flex-row items-center justify-between">
           <Image src="https://logowik.com/content/uploads/images/bkash-logo-8357.jpg" alt="bKash Logo" width={100} height={40} />
          <div className="text-right">
             <p className="text-sm">Merchant</p>
             <p className="font-bold">Dezx Leather</p>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>
            You are paying an advance of
          </CardDescription>
          <p className="text-4xl font-bold">BDT {orderDetails.advance.toFixed(2)}</p>
          
          <div className="text-left text-sm bg-secondary p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-center">Payment Instructions</h3>
             <p>1. Open your bKash App and select the <strong>'Send Money'</strong> option.</p>
             <p>2. Enter the number below:</p>
             <p className="text-center font-bold text-lg tracking-widest bg-background py-2 rounded">01749595605</p>
             <p>3. Enter the advance amount: <strong>BDT {orderDetails.advance.toFixed(2)}</strong></p>
             <p>4. After completing the payment, copy the <strong>Transaction ID</strong> and paste it in the field below.</p>
          </div>

          <div className="pt-4 space-y-2 text-left">
            <Label htmlFor="transactionId" className="font-semibold">bKash Transaction ID</Label>
            <Input 
              id="transactionId" 
              placeholder="e.g. 9X7G4F3A2B"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
          </div>

        </CardContent>
        <CardContent className="p-6 border-t">
          <Button
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            size="lg"
            onClick={handleConfirmPayment}
            disabled={isLoading}
          >
            {isLoading ? 'Confirming...' : 'Confirm Order'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}