<script>
	import Outer from './Outer.svelte';
	import UsedQuad from './UsedQuad.svelte';
	import st from './my_quadstore';
	import {single_prop_expected_quad_query} from './query';

	export let uri;

	$: single_prop_expected_quad = single_prop_expected_quad_query(uri);

	$: args_quad = single_prop_expected_quad('delogic:args');
	$: args = $args_quad?.o;

	$: delogic_type_quad = single_prop_expected_quad("delogic:type");
	$: delogic_type = ($delogic_type_quad)?.o;


</script>

<UsedQuad {args_quad}/>

<div class="resource_display">

	delogic_type is: {delogic_type}
	<div>
		{#if delogic_type == "control:tracer_invocation"}
			args:
			<ul>
				{#each args as arg}
					<li>
						<Outer uri={arg}/>
					</li>
				{/each}
			</ul>
		{:else if delogic_type == "control:tracer_invocation"}

		{/if}
	</div>
</div>
