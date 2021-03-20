<script>
	import Outer from './Outer.svelte';
	let uri = "<x>";
</script>

<main>
	<h3>viewing <code>{uri}</code>:</h3>
	<Outer {uri}/>
</main>


