import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
<nav class="border-gray-200 bg-[#f7f7f7]">
  <div class=" flex flex-wrap items-center justify-between p-4">
    <Image
          src="/logo2.jpg"
          alt="Logo"
          width={220} // you must provide width
          height={20} // and height
          className="object-contain"
        />
    <div class="w-auto flex items-center" id="navbar-default">
      <ul class="font-medium mt-4 space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white dark:border-gray-700">
        <li>
          <Link href="/" class="block py-2 px-3 text-black rounded-sm">Sign Out</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
}
export default Header;