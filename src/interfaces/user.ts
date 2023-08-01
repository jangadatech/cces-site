export const enum Profile {
  TRAFFIC_CONTROL = 'traffic-control',
  ADMIN = 'admin',
  HUMAN_RESOURCES = 'human-resources',
}

export interface User {
  full_name: string;
  username: string;
  password: string;
  profile: Profile | string;
  created_at?: string;
}
