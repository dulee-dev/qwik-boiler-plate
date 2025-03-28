import { component$, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { cx } from '~/styled-system/css';
import { inlineTranslate } from 'qwik-speak';
import { s } from './styles.css';
import { buttonRecipe } from '~/styles/button.recipe';
import { InputCheckbox } from '../../molecules/input-checkbox';

export interface WithdrawalFormProps {
  class?: string;
}

export const WithdrawalForm = component$<WithdrawalFormProps>((props) => {
  const t = inlineTranslate();

  const approval = useSignal(false);

  return (
    <div class={cx(s.wrapper, props.class)}>
      <h1 class={s.title}>{t('users-withdrawal.form.title@@회원탈퇴')}</h1>
      <div class={s.desc}>
        {t(
          'users-withdrawal.form.desc.first@@탈퇴하신다니.. 너무 아쉬워요.\n언젠가 또 볼 날이 있겠죠?'
        )}
      </div>
      <Form>
        <InputCheckbox
          class={s.approval}
          bindChecked={approval}
          label={t(
            'users-withdrawal.form.approval-label@@회원정보는 복구 불가능합니다.'
          )}
          name="approval"
          id="approval"
        />
        <button class={cx(buttonRecipe({ priority: 'primary' }), s.submit)}>
          {t('users-withdrawal.form.submit@@탈퇴하기')}
        </button>
      </Form>
    </div>
  );
});
