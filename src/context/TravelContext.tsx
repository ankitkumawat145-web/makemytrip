
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, UserProfile } from '../types';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface TravelContextType {
  trips: Trip[];
  user: User | null;
  loading: boolean;
  addTrip: (trip: Trip) => Promise<void>;
  updateTrip: (tripId: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load auth state and trips
  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchTrips(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchTrips(currentUser.id);
      } else {
        setTrips([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTrips = async (userId: string) => {
    try {
      console.log('Fetching trips for user:', userId);
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching trips:', error);
        // Fallback to local storage if table doesn't exist yet
        const savedTrips = localStorage.getItem(`traveloop_trips_${userId}`);
        if (savedTrips) setTrips(JSON.parse(savedTrips));
      } else if (data) {
        console.log('Fetched trips count:', data.length);
        const mappedTrips = data.map(item => ({
          ...item.trip_data,
          id: item.id,
        }));
        setTrips(mappedTrips);
      }
    } catch (err: any) {
      console.error('Fetch trips error:', err);
      // Don't show confusing error in console if it's just a 404/Empty table
      const savedTrips = localStorage.getItem(`traveloop_trips_${userId}`);
      if (savedTrips) setTrips(JSON.parse(savedTrips));
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (trip: Trip) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([
          { 
            user_id: user.id,
            name: trip.name,
            trip_data: trip, // Save the full object in a jsonb column
          }
        ])
        .select();

      if (error) throw error;
      
      if (data && data[0]) {
        const newTrip = { ...trip, id: data[0].id };
        setTrips(prev => [newTrip, ...prev]);
        // Update local storage as backup
        localStorage.setItem(`traveloop_trips_${user.id}`, JSON.stringify([newTrip, ...trips]));
      }
    } catch (err) {
      console.error('Add trip error:', err);
      // Fallback
      setTrips(prev => [trip, ...prev]);
    }
  };
  
  const updateTrip = async (tripId: string, updates: Partial<Trip>) => {
    if (!user) return;

    try {
      const currentTrip = trips.find(t => t.id === tripId);
      if (!currentTrip) return;

      const updatedTrip = { ...currentTrip, ...updates };

      const { error } = await supabase
        .from('trips')
        .update({ 
          name: updatedTrip.name,
          trip_data: updatedTrip 
        })
        .eq('id', tripId)
        .eq('user_id', user.id);

      if (error) throw error;

      setTrips(prev => prev.map(t => t.id === tripId ? updatedTrip : t));
    } catch (err) {
      console.error('Update trip error:', err);
      setTrips(prev => prev.map(t => t.id === tripId ? { ...t, ...updates } : t));
    }
  };

  const deleteTrip = async (tripId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId)
        .eq('user_id', user.id);

      if (error) throw error;
      setTrips(prev => prev.filter(t => t.id !== tripId));
    } catch (err) {
      console.error('Delete trip error:', err);
      setTrips(prev => prev.filter(t => t.id !== tripId));
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setTrips([]);
  };

  return (
    <TravelContext.Provider value={{ trips, user, loading, addTrip, updateTrip, deleteTrip, logout }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) throw new Error('useTravel must be used within a TravelProvider');
  return context;
};
