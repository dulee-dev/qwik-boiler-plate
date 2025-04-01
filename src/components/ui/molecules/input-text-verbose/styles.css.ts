import { css } from '~/styled-system/css';

export const s = {
  label: css({
    fontSize: 'sm',
    fontWeight: 'medium',
  }),

  input: css({
    w: 'full',

    _disabled: {
      bg: 'gray.200',
    },
  }),

  infoBox: css({
    h: '1.5rem',
  }),

  info: css({
    fontSize: 'sm',
    dp: 'flex',
    ai: 'center',
    minH: '1rem',
    color: 'gray.500',
  }),

  ok: css({ color: 'ok.base' }),

  error: css({ color: 'error.base' }),

  infoIcon: css({
    mr: '0.25rem',
  }),
};
