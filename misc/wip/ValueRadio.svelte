<script>

	export let uri;
	export let default_value = "";
	export let value = default_value;
	export let options = [];

</script>


{#each options as o (o.uri)}
	<label>
		<input type=radio bind:group={value} value={o.uri}>
		{o.label}
	</label>
{/each}
