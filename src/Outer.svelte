<script context="module">
	const displayed_resources = {};
</script>

<script>
	import Outer2 from './Outer2.svelte';
	import { onDestroy } from 'svelte';


	export let uri;
	let old_uri;
	let uri2;
	let span;


	/*
	attempt to keep track of what resources are already displayed somewhere (and thus should probably be just referenced from then on).
	 */

	$: maybe_display(uri, span);
	function maybe_display(uri,span)
	{
		if (!span) return;
		remove_self_from_viewer_list(old_uri,span)
		old_uri = uri;
		let viewers = displayed_resources[uri];
		if (viewers === undefined)
			viewers = [];
		if (viewers.includes(span))
			throw('this shouldnt happen');
		if (viewers.length)
			uri2 = undefined;
		else
			uri2 = uri;
		viewers.push(span);
		displayed_resources[uri] = viewers;
	}

	function remove_self_from_viewer_list(uri,span)
	{
		displayed_resources[uri]?.remove(span);
	}

	onDestroy(() => remove_self_from_viewer_list(uri,span));

</script>



{#if uri != undefined}
	<span bind:this={span}>
		{#if uri2 != undefined}
			<Outer2 uri={uri2}/>
		{:else}
			this resource is already displayed elsewhere.
		{/if}
	</span>
{:else}
	∅
{/if}



<style>

</style>
