import { Leaf, Megaphone, LogOut } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-[#134e5ee6] to-[#71C9CE] text-white shadow-md">
      <div className="container mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex items-center mb-4 lg:mb-0">
          <Leaf className="h-10 w-10 text-white" />
          <div className="ml-3 flex flex-col">
            <span className="text-2xl font-bold">Hariyo Paila</span>
            <span className="text-sm italic opacity-80">
              Taking One Green Step Ahead At A Time
            </span>
          </div>
        </div>
        <nav className="hidden lg:flex space-x-6">
          <a
            href="#how-it-works"
            className="text-white hover:text-[#71C9CE] transition duration-300"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-white hover:text-[#71C9CE] transition duration-300"
          >
            Benefits
          </a>
          <a
            href="#testimonials"
            className="text-white hover:text-[#71C9CE] transition duration-300"
          >
            Testimonials
          </a>
          <a
            href="#partners"
            className="text-white hover:text-[#71C9CE] transition duration-300"
          >
            Partners
          </a>
        </nav>
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <a
            href="#"
            className="bg-[#060621] text-white px-4 py-2 rounded-md hover:bg-[#71C9CE] hover:text-white transition duration-300 flex items-center"
          >
            <Megaphone className="h-5 w-5 mr-2" />
            Announce Donation
          </a>
          <a
            href="#"
            className="bg-[#060621] text-white px-4 py-2 rounded-md hover:bg-[#FF8E8E] transition duration-300 flex items-center"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
