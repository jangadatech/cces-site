export const enum Profile {
  TRAFFIC_CONTROL = 'traffic-control',
  ADMIN = 'admin',
  HUMAN_RESOURCES = 'human-resources',
}

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
