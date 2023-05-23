import { types } from "../Types/types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.register:
      return {
        ...state,
        user: { ...action.payload },
      };
    case types.login:
      return {
        ...state,
        user: { ...action.payload },
      };
    case types.logout:
      return {
        ...state,
        user: null,
      };
    case types.followUser:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case types.unfollowUser:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (foll) => foll !== action.payload
          ),
        },
      };
    case types.createPlaylist: {
      return {
        ...state,
        user: {
          ...state.user,
          playlists: [...state.user.playlists, action.payload],
        },
      };
    }
    case types.togglePlaylistVisibility: {
      return {
        ...state,
        user: {
          ...state.user,
          playlists: [...action.payload],
        },
      };
    }
    case types.deletePlaylist: {
      return {
        ...state,
        user: {
          ...state.user,
          playlists: [...action.payload],
        },
      };
    }
    case types.deleteAlbum: {
      return {
        ...state,
        user: {
          ...state.user,
          playlists: [...action.payload],
        },
      };
    }
    case types.deleteTrack: {
      return {
        ...state,
        user: {
          ...state.user,
          tracks: [...action.payload],
        },
      };
    }
    case types.updatePlaylist: {
      return {
        ...state,
        user: {
          ...state.user,
          playlists: [...action.payload],
        },
      };
    }
    case types.updateAlbum: {
      return {
        ...state,
        user: {
          ...state.user,
          albums: [...action.payload],
        },
      };
    }
    case types.updateSong: {
      return {
        ...state,
        user: {
          ...state.user,
          uploadedTracks: [...action.payload],
        },
      };
    }
    case types.updateUsername:
      return {
        ...state,
        user: action.payload
      }
    case types.updateUserProfileImage:
      return {
        ...state,
        user: {...state.user, profilePhoto: action.payload}
      }
    case types.toggleFollowAlbum:
      return {
        ...state,
        user: {...state.user, albums: action.payload}
      }
    case types.toggleFollowingTrack:
      return {
        ...state,
        user: {...state.user, tracks: action.payload}
      }
    default:
      state;
  };
}





export default userReducer;
