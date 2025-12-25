import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, MapPin, User, Briefcase } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simple active check
  const isActive = (path: string) => location.pathname === path;
  
  // Hide navbar on flow screens to reduce clutter
  const hideOnPaths = ['/service/', '/booking', '/payment', '/confirmation', '/completion'];
  const shouldHide = hideOnPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 max-w-[430px] mx-auto">
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}
      >
        <Home size={24} />
        <span className="text-xs font-medium">Home</span>
      </button>

      <button 
        onClick={() => navigate('/tracking')}
        className={`flex flex-col items-center gap-1 ${isActive('/tracking') ? 'text-primary' : 'text-gray-400'}`}
      >
        <MapPin size={24} />
        <span className="text-xs font-medium">Track</span>
      </button>

      <button 
        onClick={() => navigate('/worker')}
        className={`flex flex-col items-center gap-1 ${isActive('/worker') ? 'text-secondary' : 'text-gray-400'}`}
      >
        <Briefcase size={24} />
        <span className="text-xs font-medium">Worker</span>
      </button>

      <button 
        className="flex flex-col items-center gap-1 text-gray-400"
      >
        <User size={24} />
        <span className="text-xs font-medium">Profile</span>
      </button>
    </div>
  );
};

export default Navbar;