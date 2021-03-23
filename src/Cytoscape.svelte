<script>

	import {log} from './log_store.js';
	import {get, writable} from 'svelte/store';
	import {assert} from './utils.js';
	import {Button, ButtonToolbar} from 'sveltestrap';
	import {onMount, setContext} from 'svelte'
	import * as rdfio from './myrdf_io.js';

	import cytoscape from 'cytoscape'
	import edgeConnections from 'cytoscape-edge-connections';
	import GraphStyles from './CytoscapeGraphStyles.js'

	import cola from 'cytoscape-cola';
	//import dagre from 'cytoscape-dagre'
	import klay from 'cytoscape-klay';
	import coseBilkent from 'cytoscape-cose-bilkent';

	import automove from 'cytoscape-automove';


	if (!cytoscape.inited)
	{
		cytoscape.inited = true;
		log('cytoscape.use(...')
		cytoscape.use(edgeConnections);
		cytoscape.use(automove)
		//cytoscape.use(dagre)
		cytoscape.use(klay)
		cytoscape.use(coseBilkent);
		cytoscape.use(cola);
	}


	export let source_query;
	$: console.log($source_query);


	let container = null
	let cyInstance = null
	let ecInstance = null;

	let grid_layout =
		{
			name: 'grid',
			fit: true, // whether to fit the viewport to the graph
			padding: 3, // padding used on fit
			boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
			avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
			avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
			nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
			spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
			condense: false, // uses all available space on false, uses minimal space on true
			rows: undefined, // force num of rows in the grid
			cols: undefined, // force num of columns in the grid
			position: function (node)
			{
			}, // returns { row, col } for element
			sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
			animate: false, // whether to transition the node positions
			animationDuration: 500, // duration of animation in ms if enabled
			animationEasing: undefined, // easing of animation if enabled
			animateFilter: function (node, i)
			{
				return true;
			}, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
			ready: undefined, // callback on layoutready
			stop: undefined, // callback on layoutstop
			transform: function (node, position)
			{
				return position;
			} // transform a given node position. Useful for changing flow direction in discrete layouts
		};


