export enum Profile {
  'traffic-control' = 'traffic-control',
  'admin' = 'admin',
  'human-resources' = 'human-resources',
}

export interface User {
  full_name: string;
  username: string;
  password: string;
  profile: Profile | string;
  created_at?: string;
}
