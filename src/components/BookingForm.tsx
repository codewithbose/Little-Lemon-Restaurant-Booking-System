import React from 'react';
import { z } from 'zod';
import { Calendar, Clock, Users } from 'lucide-react';

const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.number().min(1, "At least 1 guest required").max(10, "Maximum 10 guests allowed"),
  occasion: z.string().optional(),
  specialRequests: z.string().max(500, "Special requests limited to 500 characters").optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const [formData, setFormData] = React.useState<BookingFormData>({
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    specialRequests: ''
  });

  const [errors, setErrors] = React.useState<Partial<BookingFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      bookingSchema.parse(formData);
      // Handle successful booking
      console.log('Booking submitted:', formData);
      alert('Booking successful! We look forward to serving you.');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0] as keyof BookingFormData;
          acc[path] = curr.message;
          return acc;
        }, {} as Partial<BookingFormData>);
        setErrors(formattedErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 0 : value
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Booking form">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
            aria-required="true"
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && (
            <p id="date-error" className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
            aria-required="true"
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "time-error" : undefined}
          >
            <option value="">Select a time</option>
            {Array.from({ length: 8 }, (_, i) => i + 12).map(hour => (
              <option key={hour} value={`${hour}:00`}>{hour}:00</option>
            ))}
          </select>
          {errors.time && (
            <p id="time-error" className="mt-1 text-sm text-red-600">{errors.time}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
          Number of Guests <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            required
            aria-required="true"
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? "guests-error" : undefined}
          />
          {errors.guests && (
            <p id="guests-error" className="mt-1 text-sm text-red-600">{errors.guests}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">
          Occasion
        </label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        >
          <option value="">Select an occasion</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
          Special Requests
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          placeholder="Any dietary restrictions or special requirements?"
          aria-invalid={!!errors.specialRequests}
          aria-describedby={errors.specialRequests ? "specialRequests-error" : undefined}
        />
        {errors.specialRequests && (
          <p id="specialRequests-error" className="mt-1 text-sm text-red-600">{errors.specialRequests}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
      >
        Reserve Table
      </button>
    </form>
  );
}