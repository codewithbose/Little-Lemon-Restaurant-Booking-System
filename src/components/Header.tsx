import React from 'react';
import { Lemon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lemon className="h-8 w-8 text-yellow-500" aria-hidden="true" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Little Lemon</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500 transition">Menu</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500 transition">About</a>
              </li>
              <li>
                <a href="#" className="text-yellow-500 font-semibold">Reservations</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-500 transition">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}