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

	$: len = $results?.length || 0;

</script>
<span class="resource_display">
<sup><small>({len} results of property query)</small></sup>
{#if $results == undefined || $results.length === 0}
∅
{:else}
	<ol>
		{#each $results as result}
			<li>
				<ResultItem {result}/>
			</li>
		{/each}
	</ol>
{/if}
</span>

<style>
    :global(.property_query_results_display) {
        margin: 0;
		border: 1px inset rgba(128,110,164,0.48);
		border-radius: 0px 17px 12px 13px;
	}
    ol {
		list-style: georgian outside;
		margin: 0;
/*		border: 1px inset rgba(128,110,164,0.48);
		border-radius: 0px 17px 12px 13px;*/
	}
</style>