const cose_bilkent_layout =
	{
		name: 'cose-bilkent',
		ready: function ()
		{
		},
		// Called on `layoutstop`
		stop: function ()
		{
		},
		// 'draft', 'default' or 'proof"
		// - 'draft' fast cooling rate
		// - 'default' moderate cooling rate
		// - "proof" slow cooling rate
		quality: 'proof',
		// Whether to include labels in node dimensions. Useful for avoiding label overlap
		nodeDimensionsIncludeLabels: false,
		// number of ticks per frame; higher is faster but more jerky
		refresh: 30,
		// Whether to fit the network view after when done
		fit: true,
		// Padding on fit
		padding: 10,
		// Whether to enable incremental mode
		randomize: true,
		// Node repulsion (non overlapping) multiplier
		nodeRepulsion: 4500,
		// Ideal (intra-graph) edge length
		idealEdgeLength: 50,
		// Divisor to compute edge forces
		edgeElasticity: 0.45,
		// Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
		nestingFactor: 0.1,
		// Gravity force (constant)
		gravity: 0.25,
		// Maximum number of iterations to perform
		numIter: 2500,
		// Whether to tile disconnected nodes
		tile: true,
		// Type of layout animation. The option set is {'during', 'end', false}
		animate: true,
		// Duration for animate:end
		animationDuration: 1500,
		// Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
		tilingPaddingVertical: 10,
		// Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
		tilingPaddingHorizontal: 10,
		// Gravity range (constant) for compounds
		gravityRangeCompound: 1.5,
		// Gravity force (constant) for compounds
		gravityCompound: 1.0,
		// Gravity range (constant)
		gravityRange: 3.8,
		// Initial cooling factor for incremental layout
		initialEnergyOnIncremental: 0.5
	}


	let layout = writable(cose_bilkent_layout);

	$: populate($source_query);

	/*onMount(() =>
	{
		populate(get(source_query))
	});*/

	function populate(query)
	{
		if (!container) return;
		log('cyInstance = cytoscape(...');
		let l = get(layout);
		log(l);
		cyInstance = cytoscape({
			container,
			style: GraphStyles
		})
		cyInstance.on('mouseover', function (evt)
		{
			//log(evt);
		});

		ecInstance = cyInstance.edgeConnections();

		//log('$source_query');
		//log($source_query);
		let nodes = {};
		let edges = [];
		let literals = [];

		query.forEach((quad) =>
		{
			if (quad.s === undefined)
				alert(quad);
			if (quad.p === undefined)
				alert(quad);
			if (quad.o === undefined)
				alert(quad);
			if (quad.g === undefined)
				alert(quad);

			let s = rdfio.stringify_my_node(quad.s);
			let o = rdfio.stringify_my_node(quad.o);
			[s, o].forEach((n) =>
			{
				nodes[n] = nodes[n] || {
					group: 'nodes',
					classes: 'node',
					id: n,
					data: {id: n, label: n}
				}
			});
			edges.push({
				/* ok it's not so easy. with each edge, we should grab a list of graphs that it's in. Then, for each graph, we should grab all its relations, and for each one, create an arrow to/from this edge.*/
				id: quad.idx,
				group: 'edges',
				data: {id: quad.idx, source: s, target: o, label: quad.p/* + ' g:' + quad.g*/}
			});
		});
		//cyInstance.addNodes(nodes);

		const nodes_list = Object.values(nodes);
		log(nodes_list.length + ' nodes')
		cyInstance.add(nodes_list);
		//log(nodes)
		/*Object.keys(nodes).forEach(n =>
			cyInstance.add(nodes[n]));
			*/

		log(edges.length + ' edges')
		//log(edges)
		ecInstance.addEdges(edges);
		set_layout(cose_bilkent_layout);
	}


	function auauau()
	{
		let defaults = {
			// specify nodes that should be automoved with one of
			// - a function that returns true for matching nodes
			// - a selector that matches the nodes
			// - a collection of nodes (very good for performance)
			nodesMatching: function (node)
			{
				return true;
			},

			// specify how a node's position should be updated with one of
			// - function( node ){ return { x: 1, y: 2 }; } => put the node where the function returns
			// - { x1, y1, x2, y2 } => constrain the node position within the bounding box (in model co-ordinates)
			// - { x1, y1, x2, y2, type: 'inside' } => constrain the node position within the bounding box (in model co-ordinates)
			// - { x1, y1, x2, y2, type: 'outside' } => constrain the node position outside the bounding box (in model co-ordinates)
			// - 'mean' => put the node in the average position of its neighbourhood
			// - 'viewport' => keeps the node body within the viewport
			// - 'drag' => matching nodes are effectively dragged along
			reposition: 'mean',

			// specify when the repositioning should occur by specifying a function that
			// calls update() when reposition updates should occur
			// - function( update ){ /* ... */ update(); } => a manual function for updating
			// - 'matching' => automatically update on position events for nodesMatching
			// - set efficiently and automatically for
			//   - reposition: 'mean'
			//   - reposition: { x1, y1, x2, y2 }
			//   - reposition: 'viewport'
			//   - reposition: 'drag'
			// - default/undefined => on a position event for any node (not as efficient...)
			when: undefined,


			//
			// customisation options for non-function `reposition` values
			//

			// `reposition: 'mean'`

			// specify nodes that should be ignored in the mean calculation
			// - a function that returns true for nodes to be ignored
			// - a selector that matches the nodes to be ignored
			// - a collection of nodes to be ignored (very good for performance)
			meanIgnores: function (node)
			{
				return false;
			},

			// specify whether moving a particular `nodesMatching` node causes repositioning
			// - true : the mid node can't be independently moved/dragged
			// - false : the mid node can be independently moved/dragged (useful if you want the mid node to use `reposition: 'drag' in another rule with its neighbourhood`)
			meanOnSelfPosition: function (node)
			{
				return true;
			},

			// `reposition: 'drag'`

			// specify nodes that when dragged cause the matched nodes to move along (i.e. the master nodes)
			// - a function that returns true for nodes to be listened to for drag events
			// - a selector that matches the nodes to be listened to for drag events
			// - a collection of nodes to be listened to for drag events (very good for performance)
			dragWith: function (node)
			{
				return false;
			}
		};
		let options = defaults;
		let rule = cyInstance.automove(options);
		rule.enable();
	}

	function set_layout(l)
	{
		layout.set(l);
		cyInstance.makeLayout(l).run();
	}

	function lalala()
	{
		set_layout(
			{
				name: 'dagre',
				rankDir: 'TB',

				fit: true, // whether to fit the viewport to the graph
				padding: 30, // the padding on fit
				avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
				nodeSep: 150,
				animate: true,
				animationDuration: 1000,
				/*Cytoscape's layout algorithms continue to work. Aux nodes are locked and do not participate in layout.
				*
				* (they move when you move a node by hand)
				* */
			});
	}

	function lalala2()
	{
		set_layout(cose_bilkent_layout);
	}

</script>


<div class="box">
	<div class="row header">
		cy:
		<button on:click='{() => populate($source_query)}'>populate</button>
		<button on:click='{() => lalala()}'>lay out</button>
		<button on:click='{() => lalala2()}'>lay out2</button>
		<button on:click='{() => auauau()}'>enable auto</button>
	</div>
	<div class="row content">
		<div class="graph" bind:this={container}/>
	</div>
</div>


<style>

	.graph {
		background: #ffddff;
		height: 100%;
		/*filter: hue-rotate(0 deg) contrast(1) invert(0) saturate(2);*/
	}


</style>
