export interface LoginUserInfo {
  displayName: string;
  email: string;
  profilePicture: string;
  _id: string;
}

export interface RequestHeaders extends Headers {
  Authorization?: string;
}
