"use client";

import { MessageCircle, Mail, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(at_bottom_center,_#FFFFFF_0%,_#DADADA_100%)] px-6 py-16 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Ready To Manage Your Farm Smartly With CropERP?
      </h2>

      {/* Paragraph */}
      <p className="mt-4 text-medium font-bold opacity-60 text-center max-w-2xl">
        Sign-up for a free demo today.
        <br />
        Let's work together to make your farm more efficient, productive, and profitable!
      </p>

      {/* Layout */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-stretch">
        {/* Left: Question & Contact Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-5xl font-bold mb-4">have a </h3>
            <h3 className="text-5xl font-bold mb-4">Question?</h3>
            <p className="text-medium opacity-80 leading-relaxed mb-2 mt-5">
              Our team is ready to assist you with any queries you may have about CropERP. 
              We provide tailored solutions to help you manage your farm efficiently.
            </p>
            <img src="/crop7.jpg" alt="Contact Us" className="w-130 h-75 mt-5 rounded-lg shadow-md object-cover" />
            {/* <p className="text-medium opacity-80 leading-relaxed mb-2 mt-5">
              Whether you are interested in a free demo, need support, or want more information about our services, 
              we are just a message away.
            </p>
            <p className="text-medium opacity-80 leading-relaxed mb-2 mt-5">
              Let us partner with you to transform your farm into a more productive, profitable, and sustainable enterprise.
            </p>
            <p className="text-medium opacity-80 leading-relaxed mb-2 mt-5">
              CropERP integrates all farm operations from sowing to harvest, packaging, and market delivery. 
              Our solutions save time, reduce errors, and optimize yield.
            </p>
            <p className="text-medium opacity-80 leading-relaxed mb-2 mt-5">
              Contact us anytime to learn how CropERP can transform your farm into a modern, data-driven enterprise.
            </p> */}
          </div>

          {/* Contact Methods */}
          <div className="mt-4 flex justify-between space-y-3 w-[93%]">
            <div className="flex items-center space-x-3">
              <span className="font-semibold opacity-80"><Mail w={4} h={4} /></span>
              <a href="mailto:support@croperp.com" className="opacity-80 underline text-sm">
                support@croperp.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold opacity-80"><Phone w={4} h={4} /></span>
              <a href="mailto:support@croperp.com" className="opacity-80 underline text-sm">
                051 543 1234
              </a>
            </div>
            <div className="flex space-x-3">
              <span className="font-semibold opacity-80"><MessageCircle w={4} h={4} /></span>
              <a href="#" className="opacity-80 underline text-sm mt-[1.5px]">
                Start Chat
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full flex flex-col justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">Get In Touch</h3>

          <form className="space-y-5 mt-4 flex-1">
            {/* Name */}
            <div>
              <label className="block text-gray-800 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b887b]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-800 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b887b]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-800 font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b887b]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-800 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b887b]"
              ></textarea>
            </div>

            {/* Confirmation */}
            <p className="text-sm text-gray-500">
              By submitting this form, you are agreeing to CropERP’s{" "}
              <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
              <span className="underline cursor-pointer">Terms of Service</span>.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#2b887b] text-white py-3 rounded-lg font-semibold hover:bg-[#20544d] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
