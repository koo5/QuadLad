<script>
	import st from './my_quadstore';
	import UsedQuad from './UsedQuad.svelte';
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';
	import Outer from './Outer.svelte';
	import * as rdfio from "./myrdf_io.js";

	export let result;
	let quad = result.quad;
	let _id = quad._id;
	let node = quad[result.position]
	let quad_props = st.raw_query({s:result.quad._id})
	let quad_rrops = st.raw_query({o:result.quad._id})


</script>
<UsedQuad {_id}/>
{#if rdfio.is_literal(node)}
	literally {node}
{:else}
	<Outer uri={node}/>
{/if}
(
<RemainingQuadsTable quads={$quad_props}/>
<RemainingQuadsTable quads={$quad_rrops}/>
)
