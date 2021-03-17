<script>
	import Outer from './Outer.svelte';
	import * as rdfio from "./myrdf_io.js";


	export let result;
	let node = result.quad[result.position]


/* here we would look if the graph has any properties of its own */

</script>

{#if rdfio.is_literal(node)}
	{node}
{:else}
	viewing {node}:<br\>
	<Outer uri={node}/>
{/if}

