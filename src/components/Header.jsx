"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const menu = [
  { label: "Home", link: "/" },
  {
    label: "Solution",
    dropdown: ["Overview", "Features", "Pricing"],
  },
  {
    label: "Land Preparing & Crop Planning",
    dropdown: ["Soil Analysis", "Planning Tools"],
  },
  {
    label: "Crop Operations",
    dropdown: ["Sowing", "Irrigation", "Fertilization"],
  },
  {
    label: "Post Harvest",
    dropdown: ["Storage", "Processing", "Logistics"],
  },
  {
    label: "Farm Ai & Cms",
    dropdown: ["Analytics", "Predictions"],
  },
];

export default function Header() {
  const [open, setOpen] = useState(null);
  return (
    <header className="flex items-center bg-[#f7f7f7] px-35 py-3 gap-5 sticky top-0 z-50">
      {/* <img src="/file.svg" alt="Logo" className="h-10 w-35 mr-6" /> */}
      <img src="/logo.jpg" alt="Logo" className="h-10 w-40 mr-6" />
      <nav className="flex gap-10">
        {menu.map((item, idx) => (
          <div key={item.label} className="relative gap-5 flex items-center">
            {item.dropdown ? (
              <div
                className="flex items-center gap-2 font-medium font-medium text-sm hover:text-green-700 focus:outline-none cursor-pointer"
                onMouseEnter={() => setOpen(idx)}
                onMouseLeave={() => setOpen(null)}
                tabIndex={0}
                onFocus={() => setOpen(idx)}
                onBlur={() => setOpen(null)}
              >
                <span className="opacity-90 text-sm">{item.label}</span>
                <ChevronDown size={18} />
                {open === idx && (
                  <div
                    className="absolute left-0 top-full w-48 bg-white z-10 rounded-b-2xl border-b-2 border-gray-200"
                    onMouseEnter={() => setOpen(idx)}
                    onMouseLeave={() => setOpen(null)}
                    style={{ pointerEvents: "auto", background: "#fff" }}
                  >
                    {item.dropdown.map((option, i) => (
                      <a
                        key={option}
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-800 hover:text-green-700 hover:underline cursor-pointer ${
                          i !== item.dropdown.length - 1 ? "border-b" : ""
                        }`}
                        tabIndex={0}
                      >
                        {option}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                href={item.link}
                className="font-medium items-center text-sm hover:text-green-700 opacity-90 cursor-pointer"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
