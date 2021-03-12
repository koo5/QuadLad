<script>

	import {log} from './log_store.js';
  	import { Button } from 'sveltestrap';
	import {queries,addQuad,raw_query,kb,clear,busy} from './my_quadstore';
	import * as rdfio from './myrdf_io.js';

	$: log('kb has ' + $kb.length + ' items');

	async function clear0()
	{
		await clear();
	}

	function load_quads()
	{

	}

	function addDummyQuad()
	{
		addQuad({
				s: "<x>",
				p: "<x>",
				o: "<x>",
				g: '"' + Date.now().toString() + '"'
			});
	}

	async function load_demo_dataset()
	{
		const n3 = await rdfio.load_n3_from_url("dataset1.n3");
		log(n3);
	}

</script>
kb:
<Button disabled={$busy} on:click='{() => clear0()}'>Clear</Button>
<button on:click='{() => load_quads()}'>Load</button>
<button on:click='{() => addDummyQuad()}'>Add random</button>
<button on:click={()=>rdfio.save_myrdf_quad_query_as_file_download($kb)}>Save as TriG</button>
<button on:click={()=>load_demo_dataset()}>Load demo N3</button>
<button on:click={()=>{
	PouchDB.replicate('kittens', 'http://localhost:5984/kittens', {live: true})}}>
	Replicate to</button>
<a href="http://localhost:5984/_utils/#database/kittens/_all_docs">localhost</a>
|
<br>
| {$kb.length} items |
queries:{JSON.stringify($queries, null, '')} | busy:{$busy} |

