// "use client";
// import { useEffect, useState } from "react";

// const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];
// const typewriterWords = ["FARM", "FIELD", "CROP"];
// export default function HeroSection() {
//   const [current, setCurrent] = useState(0);
//   const [typeIndex, setTypeIndex] = useState(0);
//   const [displayed, setDisplayed] = useState("");
//   const [deleting, setDeleting] = useState(false);
//   const [showDataDriven, setShowDataDriven] = useState(false);
//   const [showOneStop, setShowOneStop] = useState(false);
//   useEffect(() => {
//     const t1 = setTimeout(() => setShowDataDriven(true), 1000);
//     const t2 = setTimeout(() => setShowOneStop(true), 2200);
//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//     };
//   }, []);
//   useEffect(() => {
//     let timeout;
//     const word = typewriterWords[typeIndex];
//     if (!deleting && displayed.length < word.length) {
//       timeout = setTimeout(() => {
//         setDisplayed(word.slice(0, displayed.length + 1));
//       }, 100);
//     } else if (!deleting && displayed.length === word.length) {
//       timeout = setTimeout(() => {
//         setDeleting(true);
//       }, 1000);
//     } else if (deleting && displayed.length > 0) {
//       timeout = setTimeout(() => {
//         setDisplayed(word.slice(0, displayed.length - 1));
//       }, 60);
//     } else if (deleting && displayed.length === 0) {
//       timeout = setTimeout(() => {
//         setTypeIndex((prev) => (prev + 1) % typewriterWords.length);
//         setDeleting(false);
//       }, 200);
//     }
//     return () => clearTimeout(timeout);
//   }, [displayed, deleting, typeIndex]);
//   useEffect(() => {
//     images.forEach((src) => {
//       const img = new Image();
//       img.src = src;
//     });
//   }, []);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full h-screen overflow-hidden bg-black">
//       {images.map((src, index) => (
//         <img
//           key={index}
//           src={src}
//           alt={`Hero ${index + 1}`}
//           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//             index === current ? "opacity-100" : "opacity-0"
//           }`}
//         />
//       ))}
//       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20">
//         <div className="flex items-center justify-center">
//           <h5 className="text-xl md:text-xl font-medium text-white text-center drop-shadow-lg px-2 py-2 rounded-lg flex items-center">
//             Optimize Your
//             <span className="text-xl md:text-xl font-bold text-yellow-400 ml-2 px-2 min-w-[60px] h-[28px] flex items-center transition-all duration-300">
//               <span className="inline-block">{displayed}</span>
//               <span
//                 className="border-r-4 border-black h-[2.2em] animate-pulse inline-block align-middle"
//                 style={{ marginLeft: "4px" }}
//               ></span>
//             </span>
//             By
//           </h5>
//         </div>
//         <h3
//           className={`text-2xl md:text-4xl font-bold text-white text-center drop-shadow-lg px-2 py-4 rounded-lg transition-opacity duration-1000 ${
//             showDataDriven ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           DATA-DRIVEN DECISIONS
//         </h3>
//         <p
//           className={`text-xl md:text-xl font-medium text-white text-center drop-shadow-lg px-2 py-2 rounded-lg flex items-center justify-center gap-4 transition-all duration-700 ${
//             showOneStop
//               ? "translate-x-0 opacity-100"
//               : "-translate-x-32 opacity-0"
//           }`}
//         >
//           A ONE STOP SOLUTION FOR Every Season
//         </p>
//       </div>
//     </section>
//   );
// }
//  'use client';
// import { useState, useEffect } from 'react';
// import { Sprout, TrendingUp, FileCheck } from 'lucide-react';

// export default function HeroSection() {
//   const [activeCard, setActiveCard] = useState(0);


