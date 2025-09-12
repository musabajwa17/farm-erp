"use client";

import { Chrome, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-[#193433] to-[#191f2b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Get in Touch */}
        <div>
          {/* Image placeholder */}
          <div className="w-full h-16 rounded-full flex justify-center">
            {/* <img
              src="/logo.jpg"
              alt="Logo"
              className="w-50 h-full object-cover rounded-full"
            /> */}
            <img src="/logo1.png" alt="Logo" className="h-15 w-55 object-contain rounded-full" />
          </div>

          {/* Heading with bottom border */}
          <div className="flex justify-center my-4">
            <h3 className="text-center text-medium font-bold border-b border-white pb-2 w-fit">
              Get in Touch
            </h3>
          </div>
          {/* Email & Website */}
          <div className="flex flex-col items-center space-y-3">
            <a
              href="mailto:support@croperp.com"
              className="hover:text-gray-300 text-xs text-[#19CE64]"
            >
              
            <span className="text-xs text-[#8b5e3c]">Email:</span>  support@croperp.com
            </a>
            <a href="https://www.croperp.com" className="hover:text-gray-300 text-xs text-[#19CE64]">
            <span className="text-xs text-[#8b5e3c]">Website:</span>  www.croperp.com
            </a>
          </div>

          {/* Social Logos */}
          <div className="flex space-x-4 my-4 justify-center">
            <Facebook className="w-6 h-6 cursor-pointer" />
            <Chrome className="w-6 h-6 cursor-pointer" />
            <Linkedin className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Solutions */}
        <div className="flex flex-col space-y-2 text-left sm:text-center md:text-left">
          <div className="flex justify-start ps-5">
            <h3 className="text-xl font-bold  pb-2 w-fit mx-auto md:mx-0 ">
              Solutions
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Farm Management
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Crop Planning
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Harvest Tracking
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Market Analysis
            </li>
          </ul>
        </div>

        {/* Product Features */}
        <div className="flex flex-col space-y-2 text-left sm:text-center md:text-left">
          <h3 className="text-xl font-bold pb-2 w-fit mx-auto md:mx-0 ps-5">
            Product Features
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Real-time Monitoring
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Analytics Dashboard
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Automated Reports
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">Mobile App</li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Notifications
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Multi-User Access
            </li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">
              Integration APIs
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-2 text-left sm:text-center md:text-left">
          <h3 className="text-xl font-bold pb-2 w-fit mx-auto md:mx-0 ps-5">
            Navigation
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li className="hover:text-gray-400 cursor-pointer opacity-60">Home</li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">About Us</li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">Services</li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">Blog</li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">Contact</li>
            <li className="hover:text-gray-400 cursor-pointer opacity-60">FAQs</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#1A202C] py-4 mt-8 flex flex-col md:flex-row justify-center md:justify-around items-center gap-2">
        <span className="text-center text-white text-sm font-bold opacity-60">&copy; {new Date().getFullYear()} © Copyright 2024. Earth-Scan-systems All Rights Reserved</span>
        <span className="text-center text-white text-sm font-bold opacity-60">Designed by CropERP</span>
      </div>
    </footer>
  );
}
