<script>
	import Pre from './Pre.svelte';
	import Outer from './Outer.svelte';
	export let params = {}
	let uri = params.uri;
</script>
<main>
	<Pre x={uri}/>
	<h3>viewing <code>{uri}</code>:</h3>
	<Outer {uri}/>
</main>


