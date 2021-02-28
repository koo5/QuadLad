<script>

	import {generate_unique_uri, df, M, RDF, URI_PLAINTEXT} from './quads.js';
	import {log} from './log_store.js';
	import {quads} from '../stores.js';
	import {reinterpret_element_contents_as_hierarchical_notes,editorElement,siblingElementByClass} from '../lib/actions.js';
	import {saveAs} from 'file-saver';

	let editor;
	let doc_uri_selector;

	export function reinterpret_text_as_hierarchical_notes()
	{
		//debugger;
		reinterpret_element_contents_as_hierarchical_notes(editor)
	}

	export function populate_editor_with_document()
	{
		populate_editor_with_chosen_document(doc_uri_selector.value);
	}

	function populate_editor_with_chosen_document(doc_uri)
	{
		var root = quads.getQuads(doc_uri, M + "root_uri", null)[0].object;

		if (quads.getQuads(root, RDF + "type", URI_PLAINTEXT).length != 0)
		{
			var value = quads.getQuads(root, M + 'value', null)[0].object.value;
			/*console.log("adding value:");
			console.log(value);*/
			editor.innerText += value;
		}
		/*
		for (node in objects(doc_uri, children))
		{
			if is text:
				add span
			if is hierarchical_note
				add div
				add value
				add children

		}*/
	}




	function addCode(cls)
	{
		var tag = document.createElement("SPAN");
		tag.className = cls;
		tag.innerHTML = "This is the text which has been inserted by JS";
		tag.dataset.xxx = "yyy";
		document.getElementById("editor").append(tag);
	}


	function saveText()
	{
		var blob = new Blob([editor.innerText], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "hello world.txt");
	}

	function saveHtml()
	{
		var blob = new Blob([editor.innerHTML], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "hello world.html");
	}


	function onEditorKeydown(event)
	{
		if (event.isComposing || event.keyCode === 229) return;
		if (event.keyCode === 9)
		{ // tab key
			event.preventDefault();  // this will prevent us from tabbing out of the editor
			if (event.shiftKey) log('should unindent');
			// now insert four non-breaking spaces for the tab key
			var doc = editor.ownerDocument;
			var win = doc.defaultView;
			var sel = win.getSelection();
			var range = sel.getRangeAt(0);

			var tabNode = document.createTextNode("\t");
			range.insertNode(tabNode);

			range.setStartAfter(tabNode);
			range.setEndAfter(tabNode);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}



	function makeSpan(e)
	{
		const editor = editorElement(e.target);
		const span = wrap_selection(editor);
		span.dataset.uri = generate_unique_uri('span');
		quads.addQuad(
			span.dataset.uri,
			new suri('mrkev', 'value'),
			df.literal(text_of_span(span))
		);
	}

	function text_of_span(span)
	{
		return span.innerText;
	}

	function wrap_selection(editor)
	{
		const doc = editor.ownerDocument;
		const win = doc.defaultView;
		const sel = win.getSelection();
		const range = sel.getRangeAt(0);
		const span = doc.createElement('span');
		// eventually we'll want something like: https://stackoverflow.com/questions/15157435/get-last-character-before-caret-position-in-javascript
		// or change the paradigm to overlapping markup..somehow
		// the problem is that the text can span across "physical" elements...automatically inserted divs, brs..
		range.surroundContents(span);
		return span;
	}

	function saveAll()
	{

	}

	function onChange(e)
	{
		const view = siblingElementByClass('html_view', e.target);
		view.innerText = e.target.innerHTML;
	}

</script>

<div class="mrkev_div">
	<div>
		<!-- note: in firefox, the dropdown menu doesn't appear until you delete current text -->
		<input bind:this={doc_uri_selector} class="doc_uri_selector" type="text" name="dataset" list="known_datasets" value="http://rdf/dataset1"/>
		<datalist id="known_datasets">
			<option value="http://rdf/dataset1">dataset1</option>
			<option value="dataset2">dataset2</option>
		</datalist>
	</div>

	text document:

	<pre>
		<div bind:this={editor} class="editor" contenteditable="true" on:keydown={onEditorKeydown} on:change={onChange}>
This is a text document. It is also a test document.<br/>
It can be stored in a text file.
Files can be categorized by:
	extension:
		pdf
		txt
		...
	size:
		big
		small
		just right
This is a short document but it hopes to be useful.
		sometimes we indent too much
<br>
		</div>
		<div class="html_view">
		</div>
	</pre>
	<button on:click={reinterpret_text_as_hierarchical_notes(editor)}>reinterpret_text_as_hierarchical_notes</button>
	<button on:click={makeSpan}>selection to rdf</button>
	<button on:click={saveText}>saveText</button>
	<button on:click={saveHtml}>saveHtml</button>
	<button on:click={saveAll}>saveAll</button>
</div>

<style>

	.editor
	{
		padding: 0.3em;

	}

</style>
