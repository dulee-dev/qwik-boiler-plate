import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    maxW: '24rem',
  }),

  title: css({
    fontSize: '3xl',
    fontWeight: 'medium',
    textAlign: 'center',
    mb: '1.5rem',

    tablet: {
      fontSize: '4xl',
    },
  }),

  approval: css({
    mt: '0.5rem',
  }),

  submit: css({
    mt: '1rem',
  }),
};
