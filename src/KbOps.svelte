<script>
  	import { Button } from 'sveltestrap';
	import {addQuad,raw_query,kb,clear,busy} from './my_quadstore';
	import * as rdfio from './myrdf_io.js';

	$: console.log('kb has ' + $kb.length + ' items');

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
		console.log(n3);
	}

</script>
kb:
<Button disabled={$busy} on:click='{() => clear0()}'>Clear</Button>
<button on:click='{() => load_quads()}'>Load</button>
<button on:click='{() => addDummyQuad()}'>Add random</button>
<button on:click={()=>rdfio.save_myrdf_quad_query_as_file_download($kb)}>Save as TriG</button>
<button on:click={()=>load_demo_dataset()}>Load demo N3</button>
| {$kb.length} items |
