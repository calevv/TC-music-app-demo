import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}

export interface Playlist {
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
  tracks?: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };

  items: {
    added_at?: string;
    added_by?: {
      external_urls?: ExternalUrls;
      href?: string;
      id?: string;
      type?: string;
      uri?: string;
    };
    is_local?: boolean;
    track?: TrackObject | EpisodeObject;
  }[];
  type?: string;
  uri?: string;
}

export interface TrackObject {
  album?: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: { reason: string };
    type: string;
    uri: string;
    artists: {
      external_urls?: ExternalUrls;
      href?: string;
      id?: string;
      type?: string;
      uri?: string;
    }[];
  };
  artists?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    name?: string;
    type?: string;
    uri?: string;
  }[];
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
  restrictions?: { reson?: string };
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
}
export interface EpisodeObject {
  audio_preview_url: string | null;
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
  language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: { fully_played?: boolean; resume_position_ms?: number };
  type: string;
  uri: string;
  restrictions?: { reson?: string };
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
    type: string;
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
