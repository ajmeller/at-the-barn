import { IArtist } from "./artist.type";

export interface IAlbum {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
  artists: IArtist[];
}

//sort by popularity, release date, date addeds
