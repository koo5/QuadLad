<script>

	import {kb} from './my_quadstore.js';

</script>


	<h3>the quadstore is now:</h3>
	<ul>
		{#each ($kb) as r (r.idx)}
			<li>{JSON.stringify(r,null,' ')}</li>
		{/each}
	</ul>
