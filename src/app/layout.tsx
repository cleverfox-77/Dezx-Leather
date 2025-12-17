import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-context';
import { Toaster } from "@/components/ui/toaster"
import { AdminProvider } from '@/context/admin-context';
import { WishlistProvider } from '@/context/wishlist-context';

export const metadata: Metadata = {
  title: 'Dezx Leather - Custom Handmade Shoes',
  description: 'Exquisite handmade leather shoes for men, with custom options for a perfect fit and style.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <AdminProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AdminProvider>
      </body>
    </html>
  );
}