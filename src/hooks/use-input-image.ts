import { useSignal, $, type Signal } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import { v4 } from 'uuid';
import { imageApi } from '~/infra/cloudflare/cf-image-api.effect';
import {
  appendFileToFormData,
  calcSrcUrlFromUploadUrl,
} from '~/infra/cloudflare/cf-image-rule.pure';

const checkFileIsImage = (file: File) => {
  const ok = /^image\/.*$/.test(file.type);
  return ok;
};

export const useInputImg = (
  ref: Signal<HTMLInputElement | undefined>,
  srcInit?: string | null
) => {
  const src = useSignal<string | undefined | null>(srcInit);
  const idle = useSignal<boolean>(true);

  const onChange$ = $(async () => {
    const inputEl = ref.value;
    if (!inputEl) return;

    const file = inputEl.files ? inputEl.files[0] : undefined;
    if (file && checkFileIsImage(file)) {
      idle.value = false;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const result = await new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
      if (typeof result === 'string') src.value = result;

      const { body, statusCode } = await server$(async () => {
        return await imageApi.createPresignedUploadUrl();
      })();
      if (statusCode !== 201) {
        window.alert('오류: ' + body.message);
        idle.value = true;
        return;
      }
      const uploadUrl = body.data.url;

      const formData = appendFileToFormData(file, v4());

      await imageApi.uploadImage(uploadUrl, formData);
      const srcUrl = calcSrcUrlFromUploadUrl(uploadUrl);
      src.value = srcUrl;
      idle.value = true;
    }
  });

  return {
    src,
    onChange$,
    idle,
  };
};
