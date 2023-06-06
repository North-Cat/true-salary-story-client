export interface ILoginUserInfo {
  value: ILoginUserInfo;
  displayName: string;
  email: string;
  profilePicture: string;
  _id: string;
  points: IPoint;
}

interface IPoint {
  checkInStreak: number
}
export interface IRequestHeaders extends Headers {
  Authorization?: string;
}
