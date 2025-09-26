import { Mail, MapPin, Linkedin, Globe, ArrowRight } from "lucide-react";
export default function HeaderContext() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between bg-[#183c36] py-3 px-4 sm:px-10 md:px-20 lg:px-32 shadow gap-3 sm:gap-0">
      <div className="flex flex-row items-center justify-around gap-2 sm:gap-10 w-full sm:w-auto">
        <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-0 cursor-pointer">
          <Mail size={18} className="text-white" />
          <span className="text-[10px] sm:text-sm font-medium text-white">
            contact@escan-systems.com
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-0 cursor-pointer">
          <MapPin size={18} className="text-white" />
          <span className="text-[10px] sm:text-sm font-medium text-white">
            Australia Victoria
          </span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4 sm:gap-15 mt-3 sm:mt-0">
        <div className="flex items-center gap-2 sm:gap-5">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-white flex items-center gap-2 hover:opacity-80"
          >
            <Linkedin size={18} className="text-white" />
          </a>
          <Globe size={18} className="text-white cursor-pointer mt-1" />
        </div>
        <div>
          <button className="cursor-pointer bg-[#183c36] text-white px-3 sm:px-5 py-2 border-2 font-semibold shadow transition-all duration-200 flex items-center gap-2 hover:underline hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
            Get a Quote
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
