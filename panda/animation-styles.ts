import { defineAnimationStyles } from '@pandacss/dev';

export const animationStyles = defineAnimationStyles({
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
      '&[data-direction=bottom]': {
        animationName: 'slide-bottom, fade-in',
      },
      '&[data-direction=left]': {
        animationName: 'slide-left, fade-in',
      },
      '&[data-direction=right]': {
        animationName: 'slide-right, fade-in',
      },
    },
  },
});
