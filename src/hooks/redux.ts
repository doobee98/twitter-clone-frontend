import User from 'models/user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, RootDispatch } from '../modules';

export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthSelector = () => useRootSelector((state) => state.auth);

export const useProfileSelector = () =>
  useRootSelector((state) => state.profile);

export const useHomeSelector = () => useRootSelector((state) => state.home);

export function useUserSelector(userId: string): User | undefined;

export function useUserSelector<T>(
  userId: string,
  filter: (user?: User) => T,
): T;

export function useUserSelector<T>(
  userId: string,
  filter?: (user?: User) => T,
): any {
  return useRootSelector((state) => {
    const user = state.userRecord.userRecord[userId];
    return filter ? filter(user) : user;
  });
}
export const useModalOpen = () => useRootSelector((state) => state.modal);
