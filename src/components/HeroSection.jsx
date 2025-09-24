"use client";
import { useEffect, useState } from "react";

// Typewriter border component for 'Every Season'

import { useRef, useLayoutEffect } from "react";

// function TypewriterBorderText({ text }) {
//   const [angle, setAngle] = useState(0);
//   const [drawing, setDrawing] = useState(true);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const textRef = useRef(null);
//   const stroke = 3;

//   useLayoutEffect(() => {
//     if (textRef.current) {
//       setWidth(textRef.current.offsetWidth + 24); // padding for circle
//       setHeight(textRef.current.offsetHeight + 12); // padding for circle
//     }
//   }, [text]);

//   const radius = Math.max(width, height) / 2;
//   const circumference = 2 * Math.PI * radius;

//   useEffect(() => {
//     let timeout;
//     if (drawing && angle < 360) {
//       timeout = setTimeout(() => {
//         setAngle(angle + 6);
//       }, 12);
//     } else if (drawing && angle >= 360) {
//       timeout = setTimeout(() => {
//         setDrawing(false);
//       }, 1200);
//     } else if (!drawing && angle > 0) {
//       timeout = setTimeout(() => {
//         setAngle(angle - 6);
//       }, 8);
//     } else if (!drawing && angle <= 0) {
//       timeout = setTimeout(() => {
//         setDrawing(true);
//       }, 400);
//     }
//     return () => clearTimeout(timeout);
//   }, [angle, drawing]);

//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         position: "relative",
//         height: height,
//       }}
//     >
//       <span
//         ref={textRef}
//         style={{
//           color: "white",
//           fontSize: "1.25rem",
//           zIndex: 2,
//           pointerEvents: "none",
//           whiteSpace: "nowrap",
//           lineHeight: 1,
//         }}
//       >
//         {text}
//       </span>
//       {width > 0 && height > 0 && (
//         <svg
//           width={Math.max(width, height)}
//           height={Math.max(width, height)}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             zIndex: 1,
//             pointerEvents: "none",
//           }}
//         >
//           <circle
//             cx={Math.max(width, height) / 2}
//             cy={Math.max(width, height) / 2}
//             r={radius - stroke / 2}
//             fill="none"
//             stroke="#fff"
//             strokeWidth={stroke}
//             strokeDasharray={circumference}
//             strokeDashoffset={circumference * (1 - angle / 360)}
//             style={{ transition: "stroke-dashoffset 0.02s linear" }}
//           />
//         </svg>
//       )}
//     </span>
//   );
// }

const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];
const typewriterWords = ["FARM", "FIELD", "CROP"];
const heroText = "Optimize Your Farm By";
const subText = "DATA-DRIVEN DECISIONS";
const subPara = "A ONE STOP SOLUTION FOR Every Season";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDataDriven, setShowDataDriven] = useState(false);
  const [showOneStop, setShowOneStop] = useState(false);
  // Show Data Driven Decision after 2s, and One Stop Solution after 2.2s
  useEffect(() => {
    const t1 = setTimeout(() => setShowDataDriven(true), 1000);
    const t2 = setTimeout(() => setShowOneStop(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  // Typewriter effect
  // Typewriter effect for the word only
  useEffect(() => {
    let timeout;
    const word = typewriterWords[typeIndex];
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, displayed.length + 1));
      }, 100);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, 1000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, displayed.length - 1));
      }, 60);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setTypeIndex((prev) => (prev + 1) % typewriterWords.length);
        setDeleting(false);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, typeIndex]);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background slideshow */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Hero ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay text always on top */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20">
        <div className="flex items-center justify-center">
          <h5 className="text-xl md:text-xl font-medium text-white text-center drop-shadow-lg px-2 py-2 rounded-lg flex items-center">
            Optimize Your
            <span className="text-xl md:text-xl font-bold text-yellow-400 ml-2 px-2 min-w-[60px] h-[28px] flex items-center transition-all duration-300">
              <span className="inline-block">{displayed}</span>
              <span
                className="border-r-4 border-black h-[2.2em] animate-pulse inline-block align-middle"
                style={{ marginLeft: "4px" }}
              ></span>
            </span>
            By
          </h5>
        </div>
        <h3
          className={`text-2xl md:text-4xl font-bold text-white text-center drop-shadow-lg px-2 py-4 rounded-lg transition-opacity duration-1000 ${
            showDataDriven ? "opacity-100" : "opacity-0"
          }`}
        >
          DATA-DRIVEN DECISIONS
        </h3>
        <p
          className={`text-xl md:text-xl font-medium text-white text-center drop-shadow-lg px-2 py-2 rounded-lg flex items-center justify-center gap-4 transition-all duration-700 ${
            showOneStop
              ? "translate-x-0 opacity-100"
              : "-translate-x-32 opacity-0"
          }`}
        >
          A ONE STOP SOLUTION FOR Every Season
          {/* <TypewriterBorderText text="Every Season" /> */}
        </p>
      </div>
    </section>
  );
}
