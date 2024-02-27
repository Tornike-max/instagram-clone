export interface UserType {
  uid: string;
  username: string;
  email: string;
  fullname: string;
  profilePicURL: string;
  bio: string;
  createdAt: number;
  followers: string[];
  following: string[];
  posts: never[];
}

export type EditAuthUserType = {
  username: string;
  fullname: string;
  bio: string;
  profilePicURL: string;
};
