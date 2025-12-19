'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.shoe.price * item.quantity,
    0
  );

  // Note: Shipping is now selected at checkout. This is an estimate.
  const shipping = subtotal > 0 ? 80.00 : 0; // Default to Inside Dhaka for estimate
  const total = subtotal + shipping;

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-4xl font-headline">Your Cart is Empty</h1>
        <p className="mt-4 text-muted-foreground">Looks like you haven't added any masterpieces yet.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl font-headline text-center mb-12">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden md:table-cell">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden md:table-cell">
                        <Image
                          src={item.shoe.images[0]}
                          alt={item.shoe.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                          data-ai-hint="leather shoe"
                        />
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">{item.shoe.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.customization.shoeSize}
                        </p>
                        <p className="text-sm md:hidden mt-1">BDT {item.shoe.price.toFixed(2)}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-14 h-8 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        BDT {(item.shoe.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>BDT {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping (Est.)</span>
                <span>BDT {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total (Est.)</span>
                <span>BDT {total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div >
  );
}