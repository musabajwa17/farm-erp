"use client"; 
import { useEffect, useState } from "react";
// import { MdMap } from "react-icons/md";
import { FaRobot, FaLandmark } from "react-icons/fa";
import { FileText, LogOut, LogIn, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile: Toggle Button */}
      <button
        className="lg:hidden fixed top-4 right-2 z-50 text-2xl py-2 px-3 bg-green-600 text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SlideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
}

function SlideBar({ sidebarOpen, setSidebarOpen }) {
  const [loginuser, setLoginuser] = useState(null);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[280px] bg-gradient-to-b from-white to-gray-50 shadow-xl z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:flex lg:flex-col
        `}
      >
        {/* Close Button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center py-8 px-6 border-b border-gray-100 bg-white">
          <Image src="/erplogo.png" alt="ERP Logo" width={220} height={50} />
        </div>

        {/* User Info */}
        {loginuser && (
          <div className="px-4 py-4 mx-4 mt-4 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 rounded-xl border border-emerald-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-semibold">
                {loginuser.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold">{loginuser.username}</p>
                <p className="text-xs text-emerald-600">{loginuser.email}</p>
              </div>
            </div>
          </div>
        )}

        <SidebarContent setSidebarOpen={setSidebarOpen} />
      </aside>
    </>
  );
}

function SidebarContent({ setSidebarOpen }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;

  return (
    <div className="flex flex-col h-full justify-between mt-4">
      <div className="p-4 mt-2">
        <nav className="space-y-1">
          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Main Menu
          </div>

          <NavLink
            href="/fields/"
            icon={<FaLandmark />}
            text="My Fields"
            onClick={() => setSidebarOpen(false)}
          />
          <NavLink
            href="/fieldmapping"
            // icon={<MdMap />}
            text="Field Mapping"
            onClick={() => setSidebarOpen(false)}
          />
          <NavLink
            href="/soilhealth/"
            icon={<FaRobot />}
            text="Soil Health"
            onClick={() => setSidebarOpen(false)}
          />
          <NavLink
            href="/contractmapping/"
            icon={<FileText size={18} />}
            text="Contract Mapping"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="py-2 border-t border-gray-200" />

          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Account
          </div>

          {token ? (
            <NavLink
              href="/"
              icon={<LogOut size={18} />}
              text="Logout"
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                setSidebarOpen(false);
              }}
            />
          ) : (
            <NavLink
              href="/login"
              icon={<LogIn size={18} />}
              text="Login"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </nav>
      </div>
    </div>
  );
}

function NavLink({ href, icon, text, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white hover:bg-green-600 transition-all"
    >
      <span>{icon}</span>
      <span className="font-semibold text-sm">{text}</span>
    </Link>
  );
}