//   const cards = [
//     {
//       heading: "Contract Management",
//       subtitle: "Streamline Your Workflow",
//       features: [
//         { icon: <FileCheck className="w-5 h-5" />, text: "Digital Contract Storage" },
//         { icon: <Sprout className="w-5 h-5" />, text: "Automated Renewals" },
//         { icon: <TrendingUp className="w-5 h-5" />, text: "Compliance Tracking" }
//       ]
//     },
//     {
//       heading: "Grower Analytics",
//       subtitle: "Data Driven Insights",
//       features: [
//         { icon: <TrendingUp className="w-5 h-5" />, text: "Performance Metrics" },
//         { icon: <Sprout className="w-5 h-5" />, text: "Yield Forecasting" },
//         { icon: <FileCheck className="w-5 h-5" />, text: "Profit Analysis" }
//       ]
//     },
//     {
//       heading: "Quality Control",
//       subtitle: "Maintain High Standards",
//       features: [
//         { icon: <FileCheck className="w-5 h-5" />, text: "Soil Testing Records" },
//         { icon: <Sprout className="w-5 h-5" />, text: "Quality Certifications" },
//         { icon: <TrendingUp className="w-5 h-5" />, text: "Inspection Reports" }
//       ]
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveCard((prev) => (prev + 1) % cards.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden bg-black">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
//       >
//         <source src="https://agrierp.com/wp-content/uploads/2025/06/growers-management-video.webm" type="video/webm" />
//       </video>

//       {/* Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 min-h-screen flex items-center">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full items-center justify-between">
          
//           {/* Left Side - Text Content */}
//           <div className="text-white space-y-6 lg:space-y-8 flex-1">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
//               A Unified Platform to Streamline Grower Management Process
//             </h1>
//             <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed">
//               Simplify contract management and maximize profitability with AgriERP's powerful Grower Management software.
//             </p>
//             <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
//               Talk to Our Agent
//             </button>
//           </div>

//           {/* Right Side - Scrolling Card */}
//           <div className="relative flex items-center justify-center flex-1 max-w-md w-full">
//             <div className="relative w-full h-[450px] overflow-hidden">
//               {cards.map((card, index) => {
//                 const isActive = index === activeCard;
//                 const isNext = index === (activeCard + 1) % cards.length;
                
//                 let translateY = '100%';
//                 let opacity = 0;
//                 let display = 'block';

//                 if (isActive) {
//                   translateY = '0%';
//                   opacity = 1;
//                 } else if (isNext) {
//                   translateY = '100%';
//                   opacity = 0;
//                 } else {
//                   display = 'none';
//                 }

//                 return (
//                   <div
//                     key={index}
//                     className="absolute inset-0 transition-all duration-700 ease-in-out"
//                     style={{
//                       transform: `translateY(${translateY})`,
//                       opacity: opacity,
//                       display: display
//                     }}
//                   >
//                     <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 sm:p-8 shadow-2xl h-full flex flex-col justify-center">
//                       <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                         {card.heading}
//                       </h3>
//                       <p className="text-green-400 font-bold text-lg mb-6">
//                         {card.subtitle}
//                       </p>
                      
//                       <div className="space-y-4">
//                         {card.features.map((feature, idx) => (
//                           <div
//                             key={idx}
//                             className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/20 hover:bg-white/30 transition-all duration-300"
//                           >
//                             <div className="text-green-400 flex-shrink-0">
//                               {feature.icon}
//                             </div>
//                             <span className="text-white font-medium text-sm sm:text-base">
//                               {feature.text}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>


//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }








"use client";
import { useState, useEffect } from 'react';
import { Sprout, TrendingUp, FileCheck } from 'lucide-react';
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
    const [activeCard, setActiveCard] = useState(0);

  const slides = [
    {
      image: "https://images.pexels.com/photos/1615785/pexels-photo-1615785.jpeg",
      subtitle: "Planning & Preparation",
      title: "Pre-Season",
      description:
        "Data-driven planning, soil insights, and field mapping lay the foundation for a successful crop season.",
    },
    {
      image: "https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg",
      subtitle: "Operations & Monitoring",
      title: "In-Season",
      description:
        "Real-time monitoring and streamlined operations optimize labor, irrigation, and inputs for peak efficiency.",
    },
    {
      image: "https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg",
      subtitle: "Execution & Yield Capture",
      title: "Harvest",
      description:
        "Smart scheduling and digital yield capture ensure maximum output with minimal losses.",
    },
    {
      image: "https://images.pexels.com/photos/4394323/pexels-photo-4394323.jpeg",
      subtitle: "Storage, Logistics & Value Realization",
      title: "Post-Harvest",
      description:
        "Efficient storage, logistics, and traceability unlock full market value and buyer confidence.",
    },
  ];

  // const cards = [
  //   { icon: "📊", title: "Analytics Dashboard", description: "Real-time insights and metrics" },
  //   { icon: "👥", title: "Team Collaboration", description: "Work together seamlessly" },
  //   { icon: "☁️", title: "Cloud Storage", description: "Secure and accessible data" },
  //   { icon: "🤖", title: "AI Integration", description: "Smart automation tools" },
  // ];

  const cards = [
    {
      heading: "Pre-Season",
      subtitle: "Planning & Preparation",
      features: [
        { icon: <FileCheck className="w-5 h-5" />, text: "Data Driven Planning" },
        { icon: <Sprout className="w-5 h-5" />, text: "Soil Insights" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "Field Mapping" }
      ]
    },
    {
      heading: "In-Season",
      subtitle: "Operations & Monitoring",
      features: [
        { icon: <TrendingUp className="w-5 h-5" />, text: "Real Time Monitering" },
        { icon: <Sprout className="w-5 h-5" />, text: "Streamlined Operations" },
        { icon: <FileCheck className="w-5 h-5" />, text: "Irrigation" }
      ]
    },
    {
      heading: "Harvest",
      subtitle: "Execution & Yield Capture",
      features: [
        { icon: <FileCheck className="w-5 h-5" />, text: "Smart Scheduling" },
        { icon: <Sprout className="w-5 h-5" />, text: "Digital Yield Capture" },
        { icon: <TrendingUp className="w-5 h-5" />, text: "Field " }
      ]
    },
    {
      heading: "Post-Harvest",
      subtitle: "Storage, Logistics & Value Realization",
      features: [
        { icon: <TrendingUp className="w-5 h-5" />, text: "Efficient Storage" },
        { icon: <Sprout className="w-5 h-5" />, text: "Logistics" },
        { icon: <FileCheck className="w-5 h-5" />, text: "Profit Analysis" }
      ]
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full overflow-hidden bg-[#183c36] text-white">
      {/* Background slider */}
      <div className="absolute inset-0">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === (currentIndex - 1 + slides.length) % slides.length;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "translate-x-0 z-20"
                  : isPrev
                  ? "-translate-x-full opacity-0 z-10"
                  : "translate-x-full opacity-0 z-10"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#183c36]/70"></div>
            </div>
          );
        })}
      </div>

      {/* Foreground Content */}
      <div className="relative z-30 max-w-7xl mx-auto py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side - Text with animation */}
        <div className="relative h-full overflow-hidden flex flex-col justify-center">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-700 ease-in-out max-w-xl ${
                idx === currentIndex
                  ? "opacity-100 translate-y-0"
                  : idx === (currentIndex - 1 + slides.length) % slides.length
                  ? "opacity-0 -translate-y-full"
                  : "opacity-0 translate-y-full"
              }`}
            >
              <h5 className="text-teal-200 text-sm font-semibold uppercase tracking-wider mb-2">
                {slide.subtitle}
              </h5>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {slide.title}
              </h2>
              <p className="text-gray-200 leading-relaxed">{slide.description}</p>
            </div>
          ))}
        </div>

        {/* Right Side - Vertical Scrolling Cards */}
        {/* <div className="relative h-64 overflow-hidden">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-700 ease-in-out ${
                idx === currentIndex
                  ? "opacity-100 translate-y-0"
                  : idx === (currentIndex - 1 + cards.length) % cards.length
                  ? "opacity-0 -translate-y-full"
                  : "opacity-0 translate-y-full"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl max-w-sm w-full">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-5xl">{card.icon}</div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="text-teal-200">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="relative flex items-center justify-center flex-1 max-w-md w-full md:ml-25">
            <div className="relative w-full h-125 overflow-hidden">
              {cards.map((card, index) => {
                const isActive = index === activeCard;
                const isNext = index === (activeCard + 1) % cards.length;
                
                let translateY = '100%';
                let opacity = 0;
                let display = 'block';

                if (isActive) {
                  translateY = '0%';
                  opacity = 1;
                } else if (isNext) {
                  translateY = '100%';
                  opacity = 0;
                } else {
                  display = 'none';
                }

                return (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                      transform: `translateY(${translateY})`,
                      opacity: opacity,
                      display: display
                    }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 sm:p-8 shadow-2xl h-full flex flex-col justify-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {card.heading}
                      </h3>
                      <p className="text-green-400 font-bold text-lg mb-6">
                        {card.subtitle}
                      </p>
                      
                      <div className="space-y-4">
                        {card.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border border-white/20 hover:bg-white/30 transition-all duration-300"
                          >
                            <div className="text-green-400 flex-shrink-0">
                              {feature.icon}
                            </div>
                            <span className="text-white font-medium text-sm sm:text-base">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

      </div>
    </div>
  );
}
