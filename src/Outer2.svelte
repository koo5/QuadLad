<script>
	import {settings} from './user';
	import UsedQuad from './UsedQuad.svelte';
	import {log} from './log_store.js';
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import DelogicNode from './DelogicNode.svelte';
	import {raw_query} from './my_quadstore';
	import {filter_quads_by_query} from './query.js';
	import Pd from './Pd.svelte';
	import Pr from './Pr.svelte';
	import Pds from './Pds.svelte';
	import {get, derived, writable} from 'svelte/store';
	import UnhandledQuads from './UnhandledQuads.svelte';
	import DelogicSlot from './DelogicSlot.svelte';

	export let uri;

	//let presentation_selection_strategy;
	/*
		<PresentationSelector uri/>
	 */

	let q1 = raw_query({s: uri});
	let q2 = raw_query({o: uri});
	$: v1 = $q1;
	$: v2 = $q2;
	$: all_quads = v1?.concat(v2);
	$: remaining_quads = all_quads;
	$: remaining_quads_len = remaining_quads.length;
	$: label = uri;

	$: type_quad_used = ((v1) =>
	{
		//if (presentation_selection_strategy == "rkef:automatic")
		//...
		// i'll just run the query "by hand" here for now..
		let xx = filter_quads_by_query({s: uri, p: "rdf:type"}, v1);
		return xx?.[0];
	})(v1);

	$: rdf_type = type_quad_used?.o;

	$: presentation = ((rdf_type) =>
	{
		if (rdf_type == 'delogic:node')
			return 'delogic:node';
		if (rdf_type == 'delogic:slot')
			return 'delogic:slot';
		return "rkef:table_of_properties";
	})(rdf_type);

	function prop(uri, pred)
	{
		return derived(raw_query({s: uri, p: pred}), (sp_quads) =>
		{
			let results = []
			sp_quads.forEach(q =>
				results.push({position: 'o', quad: q}));
			return results;
		});
	}

	console.log(uri);

</script>
<div class="resource_display">




	{#if all_quads.length != 0}
		{#if $settings.type}
			viewing <code>{uri}</code> (a {rdf_type}) as a <code>{presentation}</code>:<br/>
		{/if}


		<!-- my domain specific views go here for now -->
		{#if presentation == undefined}
			presentation == undefined!
		{:else if presentation == 'delogic:node'}
			<DelogicNode {uri}/>
		{:else if presentation == 'delogic:slot'}
			<DelogicSlot {uri}/>
		{:else if presentation == "robust:result"}
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

		<UnhandledQuads {uri}/>

	{:else}
		we know nothing about <code>{label}</code> here.
	{/if}
	<UsedQuad {type_quad_used}/>

</div>

<style>
    :global(.resource_display) {
        margin: 0.3em;
		border: 1px inset rgba(28,110,164,0.48);
		border-radius: 0px 17px 12px 13px;
	}
</style>
