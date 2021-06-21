import { DependencyList, EffectCallback, useEffect } from 'react';

export const useDebounce = (
  effect: EffectCallback,
  deps?: DependencyList,
  timerOffset = 500,
): void => {
  useEffect(() => {
    const timer = setTimeout(effect, timerOffset);

    return () => clearTimeout(timer);
  }, deps);
};

export const useDebouncePreset = (
  preset: EffectCallback,
  effect: EffectCallback,
  deps?: DependencyList,
  timerOffset = 500,
): void => {
  useEffect(() => {
    preset();
    const timer = setTimeout(effect, timerOffset);

    return () => clearTimeout(timer);
  }, deps);
};
