export interface User {
  id: number;
  username: string;
  role: string;
  points: number;
  pet_eggs: number;
  avatar_url?: string;
  created_at: string;
}

export interface Pet {
  id: number;
  user_id: number;
  name: string;
  type: string;
  avatar_url?: string;
  level: number;
  experience: number;
  mood: number;
  created_at: string;
  display_card_id?: string | null;
}

export interface CheckinType {
  id: number;
  name: string;
  icon: string;
  points: number;
  is_active: number;
  checked?: boolean;
}

export interface CheckinRecord {
  id: number;
  checked_date: string;
  checkin_type_id: number;
  points_earned: number;
  streak_bonus: number;
  name: string;
  icon: string;
}

export interface UserStreak {
  id: number;
  checkin_type_id: number;
  current_streak: number;
  longest_streak: number;
  last_checkin: string;
  name: string;
  icon: string;
}
