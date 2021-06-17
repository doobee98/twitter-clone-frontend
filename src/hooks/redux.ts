import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../modules';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthSelector = () => useAppSelector((state) => state.auth);
export const useModalOpen = () => useAppSelector((state) => state.modal);
