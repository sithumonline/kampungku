import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES, WORKERS } from '../constants';
import Button from '../components/Button';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking } = useApp();

  // Mock data for direct access (e.g. screenshot generation)
  const displayBooking = currentBooking || {
      id: "BK-7829-23",
      serviceId: "svc-001",
      workerId: "wrk-001",
      date: "25 Dec 2025",
      time: "10:00 AM",
      address: "23, Jalan Kampung Kami, 43000",
      status: "Confirmed",
      recipientName: "Sarah",
      totalPrice: 80
  };

  const service = SERVICES.find(s => s.id === displayBooking.serviceId) || SERVICES[0];
  const worker = WORKERS.find(w => w.id === displayBooking.workerId) || WORKERS[0];

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center text-center">
      <div className="mb-6 animate-bounce">
        <CheckCircle size={80} className="text-primary" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Booking Confirmed!</h1>
      <p className="text-gray-500 mb-8">Ref: {displayBooking.id}</p>

      <div className="w-full bg-gray-50 rounded-2xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">{service?.name}</h3>
        
        <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} className="text-primary" />
                <span>{displayBooking.date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock size={18} className="text-primary" />
                <span>{displayBooking.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-primary" />
                <span className="truncate">{displayBooking.address}</span>
            </div>
        </div>

        <div className="mt-6 pt-4 border-t flex items-center gap-3">
            <img src={worker?.avatar} alt="" className="w-10 h-10 rounded-full" />
            <div>
                <p className="text-xs text-gray-500">Service Provider</p>
                <p className="text-sm font-semibold">{worker?.name}</p>
            </div>
        </div>
      </div>

      <div className="w-full space-y-3">
        <Button fullWidth onClick={() => navigate('/tracking')}>
            Track Service
        </Button>
        <Button fullWidth variant="secondary" onClick={() => navigate('/')}>
            Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;