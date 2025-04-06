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

  info: css({
    mt: '3rem',
  }),

  label: css({
    fontWeight: 'medium',
    mb: '0.25rem',
  }),

  radios: css({
    mb: '1.5rem',
  }),

  radio: css({
    mb: '0.25rem',

    _last: {
      mb: '0',
    },
  }),

  approval: css({
    mt: '0.5rem',
  }),

  submit: css({
    mt: '1rem',
  }),
};
