<script>
	import Router from 'svelte-spa-router';
	import Home from './rHome.svelte'
	import Cytoscape from './rCytoscape.svelte'
	//import TextEditor from './rTextEditor.svelte';
	import Prefixes from './rPrefixes.svelte';
	import Quads from './rQuads.svelte';
	import Log from './rLog.svelte';
	import Falcon from './rFalcon.svelte';
	import Name from './rName.svelte'
	import Wild from './rWild.svelte'
	import NotFound from './rNotFound.svelte'

	 let routes = {
		'/': Home,
		'/cytoscape': Cytoscape,

		// Using named parameters, with last being optional
		'/hello/:first/:last?': Name,
		// Wildcard parameter
		// Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
		'/wild': Wild,
		'/wild/*': Wild,
		// Catch-all, must be last
		'*': NotFound,
	}
</script>

<ul>
	<li><a href="#/">Home</a></li>
	<li><a href="#/cytoscape">Cytoscape</a></li>
	<li><a href="#/falcon">Falcon</a></li>
	<li><a href="#/hello/svelte">Say hi!</a></li>
	<li><a href="#/wild/card">Wildcard route</a></li>
</ul>
<br>
<hr>

<Router {routes}/>

<style>
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
		padding: 1em;
	}

	li a:hover {
		text-decoration: underline overline;
	}

</style>

