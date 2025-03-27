import { breakpoints } from '~/libs/ux/ux.constant';

export interface UploadImageResponseData {
  result: {
    id: string;
    filename: string;
    uploaded: string; // dateIso
    requireSignedURLs: boolean;
    variants: string[]; // https://imagedelivery.net/<ACCOUNT_HASHED>/<IMAGE_ID>/<VARIANT>
  };
  success: boolean;
  errors: {
    code: number;
    message: string;
  }[];
  messages: string[];
}

export type SizeUnit = 'px' | 'vw';
export type SizesValue = { value: number; unit: SizeUnit };

export type SizesOption = Partial<
  Record<keyof typeof breakpoints, SizesValue>
> &
  Record<'base', SizesValue>;
