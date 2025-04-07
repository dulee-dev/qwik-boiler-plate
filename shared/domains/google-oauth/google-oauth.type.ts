export interface GoogleOAuthPayloadResponse {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export interface GoogleOAuthPayload {
  email: string;
  name: string;
  picture: string;
  googleId: string;
}
