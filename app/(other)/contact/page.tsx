import React from "react";
import { Metadata } from "next";
import ContactCard from "@/components/contact/contact-card";
import ContactForm from "@/components/contact/contact-form";
import GoogleMapEmbed from "@/components/contact/google-map-embed";


export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us at Rara Treks",
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
          <GoogleMapEmbed />
        </section>
      </div>
    </main>
  );
}

export default Contact;
export const dynamic = "force-static";
