import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthState } from 'modules/auth';
import { HomeState } from 'modules/home';
import { ModalState } from 'modules/modal';
import { ProfileState } from 'modules/profile';
import { UserRecordState } from 'modules/userRecord';
import type { RootState, RootDispatch } from '../modules';

export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthSelector = <T>(selectFunc: (state: AuthState) => T) =>
  useRootSelector((state) => selectFunc(state.auth));

export const useProfileSelector = <T>(selectFunc: (state: ProfileState) => T) =>
  useRootSelector((state) => selectFunc(state.profile));

export const useHomeSelector = <T>(selectFunc: (state: HomeState) => T) =>
  useRootSelector((state) => selectFunc(state.home));

export const useModalSelector = <T>(selectFunc: (state: ModalState) => T) =>
  useRootSelector((state) => selectFunc(state.modal));

export const useUserRecordSelector = <T>(
  selectFunc: (state: UserRecordState) => T,
) => useRootSelector((state) => selectFunc(state.userRecord));
