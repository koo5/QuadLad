<script>
	/* Property Display with Slot */
	export let results;
</script>
{#if results == undefined}
-
{:else}
	{#each results as result}
		<slot node={result}/>
	{/each}
{/if}

