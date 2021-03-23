<script>

	import {store as handled_quads} from './handled_quads';
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import st from './my_quadstore';

	/* given all quads about a resource */
	export let uri;
	let q1 = st.raw_query({s: uri});
	$: v1 = $q1;
	let q2 = st.raw_query({o: uri});
	$: v2 = $q2;
	$: all_quads = v1?.concat(v2);

	/* find those not used by any domain-specific view component */
	$: unhandled_quads = find_unhandled_quads(all_quads, $handled_quads)
	function find_unhandled_quads(all_quads, handled_quads)
	{
		//console.log(JSON.stringify(all_quads,null,2))
		//console.log(JSON.stringify(handled_quads,null,2))
		const r = [];
		if (!handled_quads) return r;
		all_quads.forEach(q =>
		{
			//if (get(raw_query({s: q._id, p:'quadlad:is_handled_by'})).length == 0)
			if (!handled_quads[q._id])
				r.push(q)
		});
		return r;
	}


</script>


{#if unhandled_quads.length}
	<sup><small>({unhandled_quads.length} unhandled quads about {uri})</small></sup>
	<RemainingQuadsTable quads={unhandled_quads}/>
{/if}

