import Image from 'next/image';

export const metadata = {
  title: 'About Us - Legacy Leather',
  description: 'Learn about the heritage, craftsmanship, and passion behind Legacy Leather.',
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Story</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A Tradition of Excellence in Every Stitch
            </p>
          </div>

          <div className="mt-12 relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/1200x675.png"
              alt="Legacy Leather workshop"
              layout="fill"
              objectFit="cover"
              data-ai-hint="leather workshop"
            />
          </div>

          <div className="mt-12 prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground">
            <p>
              Founded on the principles of quality, durability, and timeless style, Legacy Leather began with a simple vision: to revive the art of traditional shoemaking for the modern gentleman. In a world of mass production and fleeting trends, we choose the path of patience and precision.
            </p>
            <p>
              Our journey starts with sourcing the finest full-grain leathers from renowned tanneries across the globe. Each hide is carefully inspected for its unique character, ensuring that every pair of shoes we create has its own distinct story. Our artisans, with decades of collective experience, then employ age-old techniques like Goodyear welting and hand-stitching to construct a shoe that is not only beautiful but also exceptionally comfortable and built to last.
            </p>
            <blockquote>
              "We don't just make shoes; we craft companions for your life's journey."
            </blockquote>
            <p>
              The heart of Legacy Leather is our commitment to personalization. We believe that a perfect fit is the ultimate luxury. That’s why we offer a comprehensive customization service, allowing you to tailor your shoes to your exact specifications. From the shape of the toe to the precise sizing, we empower you to co-create a pair of shoes that is truly yours.
            </p>
            <p>
              We invite you to experience the difference that true craftsmanship makes. Step into a pair of Legacy Leather shoes and walk with confidence, knowing you are wearing a piece of heritage designed for the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
