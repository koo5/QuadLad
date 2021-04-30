<script>

	/* Construct this component with (an arbitrarily-named) prop signifying the quad that's been used up by your domain-specific resource display. It will keep the handled_quads store up to date. */

	import { onDestroy } from 'svelte';
	import {add,pop} from './handled_quads';

	/* grab the prop, no matter what name it was passed by. (Docs says this may be inefficient but whatever) */
	$: x = Object.values($$props)[0];

	/* if it's a whole quad, grab just the _id */
	$: _id = x?._id || x;

	/* whenever _id changes, pop the old one and add the new one (also pops "undefined" but whatever) */
	let old__id;
	$: pop(old__id), old__id = _id, add(_id);

	/* cleanup */
	onDestroy(() => pop(_id));
</script>

uses:<pre>{JSON.stringify(x,null,' ')}</pre>
