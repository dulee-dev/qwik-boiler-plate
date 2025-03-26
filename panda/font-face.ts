interface FontFace {
  src: string;
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontStyle: 'normal';
  fontDisplay: 'swap';
}

export const Pretendard: FontFace[] = [
  {
    src: "local('Pretendard Black'), url(/fonts/pretendard/woff2/Pretendard-Black.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-Black.woff) format('woff');",
    fontWeight: 900,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard ExtraBold'), url(/fonts/pretendard/woff2/Pretendard-ExtraBold.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-ExtraBold.woff) format('woff');",
    fontWeight: 800,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard Bold'), url(/fonts/pretendard/woff2/Pretendard-Bold.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-Bold.woff) format('woff');",
    fontWeight: 700,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard SemiBold'), url(/fonts/pretendard/woff2/Pretendard-SemiBold.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-SemiBold.woff) format('woff');",
    fontWeight: 600,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard Medium'), url(/fonts/pretendard/woff2/Pretendard-Medium.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-Medium.woff) format('woff');",
    fontWeight: 500,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard Regular'), url(/fonts/pretendard/woff2/Pretendard-Regular.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-Regular.woff) format('woff');",
    fontWeight: 400,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard Light'), url(/fonts/pretendard/woff2/Pretendard-Light.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-Light.woff) format('woff');",
    fontWeight: 300,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard ExtraLight'), url(/fonts/pretendard/woff2/Pretendard-ExtraLight.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-ExtraLight.woff) format('woff');",
    fontWeight: 200,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: "local('Pretendard Thin'), url(/fonts/pretendard/woff2/Pretendard-Thin.woff2) format('woff2'), url(/fonts/pretendard/woff/Pretendard-Thin.woff) format('woff');",
    fontWeight: 100,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
];
