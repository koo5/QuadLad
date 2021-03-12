import {writable} from 'svelte/store';

export const log_store = writable([]);

export function log(x)
{
	//x = Date.now().toLocaleString() + ': ' + x;
	console.log(x);
	log_store.update(old_state => [x].concat(old_state));
}

export const minibuffer_store = writable([]);

