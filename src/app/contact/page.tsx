import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact Us - Dezx Leather',
  description: 'Get in touch with Dezx Leather for inquiries, custom orders, or support.',
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Let us know how we can help.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-2xl font-headline">Contact Information</h2>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">For inquiries, support, and custom orders.</p>
                <a href="mailto:dezxleather@gmail.com" className="text-primary hover:underline">dezxleather@gmail.com</a>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">Speak with a member of our team.</p>
                <a href="tel:01772121294" className="text-primary hover:underline">01772121294</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-accent mt-1" />
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-muted-foreground">Saturday - Friday: 10am - 11pm BST</p>
              </div>
            </div>
          </div>
          <div>
             <h2 className="text-2xl font-headline mb-8">Send Us a Message</h2>
             <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g., Question about an order" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} />
                </div>
                <Button type="submit" size="lg">Send Message</Button>
             </form>
          </div>
        </div>
      </div>
    </div>
  )
}