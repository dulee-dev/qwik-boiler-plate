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

  submit: css({
    mt: '1.5rem',
    mb: '1rem',
    w: 'full',
  }),

  oauth: css({
    mt: '0.75rem',
    w: 'full',
  }),

  links: css({
    mt: '1rem',
    dp: 'flex',
    jc: 'center',
    color: 'gray.400',
    fontSize: 'sm',
  }),

  link: css({
    textDecoration: 'underline',
    fontWeight: 'semibold',
  }),

  middleDot: css({
    mx: '0.5rem',
  }),
};
