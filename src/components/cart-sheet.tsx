'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { X } from 'lucide-react';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function CartSheet({ open, onOpenChange, children }: CartSheetProps) {
  const { state, dispatch } = useCart();

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.shoe.price * item.quantity,
    0
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({state.items.length})</SheetTitle>
          <SheetDescription className="sr-only">
            Review and manage the items in your shopping cart before checkout.
          </SheetDescription>
        </SheetHeader>
        {state.items.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="pr-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between space-x-4 py-4 border-b">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.shoe.images[0]}
                        alt={item.shoe.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint="leather shoe"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.shoe.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.customization.shoeSize}, {item.customization.toeShape}, {item.customization.soleHeight || 'N/A'}" Sole
                      </p>
                      <p className="text-sm font-medium mt-1">
                        BDT {item.shoe.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-semibold text-sm mb-2">BDT {(item.shoe.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground"
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="px-6 pt-6 border-t">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>BDT {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/cart">View Cart & Checkout</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">Continue Shopping</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <SheetClose asChild>
              <Button asChild variant="outline">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}