<script>
	import {log_store} from './log_store.js';

</script>

log:
<div class="log">
	{#each $log_store as item}
		<div class="log_item">
			{item}
		</div>
	{/each}
</div>

<style>

</style>
