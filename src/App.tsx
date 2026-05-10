
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { TravelProvider, useTravel } from './context/TravelContext';
import { useTheme } from './context/ThemeContext';
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
  Package,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
import ItineraryBuilder from './pages/ItineraryBuilder';
import TripDetail from './pages/TripDetail';
import Budget from './pages/Budget';
import Profile from './pages/Profile';
import SharedView from './pages/SharedView';
import Chatbot from './components/Chatbot';

function AppContent() {
  const { user, logout } = useTravel();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user && !location.pathname.startsWith('/shared') && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', path: '/trips', icon: Plane },
    { name: 'Create Trip', path: '/create-trip', icon: PlusCircle },
    { name: 'Budget', path: '/budget', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const sidebarVisible = user && location.pathname !== '/' && !location.pathname.startsWith('/shared');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
      {/* Mobile Header */}
      {sidebarVisible && (
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Plane className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">Traveloop.</span>
          </Link>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
      )}

      {/* Sidebar - Desktop */}
      {sidebarVisible && (
        <>
          <aside className={`hidden lg:flex ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex-col z-50 shadow-sm`}>
            <div className="p-6 flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Plane className="text-white w-5 h-5" />
                </div>
                {isSidebarOpen && <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Traveloop.</span>}
              </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold ${
                    location.pathname === item.path 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="text-sm">{item.name}</span>}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
               <button
                onClick={toggleTheme}
                className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-bold"
              >
                {theme === 'light' ? <Moon className="w-5 h-5 flex-shrink-0" /> : <Sun className="w-5 h-5 flex-shrink-0" />}
                {isSidebarOpen && <span className="text-sm">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
              </button>
               <button
                onClick={logout}
                className="flex items-center gap-4 px-4 py-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors font-bold"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm">Logout</span>}
              </button>
            </div>
          </aside>

          {/* Mobile Overlay Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="fixed inset-0 bg-white dark:bg-slate-950 z-[60] lg:hidden flex flex-col"
              >
                <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Plane className="text-white w-5 h-5" />
                    </div>
                    <span className="font-black text-xl text-slate-900 dark:text-white">Traveloop.</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X className="w-8 h-8 text-slate-400" />
                  </button>
                </div>
                <nav className="flex-1 p-6 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-6 px-6 py-5 rounded-2xl transition-all text-xl font-bold ${
                        location.pathname === item.path 
                          ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' 
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={logout}
                    className="flex items-center gap-6 px-6 py-5 w-full rounded-2xl text-red-500 text-xl font-bold"
                  >
                    <LogOut className="w-6 h-6" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <main className="flex-1 relative overflow-y-auto scroll-smooth">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
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
        
        {user && <Chatbot />}
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
