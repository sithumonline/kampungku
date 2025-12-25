import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';

// Pages
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import BookingForm from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import WorkerJob from './pages/WorkerJob';
import Tracking from './pages/Tracking';
import Completion from './pages/Completion';
import PaymentFailed from './pages/PaymentFailed';
import TrackingError from './pages/TrackingError';

const App: React.FC = () => {
  return (
    <AppProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Part A: Booking Flow */}
              <Route path="/" element={<Home />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/booking/:id" element={<BookingForm />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />

              {/* Part B: Tracking & Worker Flow */}
              <Route path="/worker" element={<WorkerJob />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/completion" element={<Completion />} />
              
              {/* Part C: Error Flows (For screenshots) */}
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/tracking-error" element={<TrackingError />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
    </AppProvider>
  );
};

export default App;