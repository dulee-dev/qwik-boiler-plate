import type { DocumentHeadValue } from '@builder.io/qwik-city';

interface Props {
  head: Required<DocumentHeadValue<Record<string, any>>>;
}

export const QwikBase = (props: Props) => {
  return (
    <>
      {props.head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {props.head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {props.head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {props.head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
};
