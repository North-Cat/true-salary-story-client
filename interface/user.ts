interface IPoint {
  checkInStreak: number;
}
export interface ILoginUserInfo {
  value: ILoginUserInfo;
  displayName: string;
  email: string;
  profilePicture: string;
  _id: string;
  points: IPoint;
  biometricEnable: boolean;
}
export interface IRequestHeaders extends Headers {
  Authorization?: string;
}

export interface IEmail {
  verificationCode: string;
  newEmail: string;
}
