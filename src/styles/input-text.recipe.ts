import { cva } from '../styled-system/css';

export const inputTextRecipe = cva({
  variants: {
    style: {
      base: {
        px: '0.5rem',
        py: '0.5rem',
        border: '1px solid {colors.gray.300}',
        borderRadius: '0.25rem',
        fontSize: 'sm',

        _placeholder: {
          color: 'gray.300',
          fontWeight: 'medium',
        },
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    style: 'base',
  },
});
