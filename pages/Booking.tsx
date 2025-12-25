import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { SERVICES } from '../constants';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const BookingForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [address, setAddress] = useState('123 Kampung Kami, 43000');
  const [notes, setNotes] = useState('');

  if (!service) return null;

  const timeSlots = ['08:00', '10:00', '14:00', '16:00'];

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }
    // Pass data via state location or URL params. For simplicity, we use URL params in prototype.
    // In real app, use Context or Redux store for complex forms.
    const bookingData = {
        date: selectedDate,
        time: selectedTime,
        address,
        notes
    };
    // Saving to session storage for easy retrieval in next step without URL clutter
    sessionStorage.setItem('tempBooking', JSON.stringify(bookingData));
    navigate(`/payment/${id}`);
  };

  return (
    <div className="p-4 pt-8 bg-surface min-h-screen flex flex-col">
       {/* Header */}
       <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold ml-2 font-poppins">Schedule Service</h1>
      </div>

      {/* Service Summary */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
        <img src={service.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
        <div>
            <h3 className="font-semibold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.duration} • RM {service.price}</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {/* Date Selection */}
        <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Select Date
            </h3>
            <input 
                type="date" 
                className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:border-primary outline-none"
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
        </div>

        {/* Time Selection */}
        <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Select Time Slot
            </h3>
            <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                    <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                            selectedTime === slot 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                        }`}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>

        {/* Address */}
        <div>
             <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
             <textarea 
                className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:border-primary outline-none text-sm"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
             />
        </div>

        {/* Notes */}
        <div>
             <h3 className="font-semibold text-gray-900 mb-3">Special Instructions</h3>
             <textarea 
                placeholder="e.g. Please bring extra mop"
                className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:border-primary outline-none text-sm"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
             />
        </div>
      </div>

      <div className="mt-8">
        <Button fullWidth onClick={handleContinue} disabled={!selectedDate || !selectedTime}>
            Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;