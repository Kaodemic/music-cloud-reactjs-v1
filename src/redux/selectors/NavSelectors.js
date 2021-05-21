import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { SESSION_STREAM_PLAYLIST } from './../../constants/PlaylistConstants';
import { PLAYLIST_PATH } from './../../constants/RouterConstants';
import { playlistSchema } from './../../constants/Schemas';
import {
    getEntities,
    getId,
    getPlaylists,
    getOauthToken,
    getPath
} from '../selectors/CommonSelectors';