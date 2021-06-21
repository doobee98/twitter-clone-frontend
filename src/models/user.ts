export default interface User {
  user_id: string;
  username: string;
  following_count: number;
  follower_count: number;
  joined_at: string;

  profile_img_src?: string;
  bio?: string;
  website?: string;
  location?: string;

  following_flag?: boolean;
}
