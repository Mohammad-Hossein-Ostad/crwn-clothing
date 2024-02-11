import { UnknownAction } from 'redux';
import { USER_ACTION_TYPES } from './user.types';
import { UserData } from '../../utils/firebase/firebase.utils';
import { signInFailed, signInSuccess, signOutFailed, signUpFailed } from './user.action';

export type UserState = {
  readonly currentUser: UserData | null,
  readonly isLoading: Boolean,
  readonly error: Error | null
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (
  state = INITIAL_STATE,
  action: UnknownAction
) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload
    }
  }

  if (signInFailed.match(action)) {
    return {
      ...state,
      error: action.payload
    }
  }

  if (
    signInFailed.match(action) ||
    signOutFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload
    }
  }

  return state
};
