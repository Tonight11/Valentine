export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  emoji?: string;
  image?: string;
}

export interface MoodPhrase {
  id: number;
  text: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  phrases: MoodPhrase[];
}

export interface Reason {
  id: number;
  text: string;
  icon?: string;
}

export interface LoveLetter {
  id: number;
  title: string;
  date: string;
  content: string;
  opened?: boolean;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface Place {
  id: number;
  name: string;
  description: string;
  date: string;
  image?: string;
  coordinates?: { lat: number; lng: number };
}

export interface FuturePlan {
  id: number;
  title: string;
  description: string;
  icon: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface Song {
  id: number;
  src: string;
  name: string;
  artist?: string;
  description: string;
  whySpecial: string;
}

export interface Photo {
  id: number;
  src: string;
  caption: string;
  date?: string;
}
