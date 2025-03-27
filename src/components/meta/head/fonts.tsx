interface Props {
  name: 'pretendard';
  type: 'woff2' | 'woff';
  files: string[];
}

export const Font = (props: Props) => {
  return (
    <>
      {props.files.map((c) => (
        <link
          key={`${props.name}-${c}-${props.type}`}
          rel="preload"
          as="font"
          href={`/fonts/${props.name}/${props.type}/${c}.${props.type}`}
          type={`font/${props.type}`}
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};

export const Fonts = () => {
  return (
    <>
      <Font
        name="pretendard"
        type="woff2"
        files={[
          'Pretendard-Black',
          'Pretendard-ExtraBold',
          'Pretendard-Bold',
          'Pretendard-SemiBold',
          'Pretendard-Medium',
          'Pretendard-Regular',
          'Pretendard-Light',
          'Pretendard-ExtraLight',
          'Pretendard-Thin',
        ]}
      />
      <Font
        name="pretendard"
        type="woff"
        files={[
          'Pretendard-Black',
          'Pretendard-ExtraBold',
          'Pretendard-Bold',
          'Pretendard-SemiBold',
          'Pretendard-Medium',
          'Pretendard-Regular',
          'Pretendard-Light',
          'Pretendard-ExtraLight',
          'Pretendard-Thin',
        ]}
      />
    </>
  );
};
