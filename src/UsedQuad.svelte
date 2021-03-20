<script>
	import { onDestroy } from 'svelte';
	import handled_quads from './handled_quads';

	export let _id;
	//console.log(_id);

	handled_quads.add(_id);
	onDestroy(() => handled_quads.pop(_id));
</script>
