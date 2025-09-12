"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const cards = [
  { id: 1, img: "/crop1.jpg", title: "Land Planning", desc: "GIS Farm Mapping", desc1: "IoT Data Logger Setup", desc2: "AI Analysis On Logger Data (Beta)" },
  { id: 2, img: "/crop2.jpg", title: "Crop Management", desc: "Crop Sowing", desc1: "Irrigation Alerts", desc2: "AI Crop Plan Sowing To Harvest (Beta)" },
  { id: 3, img: "/crop3.jpg", title: "Forecasting and Predictions", desc: "Real-Time weather forecasting", desc1: "Yield Prediction", desc2: "Plant disease prediction (Beta)" },
  { id: 4, img: "/crop4.jpg", title: "Labor & Inventory Management", desc: "Labor Record", desc1: "Role Managements.", desc2: "Assets and Land record (Beta)" },
  { id: 5, img: "/crop5.jpg", title: "Post Harvesting", desc: "Farm Warehouse and Mangements.", desc1: "Crop Packaging and shipping.", desc2: "Finance and profit calculation. (Beta)" },
  { id: 6, img: "/crop6.jpg", title: "FarmLink CMS & Farm.Ai", desc: "User Managements", desc1: "Farm Insights and Stats", desc2: "Contract Farming (Beta)" },
];

// Animation presets for each card
const animations = [
  { initial: { x: -150, opacity: 0 }, animate: { x: 0, opacity: 1 } }, // left
  { initial: { y: -150, opacity: 0 }, animate: { y: 0, opacity: 1 } }, // top
  { initial: { x: 150, opacity: 0 }, animate: { x: 0, opacity: 1 } }, // right
  { initial: { x: -150, opacity: 0 }, animate: { x: 0, opacity: 1 } }, // left bottom
  { initial: { y: 150, opacity: 0 }, animate: { y: 0, opacity: 1 } }, // bottom
  { initial: { x: 150, opacity: 0 }, animate: { x: 0, opacity: 1 } }, // right bottom
];

export default function AboutCards({ playAnimation }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="cursor-pointer bg-gray-200 hover:bg-white text-black rounded-2xl shadow-lg p-3 sm:p-4 flex flex-col items-center w-full"
            initial={animations[index].initial}
            animate={playAnimation ? animations[index].animate : {}}
            transition={{
              duration: 0.9,
              delay: 0.7 + index * 0.3,
              ease: "easeOut",
            }}
          >
            {/* Image */}
            <div className="w-full h-40 sm:h-48 md:h-56 bg-white rounded-lg overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title + Description */}
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-center">
              {card.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm text-center mt-2">
              {card.desc}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm text-center mt-2">
              {card.desc1}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm text-center mt-2">
              {card.desc2}
            </p>

            {/* Rating */}
            {/* <div className="flex items-center space-x-2 mt-3">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-yellow-500 text-sm">(5)</span>
            </div> */}
          </motion.div>
        ))}
      </div>
    )
}