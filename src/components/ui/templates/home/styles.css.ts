import { css } from '~/styled-system/css';

export const s = {
  fadeIn: css({
    animationStyle: 'fade-in',
    animationFillMode: 'forwards',
  }),

  fadeInOrigin: css({
    opacity: 0,
  }),

  slideUpFadeIn: css({
    animationStyle: 'slide-fade-in',
    animationFillMode: 'forwards',
  }),

  wrapper: css({
    pos: 'relative',
  }),

  hero: css({
    height: '100vh',
    dp: 'flex',
    fd: 'column',
    pt: '16rem',
    pos: 'relative',
  }),

  heroContent: css({
    opacity: 0,
    animationStyle: 'fade-in',
    animationFillMode: 'forwards',
  }),

  heroTitle: css({
    textAlign: 'center',
    fontSize: '4xl',
    fontWeight: 'bold',
  }),

  heroSubTitle: css({
    mt: '0.5rem',
    textAlign: 'center',
    fontWeight: 'medium',
    color: 'gray.700',
  }),

  heroCta: css({
    mt: '1.5rem',
    bg: 'primary.base',
    borderRadius: '0.5rem',
    alignSelf: 'center',
    px: '1.25rem',
    py: '0.75rem',
    color: 'white',
    fontWeight: 'bold',
  }),

  heroLink: css({
    pos: 'absolute',
    bottom: '3rem',
    fontSize: '2xl',
    color: 'gray.400',
    dp: 'block',
    w: '1.25rem',
    animation:
      'leading-chevron 1.5s infinite alternate ease-in-out, fade-in 1.5s infinite alternate ease-in-out',
    left: '50%',
  }),

  cardBox: css({
    bg: 'primary.light',
  }),

  featureCards: css({
    py: '4rem',
    display: 'grid',
    scrollMarginTop: '7rem',
    bg: 'primary.light',

    gridTemplateColumns: 'repeat(1, 1fr)',
    gridGap: '1rem',

    mobile: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '1rem',
    },

    tablet: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '1rem',
    },
  }),

  section: css({
    scrollMarginTop: '10rem',
    mb: '8rem',

    desktopSmall: {
      dp: 'flex',
      jc: 'space-between',
      ai: 'center',
      mb: '12rem',
    },

    _even: {
      fd: 'row-reverse',
    },
  }),

  firstSection: css({
    mt: '8rem',
  }),

  sectionContent: css({
    mb: '3rem',
    opacity: 0,
  }),

  sectionTitle: css({
    fontSize: '2xl',
    fontWeight: 'semibold',
    flexShrink: 0,
  }),

  autofillImg: css({
    mx: 'auto',

    desktopSmall: {
      maxW: '32rem',
      mx: 0,
    },
  }),

  generateImg: css({
    mx: 'auto',

    desktopSmall: {
      maxW: '32rem',
      mx: 0,
    },
  }),

  noticeImg: css({
    mx: 'auto',

    desktopSmall: {
      maxW: '32rem',
      mx: 0,
    },
  }),
};
