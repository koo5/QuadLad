<script>

	import { readable, derived, writable } from 'svelte/store';


	export let default_value = "";

	export let value = default_value;

	<input type="text" id="threshold" bind:value={new_threshold}/>

</script>
