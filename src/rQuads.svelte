<script>
	import QuadsListItem from './QuadsListItem.svelte';
	import my_quadstore from './my_quadstore.js';
	import {save_myrdf_quad_query_as_file_download} from './myrdf_io.js';
	let quads = my_quadstore.query({});
</script>
<div>
	{#if $quads.length != 0}
		store contains {$quads.length} quads.
	{:else}
		store is empty.
	{/if}
	<button on:click={()=>save_myrdf_quad_query_as_file_download($quads)}>save as TriG</button>
	<ul>
		add:
		{#each $quads as item}
			<QuadsListItem quad={item}/>
		{/each}
	</ul>
</div>
<style>
	ul {
		margin: 0px;
		padding: 0px;
	}
</style>
