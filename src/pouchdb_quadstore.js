import {get, derived, writable} from 'svelte/store';
import {assert} from './utils.js';

/*
svelte store subscription would fire always. in addition:
onreset would fire if no more specific event could fire.
specific events:
	onadd
	onremove

quadstore only implements subscribe for now.
*/

export const quadstore = () =>
{
	/* let's not support multiple instances yet */
	var db = new PouchDB('kittens');
	//db.info(console.log);

	// it's writable, but only from here. Users must call addQuad. So this quadstore would be better as an object implementing the readable store api + addQuad.
	let _writable = writable([]);
	let busy = writable(true);

	function grab_all_quads()
	{
		db.allDocs({include_docs: true, descending: true}, function (err, doc)
		{
			if (err) alert(err);
			//console.log("db.allDocs = ");
			//console.log(doc);
			let quads = [];
			doc.rows.forEach(r => quads.push(r.doc));
			//console.log(quads);
			try
			{
				_writable.set(quads);
			} catch
				(e)
			{
				alert(e)
			}
			busy.set(false);
		});
	}

	db.changes({
		since: 'now',
		live: true
	}).on('change', () =>
	{
		grab_all_quads();
	});

	grab_all_quads();

	let query = (_query) => derived(_writable, quads =>
	{
		return filter_quads_by_query(_query, quads);
	});

	function addQuad(q)
	{
		q._id = q.g;
		db.put(q, function callback(err)
		{
			if (err) alert(err);
		});
	}

	async function clear()
	{
		busy.set(true);
		await get(_writable).forEach(async (x) => {await db.remove(x)});
	}


	return {query, addQuad, clear,busy};
}

function filter_quads_by_query(query, quads)
{
	let result = [];
	var i = 0;
	console.log(quads);
	quads.forEach(q =>
	{
		i++;
		if (
			match(query.s, q.s) &&
			match(query.p, q.p) &&
			match(query.o, q.o) &&
			match(query.g, q.g)
		)
			result.push({...q, idx: i});
	});
	return result;
}

function match(query, node)
{
	if (query == undefined || query == "?")
		return true;
	return (query == node);
}

/*
db.allDocs([options], [callback])

Fetch multiple documents, indexed and sorted by the _id. Deleted documents are only included if options.keys is specified.
Options

All options default to false unless otherwise specified.

    options.include_docs
*/


