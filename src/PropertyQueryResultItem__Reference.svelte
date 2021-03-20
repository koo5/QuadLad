<script>
	import {raw_query} from './my_quadstore';
	import * as rdfio from "./myrdf_io.js";
	import RemainingQuadsTable from './RemainingQuadsTable.svelte';

	export let result;
	let node = result.quad[result.position]
	/* here we would look if the quad has any properties of its own */
	let quad_props = raw_query({s:result.quad._id})
	let quad_rrops = raw_query({o:result.quad._id})
	$: totlen = $quad_props.length + $quad_rrops.length;

</script>
{#if rdfio.is_literal(node)}
	literally {node}
{:else}
	<a href="/uri/{node}">{node}</a>
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
