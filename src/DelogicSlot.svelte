<script>
	import Outer from './Outer.svelte';
	import UsedQuad from './UsedQuad.svelte';
	import {single_rprop_expected_quad_query} from './query';

	export let uri;

	$: single_rprop_expected_quad = single_rprop_expected_quad_query(uri);
	$: child_quad = single_rprop_expected_quad('delogic:parent');
	$: child = $child_quad?.s;

</script>

<UsedQuad {child_quad}/>
	<Outer uri={child}/>
