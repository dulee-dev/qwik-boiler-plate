import { routeLoader$ } from '@builder.io/qwik-city';
import { signUpCodeMain } from '~/infra/main/services/sign-up-code/sign-up-code-main.effect';

export const useSignUpCode = routeLoader$(async ({ query, redirect }) => {
  const code = query.get('code')

  if (code === null) throw redirect(302, '/users/sign-in/?msg=sign-up-code-invalid');

  const response = await signUpCodeMain.findOneById(code);
  
  if(response.body.code === 404001) {
    throw redirect(302, '/users/sign-in/?msg=sign-up-code-expired');
  }
  if(response.body.code !== 200000) {
    throw redirect(302, '/users/sign-in/?msg=sign-up-code-invalid');
  }    
  const email = response.body.data.signUpCode.email
    return { ok: true, data: email };
});
