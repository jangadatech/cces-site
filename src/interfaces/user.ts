export enum Profile {
  'traffic-control' = 'traffic-control',
  'admin' = 'admin',
  'human-resources' = 'human-resources',
}

export interface User {
  username: string;
  password: string;
  profile: Profile;
}
