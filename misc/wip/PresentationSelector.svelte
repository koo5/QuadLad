<script>



	$: possible_presentations = ["a", "b", "c"];



	//let strategy = strategy_default

</script>




<div>
	<div>
		presentation selection strategy:

		<UriRadio tgt={{store:ws, subj:uri, pred:"rkev:presentation_selection_strategy"}}/>

		<label>
			<input type=radio bind:group={strategy} value={"manual"}>
			Manual
		</label>


	</div>


	<div>
		selected presentation:

		{#each possible_presentations as p (p)}

		<label>
			<input type=radio bind:group={scoops} value={3}>
			Three scoops
		</label>


	</div>

</div>
