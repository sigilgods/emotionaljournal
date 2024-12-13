type Emotion = {
  name: string;
  triggers: string[];
  intensity: number;
  timestamp: Date;
}

type JournalEntry = {
  id: string;
  content: string;
  emotions: Emotion[];
  timestamp: Date;
}

type EmotionalPattern = {
  activity: string;
  associatedEmotions: Emotion[];
  frequency: number;
} 