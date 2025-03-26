import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    borderRadius: '0.5rem',
    border: '2px solid {colors.primary.base}',
    p: '1rem',

    mobile: {
      p: '1.5rem',
    },

    dp: 'flex',
    jc: 'center',
    ai: 'center',
  }),

  content: css({
    color: 'primary.deep',
    fontWeight: 'semibold',
    fontSize: '2xl',
    textAlign: 'center',
    wordBreak: 'keep-all',
  }),
};
