import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Landmark } from 'lucide-react';
import { SERVICES, WORKERS } from '../constants';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { BookingStatus } from '../types';

const Payment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentBooking } = useApp();
  const service = SERVICES.find(s => s.id === id);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');

  if (!service) return null;

  // Retrieve temp data
  const tempBookingStr = sessionStorage.getItem('tempBooking');
  const tempBooking = tempBookingStr ? JSON.parse(tempBookingStr) : {};

  const platformFee = 5.00;
  const total = service.price + platformFee;

  const handlePay = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        // Create full booking object
        const newBooking = {
            id: `KK-${Math.floor(Math.random() * 10000)}`,
            serviceId: service.id,
            workerId: WORKERS[0].id, // Auto-assign first worker for demo
            date: tempBooking.date,
            time: tempBooking.time,
            status: BookingStatus.CONFIRMED, // Start as confirmed
            totalPrice: total,
            address: tempBooking.address,
            recipientName: "Parent"
        };
        setCurrentBooking(newBooking);
        navigate('/confirmation');
    }, 2000);
  };

  return (
    <div className="p-4 pt-8 bg-surface min-h-screen flex flex-col">
       <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold ml-2 font-poppins">Payment</h1>
      </div>

      {/* Summary */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">{service.name}</span>
            <span className="font-medium">RM {service.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-medium">RM {platformFee.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 my-3 pt-3 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-primary text-lg">RM {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Methods */}
      <h3 className="font-semibold text-gray-900 mb-3">Select Payment Method</h3>
      <div className="space-y-3 mb-8">
        {[
            { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
            { id: 'wallet', name: 'E-Wallet (TnG)', icon: Wallet },
            { id: 'bank', name: 'Online Banking', icon: Landmark },
        ].map((method) => (
            <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                    selectedMethod === method.id 
                    ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                    : 'border-gray-200 bg-white'
                }`}
            >
                <div className={`p-2 rounded-full mr-3 ${selectedMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <method.icon size={20} />
                </div>
                <span className={`font-medium ${selectedMethod === method.id ? 'text-primary' : 'text-gray-700'}`}>{method.name}</span>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-primary' : 'border-gray-300'}`}>
                    {selectedMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
            </button>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className="space-y-3 mb-6 animate-fade-in">
            <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-xl text-sm" />
            <div className="flex gap-3">
                <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-xl text-sm" />
                <input type="text" placeholder="CVV" className="w-1/2 p-3 border rounded-xl text-sm" />
            </div>
        </div>
      )}

      <div className="mt-auto">
        <Button fullWidth onClick={handlePay} disabled={loading}>
            {loading ? 'Processing...' : `Pay RM ${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default Payment;