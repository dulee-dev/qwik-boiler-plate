import { describe, test, expect } from 'vitest';
import { imageApi } from './cf-image-api.effect';
import path from 'path';
import { readFileSync } from 'fs';
import appRoot from 'app-root-path';

const IMAGE_FILE_PATH = path.join(
  appRoot.path,
  '__tests__/fixtures',
  'tmall-logo.png'
);

const convertImageFileToFormData = (
  imageFilePath: string,
  fileName: string
) => {
  const image = readFileSync(imageFilePath);
  const formData = new FormData();
  const blobData = new Blob([image]);
  formData.append('file', blobData, fileName);
  return formData;
};

describe('imageApi', () => {
  describe('createPresignedUploadUrl', () => {
    test('if ok, status 201', async () => {
      const { statusCode, body } = await imageApi.createPresignedUploadUrl();

      expect(statusCode).toEqual(201);
      expect(typeof body.data.url).toEqual('string');
    });
  });

  describe('uploadImage', () => {
    test('if ok, check [200] body', async () => {
      const {
        body: {
          data: { url },
        },
      } = await imageApi.createPresignedUploadUrl();
      const formData = convertImageFileToFormData(
        IMAGE_FILE_PATH,
        `test-${new Date().toISOString()}.png`
      );
      const { statusCode } = await imageApi.uploadImage(url, formData);

      expect(statusCode).toEqual(200);
    });
  });
});
