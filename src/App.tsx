
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { TravelProvider, useTravel } from './context/TravelContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Plane, 
  Map as MapIcon, 
  Wallet, 
  User, 
  Settings, 
  LogOut, 
  MessageSquare,
  Home,
  CheckSquare,
  Package
} from 'lucide-react';
import { useState } from 'react';

// Pages - to be implemented in separate files
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
import ItineraryBuilder from './pages/ItineraryBuilder';
import TripDetail from './pages/TripDetail';
import Budget from './pages/Budget';
import Profile from './pages/Profile';
import SharedView from './pages/SharedView';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Chatbot from './components/Chatbot';

function AppContent() {
  const { user, logout, loading } = useTravel();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Plane className="w-10 h-10 text-orange-500 animate-bounce" />
      </div>
    );
  }

  const isAuthPage = ['/', '/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname) || location.pathname.startsWith('/shared');

  if (!user && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (user && (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password')) {
    return <Navigate to="/dashboard" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', path: '/trips', icon: Plane },
    { name: 'Create Trip', path: '/create-trip', icon: PlusCircle },
    { name: 'Budget', path: '/budget', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex overflow-hidden">
      {user && !location.pathname.startsWith('/shared') && (
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50 shadow-sm`}>
          <div className="p-6 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Plane className="text-white w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="font-black text-xl tracking-tight text-slate-900">Traveloop.</span>}
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold ${
                  location.pathname === item.path ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100 space-y-2">
             <button
              onClick={logout}
              className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-red-50 text-red-500 transition-colors font-bold"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </aside>
      )}

      <main className="flex-1 relative overflow-y-auto scroll-smooth">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/trip/:id" element={<TripDetail />} />
            <Route path="/trip/:id/builder" element={<ItineraryBuilder />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shared/:id" element={<SharedView />} />
          </Routes>
        </AnimatePresence>
        
        {user && !location.pathname.startsWith('/shared') && <Chatbot />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TravelProvider>
      <AppContent />
    </TravelProvider>
  );
}
