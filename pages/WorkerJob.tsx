import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, Play, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingStatus, Booking } from '../types';
import Button from '../components/Button';
import { SERVICES } from '../constants';

const WorkerJob: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking, updateBookingStatus } = useApp();

  // Mock booking if none exists for demo purposes
  const displayBooking = currentBooking || {
      id: "DEMO-123",
      serviceId: "svc-001",
      workerId: "wrk-001",
      status: BookingStatus.PENDING,
      recipientName: "Puan Fatimah",
      address: "23, Jalan Kampung Kami, 43000",
      time: "10:00 AM",
      date: "Today"
  } as Booking;

  const service = SERVICES.find(s => s.id === displayBooking.serviceId) || SERVICES[0];

  const handleStart = () => {
    updateBookingStatus(BookingStatus.ON_THE_WAY);
    navigate('/tracking'); // Go to map from worker perspective (shared view for prototype)
  };

  return (
    <div className="p-4 pt-8 bg-surface min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-poppins">Your Active Job</h1>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="font-bold text-lg text-gray-900">{service.name}</h2>
                <span className="text-sm text-gray-500">#{displayBooking.id}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                ${displayBooking.status === BookingStatus.PENDING ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                {displayBooking.status}
            </span>
        </div>

        <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
                <User className="text-gray-400" size={18} />
                <span className="text-gray-700 font-medium">{displayBooking.recipientName}</span>
            </div>
            <div className="flex items-center gap-3">
                <MapPin className="text-gray-400" size={18} />
                <span className="text-gray-700 text-sm">{displayBooking.address}</span>
            </div>
            <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={18} />
                <span className="text-gray-700 text-sm">+60 12-345 6789</span>
            </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 italic border-l-2 border-gray-300">
            "Please bring extra mop."
        </div>
      </div>

      <div className="space-y-3">
        {displayBooking.status === BookingStatus.PENDING && (
            <Button fullWidth onClick={handleStart} className="flex items-center justify-center gap-2">
                <Play size={18} /> Start Job - On the Way
            </Button>
        )}
        
        {displayBooking.status === BookingStatus.ON_THE_WAY && (
             <Button fullWidth onClick={() => updateBookingStatus(BookingStatus.ARRIVED)}>
                Mark as Arrived
            </Button>
        )}
        
        {displayBooking.status === BookingStatus.ARRIVED && (
             <Button fullWidth onClick={() => updateBookingStatus(BookingStatus.IN_PROGRESS)}>
                Start Service
            </Button>
        )}

        {displayBooking.status === BookingStatus.IN_PROGRESS && (
             <Button fullWidth onClick={() => {
                 updateBookingStatus(BookingStatus.COMPLETED);
                 navigate('/completion');
             }}>
                <CheckCircle size={18} className="mr-2" /> Complete Job
            </Button>
        )}
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-6">Worker View Mode</p>
    </div>
  );
};

export default WorkerJob;