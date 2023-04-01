export type FormData = {
  email?: string;
  password?: string;
  confirm_password?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: "M" | "F" | "O";
};

type Post = {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

type Comment = {
  id: number;
  postId: number;
  content: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
};
