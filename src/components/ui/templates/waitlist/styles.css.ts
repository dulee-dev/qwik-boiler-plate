import { css } from '~/styled-system/css';

export const s = {
  wrapper: css({
    pos: 'relative',
  }),

  main: css({ pt: '10rem', dp: 'flex', ai: 'center', fd: 'column' }),

  title: css({
    fontSize: '4xl',
    fontWeight: 'semibold',
  }),

  desc: css({
    mt: '1rem',
  }),

  cards: css({
    mt: '2rem',
    dp: 'flex',
  }),

  card: css({
    width: '50%',

    _first: {
      mr: '1rem',
    },
  }),

  form: css({
    mt: '2rem',
    mb: '12rem',
    minW: '16rem',
    w: 'full',
    maxW: '24rem',
  }),

  label: css({
    dp: 'block',
    mb: '0.5rem',
    fontWeight: 'semibold',
  }),

  input: css({
    borderBottom: '1px solid black',
    w: 'full',
    py: '0.25rem',
    px: '0.5rem',
  }),

  submit: css({
    mt: '0.75rem',
    width: 'full',
    bg: 'primary.base',
    color: 'white',
    fontWeight: 'semibold',
    borderRadius: '0.25rem',
    py: '0.5rem',
  }),
};
