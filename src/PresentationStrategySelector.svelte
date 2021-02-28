<script>
	import {query2} from './my_quadstore';

	export let resource_uri;
	export let presentation_selection_strategy;

	const DEFAULT = "presentation_strategy:automatic";

	$: presentation_selection_strategy_r = $query2({
			query:{s: resource_uri, p: "rkef:presentation_selection_strategy"},
			determinancy_check:'?',
			result_inspector:{just:'o'},
			default_result:DEFAULT});
	$: presentation_selection_strategy =
		presentation_selection_strategy_r.error ?
			DEFAULT
			:
			presentation_selection_strategy_r.value;
</script>

{#if presentation_selection_strategy_r.error}
	ERROR: {presentation_selection_strategy_r.error}
{:else}
	

{/if}
