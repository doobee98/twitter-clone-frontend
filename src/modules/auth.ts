import { createAction, handleActions } from 'utils/reduxUtils';
import User from '../models/user';
import { LoginRequest, SignUpRequest } from '../models/request/auth';

const LOGIN = 'auth/login' as const;
const LOGOUT = 'auth/logout' as const;
const SIGNUP = 'auth/signup' as const;

interface AuthState {
  currentUser?: User;
}

export const login = createAction(LOGIN, (request: LoginRequest) => request);
export const logout = createAction(LOGOUT);
export const signup = createAction(SIGNUP, (request: SignUpRequest) => request);

type AuthActions = ReturnType<typeof login | typeof logout | typeof signup>;

// [TODO: NEED TO BE REMOVED] default user login data for test
const defaultCurrentUser: User = {
  id: 'doobee98',
  username: '이두섭',
  following_num: 20,
  follower_num: 2,
};

const initialState: AuthState = {};

export const authReducer = handleActions<AuthState, AuthActions>(
  {
    [LOGIN]: (state, action) => ({
      currentUser: { ...defaultCurrentUser },
    }),
    [LOGOUT]: (state) => ({
      currentUser: undefined,
    }),
    [SIGNUP]: (state, action) => ({
      currentUser: {
        id: action.payload.id,
        username: action.payload.username,
        following_num: 0,
        follower_num: 0,
      },
    }),
  },
  initialState,
);
