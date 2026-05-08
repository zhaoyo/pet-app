export interface User {
  id: number;
  username: string;
  role: string;
  points: number;
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
  equipment?: ShopItem[];
  courses?: Course[];
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

export interface ShopItem {
  id: number;
  name: string;
  category: string;
  slot?: string;
  price: number;
  description?: string;
  svg_data?: string;
  thumbnail?: string;
  is_active: number;
  owned?: number;
}

export interface Course {
  id: number;
  name: string;
  icon: string;
  price: number;
  description?: string;
  animation_key?: string;
  learned?: number;
}

export interface RoomItem {
  item_id: number;
  x: number;
  y: number;
  z_index: number;
  rotation?: number;
  item?: ShopItem;
}
