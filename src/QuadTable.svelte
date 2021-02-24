<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import {query} from './my_quadstore.js';

	let quads = query({});
</script>
<div>
	{#if $quads.length != 0}
		store contains {$quads.length} quads.
	{:else}
		store is empty.
	{/if}

	<ul>
		add:
		{#each $quads as item}
			<QuadsListItem quad={item}/>
		{/each}
	</ul>
</div>
<style>
	ul {
		margin: 0.5ex 0;
		padding: 0px;
	}
</style>
