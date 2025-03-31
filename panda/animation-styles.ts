import { defineAnimationStyles } from '@pandacss/dev';

export const animationStyles = defineAnimationStyles({
  'infinit-spin': {
    value: {
      animation: 'spin360 1s linear infinite',
    },
  },

  'fade-in': {
    value: {
      animationName: 'fade-in',
      animationDuration: '1.5s',
    },
  },

  'slide-fade-in': {
    value: {
      animationDuration: '1.5s',
      '&[data-direction=top]': {
        animationName: 'slide-top, fade-in',
      },
      '&[data-direction=down]': {
        animationName: 'slide-down, fade-in',
      },
      '&[data-direction=left]': {
        animationName: 'slide-left, fade-in',
      },
      '&[data-direction=right]': {
        animationName: 'slide-right, fade-in',
      },
    },
  },

  'dismiss-fade-out': {
    value: {
      animationDuration: '1.5s',
      '&[data-direction=top]': {
        animationName: 'dismiss-top, fade-out',
      },
      '&[data-direction=down]': {
        animationName: 'dismiss-down, fade-out',
      },
      '&[data-direction=left]': {
        animationName: 'dismiss-left, fade-out',
      },
      '&[data-direction=right]': {
        animationName: 'dismiss-right, fade-out',
      },
    },
  },
});
