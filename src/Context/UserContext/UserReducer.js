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
    default:
      state;
  };
}

export default userReducer;