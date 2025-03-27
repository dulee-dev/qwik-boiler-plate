import { ResponseBody } from '~/libs/main/main.type';
import { UploadImageResponseData } from './image.type';

export const imageApi = {
  async createPresignedUploadUrl() {
    const response = await fetch(
      `${import.meta.env.PUBLIC_MAIN_BASE_URL}/image/presigned-upload-url`,
      {
        method: 'POST',
      }
    );
    const statusCode = response.status;
    const responseBody = (await response.json()) as ResponseBody<{
      url: string;
    }>;

    return {
      body: responseBody,
      statusCode,
    };
  },

  async uploadImage(url: string, formData: FormData) {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const statusCode = response.status;
    const data = (await response.json()) as UploadImageResponseData;
    return {
      body: data,
      statusCode,
    };
  },
};
