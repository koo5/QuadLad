<script>
	import {raw_query} from './my_quadstore';
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import Outer from './Outer.svelte';
	import * as rdfio from "./myrdf_io.js";
	export let result;
	let node = result.quad[result.position]
	/* here we would look if the quad has any properties of its own */
	let quad_props = raw_query({s:result.quad._id})
	let quad_rrops = raw_query({o:result.quad._id})

</script>
{#if rdfio.is_literal(node)}
	literally {node}
{:else}
	an uri {node}, which is: <br/>
	<Outer uri={node}/>
{/if}
(
<RemainingQuadsTable quads={$quad_props}/>
<RemainingQuadsTable quads={$quad_rrops}/>
)
