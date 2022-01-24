import { IArtist } from "./artist.type";

export interface ITrack {
  id: string;
  name: string;
  href: string;
  artists: IArtist[];
  albumId: string;
}
