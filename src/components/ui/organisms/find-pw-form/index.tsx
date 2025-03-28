import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { buttonRecipe } from '~/styles/button.recipe';

export interface FindPwFormProps {
  class?: string;
}

export const FindPwForm = component$<FindPwFormProps>((props) => {
  const t = inlineTranslate();

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('users-find-pw.form.title@@비밀번호 찾기')}</h1>
      <div class={s.desc}>
        {t('users-find-pw.form.desc@@가입하신 이메일주소를 입력해주세요')}
      </div>
      <Form>
        <InputTextVerbose
          label="email"
          name="email"
          id="email"
          value=""
          info={{
            type: 'ok',
            text: 'ok',
          }}
          type={'email'}
          placeholder="dulee@duleelab.com"
        />
        <button class={cx(buttonRecipe({ priority: 'primary' }), s.submit)}>
          {t('users-find-pw.form.submit@@비밀번호 찾기')}
        </button>
      </Form>
    </div>
  );
});
