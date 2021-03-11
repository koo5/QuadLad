<script>
	import {log} from './log_store.js';
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import {raw_query} from './my_quadstore';

	export let uri;

	$: presentation = (() =>
	{
		//if (presentation_selection_strategy == "rkef:automatic")
		//...
		return "rkef:table_of_properties";
	})();

	let q1 = raw_query({s: uri});
	let q2 = raw_query({o: uri});
	$: console.log($q1);
	$: console.log($q2);
	$: v1 = $q1;
	$: v2 = $q2;
	$: all_quads = v1.concat(v2);
	$: unhandled_quads = all_quads;
	$: label = uri;


	let presentation_selection_strategy;
	/*
		<PresentationSelector uri/>
	 */

</script>
<div>

	{#if all_quads.length != 0}

		<!-- my domain specific views go here for now -->
		{#if presentation == "robust:result"}
			"robust:result"
		{:else if presentation == "robust:document_set"}
			<!-- <ul>
				{#each $query(uri, "rdf:items", "?") as item (item.idx)}
					<li><ResourcePointer uri={item.uri}/></li>
				{/each}
			</ul> -->
		{:else}
			<!-- display just a label, and leave the rest to RemainingQuadsTable -->
			<pre>{label}</pre>
		{/if}

		<!-- a table of all remaining quads -->
		<RemainingQuadsTable quads={unhandled_quads}/>

	{:else}
		we know nothing about <code>{label}</code> here.
	{/if}


</div>
