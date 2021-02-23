<script>
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import QS from './my_quadstore';
	let {_quads, query} = QS;

	export let uri;
	/*let presentation_selection_strategy = query_one(
		{s: uri, p: "rkef:presentation_selection_strategy"},
		2,
		"rkef:automatic");*/
	$: presentation = (() =>
	{
		//if (presentation_selection_strategy == "rkef:automatic")
		//...
		return "rkef:table_of_properties";
	})();

	let all_quads = query({s: uri});
	$: unhandled_quads = [...$all_quads];
	$: label = uri;

	/*
		<PresentationSelector uri/>
	 */

</script>
<div>

	{#if $all_quads.length != 0}

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
