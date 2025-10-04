"use client";
import { useState, useEffect } from "react";
import {
  FileText,
  User,
  Map,
  Calendar,
  ClipboardList,
  DollarSign,
  Tag,
  Clock,
} from "lucide-react";
import Sidebar from "../../components/sidebar/Sidebar";
import ProtectedPage from "../../components/contact/ProtectedPage/AuthorizedPage";

export default function FarmingForm() {
  const [formData, setFormData] = useState({
    farmerName: "",
    contractorName: "",
    area: "",
    fieldName: "",
    money: "",
    startingDate: "",
    contractTime: "",
  });

  const [contracts, setContracts] = useState([]);

  // Load contracts
  useEffect(() => {
    const savedContracts = localStorage.getItem("contracts");
    if (savedContracts) {
      setContracts(JSON.parse(savedContracts));
    }
  }, []);

  // Save contracts
  useEffect(() => {
    if (contracts.length > 0) {
      localStorage.setItem("contracts", JSON.stringify(contracts));
    }
  }, [contracts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContracts((prev) => [...prev, formData]);
    alert("Contract saved successfully!");
    setFormData({
      farmerName: "",
      contractorName: "",
      area: "",
      fieldName: "",
      money: "",
      startingDate: "",
      contractTime: "",
    });
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none bg-white";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <ProtectedPage>
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-blue-50 to-gray-50 flex flex-col lg:flex-row items-start gap-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Wrapper (Form + Contracts) */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4">
        {/* Left: Farming Contract Form */}
        <div className="flex-1 max-w-3xl mx-auto lg:mx-0">
          {/* Header */}
          <div className="bg-white rounded-t-2xl shadow-sm border-b border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Farming Contract
              </h1>
            </div>
            <p className="text-gray-600 ml-12 text-sm md:text-base">
              Create and manage your agricultural contracts efficiently
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-b-2xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Farmer Name */}
              <div>
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" /> Farmer Name
                  </div>
                </label>
                <input
                  type="text"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  placeholder="Enter farmer's name"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Contractor Name */}
              <div>
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" /> Contractor Name
                  </div>
                </label>
                <input
                  type="text"
                  name="contractorName"
                  value={formData.contractorName}
                  onChange={handleChange}
                  placeholder="Enter contractor's name"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Area */}
              <div>
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-purple-600" /> Area
                  </div>
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter land area"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Field Name */}
              <div>
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-yellow-600" /> Field Name
                  </div>
                </label>
                <input
                  type="text"
                  name="fieldName"
                  value={formData.fieldName}
                  onChange={handleChange}
                  placeholder="Enter field name"
                  className={inputClasses}
                />
              </div>

              {/* Money */}
              <div>
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" /> Money
                  </div>
                </label>
                <input
                  type="number"
                  name="money"
                  value={formData.money}
                  onChange={handleChange}
                  placeholder="Enter contract amount"
                  className={inputClasses}
                  required
                />
              </div>

              {/* Starting Date */}
              <div>
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-600" /> Starting Date
                  </div>
                </label>
                <input
                  type="date"
                  name="startingDate"
                  value={formData.startingDate}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              {/* Contract Time */}
              <div className="md:col-span-2">
                <label className={labelClasses}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" /> Contract Time
                  </div>
                </label>
                <input
                  type="text"
                  name="contractTime"
                  value={formData.contractTime}
                  onChange={handleChange}
                  placeholder="e.g. 1 year, 6 months"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Save Contract
              </button>
            </div>
          </div>
        </div>

        {/* Right: Contracts List */}
        <div className="w-full lg:w-[380px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-6 h-fit mx-auto lg:mx-0">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="p-2 bg-green-100 rounded-lg">
              <ClipboardList className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Saved Contracts
            </h2>
          </div>

          {contracts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <ClipboardList className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm font-medium">
                No contracts saved yet
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Your contracts will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {contracts.map((c, idx) => (
                <div
                  key={idx}
                  className="relative p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-green-300 transition-all duration-200 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-gray-900 mb-1">
                        {c.farmerName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">→</span>
                        <span>{c.contractorName}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <span className="text-xs font-bold text-green-600">
                        #{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-700 font-medium">
                        {c.fieldName}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{c.area}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">{c.startingDate}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{c.contractTime}</span>
                    </div>
                  </div>

                  {/* Money Badge */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <span className="text-base">💰</span>
                      <span className="text-green-700 font-bold text-base">
                        {c.money} PKR
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedPage>
  );
}
