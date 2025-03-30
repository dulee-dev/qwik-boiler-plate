/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WEB_BASE_URL: string;
  readonly PUBLIC_MAIN_BASE_URL: string;
  readonly PUBLIC_GTAG: string;

  readonly CF_ACCOUNT_EMAIL: string;
  readonly CF_GLOBAL_KEY: string;
  readonly CF_KY_NAMESPACE_ID: string;
  readonly CF_ACCOUNT_ID: string;

  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  export interface ProcessEnv {
    readonly PUBLIC_WEB_BASE_URL: string;
    readonly PUBLIC_MAIN_BASE_URL: string;
    readonly PUBLIC_GTAG: string;

    readonly CF_ACCOUNT_EMAIL: string;
    readonly CF_GLOBAL_KEY: string;
    readonly CF_KY_NAMESPACE_ID: string;
    readonly CF_ACCOUNT_ID: string;
  }
}
