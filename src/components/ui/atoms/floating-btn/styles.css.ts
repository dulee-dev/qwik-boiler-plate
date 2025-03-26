import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    pos: 'fixed',
    bottom: '5rem',
    right: '50%',
    transform: 'translateX(50%)',
    border: '2px solid {colors.gray.300}',
    bg: 'white',

    p: '0.5rem',
    fontSize: '2xl',
    color: 'gray.300',
    borderRadius: 'full',
  }),
};
