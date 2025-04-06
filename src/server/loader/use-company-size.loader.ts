import { routeLoader$ } from '@builder.io/qwik-city';
import { companySizeMain } from '~/infra/main/services/company-size/company-size-main.effect';

export const useCompanySize = routeLoader$(async ({ query, redirect }) => {
  try {
    const response = await companySizeMain.findAll()

    if(response.body.code === 200000) {
      return response.body.data.companySizes
    }
    return []
  } catch(err) {
    return []
  }
});
