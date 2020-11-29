import { action } from './actions';

export const SET_IS_MOBILE = 'SET_IS_MOBILE';

export const setIsMobile = (isMobile) => action(SET_IS_MOBILE, isMobile);
