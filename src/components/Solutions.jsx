"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Wallet,
  Tractor,
  Package,
  ShoppingCart,
  Ship,
} from "lucide-react";

const tabs = [
  {
    name: "Farm Operation Management",
    // icon: Tractor,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Farm Operations Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Manage everything from job planning, scheduling, to work order
            management to ensure maximum productivity and efficiency.
          </p>
          <Tractor className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Resource Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            With a streamlined interface, manage your resources efficiently and
            optimize productivity.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Labor Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Revolutionize your farm labor management with CropERP’s
            user-friendly and comprehensive platform.
          </p>
          <Wallet className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Marketing and Sales
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Elevate your farm’s sales performance with CropERP’s advanced
            marketing tools and integrated platform.
          </p>
          <ShoppingCart className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Regulatory Compliance
          </h2>
          <p className="text-black/70 text-sm">
            Simplify regulatory compliance with CropERP’s all-in-one management
            tools for your farm.
          </p>
          <Package className="w-8 h-8 text-green-700" />
        </div>
      </div>
    ),
  },
  {
    name: "Farm Financial Management",
    icon: Wallet,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Farm Financial Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Manage all aspects of your farm easily, anytime & anywhere.
          </p>
          <Wallet className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            General Ledger
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Streamline your farm’s financials with CropERP’s intuitive General
            Ledger management.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Accounts Payable & Receivable
          </h2>
          <p className="text-black/70 text-sm">
            Effortlessly manage farm invoices with CropERP’s Accounts Payable &
            Receivable tools.
          </p>
          <Tractor className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Procurement & Sources
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage procurement and sourcing with CropERP’s farm
            financial management system.
          </p>
          <Package className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Budget and Reporting
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Track farm finances and make informed decisions with CropERP’s
            budgeting and reporting.
          </p>
          <ShoppingCart className="w-8 h-8 text-green-700" />
        </div>
      </div>
    ),
  },
  {
    name: "Crop Management Software",
    icon: Leaf,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Crop Management Software
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Manage all aspects of your farm easily, anytime & anywhere.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Crop & Season Planning
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Plan and optimize crop production with CropERP’s Crop & Season
            Planning.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Season Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Easily manage your crops throughout the season with CropERP’s season
            management feature.
          </p>
          <Tractor className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Crop Protection
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Protect your crops with CropERP’s advanced crop protection features.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Pesticide Application
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Maximize crop & yield with advanced pesticide application
            management.
          </p>
          <ShoppingCart className="w-8 h-8 text-green-700" />
        </div>
      </div>
    ),
  },
  {
    name: "Farm Inventory Management",
    icon: Package,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Farm Inventory Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Manage all aspects of your farm easily, anytime & anywhere.
          </p>
          <Package className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Sales Order Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage sales orders with CropERP’s powerful Sales Order
            Management system.
          </p>
          <ShoppingCart className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Contract Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage contracts and agreements with CropERP’s Contract
            Management feature.
          </p>
          <Wallet className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Customer & Supplier Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage your customers and suppliers with CropERP’s
            comprehensive management tools.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Price Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Set competitive prices and manage pricing strategies with CropERP’s
            price management feature.
          </p>
          <Tractor className="w-8 h-8 text-green-700" />
        </div>
      </div>
    ),
  },
  {
    name: "Sales and Contracting",
    icon: ShoppingCart,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Sales and Contracting
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Manage all aspects of your farm easily, anytime & anywhere.
          </p>
          <ShoppingCart className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Sales Order Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage sales orders with CropERP’s powerful Sales Order
            Management system.
          </p>
          <Package className="w-8 h-8 text-green-700 " />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Contract Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage contracts and agreements with CropERP’s Contract
            Management feature.
          </p>
          <Wallet className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Customer & Supplier Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficiently manage your customers and suppliers with CropERP’s
            comprehensive management tools.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Price Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Set competitive prices and manage pricing strategies with CropERP’s
            price management feature.
          </p>
          <Tractor className="w-8 h-8 text-green-700" />
        </div>
      </div>
    ),
  },
  {
    name: "Farm Shipping & Packing Management",
    icon: Ship,
    content: (
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Farm Shipping & Packing Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Manage all aspects of your farm easily, anytime & anywhere.
          </p>
          <Ship className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Pack Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Optimize farm shipping and packing with CropERP’s advanced pack
            management system.
          </p>
          <Package className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Live Production Performance
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Maximize farm production efficiency with CropERP’s live performance
            tracking system.
          </p>
          <Tractor className="w-8 h-8 text-green-700" />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Deport Date Management
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Efficient management of shipping and packing dates with CropERP’s
            Deport Management.
          </p>
          <Wallet className="w-8 h-8 text-green-700 " />
        </div>
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-lg font-bold text-black">
            Production Forecasting
          </h2>
          <p className="text-black/70 text-sm opacity-90">
            Plan your farm’s production with precision using CropERP’s
            forecasting tools.
          </p>
          <Leaf className="w-8 h-8 text-green-700" />
        </div>
      </div>
    ),
  },
];

export default function FarmSolutions() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-[#dedede] text-black py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.h1
        className="text-base md:text-lg font-bold mb-2 text-center text-black"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Expand Your Business With Our Farm Management Solution
      </motion.h1>

      <motion.p
        className="text-xs md:text-sm text-black/70 max-w-3xl text-center mb-8"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Want to get rid of manual tasks and automate processes to maximize
        yields? CropERP is here to help.
      </motion.p>

      {/* <div className="w-full max-w-7xl">
        <div className="flex justify-center border-b border-black/30">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 flex items-center justify-center gap-1 font-bold text-xs px-4 py-2 font-medium transition duration-300 border-r border-black/20 last:border-r-0 whitespace-nowrap rounded-t-lg ${
                activeTab === index
                  ? "text-green-800 font-bold border-b-2 border-green-800 bg-[#dedede]"
                  : "text-black hover:text-green-800 hover:bg-[#dedede]"
              }`}
            >
               {tab.name}
            </button>
          ))}
        </div>
      </div> */}
      <div className="w-full max-w-7xl">
        <div className="flex justify-center border-b border-black/30">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer flex-1 flex items-center justify-center gap-1 text-xs px-4 py-2 font-semibold transition-all duration-300 ease-in-out border-r border-black/20 last:border-r-0 whitespace-nowrap rounded-t-lg
          ${
            activeTab === index
              ? "bg-[#183c36] text-white shadow-md"
              : "bg-transparent text-black hover:text-[#183c36] hover:bg-[#dedede]"
          }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
  className="bg-[#dedede] text-black p-6 border-x border-b border-black/20 w-full max-w-7xl rounded-b-lg"
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  );
}
