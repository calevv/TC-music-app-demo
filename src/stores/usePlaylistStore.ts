import { create } from "zustand";

interface PlaylistState {
  playlistId: string | null;
  setPlaylistId: (id: string | null) => void;
  clearPlaylistId: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlistId: null,
  setPlaylistId: (id) => set({ playlistId: id }),
  clearPlaylistId: () => set({ playlistId: null }),
}));
