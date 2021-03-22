<script>
	import Pre from './Pre.svelte';
	import Outer from './Outer.svelte';
	import {filter_quads_by_query} from './query';
	import {raw_query} from './my_quadstore';


	export let uri;

	$: t0 = raw_query({s: uri, p: "delogic:type"});
	$: type_quad_used = $t0[0];
	$: type = type_quad_used?.o;

	/* for now, everything's just a proof node */

	{
		if (type == "control:tracer_invocation")


	}


</script>

<div class="resource_display">
	<div class="resource_display">
		type is: {type}
		{#if type == "control:tracer_invocation"}
			<ul>
				{#each prop('delogic:args') as arg}
					<li>
						<Outer uri={arg}/>
					</li>
				{/each}
			</ul>
		{:else if type == "control:tracer_invocation"}
			
		{/if}

	</div>
</div>
