<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {raw_query} from './my_quadstore.js';

	let quads = raw_query({});
</script>

	{#if $quads.length != 0}
		store contains {$quads.length} quads.
	{:else}
		store is empty.
	{/if}

	<table>
		<tr>
			<th>idx</th>
			<th></th>
			<th>subject</th>
			<th>predicate</th>
			<th>object</th>
			<th>graph</th>
			<th></th>
		</tr>
		{#each $quads as item}
			<tr>
			<QuadsListItem quad={item}/>
			</tr>
		{/each}
	</table>

