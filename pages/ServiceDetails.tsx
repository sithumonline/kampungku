import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, CheckCircle } from 'lucide-react';
import { SERVICES, WORKERS } from '../constants';
import Button from '../components/Button';

const ServiceDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
      </div>

      <div className="flex-1 p-6 -mt-6 rounded-t-3xl bg-white relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">{service.name}</h1>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-primary">RM {service.price}</span>
            <span className="text-xs text-gray-500">per session</span>
          </div>
        </div>

        {/* Ratings & Duration */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
            <Star size={14} className="text-secondary fill-secondary" />
            <span className="text-sm font-semibold text-secondary">{service.rating}</span>
            <span className="text-xs text-gray-500">({service.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock size={14} />
            <span>{service.duration}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* What's Included */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
          <div className="space-y-2">
            {service.includes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-primary" />
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Workers */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Available Workers</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
             {WORKERS.filter(w => w.services.includes(service.id)).map(worker => (
               <div key={worker.id} className="min-w-[140px] p-3 border border-gray-100 rounded-xl flex flex-col items-center shadow-sm">
                  <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-full object-cover mb-2" />
                  <span className="text-sm font-medium text-center">{worker.name}</span>
                  <div className="flex items-center gap-1 mt-1">
                     <Star size={10} className="text-secondary fill-secondary" />
                     <span className="text-xs text-gray-500">{worker.rating}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Sticky Bottom Button */}
        <div className="mt-auto">
          <Button fullWidth onClick={() => navigate(`/booking/${service.id}`)}>
            Book This Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;