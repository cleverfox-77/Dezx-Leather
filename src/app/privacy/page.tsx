import Link from "next/link";

export const metadata = {
  title: 'Privacy Policy - Dezx Leather',
  description: 'Learn how Dezx Leather collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Privacy Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="mt-12 prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground">
            <p>
              Welcome to Dezx Leather. Your privacy is critically important to us. This Privacy Policy outlines how we collect, use, protect, and handle your personal information when you use our website and services to order your custom handcrafted shoes.
            </p>

            <h2>1. What Information We Collect</h2>
            <p>
              To provide you with our services, we collect the following types of information:
            </p>
            <ul>
              <li><strong>Personal Identification Information:</strong> This includes your name, email address, phone number, and shipping address, which you provide when you place an order.</li>
              <li><strong>Order Information:</strong> We keep a record of your custom shoe specifications (size, toe shape, etc.), your order history, and payment details (excluding full credit card numbers, which are processed securely by our payment partners).</li>
              <li><strong>Communication Data:</strong> If you contact us via email or our contact form, we will collect the information you provide in your correspondence so we can respond to your inquiries.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul>
              <li><strong>To Fulfill Your Order:</strong> Your personal and order details are essential for us to process your payment, craft your custom shoes, and ship them to your address.</li>
              <li><strong>To Communicate With You:</strong> We use your contact information to send you order confirmations, shipping notifications, and respond to your customer service requests.</li>
              <li><strong>To Improve Our Services:</strong> We may analyze non-identifiable data to understand customer trends and improve our website experience and product offerings.</li>
              <li><strong>For Legal and Security Purposes:</strong> To prevent fraud, process refunds, and maintain the security of our website and business operations.</li>
            </ul>

             <h2>3. Data Protection and Security</h2>
            <p>
              We take the security of your data seriously. We implement a variety of security measures to maintain the safety of your personal information. Your payment information is processed by trusted, secure payment gateways (e.g., bKash, Stripe), and we do not store your full credit card details on our servers.
            </p>
            
            <h2>4. Third-Party Services</h2>
            <p>
              We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you (like payment processors and email providers), so long as those parties agree to keep this information confidential. For example, your email is shared with our email service (Gmail/Nodemailer) solely for the purpose of sending order-related communications.
            </p>

             <h2>5. Your Rights</h2>
             <p>
                You have the right to request access to the personal data we hold about you. You can also request that we correct any inaccuracies in your data or, in certain circumstances, delete your data. To make such a request, please contact us.
            </p>
            
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>

             <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please don't hesitate to <Link href="/contact">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}