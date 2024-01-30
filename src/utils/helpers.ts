/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounceType } from '../types';

function debounce(fn: Function, wait: number): debounceType {
  let timeout: number | undefined;

  function debouncedFn(...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  }

  function cancel() {
    clearTimeout(timeout);
  }
  debouncedFn.cancel = cancel;
  return debouncedFn;
}

function noop(): void {}

export { debounce, noop };
export type { debounceType };
