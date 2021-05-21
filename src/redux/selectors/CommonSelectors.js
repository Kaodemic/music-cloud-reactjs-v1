import { createSelector } from 'reselect';
import { TABLET_WIDTH } from './../../constants/EnvironmentConstants';
import { PLAYLIST_PATH, SONGS_PATH } from './../../constants/EnvironmentConstants';

// entities selectors
export const getEntities = state => state.entities;

// environment selectors
export const getHeight = state => state.environment.height;
export const getWidth = state => state.environment.width;
export const getSidebarHeight = createSelector(
    getHeight,
    height => height - 200,
);
export const getIsMobile = createSelector(
    getWidth,
    width => width < TABLET_WIDTH,
);
// playlists selectors
export const getPlaylists = state => state.playlists;
// player selectors
export const getCurrentTime = state => state.player.currentTime;
export const getIsPlaying = state => state.player.isPlaying;
export const getPlayingIndex = state => state.player.playingIndex;
export const getPlaylist = state => state.player.playlist;
export const getPlayingSongId = createSelector(
    getPlayingIndex,
    getPlaylist,
    getPlaylists,
    (playingIndex, playlist, playlists) => {
        if (playlist && playingIndex !== null) {
            return playlists[playlist].items[playingIndex];
        }

        return null;
    },
);

export const getRepeat = state => state.player.repeat;
export const getShuffle = state => state.player.shuffle;