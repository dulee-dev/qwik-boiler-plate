/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WEB_URL: string;
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_GTAG: string;
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  export interface ProcessEnv {
    readonly PUBLIC_WEB_URL: string;
    readonly PUBLIC_API_URL: string;
    readonly PUBLIC_GTAG: string;
  }
}
