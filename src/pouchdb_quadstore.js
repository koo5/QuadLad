import {derived, writable} from 'svelte/store';
import {assert} from './utils.js';

export const quadstore = () =>
{
	let _writable = writable({});

	/* let's not support multiple instances yet */
	var db = new PouchDB('kittens');
	//db.info(console.log);

	db.changes({
		since: 'now',
		live: true
	}).on('change', () =>
	{
		db.allDocs({include_docs: true, descending: true}, function (err, doc)
		{
			if (err) alert(err);
			console.log("db.allDocs = ");
			console.log(doc);
			_writable.set(doc);
		});
	});

	let query = (_query) => derived(_writable, $_quad_dict =>
	{
		return filter_quads_by_query(_query, $_quad_dict);
	});

	function addQuad(q)
	{
		db.put(q, function callback(err)
		{
			if (err) alert(err);
		});
	}

	return {query};
}


/*
db.allDocs([options], [callback])

Fetch multiple documents, indexed and sorted by the _id. Deleted documents are only included if options.keys is specified.
Options

All options default to false unless otherwise specified.

    options.include_docs
*/


function filter_quads_by_query(query, quads)
{
	let result = [];
	var i = 0;
	Object.keys(quads).forEach(g =>
	{
		i++;
		let q = quads[g];
		assert(g == q.g);
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
