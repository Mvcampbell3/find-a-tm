export interface PlayerMatrix {
  gameID: object;
  gamerTag: string;
  platform: string;
  selfRating: number;
  userID:{
    lastOnline: string,
    _id: string
  };
  latest: string
}