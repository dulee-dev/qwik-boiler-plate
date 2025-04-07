import { routeLoader$ } from '@builder.io/qwik-city';
import { googleOAuthMain } from '~/infra/main/services/google/oauth-main.effect';
import { signUpCodeMain } from '~/infra/main/services/sign-up-code/sign-up-code-main.effect';
import { trimTailSlash } from '~/libs/url/rule';

export const useSignUpEmail = routeLoader$(async ({ query, redirect }) => {
  const code = query.get('code')

  if (typeof code === 'string') {
    const response = await signUpCodeMain.findOneById(code);
  
    if (response.body.code === 404001) {
      throw redirect(302, '/users/sign-in/?msg=sign-up-code-expired');
    }
    if (response.body.code === 200000) {
      const email = response.body.data.signUpCode.email
      return { ok: true, data: email };  
    } 
    throw redirect(302, '/users/sign-in/?msg=sign-up-code-invalid');   
  }


  const googleIdToken = query.get('googleIdToken')

  if (typeof googleIdToken === 'string') {
    const IdToken = trimTailSlash(googleIdToken)
    const response = await googleOAuthMain.verify(IdToken);
      
    if (response.body.code === 201000) {
      return { ok: true, data: response.body.data.payload.email };  
    }
    throw redirect(302, '/users/sign-in/?msg=invalid');    
  }

  throw redirect(302, '/users/sign-in/?msg=invalid');
});


