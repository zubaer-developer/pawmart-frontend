import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto relative">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-2xl">
                🐾
              </div>
              <span className="text-2xl font-bold">PawMart</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting pet lovers since 2023. Find your perfect companion or
              quality pet supplies.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                📘
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                🐦
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                📷
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                ▶️
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/pets-and-supplies"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Pets & Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/Pets"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  🐕 Pets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Food"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  🍖 Pet Food
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Accessories"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  🎾 Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Care Products"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  💊 Care Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span>📍</span>
                <span>123 Pet Street, Dhanmondi, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📧</span>
                <span>support@pawmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 PawMart. Made with ❤️ for pets.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
