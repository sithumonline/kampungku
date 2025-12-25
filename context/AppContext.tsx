import React, { createContext, useContext, useState } from 'react';
import { Booking, BookingStatus } from '../types';

interface AppContextType {
  currentBooking: Booking | null;
  setCurrentBooking: (booking: Booking | null) => void;
  updateBookingStatus: (status: BookingStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const updateBookingStatus = (status: BookingStatus) => {
    if (currentBooking) {
      setCurrentBooking({ ...currentBooking, status });
    }
  };

  return (
    <AppContext.Provider value={{ currentBooking, setCurrentBooking, updateBookingStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};