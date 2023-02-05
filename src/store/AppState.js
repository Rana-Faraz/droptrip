import { hookstate } from '@hookstate/core';

export const usernameState = hookstate('');
export const emailState = hookstate('');
export const passwordState = hookstate('');
export const userImageState = hookstate('');
export const loadingState = hookstate(false);
export const userState = hookstate('');
