import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinOff, Settings } from 'lucide-react';
import Button from '../components/Button';

const TrackingError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center text-center">
      
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPinOff size={64} className="text-gray-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-red-100 p-2 rounded-full border-4 border-white">
            <Settings size={24} className="text-red-500" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-3">Location Access Required</h1>
      
      <p className="text-gray-500 mb-8 max-w-xs mx-auto">
        To track your service worker in real-time, please enable location permissions for KampungKu.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg mb-8 text-left w-full">
        <h3 className="font-semibold text-blue-800 text-sm mb-1">Why we need this?</h3>
        <p className="text-blue-600 text-xs">
            We use your location to show how far the worker is from your house and provide accurate ETA updates.
        </p>
      </div>

      <div className="w-full space-y-3">
        <Button fullWidth onClick={() => {}}>
            Open Settings
        </Button>
        <Button fullWidth variant="secondary" onClick={() => navigate('/tracking')}>
            Continue Without Map
        </Button>
      </div>
    </div>
  );
};

export default TrackingError;
