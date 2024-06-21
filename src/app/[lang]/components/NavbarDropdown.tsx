import { useState } from 'react';
import Link from 'next/link';

interface DropdownProps {
  links: Array<{ id: number, url: string, text: string }>;
}

function Dropdown({ links }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-sm text-nav-label font-light"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Menu
      </button>
      {isDropdownOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-300 ${
              isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transformOrigin: 'top right' }}
          >
            <div className="py-2">
              {links.map(link => (
                <Link key={link.id} href={link.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          <div
            className="fixed inset-0"
            onClick={() => setIsDropdownOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
