import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },

  'slide-down': {
    '0%': {
      transform: 'translateY(-4rem)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },

  'slide-top': {
    '0%': {
      transform: 'translateY(4rem)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },

  'slide-left': {
    '0%': {
      transform: 'translateX(-1rem)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },

  'slide-right': {
    '0%': {
      transform: 'translateX(1rem)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },

  'leading-chevron': {
    '0%': {
      transform: 'scaleX(2) translateY(-2rem) translateX(-50%)',
    },
    '100%': {
      transform: 'scaleX(2) translateY(0) translateX(-50%)',
    },
  },
});
