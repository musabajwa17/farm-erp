"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function Working() {
  const listItems = [
    "Protect Enhance Environment for future generations",
    "EcoSystems are imperative to maintaining a health planet",
    "Help protect the Environment and sustain its natural resources",
  ];

  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="bg-[#ffffff] w-full pt-10 px-5 flex justify-around">
      {/* Left Section - Image */}
      <div className="w-5/12 relative flex justify-start items-end">
        <img
          src="/image1.jpg"
          alt="Eco Planet"
          className="rounded-t-lg shadow-lg h-125 w-full"
        />

        <button
          onClick={() => setVideoOpen(true)}
          className="cursor-pointer absolute bottom-10 right-0 flex justify-center items-center bg-[#6abe52] text-white px-6 py-4 rounded-tl-full rounded-bl-full hover:bg-green-600 transition-colors"
        >
          <div>
            <Play className="w-8 h-8" />
          </div>
          <div className="ml-3 text-left flex flex-col">
            <span className="text-2xl font-bold">Want to Watch</span>
          <span className="text-2xl font-bold">How we work</span>
          </div>
        </button>

        {/* Video Modal */}
        {videoOpen && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-3/4 h-3/4 relative">
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 text-black font-bold text-xl "
              >
                &times;
              </button>
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Text */}
      <div className="w-6/12 flex flex-col ">
    <h2 className="text-5xl font-semibold text-black mb-4" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
          We Are Taking Small Steps To Make Earth Better Planet
        </h2>
        <div className="flex justify-center">
            <div className="w-3/5 h-[2px] bg-[#6abe52] mb-6 opacity-60"></div>
        </div>
        <ul className="space-y-4 my-5">
          {listItems.map((item) => (
              <li key={item} className="flex items-center gap-2 cursor-pointer text-black transition-colors font-semibold ">
              <span className="flex items-center justify-center content-center w-7 h-7 rounded-full bg-[#6abe52] text-white font-bold">&gt;</span>
             <span className="hover:underline opacity-60 hover:opacity-100 text-base cursor-pointer"> {item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}