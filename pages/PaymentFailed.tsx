import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <XCircle size={48} className="text-red-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">Payment Failed</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 w-full mb-8">
        <div className="flex items-center gap-3 text-red-600 mb-2 justify-center">
            <AlertCircle size={20} />
            <span className="font-semibold">Transaction Declined</span>
        </div>
        <p className="text-gray-600 text-sm">
            Your card ending in •••• 4242 was declined by the bank. No charges were made.
        </p>
      </div>

      <div className="w-full space-y-3">
        <Button fullWidth onClick={() => navigate(-1)}>
            Try Again
        </Button>
        <Button fullWidth variant="secondary" onClick={() => navigate('/payment/svc-001')}>
            Use Different Method
        </Button>
        <button onClick={() => navigate('/')} className="text-gray-400 text-sm mt-4">
            Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
