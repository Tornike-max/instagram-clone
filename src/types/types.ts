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

export type PostType = {
  caption: string;
  likes: never[];
  comments: never[];
  createdAt: number;
  createdBy: string;
  imageURL: string;
  id?: string;
};

export type CommentType = {
  comment: string;
  createdAt: number;
  createdBy: string | undefined;
  postId: string;
};

export type LikeType = {
  likedAt: number;
  likedBy: string | undefined;
  postId: string;
};
