<script>
	import Router from 'svelte-spa-router';
	import Home from './rHome.svelte'
	import Raw from './Raw.svelte'
	import QuadTable from './QuadTable.svelte'
	import Cytoscape from './rCytoscape.svelte'
	//import TextEditor from './rTextEditor.svelte';
	import Prefixes from './rPrefixes.svelte';
	import Log from './rLog.svelte';
	import Falcon from './rFalcon.svelte';
	import Name from './rName.svelte'
	import Wild from './rWild.svelte'
	import NotFound from './rNotFound.svelte'
	import About from './About.svelte'
	import KbOps from './KbOps.svelte'

	let routes = {
		'/': Home,
		'/cytoscape': Cytoscape,
		'/raw': Raw,
		'/quad_table': QuadTable,
		// Using named parameters, with last being optional
		'/hello/:first/:last?': Name,
		// Wildcard parameter
		// Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
		'/wild': Wild,
		'/wild/*': Wild,
		'/about': About,


		// Catch-all, must be last
		'*': NotFound,
	}
</script>

<div class="box">
	<div class="row header">
		<ul>
			<li><a href="#/">Home</a></li>
			<li><a href="#/raw">Raw</a></li>
			<li><a href="#/quad_table">QuadTable</a></li>
			<li><a href="#/cytoscape">Cytoscape</a></li>
			<li><a href="#/falcon">Falcon</a></li>
			<li><a href="#/hello/svelte">Say hi!</a></li>
			<li><a href="#/wild/card">Wildcard route</a></li>
			<li><a href="#/about">About</a></li>
		</ul>
	</div>
	<div class="row header">
		<KbOps/>
	</div>
	<div class="row content">
		<Router {routes}/>
	</div>
</div>

<style>
    :global(html, body) {
        position: relative;
        width: 100%;
        height: 100%;
        background: #eeeeff;
        margin: 0;
        padding: 0;
        color: #333;
        box-sizing: border-box;
    }

    .box {
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    .box .row {
		padding:0.2ex;
    }

    .box .row.header {
		border-bottom: 1px dotted orange;
        flex: 0 1 auto;
        /* The above is shorthand for:
		flex-grow: 0,
		flex-shrink: 1,
		flex-basis: auto
		*/
    }

    .box .row.content {

        flex: 1 1 auto;
    }

    .box .row.footer {
        flex: 0 1 40px;
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

