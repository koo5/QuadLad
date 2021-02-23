<script>

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
		console.log(e);
	}

	function changeQuad()
	{
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

<li>

	<button class="destroy" title="delete" on:click={handleRemove}>x</button>
	<RdfNodeEditor bind:node={quad.subject}></RdfNodeEditor>
	<RdfNodeEditor bind:node={quad.predicate}></RdfNodeEditor>
	<RdfNodeEditor bind:node={quad.object}></RdfNodeEditor>
	<RdfNodeEditor bind:node={quad.graph}></RdfNodeEditor>
	<button title="logQuad" on:click={logQuad}>logQuad</button>
	<button title="changeQuad" on:click={changeQuad}>changeQuad</button>
	<span>
        <button on:click={talkAboutThisTriple}>talk about this triple</button>
        <svelte:component this={Popover} overlayColor=#ffffff90>
            <span slot=target>
                <SvelteTooltip tip="why would i want to do that?" bottom>
                    <!-- todo
                    https://github.com/ItalyPaleAle/svelte-spa-router/issues/66
                    https://github.com/sveltejs/svelte/issues/1719
                    https://stackoverflow.com/questions/134845/which-href-value-should-i-use-for-javascript-links-or-javascriptvoid0
                    https://stackoverflow.com/questions/22940761/best-way-to-create-an-a-link-with-empty-href
                    -->
                    <a href="http://rooot.cz">?</a>
                </SvelteTooltip>
            </span>
            <span slot=content>
                <h4>why would i want to do that?</h4>
                This button gives the triple it's own context/graph, which in effect becomes a unique identifier of this triple.
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
    </span>


</li>
<style>




li {
	padding: 1px;
	margin: 1px;
}

</style>
