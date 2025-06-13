import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import {
  Show,
  SimplifiedAudiobook,
  SimplifiedEpisode,
  SimplifiedPlaylist,
  TrackObject,
} from "./playlist";

export enum SEARCH_TYPE {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Track = "track",
  Show = "show",
  Episode = "episode",
  Audiobook = "audiobook",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: "audio";
}

export interface SearchResponse {
  tracks?: ApiResponse<TrackObject>;
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  playlists?: ApiResponse<SimplifiedPlaylist>;
  show?: ApiResponse<Show>;
  episode?: ApiResponse<SimplifiedEpisode>;
  audiobook?: ApiResponse<SimplifiedAudiobook>;
}
