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
	// oops, this really should be a dict not a list
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
		//q._id = q.g;
		//db.put(q, function callback(err)
		db.post(q, function callback(err)
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










/*
These functions return svelte stores, that is, objects that you can subscribe() to and be notified of changes. See https://svelte.dev/tutorial/readable-stores

These svelte stores will, in turn, be notified when the underlying quadstore changes. In future, we want a whole datalog or prolog engine underneath, instead o
f just a dumb quadstore. And, ideally, one whose queries will be persistent and reactive wrt it's underlying kb changes, propagating changes up the proof tree
with minimal overhead. At that point, this architecture will make more sense. Right now, when the underlying quadstore changes, all the queries just redo all t
he work.
*/


/*
What follows is the first layer of convenience, wrapping the purely non-deterministic-ish query() interface.

export function query_first
    // this is querying one or more solutions, then picking the first one
    query("+doc(

export function query_one(

	_default
)
{
    //query("!doc(
}

export function reason_one(

// default would be taken from kb
){
..
}
*/


/*
rdf node format/representation:
the quadstore holds a list of prefixes. Uris are always normalized, if possible (by some algo that picks the last form that eats of the most characters from th
e url that is being shortened, or whatever.
full uris are signified by a string like this: "<http://blablabla>".
"?" is free for use for signifying a wildcard.
rdf literals are represented by objects .. maybe let's use N3.js classes?

*/
