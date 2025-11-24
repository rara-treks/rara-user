import Image from 'next/image';
import React from 'react'
import { Input } from '../ui/input';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  return (
    <div className="flex items-center w-full justify-between bg-[#1E2F22] pt-14">
      <div className="w-full flex flex-col-reverse md:flex-row gap-8 items-start justify-start px-3 md:px-6">
        <Image
          src="/assets/footermountain.png"
          alt="subscrie image"
          width={500}
          height={500}
          className="w-full md:w-[670px] h-full object-cover"
        />

        <div className="flex flex-col items-start justify-start gap-4 lg:pr-24">
          <h1 className="text-3xl text-white font-bold">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-lg text-white">
            Sign up to get the inside scoop on everything happening in Rara Trek
            Tour and Travel delivered right to your inbox.
          </p>

          <div className="w-full md:w-[400px] flex items-center justify-start bg-white rounded-full  px-6">
            <Input
              placeholder="Enter your email address"
              className="bg-transparent p-0 border-none focus:outline-none focus:ring-0 focus:border-0 shadow-none"
            />
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter
