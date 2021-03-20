<script>
	/* Property Display */
	import ResultItem from './ResultItem.svelte';
	export let results;
	/* is either undefined, or a list of
	{
		position: "s"/"o"
		quad: a quad
	}
	*/
</script>
{#if $results == undefined}
-
{:else}
	{#each $results as result}
		<ResultItem {result}/><br/>
	{/each}
{/if}

