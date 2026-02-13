import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQs | CustomizeLK",
    description: "Frequently asked questions about customization, shipping, and more.",
};

export default function FAQPage() {
    const faqs = [
        {
            question: "How long does it take to receive my custom shoes?",
            answer: "Our standard processing time for custom orders is 7-14 business days. Shipping usually takes an additional 2-3 business days within Sri Lanka. You will receive a tracking number once your order is shipped."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Currently, we primarily ship within Sri Lanka. However, for special bulk orders or specific international requests, please contact us directly through WhatsApp or email."
        },
        {
            question: "Can I provide my own shoes for customization?",
            answer: "Yes! You can send us your new or gently used shoes for customization. Please select the 'Mail Your Own' option on our Customize page or contact us to discuss the details."
        },
        {
            question: "What paints do you use? Are they durable?",
            answer: "We use high-quality, professional-grade key leather paints (like Angelus Direct) that are specifically designed for footwear. They are water-resistant, crack-resistant, and sealed with a protective finisher to ensure longevity."
        },
        {
            question: "How do I care for my custom shoes?",
            answer: "We recommend hand washing your custom shoes with mild soap and a soft cloth. Avoid harsh chemicals, scrubbing, or machine washing. Gentle wear will help preserve the artwork for years."
        },
        {
            question: "What is your return policy for custom items?",
            answer: "Due to the personalized nature of our products, all custom sales are final. However, if there is a defect in the workmanship or an error on our part, please contact us within 48 hours of receiving your order, and we will make it right."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">
                    Find answers to common questions about our customization process, shipping, and care instructions.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="mt-16 text-center bg-secondary/30 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-6">
                    Can't find the answer you're looking for? Please chat to our friendly team.
                </p>
                <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Contact Support
                </a>
            </div>
        </div>
    );
}
