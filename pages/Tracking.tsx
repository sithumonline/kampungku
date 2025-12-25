import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingStatus } from '../types';
import { WORKERS } from '../constants';
import MapTracking from '../components/MapTracking';
import Button from '../components/Button';

const Tracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking, updateBookingStatus } = useApp();

  // If status is completed, auto-redirect
  useEffect(() => {
    if (currentBooking?.status === BookingStatus.COMPLETED) {
        navigate('/completion');
    }
  }, [currentBooking, navigate]);

  // Mock data for direct access (e.g. screenshot generation)
  const displayBooking = currentBooking || {
      id: "BK-7829-23",
      serviceId: "svc-001",
      workerId: "wrk-001",
      date: "25 Dec 2025",
      time: "10:00 AM",
      address: "23, Jalan Kampung Kami, 43000",
      status: BookingStatus.ON_THE_WAY, // Default to On The Way for map view
      recipientName: "Sarah",
      totalPrice: 80
  };

  const worker = WORKERS.find(w => w.id === displayBooking.workerId) || WORKERS[0];

  // Determine view based on status
  const showMap = displayBooking.status === BookingStatus.ON_THE_WAY || displayBooking.status === BookingStatus.ARRIVED;

  return (
    <div className="flex flex-col h-screen bg-surface">
      
      {/* Map Area (Takes top half) */}
      <div className={`${showMap ? 'h-[60vh]' : 'h-[30vh]'} relative transition-all duration-500`}>
        <div className="absolute top-6 left-4 z-30">
             <button onClick={() => navigate('/')} className="bg-white p-2 rounded-full shadow-md">
                 <ArrowLeft size={20} />
             </button>
        </div>
        {/* Render Map Component */}
        <MapTracking status={displayBooking.status} />
      </div>

      {/* Bottom Sheet Info */}
      <div className="flex-1 bg-white -mt-6 rounded-t-3xl relative z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 flex flex-col">
        
        {/* Handle Bar */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

        {/* Status Text */}
        <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 font-poppins mb-1">
                {displayBooking.status}
            </h2>
            <p className="text-sm text-gray-500">
                {displayBooking.status === BookingStatus.ON_THE_WAY ? 'Worker is on the way to your location' : 'Service is being performed'}
            </p>
        </div>

        {/* Worker Card */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
            <img src={worker?.avatar} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="flex-1">
                <h3 className="font-bold text-gray-900">{worker?.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star size={14} className="text-secondary fill-secondary" />
                    <span>{worker?.rating}</span>
                    <span className="text-gray-400">• House Cleaning</span>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                    <Phone size={20} />
                </button>
                <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                    <MessageCircle size={20} />
                </button>
            </div>
        </div>

        {/* Demo Controls (To simulate worker actions from user view if needed) */}
        <div className="mt-auto space-y-2 opacity-50 hover:opacity-100 transition-opacity">
            <p className="text-[10px] text-center text-gray-400">DEMO CONTROLS (Simulate Worker)</p>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-xs py-2" onClick={() => updateBookingStatus(BookingStatus.ARRIVED)}>Sim: Arrive</Button>
                <Button variant="outline" className="text-xs py-2" onClick={() => updateBookingStatus(BookingStatus.IN_PROGRESS)}>Sim: Start</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;