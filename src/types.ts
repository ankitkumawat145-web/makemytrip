
export interface Activity {
  id: string;
  name: string;
  category: "Sightseeing" | "Food" | "Adventure" | "Culture" | "Shopping";
  cost: number;
  duration: string;
  description: string;
  image?: string;
}

export interface CityStop {
  id: string;
  city: string;
  state: string;
  arrivalDate: string;
  departureDate: string;
  activities: Activity[];
  stayCost: number;
  transportCost: number;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage?: string;
  stops: CityStop[];
  status: "Planning" | "Upcoming" | "Completed";
  budget: {
    totalLimit: number;
    spent: number;
  };
  notes: TripNote[];
  checklist: ChecklistItem[];
}

export interface TripNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  category: "Clothing" | "Documents" | "Electronics" | "Essentials" | "Other";
  isCompleted: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  currency: string;
  language: string;
  savedDestinations: string[];
}
