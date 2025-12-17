export const metadata = {
  title: 'Shipping & Delivery - Dezx Leather',
  description: 'Information about our shipping process and delivery times.',
};

export default function ShippingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Shipping & Delivery</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Getting our handcrafted shoes to your doorstep.
            </p>
          </div>

          <div className="mt-12 prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground">
            <h2>Order Processing & Crafting Time</h2>
            <p>
              As each pair of our shoes is custom-made with the utmost care, please allow approximately <strong>2-3 weeks</strong> for our artisans to craft your order. This timeline ensures we meet our high standards of quality for every pair.
            </p>
            
            <h2>Shipping Times & Costs</h2>
            <p>
              Once your order is crafted, it will be shipped. Here are the estimated delivery times and costs:
            </p>
            <ul>
                <li><strong>Inside Dhaka:</strong> 2-3 business days. Shipping cost: BDT 80.</li>
                <li><strong>Outside Dhaka:</strong> 3-5 business days. Shipping cost: BDT 120.</li>
                <li><strong>International Shipping:</strong> Please contact us at [Your Email] for a custom quote and delivery estimate.</li>
            </ul>

            <h2>Order Tracking</h2>
            <p>
              Once your order has shipped, you will receive an email with a tracking number and a link to track your package.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}