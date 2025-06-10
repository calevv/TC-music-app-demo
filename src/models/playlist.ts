import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image, Owner, Restriction } from "./commonType";
// UserPlaylist
export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}
// UserPlaylist
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

// BasePlaylist
export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;
}
export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track?: TrackObject | EpisodeObject;
}

export interface TrackObject {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: { isrc?: string; ean?: string; upc?: string };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: Restriction;
  name?: string;
  popularity?: number;
  //   preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}
export interface EpisodeObject {
  // audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  // language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: { fully_played?: boolean; resume_position_ms?: number };
  type: "episode";
  uri: string;
  restrictions?: Restriction;
  show: {
    available_markets: string[];
    copyrights: { text?: string; type?: string }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
  };
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

// 플레이리스트 아이템즈 리퀘스트
export type GetPlaylistItemdRequest = GetCurrentUserPlaylistRequest &
  GetPlaylistRequest;

export type GetPlaylistItemdResponse = ApiResponse<PlaylistTrack>;

// createPlaylist params
export interface CreatePlaylistRequest {
  name: string;
  playlistPublic?: boolean;
  collaborative?: boolean;
  description?: string;
}
