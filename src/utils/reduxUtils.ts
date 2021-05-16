import { stat } from 'fs';
import { Action } from 'redux';

/* 
  redux-actions 직접 적용하여 사용
  https://jonir227.github.io/develop/2019/10/13/Typescript%EC%97%90%EC%84%9C-redux-actions-%EB%8C%80%EC%B2%B4%ED%95%98%EA%B8%B0.html
*/

function createAction<T, P extends (...args: any) => any>(
  type: T,
  payloadCreator: P,
): (...args: Parameters<P>) => Action<T> & { payload: ReturnType<P> };
function createAction<T>(type: T): () => Action<T>;
function createAction(type: any, payloadCreator?: any) {
  return (...args: any[]) => ({
    type,
    ...(payloadCreator && { payload: payloadCreator(...args) }),
  });
}

type MatchedAction<A, T> = A extends Action<T> ? A : never;

type ReducerMap<A extends Action<string>, S> = {
  [AT in A['type']]?: (state: S, action: MatchedAction<A, AT>) => S;
} & { [key: string]: any };

const handleActions =
  <S, A extends Action<string>>(
    reducerMap: ReducerMap<A, S>,
    defaultState: S,
  ) =>
  (state = defaultState, action: A): S =>
    reducerMap[action.type] ? reducerMap[action.type](state, action) : state;

export { createAction, handleActions };
