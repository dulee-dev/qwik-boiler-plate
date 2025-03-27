import { cva } from '../styled-system/css';

export const buttonRecipe = cva({
  variants: {
    rounded: {
      full: {},
      small: {},
    },
    size: {
      base: {
        borderWidth: '1px',
        fontWeight: 'semibold',
        py: '0.5rem',
        px: '1rem',
      },
    },
    priority: {
      primary: {
        color: 'white',
        bg: 'primary.base',
      },
      secondary: {
        color: 'primary.base',
        borderColor: 'primary.base',
      },
    },
  },

  compoundVariants: [
    {
      size: 'base',
      rounded: 'full',
      css: {
        borderRadius: '9999px',
      },
    },
    {
      size: 'base',
      rounded: 'small',
      css: {
        borderRadius: '4px',
      },
    },
  ],

  defaultVariants: {
    size: 'base',
    rounded: 'small',
  },
});
