import {localStorageSharedStore} from './svelte-shared-store';
export const user = localStorageSharedStore('quadlad_user', {});
export const settings = localStorageSharedStore('quadlad_settings', {});

