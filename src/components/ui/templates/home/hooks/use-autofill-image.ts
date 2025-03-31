import { useComputed$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

const autoFillImages = [
  'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/ccdf6edc-de94-4b26-40e0-3a7b8035a300',
  'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/63c877dc-abef-4112-5d71-ee5a4227ef00',
  'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/0e41cbf2-e46e-4de4-b935-5cf553960c00',
];

export const useAutofillImage = () => {
  const idx = useSignal(0);
  const imgSrc = useComputed$(() => {
    return autoFillImages[idx.value] + '/w992';
  });

  useVisibleTask$(() => {
    setInterval(() => {
      if (idx.value === 2) {
        idx.value = 0;
        return;
      }
      idx.value++;
    }, 1500);
  });

  return imgSrc;
};
