import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { InputTextVerbose } from '../../molecules/input-text-verbose';
import { InputTextLabeled } from '../../molecules/input-text-labeled';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { buttonRecipe } from '~/styles/button.recipe';
import { middleDot } from '~/utils/string';

export interface UserSignInFormProps {
  class?: string;
}

export const UserSignInForm = component$<UserSignInFormProps>((props) => {
  const t = inlineTranslate();

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('users-sign-in.form.title@@로그인')}</h1>
      <Form class={cx(props.class)}>
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
        <InputTextLabeled
          label="password"
          name="password"
          id="password"
          value=""
          type={'password'}
          placeholder="********"
        />
        <button class={cx(buttonRecipe({ priority: 'primary' }), s.submit)}>
          {t('users-sign-in.form.submit@@로그인하기')}
        </button>
      </Form>
      <button class={cx(buttonRecipe(), s.oauth)} type="button">
        {t('users-sign-in.form.googleOAuth@@구글 로그인')}
      </button>
      <div class={s.links}>
        <a class={s.link} href="/users/sign-up">
          {t('users-sign-in.links.sign-up@@회원가입')}
        </a>
        <span class={s.middleDot}>{middleDot}</span>
        <a class={s.link} href="/users/find-pw">
          {t('users-sign-in.links.find-pw@@비밀번호 찾기')}
        </a>
      </div>
    </div>
  );
});
