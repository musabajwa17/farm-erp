'use client'

import { useState } from 'react'
import { 
  Tractor, 
  DollarSign, 
  Wheat, 
  Package, 
  Handshake, 
  Truck,
  Settings,
  Users,
  BarChart3,
  ClipboardCheck,
  CreditCard,
  TrendingUp,
  Receipt,
  FileText,
  Sprout,
  Search,
  Zap,
  Satellite,
  TestTube,
  Wrench,
  Bell,
  Briefcase,
  UserCheck,
  Coins,
  PackageOpen,
  MapPin,
  Clock
} from 'lucide-react'
import { motion } from "framer-motion";
import Image from 'next/image';
const FarmSolutions = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [openDropdown, setOpenDropdown] = useState(null)

  const tabContent = {
    0: {
      title: "Farm Operations Management",
      description: "Manage everything job planning, scheduling and work order management.",
      image: "https://images.pexels.com/photos/2889442/pexels-photo-2889442.jpeg",
      features: [
        { icon: Settings, text: "Resource Management" },
        { icon: Users, text: "Labor Management" },
        { icon: BarChart3, text: "Marketing and Sales" },
        { icon: ClipboardCheck, text: "Regulatory Compliance" }
      ]
    },
    1: {
      title: "Farm Financial Management",
      description: "Complete financial oversight with budgeting, expense tracking and profit analysis",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: CreditCard, text: "Budget Planning" },
        { icon: TrendingUp, text: "Profit Analysis" },
        { icon: Receipt, text: "Expense Tracking" },
        { icon: FileText, text: "Financial Reports" }
      ]
    },
    2: {
      title: "Crop Management Software",
      description: "Advanced crop planning, monitoring, and yield optimization.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: Sprout, text: "Crop Planning" },
        { icon: Search, text: "Growth Monitoring" },
        { icon: Zap, text: "Yield Optimization" },
        { icon: Satellite, text: "Precision Agriculture" }
      ]
    },
    3: {
      title: "Farm Inventory Management",
      description: "Track seeds, fertilizers and equipment with automated inventory control and alerts.",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: Sprout, text: "Seed Tracking" },
        { icon: TestTube, text: "Fertilizer Management" },
        { icon: Wrench, text: "Equipment Tracking" },
        { icon: Bell, text: "Automated Alerts" }
      ]
    },
    4: {
      title: "Sales and Contracting",
      description: "Streamline sales processes, contract management, and customer relationships",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: Briefcase, text: "Sales Pipeline" },
        { icon: Zap, text: "Contract Management" },
        { icon: UserCheck, text: "Customer Relations" },
        { icon: Coins, text: "Revenue Tracking" }
      ]
    },
    5: {
      title: "Farm Shipping & Packing Management",
      description: "Efficient logistics, packaging, and distribution management for your agricultural products.",
      image: "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      features: [
        { icon: PackageOpen, text: "Package Management" },
        { icon: Truck, text: "Logistics Tracking" },
        { icon: MapPin, text: "Distribution Routes" },
        { icon: Clock, text: "Delivery Scheduling" }
      ]
    }
  }

  const tabs = [
    { icon: Tractor, title: "Farm\nOperations\nManagement" },
    { icon: DollarSign, title: "Farm\nFinancial\nManagement" },
    { icon: Wheat, title: "Crop\nManagement\nSoftware" },
    { icon: Package, title: "Farm\nInventory\nManagement" },
    { icon: Handshake, title: "Sales and\nContracting" },
    { icon: Truck, title: "Farm Shipping &\nPacking\nManagement" }
  ]

  const currentContent = tabContent[activeTab]

  const getFeatureDescription = (featureText) => {
    const descriptions = {
      "Resource Management": "Efficiently allocate and track farm resources including equipment, tools, and materials across all operations.",
      "Labor Management": "Optimize workforce scheduling, track productivity, and manage payroll for seasonal and permanent staff.",
      "Marketing and Sales": "Develop strategic marketing campaigns and manage sales channels to maximize revenue potential.",
      "Regulatory Compliance": "Stay compliant with agricultural regulations, certifications, and reporting requirements.",
      "Budget Planning": "Create comprehensive budgets with seasonal adjustments and expense forecasting.",
      "Profit Analysis": "Analyze profitability by crop, field, and operation to optimize financial performance.",
      "Expense Tracking": "Monitor all farm expenses with categorization and automated reporting.",
      "Financial Reports": "Generate detailed financial reports for stakeholders and tax preparation.",
      "Crop Planning": "Plan crop rotations, planting schedules, and field management strategies.",
      "Growth Monitoring": "Track crop development stages with real-time monitoring and alerts.",
      "Yield Optimization": "Use data analytics to maximize crop yields and quality.",
      "Precision Agriculture": "Implement GPS-guided farming and variable rate applications.",
      "Seed Tracking": "Monitor seed inventory, varieties, and planting records.",
      "Fertilizer Management": "Track fertilizer application rates, timing, and effectiveness.",
      "Equipment Tracking": "Monitor equipment usage, maintenance schedules, and costs.",
      "Automated Alerts": "Receive notifications for low inventory, maintenance due, and critical updates.",
      "Sales Pipeline": "Manage customer relationships and track sales opportunities.",
      "Contract Management": "Create, manage, and track agricultural contracts and agreements.",
      "Customer Relations": "Maintain customer database with purchase history and preferences.",
      "Revenue Tracking": "Monitor revenue streams and payment status across all sales.",
      "Package Management": "Organize packaging operations with labeling and quality control.",
      "Logistics Tracking": "Track shipments and delivery status in real-time.",
      "Distribution Routes": "Optimize delivery routes for efficiency and cost reduction.",
      "Delivery Scheduling": "Schedule deliveries and coordinate with customers and carriers."
    }
    return descriptions[featureText] || "Comprehensive management solution designed to streamline your agricultural operations."
  }

  return (
    <div className="min-h-screen bg-white">
    <div className=" text-black mt-15 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.h1
        className="text-base md:text-2xl font-bold mb-2 text-center text-black"
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
      </div>
      {/* Navigation */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <nav className="bg-[#f4f7f9] shadow-xl relative z-10 rounded-sm">
          <div className="max-w-7xl mx-auto py-4 px-5">
            <div className="flex flex-wrap">
              {tabs.map((tab, index) => {
                const IconComponent = tab.icon
                return (
                  <div 
                    key={index} 
                    className={`flex-1 min-w-[120px] sm:min-w-[150px] lg:min-w-0 relative p-1 ${
                      activeTab === index ? '' : ''
                    }`}
                  >
                    <button
                      onClick={() => setActiveTab(index)}
                      className={`w-full px-2 sm:px-4 py-4 sm:py-6 text-center transition-all duration-300 flex flex-col items-center gap-2 min-h-[80px] sm:min-h-[100px] rounded-lg ${
                        activeTab === index 
                          ? 'bg-[#183c36] text-white shadow-lg' 
                          : 'text-[#787d7d] hover:bg-gray-100'
                      }`}
                    >
                      {/* <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" /> */}
                      <div className="text-sm sm:text-lg font-semibold leading-tight">
                        {tab.title.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Content - Dropdowns */}
          <div className="order-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 leading-tight text-gray-800 text-center lg:text-left">
              {currentContent.title}
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed mb-8 sm:mb-12 text-gray-600 text-center lg:text-left">
              {currentContent.description}
            </p>
            
            {/* Dropdown Feature List */}
            <div className="space-y-2">
              {currentContent.features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-gray-800 hover:bg-gray-100 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-base sm:text-lg font-semibold">
                          {feature.text}
                        </span>
                      </div>
                      <div className="text-xl font-bold transition-transform duration-300 text-gray-500">
                        {openDropdown === index ? '−' : '+'}
                      </div>
                    </button>
                    
                    {openDropdown === index && (
                      <div className="px-4 pb-4 text-gray-600 animate-in slide-in-from-top-2 duration-300">
                        <div className="pl-14">
                          <p className="text-sm sm:text-base leading-relaxed">
                            {getFeatureDescription(feature.text)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="flex justify-center items-start order-2">
            <div className="relative w-full">
              <Image
                src={currentContent.image}
                alt={`${currentContent.title} Image`}
                width={600}
                height={500}
                className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FarmSolutions
