/*

probably we can make this a full store, in the sense that quads (references to quads, technically) will be stored as a list + indexes. That would be the fastest to query. A separate store. And it *also* contribute to the main "multistore", project whatever we want there, which is: <_id quadlad:is_handled_by xxx>.

but a simpler option is to make this a hashmap with quad _id's for keys. Still can project whatever we want into the main store. Can actually be looked up even faster

 */

import { writable } from 'svelte/store';

const handled_quads = {}
let dirty;

/* it's only really writable to us */
export let store = writable(handled_quads);

export function add(_id)
{
	handled_quads[_id] = true;
	dirty = true;
}
export function pop(_id)
{
	delete handled_quads[_id];
	dirty = true;
}

let timer = undefined;
if (timer === undefined)
{
	timer = setInterval(() =>
	{
		//console.log('tick');
		if (dirty)
		{
			dirty = false;
			console.log('boom');
			store.set(handled_quads);
		}
	}, 1000);
}

export default {store, add, pop}
