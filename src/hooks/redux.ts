import User from 'models/user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../modules';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthSelector = () => useAppSelector((state) => state.auth);

export const useProfileSelector = () =>
  useAppSelector((state) => state.profile);

export const useHomeSelector = () => useAppSelector((state) => state.home);

export function useUserSelector(userId: string): User | undefined;

export function useUserSelector<T>(
  userId: string,
  filter: (user?: User) => T,
): T;

export function useUserSelector<T>(
  userId: string,
  filter?: (user?: User) => T,
): any {
  return useAppSelector((state) => {
    const user = state.userRecord.userRecord[userId];
    return filter ? filter(user) : user;
  });
}
