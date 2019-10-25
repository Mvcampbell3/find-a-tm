export interface UserInfoObject {
  email: string;
  gameIDs: string[];
  lastOnline: string;
  platforms: {system: string; gamerTag: string}[];
  username: string;
  _id: string;
}