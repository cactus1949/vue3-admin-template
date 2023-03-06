/**
 * 登录数据类型
 */
export interface LoginData {
  username: string;
  password: string;
  ip: string;
  loginTime: string;
  mobileOrPc: number;
  userAgent: string;
}

/**
 * Token响应类型
 */
export interface TokenResult {
  token: string;
  refreshToken: string;
  expires: number;
}

/**
 * 验证码类型
 */
export interface VerifyCode {
  verifyCodeImg: string;
  verifyCodeKey: string;
}
