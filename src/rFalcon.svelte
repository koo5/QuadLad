<script>

	rdf_n3_0 = `
		@base <https://bla1>.
		@prefix f: <https://koo5.github.io/rdf/falcon_1>.

		:root a f:thread;
		f:name "social".

		:m0 a f:message;
		f:body "hi";
		f:is_in_response_to_thread :root.

		:m1 a f:message;
		f:body "hey!";
		f:comes_after :m0;
		f:is_in_response_to_thread :root.

		:m2 f:message;
		f:body "does this work?";
		f:is_in_response_to_message :m0.
		`

	function load_demo_data1()
	{


	}

	let input_text = "hi.";
</script>

	<div>
messages here


	</div>


	<textarea bind:value={input_text}></textarea>
