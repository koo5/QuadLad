<script>
  	import { Button } from 'sveltestrap';
	import {addQuad,query,kb,clear,busy} from './my_quadstore';
	import {save_myrdf_quad_query_as_file_download} from './myrdf_io.js';

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


</script>
kb:
<Button disabled={$busy} on:click='{() => clear0()}'>Clear</Button>
<button on:click='{() => load_quads()}'>Load</button>
<button on:click='{() => addDummyQuad()}'>Add random</button>
<button on:click={()=>save_myrdf_quad_query_as_file_download($kb)}>Save as TriG</button>

