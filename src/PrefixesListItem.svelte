<script>
	import {log} from './log_store.js';

	export let prefix;

	function handleRemove(e)
	{
		log(e);
	}

</script>

<li>


	<button class="destroy" title="delete" on:click={handleRemove}>x</button>
	<input class="edit" value={prefix.prefix}/>
	<input class="edit" value={prefix.uri}/>


</li>

<style>

	input {
		width: 40%;
	}

</style>
