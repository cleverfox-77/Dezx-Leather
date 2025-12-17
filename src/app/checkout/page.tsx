'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CustomerDetails } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(10, { message: "Please enter a complete address." }),
});

const SHIPPING_COSTS = {
  insideDhaka: 80.00,
  outsideDhaka: 120.00,
};

export default function CheckoutPage() {
  const { state } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [shippingLocation, setShippingLocation] = React.useState<'insideDhaka' | 'outsideDhaka'>('insideDhaka');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const subtotal = state.items.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const shipping = subtotal > 0 ? SHIPPING_COSTS[shippingLocation] : 0;
  const total = subtotal + shipping;
  const advanceAmount = subtotal * 0.5;

  const handleProceedToPayment = (customerDetails: CustomerDetails) => {
    setIsLoading(true);

    const orderDetails = {
      customer: customerDetails,
      items: state.items,
      subtotal,
      shipping,
      total,
      advance: advanceAmount,
    };
    
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    toast({
      title: "Proceeding to Payment",
      description: "Redirecting to our secure payment gateway...",
    });

    // Short delay to allow toast to show
    setTimeout(() => {
        router.push('/payment/bkash');
    }, 2000);
  };
  
  if (state.items.length === 0 && !isLoading) {
    return (
       <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Your Cart is Empty</AlertTitle>
          <AlertDescription>
            You need to add items to your cart before you can check out.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Checkout</CardTitle>
            <CardDescription>Please provide your details to complete the order.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-headline mb-4">Shipping Information</h3>
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(handleProceedToPayment)} id="customer-details-form" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="01XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Shipping Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Street, Area, City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                        <FormLabel>Shipping Location</FormLabel>
                        <RadioGroup
                            onValueChange={(value: 'insideDhaka' | 'outsideDhaka') => setShippingLocation(value)}
                            defaultValue={shippingLocation}
                            className="flex gap-4 pt-2"
                        >
                            <FormItem className="flex items-center space-x-2">
                                <RadioGroupItem value="insideDhaka" id="insideDhaka" />
                                <Label htmlFor="insideDhaka">Inside Dhaka (BDT {SHIPPING_COSTS.insideDhaka.toFixed(2)})</Label>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <RadioGroupItem value="outsideDhaka" id="outsideDhaka" />
                                <Label htmlFor="outsideDhaka">Outside Dhaka (BDT {SHIPPING_COSTS.outsideDhaka.toFixed(2)})</Label>
                            </FormItem>
                        </RadioGroup>
                    </FormItem>
                  </form>
                </FormProvider>
              </div>

              <div className="space-y-6">
                 <h3 className="text-xl font-headline mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>BDT {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>BDT {shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>BDT {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />

                <div className="space-y-2 text-center bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold text-lg">Advance Payment Required (50%)</h3>
                  <p className="text-muted-foreground">To confirm your custom order, we require an advance payment.</p>
                  <p className="text-3xl font-bold text-accent">BDT {advanceAmount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">The remaining balance of BDT {(total - advanceAmount).toFixed(2)} will be due upon delivery.</p>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <b>We make each pair of shoes specially for you, focusing on proper customization and careful crafting. Because of this process, orders take a minimum of 2 weeks and up to 3 weeks to complete.</b>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" type="submit" form="customer-details-form" disabled={isLoading || state.items.length === 0}>
              {isLoading ? 'Processing...' : `Proceed to Pay BDT ${advanceAmount.toFixed(2)}`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}