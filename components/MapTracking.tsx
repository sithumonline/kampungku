import React, { useEffect, useState } from 'react';
import { BookingStatus } from '../types';

interface MapTrackingProps {
  status: BookingStatus;
}

const MapTracking: React.FC<MapTrackingProps> = ({ status }) => {
  const [progress, setProgress] = useState(10);

  // Simulate movement
  useEffect(() => {
    if (status !== BookingStatus.ON_THE_WAY) {
        if (status === BookingStatus.ARRIVED || status === BookingStatus.IN_PROGRESS) setProgress(90);
        return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90;
        return prev + 0.5; // Slow movement
      });
    }, 100); // Fast updates for smoothness

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="relative w-full h-full bg-gray-200 overflow-hidden rounded-xl">
      {/* Fake Map Background */}
      <div 
        className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Map_of_Kuala_Lumpur%2C_Malaysia.png/640px-Map_of_Kuala_Lumpur%2C_Malaysia.png')] bg-cover bg-center"
        style={{ filter: 'grayscale(0.5)' }}
      ></div>

      {/* Route Line (Simple CSS Svg) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#2E7D32" strokeWidth="4" strokeDasharray="10,5" />
      </svg>

      {/* Destination (User House) */}
      <div className="absolute bottom-[20%] right-[10%] transform translate-x-1/2 translate-y-1/2 flex flex-col items-center">
         <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg z-10">
            <span className="text-white text-xs">🏠</span>
         </div>
         <span className="text-xs font-bold bg-white px-1 rounded shadow mt-1">You</span>
      </div>

      {/* Worker Marker (Moving) */}
      <div 
        className="absolute transition-all duration-300 ease-linear z-20 flex flex-col items-center"
        style={{ 
            left: `${10 + (progress * 0.8)}%`, // Interpolate between 10% and 90%
            top: `${20 + (progress * 0.6)}%` 
        }}
      >
        <div className="w-10 h-10 bg-white rounded-full border-2 border-primary p-0.5 shadow-xl relative">
            <img src="https://picsum.photos/100/100?random=10" className="w-full h-full rounded-full object-cover" alt="Worker" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow text-[10px] font-bold mt-1">
             {status === BookingStatus.ON_THE_WAY ? '8 mins away' : 'Arrived'}
        </div>
      </div>
      
      {/* Simulation Controls for Demo */}
      <div className="absolute top-2 right-2">
          <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded">Simulated GPS</span>
      </div>
    </div>
  );
};

export default MapTracking;