<script>

	/*

	hmm, there's a whole bunch of subtly different interaction mechanics that i want supported by a quad table or by a query result table, by a row, and by a node editor:
	 *	Explicit Save/automatic save
	 *  probably should always just pouchdb.update() and it's up to pouchdb to handle offline situations etc
	 *  with a simple quadstore, it might just bind the RdfNodeEditor value? meh. need to expose an event handler that 1) updates the quad object 2) notifies the db. We'll assume the db can always handle it. Someday we can add error indication, or make it go through the db first.
	 *  handling of >4tuples, g2 etc. Easiest to just expose the db, no smartness

	 *  update of markup-connected quads - i guess this isnt a concern of quads table but rather of the quadstore


	 */

	import {log} from './log_store.js';
	import RdfNodeEditor from './RdfNodeEditor.svelte';
	import SvelteTooltip from 'svelte-tooltip';


	// https://github.com/sveltejs/sapper/issues/774
	//import Popover from 'svelte-popover';
	import {onMount} from 'svelte';
	let Popover;
	onMount(async () => {
        Popover = (await import('svelte-popover')).default;
    });


	export let quad;

	function handleRemove(e)
	{
		// todo call quadstore.remove
		console.log(e);
	}

	function changeQuad()
	{
		// todo call quadstore.update
		// this would be wrong
		quad.s = quad.s + 'XXX';
	}

	function logQuad()
	{
		log(quad.toString());
	}

	function talkAboutThisTriple()
	{

	}


</script>
	<td>
		{quad.idx}
	</td>
	<td>
		<button class="destroy" title="delete" on:click={handleRemove}>x</button>
	</td>
<!--	<RdfNodeEditor quad={quad} node='s'></RdfNodeEditor>
	<RdfNodeEditor quad={quad} node='p'></RdfNodeEditor>
	<RdfNodeEditor quad={quad} node='o'></RdfNodeEditor>
	<RdfNodeEditor quad={quad} node='g'></RdfNodeEditor>
-->
	<td>
		{quad.s}
	</td>
	<td>
		{quad.p}
	</td>
	<td>
		{quad.o}
	</td>
	<td>
		{quad.g}
	</td>
	<td>
		<button title="logQuad" on:click={logQuad}>logQuad</button>
		<button title="changeQuad" on:click={changeQuad}>changeQuad</button>
			<button on:click={talkAboutThisTriple}>talk about this triple</button>&nbsp;<svelte:component this={Popover} overlayColor=#ffffff90>
				<span slot=target>
					<SvelteTooltip tip="why would i want to do that?" bottom>
						<a href="#">?</a>
					</SvelteTooltip>
				</span>
				<span slot=content>
					<h4>why would i want to do that?</h4>
					This button gives the triple it's own context/graph, which in effect becomes a unique identifier of this triple.

					//TODO: separate "pull out" button,
					This allows you to make statements about it. For example:
					<code>sw:mrkev example:is_silly true default.</code>
					becomes:
					<code>sw:mrkev example:is_silly true q0.
					default contains q0 default.
					</code>
					and you can add:
					<code>
						q0 example:is_silly true default.
					</code>
				</span>
			</svelte:component>
	</td>


						<!-- todo
						https://github.com/ItalyPaleAle/svelte-spa-router/issues/66
						https://github.com/sveltejs/svelte/issues/1719
						https://stackoverflow.com/questions/134845/which-href-value-should-i-use-for-javascript-links-or-javascriptvoid0
						https://stackoverflow.com/questions/22940761/best-way-to-create-an-a-link-with-empty-href
						-->
