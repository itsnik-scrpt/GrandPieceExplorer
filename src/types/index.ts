export type DevilFruitType =
  | 'Gomu Gomu'
  | 'Mera Mera'
  | 'Hie Hie'
  | 'Yami Yami'
  | 'Gura Gura'
  | 'Ope Ope'
  | 'Magu Magu'
  | 'Pika Pika'
  | 'Tori Tori'
  | 'Suna Suna';

export type UserRole = 'Navigator' | 'Shipwright' | 'Combatant' | 'Scholar';

export type CrewRole = 'Captain' | 'First Mate' | 'Swabbie';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  banner_url?: string;
  devil_fruit?: DevilFruitType;
  role?: UserRole;
  crew_role?: CrewRole;
  bounty: number;
  haki_level: number;
  status?: string;
  crew_id?: string;
  created_at: string;
}

export interface Crew {
  id: string;
  name: string;
  flag_url?: string;
  base_of_operations: string;
  captain_id: string;
  member_count: number;
  bounty_total: number;
  created_at: string;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  crew_id?: string;
  username: string;
  avatar_url?: string;
  haki_level: number;
  created_at: string;
}

export interface MapMarker {
  id: string;
  user_id: string;
  crew_id?: string;
  latitude: number;
  longitude: number;
  depth: number;
  title: string;
  description?: string;
  marker_type: 'discovery' | 'false_sighting' | 'crew_route';
  created_at: string;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_username: string;
  category: 'Theories' | 'Maritime Data' | 'Gear/Tech' | 'Off-Topic';
  upvotes: number;
  downvotes: number;
  reply_count: number;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}
