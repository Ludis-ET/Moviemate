import React, { useState } from "react";

const slides = [
  {
    image:
      "https://imgs.search.brave.com/Qa6b0ggUhSFhuD8Zpy6PnglGZRiqGRIKwZTBHRw8lXI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOC8w/My8yNy8xNy8yMy90/aGUtYmVhY2gtMzI2/NjY2MF82NDAuanBn",
    text: "This is the first slide",
  },
  {
    image:
      "https://imgs.search.brave.com/ymWMvHx7gsYNpQfCaA8bx-8A7BdWBAJMB03TYVjULuA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vcGhvdG9y/bmlhLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOS8wNi9T/dW4tc2hpbmluZy1s/aWtlLWEtZGlhbW9u/ZC1pbi1zZWEuanBn/P2ZpdD02MTgsNDEz/JnNzbD0x",
    text: "This is the second slide",
  },
  {
    image:
      "https://imgs.search.brave.com/F1SWwv4ZGmEyIFZjYEAr4jtyZM3v3rsD8Dnu7R5iZ4s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU4/NjkxODQ4OS9waG90/by9ibGFjay13b21h/bi1oYW5kLWhvbGRz/LXNtYXJ0LXBob25l/LWhvcml6b250YWxs/eS53ZWJwP2I9MSZz/PTE3MDY2N2Emdz0w/Jms9MjAmYz1xQXp3/TVVSZ19IU2pMQU53/TXJ0MnJMX1NIV1Fw/TFNXV2pOc1kwNndE/Y3hNPQ",
    text: "This is the third slide",
  },
];

export const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-md">
      <img
        src={slides[currentIndex].image}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 w-full h-full flex justify-between items-end">
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <div className="w-1/2 flex gap-2">
            <span className="rounded-lg bg-gradient-to-t from-[#e0324b] to-transparent backdrop-blur-lg p-1 text-white">
              Horror
            </span>
            <span className="rounded-lg bg-gradient-to-t from-[#e0324b] to-transparent backdrop-blur-lg p-1 text-white">
              Horror
            </span>
            <span className="rounded-lg bg-gradient-to-t from-[#e0324b] to-transparent backdrop-blur-lg p-1 text-white">
              Horror
            </span>
          </div>

          <div className="flex justify-between mt-[28%] w-full">
            <div className="w-1/2">
              <div className="text-lg font-bold">
                {slides[currentIndex].text}
              </div>
              <div className="text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem temporibus, nisi corrupti mollitia dignissimos
                soluta.
              </div>
            </div>
            <div className="flex justify-center gap-0">
              <button
                onClick={nextSlide}
                className="bg-[#e0324b] hover:bg-[#4c2a36] text-white font-bold py-2 px-4 w-32 rounded self-end my-4"
              >
                About to
              </button>
              <button
                onClick={nextSlide}
                className="bg-transparent border-[#e0324b] text-white font-bold py-2 px-4 rounded self-end my-4 transition duration-300 ease-in-out hover:text-gray-500"
              >
                <i className="fa fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
