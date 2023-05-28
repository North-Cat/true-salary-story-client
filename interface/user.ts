export interface ILoginUserInfo {
  displayName: string;
  email: string;
  profilePicture: string;
  _id: string;
  points: object;
}

export interface IRequestHeaders extends Headers {
  Authorization?: string;
}
