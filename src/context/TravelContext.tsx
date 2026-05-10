
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, UserProfile, ChecklistItem, TripNote } from '../types';

interface TravelContextType {
  trips: Trip[];
  user: UserProfile | null;
  addTrip: (trip: Trip) => void;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('traveloop_trips');
    const savedUser = localStorage.getItem('traveloop_user');
    if (savedTrips) setTrips(JSON.parse(savedTrips));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('traveloop_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('traveloop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('traveloop_user');
    }
  }, [user]);

  const addTrip = (trip: Trip) => setTrips(prev => [...prev, trip]);
  
  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, ...updates } : t));
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
  };

  const login = (userData: UserProfile) => setUser(userData);
  const logout = () => {
    setUser(null);
    setTrips([]);
    localStorage.removeItem('traveloop_trips');
    localStorage.removeItem('traveloop_user');
  };

  return (
    <TravelContext.Provider value={{ trips, user, addTrip, updateTrip, deleteTrip, login, logout }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) throw new Error('useTravel must be used within a TravelProvider');
  return context;
};
