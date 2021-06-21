export interface LoginRequest {
  user_id: string;
  password: string;
}

export interface SignUpRequest {
  user_id: string;
  password: string;
  username: string;
}

export interface EditRequest {
  username?: string;
  profile_img_src?: string;
  bio?: string;
  website?: string;
  location?: string;
}
