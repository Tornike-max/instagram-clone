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

export interface PostType {
  id?: string;
  caption: string;
  likes: string[];
  comments: CommentType[];
  createdAt: number;
  createdBy: string;
  imageURL: string;
}

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
