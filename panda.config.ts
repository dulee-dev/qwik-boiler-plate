import { defineConfig } from '@pandacss/dev';
import { Pretendard } from '@panda/font-face';
import { keyframes } from '@panda/keyframe';
import { animationStyles } from '@panda/animation-styles';

export default defineConfig({
  jsxFramework: 'qwik',

  // Whether to use css reset
  preflight: true,

  globalFontface: {
    Pretendard,
  },

  globalVars: {
    extend: {
      '--font-pretendard': 'pretendard',
    },
  },
  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  minify: process.env.NODE_ENV === 'production' ? true : false,
  hash: process.env.NODE_ENV === 'production' ? true : false,
  lightningcss: true,

  // Useful for theme customization
  theme: {
    semanticTokens: {
      colors: {
        primary: {
          base: {
            value: '#2F80ED',
          },
          deep: {
            value: '#1C5DBE',
          },
          light: {
            value: '#F0F6FF',
          },
        },
        error: {
          base: {
            value: '{colors.red.600}',
          },
        },
        warn: {
          base: {
            value: '{colors.yellow.600}',
          },
        },
        ok: {
          base: {
            value: '{colors.green.600}',
          },
        },
      },
    },
    keyframes,
    extend: {
      breakpoints: {
        mobileSmall: '360px',
        mobile: '480px',
        tablet: '768px',
        desktopSmall: '992px',
        desktop: '1280px',
        desktopLarge: '1536px',
      },
      animationStyles,
    },
  },
  utilities: {
    extend: {
      display: {
        shorthand: 'dp',
      },
      flexDirection: {
        shorthand: 'fd',
      },
      alignItems: {
        shorthand: 'ai',
      },
      justifyContent: {
        shorthand: 'jc',
      },
    },
  },

  patterns: {
    extend: {
      pageX: {
        description: 'page x layout',
        defaultValues: {
          type: 'padding',
          size: 'base',
        },
        properties: {
          type: {
            type: 'enum',
            value: ['padding', 'margin'],
          },
          size: {
            type: 'enum',
            value: ['base', 'wide'],
          },
        },
        transform(props) {
          const { type, size, ...rest } = props;
          const x =
            type === 'padding'
              ? {
                  px: {
                    base: '1rem',
                    mobile: '1.5rem',
                    tablet: '2rem',

                    desktopSmall: size === 'base' ? 'auto' : '3rem',
                  },
                  mx: {
                    desktopSmall: size === 'base' ? 'auto' : '3rem',
                  },

                  width: {
                    desktopSmall: size === 'base' ? '60rem' : undefined,
                  },
                }
              : {
                  mx: {
                    base: '1rem',
                    mobile: '1.5rem',
                    tablet: '2rem',
                    desktopSmall: size === 'base' ? 'auto' : '3rem',
                  },
                  width: {
                    desktopSmall: size === 'base' ? '60rem' : undefined,
                  },
                };
          return {
            ...x,
            ...rest,
          };
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'src/styled-system',
});
