<script>
	import UsedQuad from './UsedQuad.svelte';
	import st from './my_quadstore';
	import * as rdfio from "./myrdf_io.js";
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';

	export let result;
	let quad = result.quad;
	let _id = quad._id;
	let node = quad[result.position]
	let quad_props = st.raw_query({s:result.quad._id})
	let quad_rrops = st.raw_query({o:result.quad._id})
	$: totlen = $quad_props.length + $quad_rrops.length;



</script>
<UsedQuad {_id}/>
{#if rdfio.is_literal(node)}
	literally {node}
{:else}
	<a href="/#/uri/{node}">{node}</a>
{/if}
{#if totlen}
<sup><small>({totlen} annotations)</small></sup>
(
{#if $quad_props.length}
<RemainingQuadsTable quads={$quad_props}/>
{/if}
{#if $quad_rrops.length}
<RemainingQuadsTable quads={$quad_rrops}/>
{/if}
)
{/if}
