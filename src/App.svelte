<div class="box">
	<div class="row header">
		<ul>
			<li><a href="#/">Home</a></li>
			<li><a href="#/raw">Raw</a></li>
			<li><a href="#/quad_table">QuadTable</a></li>
			<li><a href="#/cytoscape">Cytoscape</a></li>
			<li><a href="#/delogic">Delogic</a></li>
			<li><a href="#/falcon">Falcon</a></li>
			<li><a href="#/about">About</a></li>
		</ul>
	</div>
	<Dbg/>
	<div class="row header">
		<KbOps/>
	</div>
	<div class="row content">
		<Router {routes}/>
	</div>
	<div class="row footer"><small><Minibuffer/></small></div>

</div>

<svelte:window on:keydown={(evt) => {
	//console.log(evt);
	let x = JSON.stringify(evt.key, null, '');
	minibuffer_store.set(x)}}
/>



<script>
	import {settings} from './user';
	import {onMount, setContext} from 'svelte';
	import {minibuffer_store} from './log_store.js';
	import Router from 'svelte-spa-router';
	import Home from './rHome.svelte'
	import Raw from './Raw.svelte'
	import Dbg from './Dbg.svelte'
	import QuadTable from './QuadTable.svelte'
	import Cytoscape from './rCytoscape.svelte'
	//import TextEditor from './rTextEditor.svelte';
	import Prefixes from './rPrefixes.svelte';
	import Log from './rLog.svelte';
	import Falcon from './rFalcon.svelte';
	import Name from './rName.svelte'
	import Uri from './rUri.svelte'
	import Delogic from './rDelogic.svelte'
	import Wild from './rWild.svelte'
	import NotFound from './rNotFound.svelte'
	import About from './About.svelte'
	import KbOps from './KbOps.svelte'
	import Minibuffer from './Minibuffer.svelte'

	/*let handled_quads = {};
	setContext('handled_quads', handled_quads);*/

	let routes = {
		'/': Home,
		'/cytoscape': Cytoscape,
		'/raw': Raw,
		'/quad_table': QuadTable,
		'/about': About,
		'/delogic': Delogic,
		// ---
		// Using named parameters, with last being optional
		'/uri/:uri': Uri,
		'/hello/:first/:last?': Name,
		// Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
		'/wild': Wild,
		'/wild/*': Wild,
		// Catch-all, must be last
		'*': NotFound,
	}

	minibuffer_store.set('welcome!');

</script>






<style>
    :global(html, body) {
		line-height: 1em;
        position: relative;
        width: 100%;
        height: 100%;
        background: #eeeeff;
        margin: 0;
        padding: 0;
        color: #333;
        box-sizing: border-box;
        max-width: 100%;
		white-space: nowrap;
		/*overflow: hidden;*/
		text-overflow: ellipsis;
    }

    :global(.box) {
		line-height: 1em;
    	padding-left: 1em;
    	padding-right: 1em;
        display: flex;
        flex-flow: column;
        margin: 0;
    }

	:global(.btn) {
		padding-top: 0px !important;
		padding-bottom: 0px !important;
		line-height: 1 !important;
	}

    :global(.box .row) {
		padding:0.2ex;
    }

    :global(.box .row.header) {

		border-bottom: 1px dotted orange;
        flex: 0 1 auto;
        /* The above is shorthand for:
		flex-grow: 0,
		flex-shrink: 1,
		flex-basis: auto
		*/
    }

    :global(.box .row.content) {
        flex: 1 1 auto;
    }

    :global(.box .row.footer) {
    border-top: 1px dotted orange;
        flex: 0 1;
        padding: 0;
    }

    :global(.debug) {
        background: #dddddd;
		border: 1px dotted blue;
        color: #222;

    }


    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    li {
        float: left;
    }

    li a {
        text-align: center;
        margin: 1ex;
    }

    li a:hover {
        text-decoration: underline wavy blue;
    }
</style>


