<script>
	import Outer from './Outer.svelte';
	import QS from './my_quadstore';
	let {addQuad,query} = QS;
	let result = query({});

	$: console.log($result)

	function load_quads()
	{




	}

	function addquad()
	{
		addQuad({
				s: "<x>",
				p: "<x>",
				o: "<x>",
				g: '"' + Date.now().toString() + '"'
			});
	}



</script>

<main>

	<hr>
	<button on:click|preventDefault='{() => load_quads()}'>Load quads</button>
	<hr>
	<button on:click|preventDefault='{() => addquad()}'>Add random quad</button>
	<br>
	<h3>the quadstore is now:</h3>
	<ul>
		{#each ($result) as r (r.idx)}
			<li>{JSON.stringify(r,null,' ')}</li>
		{/each}
	</ul>


	<hr>
	<h3>viewing <code>"&#60;x&#62;"</code>:</h3>
	<Outer uri="<x>"/>

</main>

<br><br><br><br><br><br><br><br><br><br><br><br>
<small><a href="https://github.com/koo5/">fork me on github.</a></small>
