export interface PlayerMatrix {
  gameID: {
    developer: string;
    img_url: string;
    ps4: boolean;
    reviewed: boolean;
    team_game: boolean;
    title: string;
  };
  gamerTag: string;
  platform: string;
  selfRating: number;
  userID: {
    lastOnline: string,
    _id: string
  };
  latest: string
}