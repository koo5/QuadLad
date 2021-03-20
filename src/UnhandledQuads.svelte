<script>

	import {get, derived, writable} from 'svelte/store';
	import Pre from './Pre.svelte';
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import {raw_query} from './my_quadstore';
	import {filter_quads_by_query} from './query.js';
	export let uri;
	let q1 = raw_query({s: uri});//.concat($raw_query({o: uri}));
	$: v1 = $q1;
	let q2 = raw_query({o: uri});
	$: v2 = $q2;
	$: unhandled_quads = find_unhandled_quads(v1?.concat(v2))
	function find_unhandled_quads(x)
	{
		const r = [];
		x.forEach(q =>
		{
			if (get(raw_query({s: q._id, p:'quadlad:is_handled_by'})).length == 0)
				r.push(q)
		});
		return r;
	}


</script>


{#if unhandled_quads.length}
	<sup><small>({unhandled_quads.length} unhandled quads about {uri})</small></sup>
	<RemainingQuadsTable quads={unhandled_quads}/>
{/if}

