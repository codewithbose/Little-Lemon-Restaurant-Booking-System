import React from 'react';
import { Header } from './components/Header';
import { BookingForm } from './components/BookingForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white text-center">
                  Book Your Table
                </h2>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-8 text-center">
                Reserve your spot at Little Lemon for an unforgettable dining experience. 
                Please note that reservations are required for parties of 6 or more.
              </p>
              
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;