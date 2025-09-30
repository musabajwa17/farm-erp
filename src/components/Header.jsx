"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobile, setActiveMobile] = useState(null);

  const menu = [
    { label: "Home", link: "/" },
    {
      label: "Solution",
      dropdown: [
        { label: "ESS Official", link: "https://escan-systems.com/our-services/" },
        { label: "ESS Green Bot" },
        { label: "ESS Farming Link" },
      ],
    },
    {
      label: "Land Preparing & Crop Planning",
      dropdown: ["Farm Mapping (GIS)", "Soil Management"],
    },
    {
      label: "Crop Operations",
      dropdown: ["Crop Sowing", "Irrigation Management", "Weather Forecasting","Inventory Management","Labor Management"],
    },
    {
      label: "Post Harvest",
      dropdown: ["Farm Shipping", "Packaging", "Warehouse Management"],
    },
    {
      label: "Farm Ai & Cms",
      dropdown: ["Farm Insights", "Contract Farming","Farm.Ai","Settings","Notifications"],
    },
  ];

  return (
    <header className="bg-[#f7f7f7] sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="h-10 w-auto object-contain"
        />
        <nav className="hidden md:flex gap-8">
          {menu.map((item, idx) => (
            <div key={idx} className="relative content-center">
              {item.dropdown ? (
                <div
                  className="flex items-center gap-1 text-sm font-medium cursor-pointer hover:text-green-700"
                  onMouseEnter={() => setOpen(idx)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <span className="opacity-80">{item.label}</span>
                  <ChevronDown size={16} />

                  <AnimatePresence>
                    {open === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 min-w-[12rem] bg-white rounded-lg shadow-lg border"
                      >
                        {/* {item.dropdown.map((option, i) => (
                          <a
                            key={i}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {option}
                          </a>
                        ))} */}
                         {item.dropdown.map((option, i) => (
                       <a
                         key={option.label || option}
                         href={option.link || "#"}
                         className={`block px-4 py-2 text-xs text-gray-800 hover:text-green-700 hover:underline cursor-pointer ${
                           i !== item.dropdown.length - 1 ? "border-b" : ""
                         }`}
                         tabIndex={0}
                         target={option.link ? "_blank" : undefined}
                         rel={option.link ? "noopener noreferrer" : undefined}
                       >
                         {option.label || option}
                       </a>
                     ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  href={item.link}
                  className="text-sm font-medium hover:text-green-700 opacity-80"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t shadow-md overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {menu.map((item, idx) => (
                <div key={idx}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className="flex justify-between items-center w-full py-2 text-sm font-medium hover:text-green-700"
                        onClick={() =>
                          setActiveMobile(activeMobile === idx ? null : idx)
                        }
                      >
                        {item.label}
                        <motion.div
                          animate={{
                            rotate: activeMobile === idx ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeMobile === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 flex flex-col space-y-1"
                          >
                            {item.dropdown.map((option, i) => (
                              <a
                                key={option.label || option}
                                href={option.link || "#"}
                                className="block py-1 text-sm text-gray-700 hover:text-green-700"
                                target={option.link ? "_blank" : undefined}
                                rel={option.link ? "noopener noreferrer" : undefined}
                              >
                                {option.label || option}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className="block text-sm font-medium hover:text-green-700"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
