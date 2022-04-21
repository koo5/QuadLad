<script>
	let colour = 'red';

	function handleMouseOver(e) {
		colour = 'green';
	}
	function handleMouseOut(e) {
		colour = 'red';
	}
</script>



<svg height="400" width="400">
	<defs>
		<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
			<polygon points="0 0, 10 3.5, 0 7" />
		</marker>
	</defs>

	<line x1="0" y1="50" x2="250" y2="50" stroke="#000"
		  stroke-width="2" marker-end="url(#arrowhead)"/>

	<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={colour}
			on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}/>
</svg>

<a href="https://github.com/koo5/QuadLad">fork me on github.</a>

