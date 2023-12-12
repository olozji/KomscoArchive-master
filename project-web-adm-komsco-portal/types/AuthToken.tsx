export interface AuthToken {
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
