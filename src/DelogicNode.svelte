<script>
	import {settings} from './user';
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

<div>

	{#if $settings.type}
		delogic_type is: {delogic_type}
	{/if}

	<div>
		{#if delogic_type == "control:tracer_invocation"}
			trace:
				<Outer uri={args[0]}/>
		{:else if delogic_type == "proof:true"}
			true.
		{:else if delogic_type == "proof:conjunction"}
			%%:<ul>
			{#each args as arg}
				<li>
					<Outer uri={arg}/>
				</li>
			{/each}
		</ul>
		{/if}
	</div>

	<UsedQuad {args_quad}/>
</div>
