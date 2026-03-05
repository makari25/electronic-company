import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // mt-20 adds spacing above the footer so it doesn't touch the content immediately
    <footer className="mt-20 bg-gray-900 text-gray-400 py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Layout: 4 columns on desktop, stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Socials */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-3">DashboardApp</h3>
            <p className="text-sm mb-4 leading-relaxed">
              Intelligent data management for modern businesses.
            </p>
            <div className="flex gap-3">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Github} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-indigo-500 shrink-0" /> Nairobi, Kenya
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-indigo-500 shrink-0" /> +254 700 000000
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-indigo-500 shrink-0" /> support@example.com
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm mb-3">Get the latest updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          <p>&copy; {currentYear} DashboardApp. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon }) {
  return (
    <a href="#" className="text-gray-500 hover:text-white transition-colors">
      <Icon size={18} />
    </a>
  );
}