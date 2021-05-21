import { SESSION_LIKES_URL, SESSION_STREAM_URL, SONGS_URL } from './../constants/ApiConstants';
import {
    GENRE_PLAYLIST_TYPE,
    GENRE_QUERY_MAP,
    PLAYLIST_PLAYLIST_TYPE,
    SEARCH_PLAYLIST_TYPE,
    SESSION_LIKES_PLAYLIST,
    SESSION_STREAM_PLAYLIST
} from './../constants/PlaylistConstants';

const isFetching = (playlist, playlists) => (playlist in playlists ?
    playlists[playlist].isFetching :
    false
);

export const playlistData = (
    genre,
    search,
    showLike,
    showPlaylist,
    showStream,
    time,
    entities,
    id,
    oauthToken,
    playlists,
) => {
    if (showLike) {
        const playlist = SESSION_LIKES_PLAYLIST;
        return {
            isFetching: isFetching(playlist, playlists),
            playlist,
            playlistUrl: `${SESSION_LIKES_URL}?oauth_token=${oauthToken}`,
            playlistNextUrl: null,
            songs: playlistSongs(playlist, playlists, entities),
        };
    }

    if (showPlaylist) {
        const playlist = `${PLAYLIST_PLAYLIST_TYPE}|${id}`;
        return {
            isFetching: isFetching(playlist, playlists),
            playlist,
            playlistUrl: null,
            playlistNextUrl: null,
            songs: playlistSongs(playlist, playlists, entities),
        };
    }

    if (showStream) {
        const playlist = SESSION_STREAM_PLAYLIST;
        return {
            isFetching: isFetching(playlist, playlists),
            playlist,
            playlistUrl: `${SESSION_STREAM_URL}?oauth_token=${oauthToken}`,
            playlistNextUrl: playlistNextUrl(playlist, playlists, oauthToken),
            songs: playlistSongs(playlist, playlists, entities),
        };
    }

    if (search) {
        const playlist = [SEARCH_PLAYLIST_TYPE, search, time].join('|');
        return {
            isFetching: isFetching(playlist, playlists),
            playlist,
            playlistUrl: searchPlaylistUrl(search, time),
            playlistNextUrl: playlistNextUrl(playlist, playlists),
            songs: playlistSongs(playlist, playlists, entities),
        };
    }

    const playlist = [GENRE_PLAYLIST_TYPE, genre, time].join('|');
    return {
        isFetching: isFetching(playlist, playlists),
        playlist,
        playlistUrl: genrePlaylistUrl(genre, time),
        playlistNextUrl: playlistNextUrl(playlist, playlists),
        songs: playlistSongs(playlist, playlists, entities),
    };
};