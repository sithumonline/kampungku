import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ThumbsUp, Smile } from 'lucide-react';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';

const Completion: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking } = useApp();
  const [rating, setRating] = useState(0);

  // Fallback for direct access
  const price = currentBooking?.totalPrice || 85.00;

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col pt-12">
      <div className="flex-1 flex flex-col items-center">
         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <ThumbsUp size={40} className="text-primary" />
         </div>
         
         <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2 text-center">Service Completed!</h1>
         <p className="text-gray-500 text-center mb-8">Hope you are satisfied with the service.</p>

         {/* Summary Card */}
         <div className="w-full bg-gray-50 rounded-xl p-4 mb-8">
            <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm">Service</span>
                <span className="font-medium text-sm">House Cleaning</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm">Duration</span>
                <span className="font-medium text-sm">2h 15m</span>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">Total Paid</span>
                <span className="font-bold text-primary">RM {price.toFixed(2)}</span>
            </div>
         </div>

         {/* Rating */}
         <div className="mb-8 w-full text-center">
            <h3 className="font-semibold text-gray-900 mb-4">Rate Mak Cik Ani</h3>
            <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                    >
                        <Star 
                            size={36} 
                            className={`${rating >= star ? 'text-secondary fill-secondary' : 'text-gray-300'}`} 
                        />
                    </button>
                ))}
            </div>
         </div>

         <div className="w-full space-y-2 mb-8">
             <textarea 
                placeholder="Leave a comment (Optional)"
                className="w-full p-3 border rounded-xl text-sm focus:border-primary outline-none"
                rows={3}
             ></textarea>
         </div>

         <div className="flex gap-2 mb-6 overflow-x-auto w-full justify-center">
            {['Punctual', 'Friendly', 'Thorough', 'Skilled'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 border border-gray-200 cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary">
                    {tag}
                </span>
            ))}
         </div>
      </div>

      <div className="mt-auto space-y-3">
         <Button fullWidth onClick={() => navigate('/')}>
            Submit Feedback
         </Button>
         <Button fullWidth variant="secondary" onClick={() => navigate('/')}>
            Skip
         </Button>
      </div>
    </div>
  );
};

export default Completion;