export const metadata = {
    title: 'FAQ - Dezx Leather',
    description: 'Frequently Asked Questions about our custom leather shoes.',
  };
  
  export default function FaqPage() {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-headline font-bold">Frequently Asked Questions</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Find answers to common questions about our products, customization, and policies.
              </p>
            </div>
  
            <div className="mt-12 prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground">
              <p>
                This is a placeholder for your FAQ page. You can add questions and answers that your customers frequently ask.
              </p>
              <h2>Q: How long does it take to make a pair of shoes?</h2>
              <p>
                Each pair is handcrafted to your specifications. Please allow 2-3 weeks for crafting before your order is shipped.
              </p>
              <h2>Q: Can I return my custom shoes?</h2>
              <p>
                Because each pair is made to order, we cannot accept returns on customized shoes. Please see our full Return Policy for details on manufacturing defects.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }