export type InputTextType = 'email' | 'text' | 'password';

export interface InputInfoType {
  type: 'ok' | 'error' | 'desc' | 'idle';
  tag: string;
}
