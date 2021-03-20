<script>
	import Pre from './Pre.svelte';

	import {Table} from 'sveltestrap';
	import * as rdfio from './myrdf_io';

	export let quads;

	function node_str(x)
	{
		return rdfio.stringify_my_node(x)
	}

</script>

<table responsive>
	<thead>
	<tr>
		<th scope="col">idx</th>
		<th scope="col">s</th>
		<th scope="col">p</th>
		<th scope="col">o</th>
		<th scope="col">g</th>
		<th scope="col">_id</th>
	</tr>
	</thead>
	<tbody>
		{#each quads as quad (quad.idx)}
			<tr>
				<th scope="row">{quad.idx}</th>
				<td>{node_str(quad.s)}</td>
				<td>{node_str(quad.p)}</td>
				<td>{node_str(quad.o)}</td>
				<td>{node_str(quad.g)}</td>
				<td>{node_str(quad?._id)}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		margin: 0;
		border: 1px inset rgba(128, 110, 164, 0.48);
		border-radius: 0px 17px 12px 13px;
		border-collapse: separate;
		border-spacing: 1em 0;
	}


</style>
