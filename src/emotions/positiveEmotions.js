import { openEmotions } from './categories/openEmotions';
import { lovingEmotions } from './categories/lovingEmotions';
import { happyEmotions } from './categories/happyEmotions';
import { interestedEmotions } from './categories/interestedEmotions';
import { aliveEmotions } from './categories/aliveEmotions';
import positiveStateEmotions from './categories/positiveEmotions';
import { strongEmotions } from './categories/strongEmotions';
import { peacefulEmotions } from './categories/peacefulEmotions';
import { relaxedEmotions } from './categories/relaxedEmotions';

// Add category names and organize emotions
export const positiveEmotions = {
  open: {
    name: 'Open & Connected',
    icon: '👀 Open',
    emotions: openEmotions.subEmotions
  },
  loving: {
    name: 'Loving & Compassionate',
    icon: '❤️ Loving',
    emotions: lovingEmotions.subEmotions
  },
  happy: {
    name: 'Happy & Joyful',
    icon: '😊 Happy',
    emotions: happyEmotions.subEmotions
  },
  interested: {
    name: 'Interested & Curious',
    icon: '⭐ Interested',
    emotions: interestedEmotions.subEmotions
  },
  alive: {
    name: 'Alive & Energetic',
    icon: '⚡ Alive',
    emotions: aliveEmotions.subEmotions
  },
  positive: {
    name: 'Positive & Inspired',
    icon: '☀️ Positive',
    emotions: positiveStateEmotions.subEmotions
  },
  strong: {
    name: 'Strong & Confident',
    icon: '💪 Strong',
    emotions: strongEmotions.subEmotions
  },
  peaceful: {
    name: 'Peaceful & Serene',
    icon: '🕊️ Peaceful',
    emotions: peacefulEmotions.subEmotions
  },
  relaxed: {
    name: 'Relaxed & Calm',
    icon: '😌 Relaxed',
    emotions: relaxedEmotions.subEmotions
  }
}; 