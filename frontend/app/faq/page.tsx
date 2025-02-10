"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do you offer personal styling services?",
    answer:
      "Yes! Our in-store stylists can help you put together the perfect outfit for any occasion. Book an appointment via our website.",
  },
  {
    question: "Can I customize my clothing with TrendWear Outfitters?",
    answer:
      "Yes! Students can enjoy a 15% discount on all purchases by verifying their student status through our online platform.",
  },
  {
    question: "Is there a TrendWear Outfitters loyalty program?",
    answer:
      "Yes! Join our TrendWear Rewards Program to earn points on every purchase and unlock exclusive discounts and perks.",
  },
  {
    question: "Do you sell limited-edition fashion collections?",
    answer:
      "Yes, we collaborate with top designers and brands to bring exclusive, limited-edition collections to our customers.",
  },
  {
    question: "Can I trade in my old TrendWear items for store credit?",
    answer:
      "Yes, we have a trade-in program where you can exchange gently used TrendWear products for store credit.",
  },
  {
    question: "Does TrendWear Outfitters have an annual fashion show?",
    answer:
      "Yes! Every year, we host a TrendWear Fashion Show featuring the latest styles and exclusive runway collections.",
  },
  {
    question: "Can I get a personal shopper at your store?",
    answer:
      "Yes, our flagship store offers a personal shopping experience with dedicated fashion advisors.",
  },
  {
    question: "Do you provide same-day delivery?",
    answer:
      "Yes, we offer same-day delivery in select cities for orders placed before 12 PM.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our services and solutions
          </p>
        </div>

        <Card className="p-6 shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <span className="text-primary font-medium">
              Well we don&apos;t know what to do
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
