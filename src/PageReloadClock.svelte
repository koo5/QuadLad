<script type='js'>
	import { onMount } from "svelte";
	let timer = 0;
	onMount(() => {
		setInterval(() => {
			timer++;
		}, 1000);
	});
</script>

{timer.toString()}
