import Image from 'next/image'
import React from 'react'

const Journey = () => {
  return (
    <div className="w-full flex itesm-center justify-center">
      <div className="flex w-full relative items-center justify-center">
        <Image
          src="/assets/mountain.png"
          alt="Journey"
          width={1000}
          height={500}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 w-full flex items-center justify-center">
          <div className="flex items-center justify-between w-full px-32">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex rounded-full p-2 bg-white">
                <Image
                  src="/assets/icons/journey.svg"
                    alt="Journey Icon"
                    width={50}
                    height={50}
                    className="w-full h-auto"
                />
              </div>
              <p className="text-white font-bold text-[22px]">
                Culture Journey
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex rounded-full p-2 bg-white">
                <Image
                  src="/assets/icons/trekking.svg"
                    alt="Journey Icon"
                    width={50}
                    height={50}
                    className="w-full h-auto"
                />
              </div>
              <p className="text-white font-bold text-[22px]">
                Trekking Trials
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex rounded-full p-2 bg-white">
                <Image
                  src="/assets/icons/mountain.svg"
                    alt="Journey Icon"
                    width={50}
                    height={50}
                    className="w-full h-auto"
                />
              </div>
              <p className="text-white font-bold text-[22px]">
                Mountain Expeditions
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex rounded-full p-2 bg-white">
                <Image
                  src="/assets/icons/wildlife.svg"
                    alt="Journey Icon"
                    width={50}
                    height={50}
                    className="w-full h-auto"
                />
              </div>
              <p className="text-white font-bold text-[22px]">
                Wildlife & Nature
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex rounded-full p-2 bg-white">
                <Image
                  src="/assets/icons/adventure.svg"
                    alt="Journey Icon"
                    width={50}
                    height={50}
                    className="w-full h-auto"
                />
              </div>
              <p className="text-white font-bold text-[22px]">
                Adventure Journey
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex rounded-full p-2 bg-white">
                <Image
                  src="/assets/icons/scenic.svg"
                    alt="Journey Icon"
                    width={50}
                    height={50}
                    className="w-full h-auto"
                />
              </div>
              <p className="text-white font-bold text-[22px]">Scenic Flights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey
