import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';
import { SERVICES, CATEGORIES } from '../constants';
import { Category } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 pt-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-poppins">Hello, Sarah</h1>
        <div className="flex items-center text-primary mt-1">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm font-medium">Kampung Kami</span>
        </div>
      </div>

      {/* Search Bar (FR-SB-002) */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search services..."
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories (FR-SB-004) */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as Category)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === cat.value 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Service Grid (FR-SB-005) */}
      <div className="grid grid-cols-2 gap-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => navigate(`/service/${service.id}`)}
              className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer"
            >
              <div className="h-32 w-full rounded-xl bg-gray-100 mb-3 overflow-hidden relative">
                 <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                 <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center">
                    <Star size={10} className="text-secondary fill-secondary mr-1" />
                    {service.rating}
                 </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{service.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{service.category}</span>
                <span className="text-primary font-bold text-sm">RM {service.price}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-gray-400 text-sm">No services found matching "{searchQuery}"</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-2 text-primary text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;