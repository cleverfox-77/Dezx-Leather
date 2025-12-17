import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeaturedCollection } from '@/components/featured-collection';
import { ArrowRight, CheckCircle, ShieldCheck, Truck } from 'lucide-react';

export default function HomePage() {

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Artisan crafting a leather shoe"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
          data-ai-hint="leather shoe making"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-4 drop-shadow-lg">
            Timeless Elegance, Made For You
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
            Discover the art of shoemaking with our bespoke leather footwear, crafted to your exact specifications for unparalleled comfort and style.
          </p>
          <Button asChild size="lg" className="font-bold">
            <Link href="/shop">
              Explore The Collection <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <FeaturedCollection />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-headline mb-6">
                The Dezx Leather Promise
              </h2>
              <p className="text-muted-foreground mb-8">
                Each pair of Dezx Leather shoes is more than just footwear; it's a testament to a rich heritage of craftsmanship. We use only the finest full-grain leathers and traditional techniques to create shoes that are built to last a lifetime.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Fully Customizable</h3>
                    <p className="text-muted-foreground">Tailor every detail, from toe shape to size, for a truly personal fit.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Premium Materials</h3>
                    <p className="text-muted-foreground">Sourced from the best tanneries to ensure durability and a beautiful patina.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Truck className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Worldwide Shipping</h3>
                    <p className="text-muted-foreground">We deliver our masterpieces to your doorstep, wherever you are.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://placehold.co/600x700.png"
                alt="A collection of finished leather shoes"
                width={600}
                height={700}
                className="rounded-lg shadow-xl"
                data-ai-hint="leather shoes"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}