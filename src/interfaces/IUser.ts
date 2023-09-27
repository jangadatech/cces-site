import { Profile } from "@/enum/Profile";

export interface IUser {
  _id?: string;
  full_name: string;
  username: string;
  password?: string | Buffer;
  profile: Profile | string;
  active: boolean;
  updated_at?: string | null;
  created_at?: string;
}
