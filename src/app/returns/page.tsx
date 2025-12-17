export const metadata = {
  title: 'Return & Refund Policy - Dezx Leather',
  description: 'Information about our return and refund process for custom orders.',
};

export default function ReturnsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Return & Refund Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Our commitment to your satisfaction and our craftsmanship.
            </p>
          </div>

          <div className="mt-12 prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground">
            <h2>Our Commitment to Customization</h2>
            <p>
              At Dezx Leather, every pair of shoes is a unique masterpiece, crafted specifically for you based on your exact selections. From the leather and toe shape to the precise sizing, your shoes are made to order.
            </p>
            <p>
              Due to this highly personalized nature, <strong>all custom-made shoe orders are final sale</strong>. We cannot offer returns or exchanges if you change your mind, as the shoes have been created to your unique specifications and cannot be resold. We encourage you to double-check your selections before placing your order.
            </p>
            
            <h2>Refunds & Exchanges</h2>
            <p>
              We stand by the quality of our materials and craftsmanship. While we do not accept general returns, we will happily address any issues under the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Manufacturing Defects:</strong> If your shoes arrive with a flaw in craftsmanship, please contact us within 7 days of delivery with photos of the issue. We will assess the defect and, if validated, offer to repair the shoes or provide a full refund.
              </li>
              <li>
                <strong>Material Unavailability:</strong> In the rare and unfortunate event that we are unable to source the specific materials required for your custom order after you have paid the advance, we will notify you immediately and issue a full refund of your advance payment.
              </li>
            </ul>

            <h2>How to Request a Refund</h2>
            <p>
              To initiate a refund request for one of the reasons listed above, please email our customer support team at <a href="mailto:dezxleather@gmail.com">dezxleather@gmail.com</a> with your order number and a clear description of the issue, including photographs. Our team will guide you through the next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}