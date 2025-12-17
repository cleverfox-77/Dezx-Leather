import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Instagram } from 'lucide-react';

const feedImages = [
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
  'https://placehold.co/400x400.png',
];

const hints = [
  "shoe detail",
  "craftsman hands",
  "leather texture",
  "workshop tools",
  "shoe lifestyle",
  "classic footwear"
]

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline mb-4">Follow Our Journey</h2>
        <a href="https://www.instagram.com/dezx_leather/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors text-lg flex items-center justify-center gap-2 mb-10">
            @dezxleather
        </a>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {feedImages.map((src, index) => (
            <Link href="https://www.instagram.com/dezx_leather/" target="_blank" rel="noopener noreferrer" key={index} className="group block overflow-hidden">
              <Image
                src={src}
                alt={`Instagram post ${index + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={hints[index]}
              />
            </Link>
          ))}
        </div>
        <Button asChild size="lg" variant="outline">
          <a href="https://www.instagram.com/dezx_leather/" target="_blank" rel="noopener noreferrer">
            <Instagram className="mr-2" /> Follow on Instagram
          </a>
        </Button>
      </div>
    </section>
  );
}