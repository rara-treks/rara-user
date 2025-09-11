import React from "react";
import { Metadata } from "next";
import ContactCard from "@/components/contact/contact-card";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us at Community Homestay Network",
};

function Contact() {
  return (
    <main>
      <div className="container py-8 max-w-5xl">
        <section className="prose max-w-4xl mx-auto">
          <h1 className="text-center font-bebas-neue font-medium">
            Contact Us
          </h1>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 my-5 md:my-10">
          <ContactCard />
          <ContactForm />
        </section>
        <section className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9763321470155!2d85.30694087492347!3d27.71801702502186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fbea7fee3b%3A0x30a630e6fa209247!2sRara%20Treks%20Tours%20%26%20Travels%20(P.)%20Ltd!5e0!3m2!1sen!2snp!4v1756461778515!5m2!1sen!2snp"
            width="1000"
            height="450"
            loading="lazy"
            className="w-full h-120 rounded-2xl border-0"
          ></iframe>
        </section>
      </div>
    </main>
  );
}

export default Contact;
export const dynamic = "force-static";
