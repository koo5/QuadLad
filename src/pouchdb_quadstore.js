import {get, derived, writable} from 'svelte/store';
import {log} from './log_store.js';
import _ from 'underscore';
import {filter_quads_by_query} from './query.js';
import {quads_are_equal} from './myrdf_io';

export const quadstore = () =>
{

	// it's writable, but only from here. Users must call addQuad. So this quadstore would be better as an object implementing the readable store api + addQuad.
	// oops, this really should be a dict not a list
	let _writable = writable([]);

	function drop()
	{
		busy.set(true);
		db.destroy().then(function () {
			busy.set(false);
		}).catch(function (err) {
		  alert(err);
		})
	}

	/* let's not support multiple instances yet */
	var db = new PouchDB('kittens');
	//db.info(log);

	let busy = writable(true);
	let queries = writable([]);

	let grab_all_quads__timeout;

	function grab_all_quads()
	{
		if (grab_all_quads__timeout) clearTimeout(grab_all_quads__timeout);
		grab_all_quads__timeout = setTimeout(() =>
		{
			let query_tracker = {"ts": Date.now().toString()};
			queries.update(queries => queries.concat(query_tracker));
			db.allDocs({include_docs: true, descending: true}, function (err, doc)
			{
				if (err) alert(err);
				//log("db.allDocs = ");
				//log(doc);
				let quads = [];//todo let's switch this back to an object
				/*
				db.allDocs([options], [callback])
				Fetch multiple documents, indexed and sorted by the _id. Deleted documents are only included if options.keys is specified.
				^ idk what indexed means here.
				*/
				doc.rows.forEach(r => quads.push(r.doc));
				//log(quads);
				try
				{
					//log('_writable.set(quads);');
					_writable.set(quads);
				} catch (e)
				{
					alert(e)
				}
				busy.set(false);
				queries.update(queries => _.without(queries, query_tracker));
			});
		}, 500);
	}

	db.changes({
		since: 'now',
		live: true
	}).on('change', () =>
	{
		grab_all_quads();
	});

	grab_all_quads();

	function raw_query(query_spec)
	{
		let current_result = undefined;
		return derived(_writable, (quads, setter) =>
		{
			let new_result = filter_quads_by_query(query_spec, quads);
			if (query_results_are_equal(new_result, current_result))
				return;
			current_result = new_result;
			setter(new_result);
		});
	}

	function bulkAddQuads(qs)
	{
		db.bulkDocs(qs, {}, function (err)
		{
			if (err)
			{
				alert(err);
			}
		});
	}

	let buffer = [];

	function flush_buffer()
	{
		log('flush_buffer() o-> bulkAddQuads');
		bulkAddQuads(buffer);
		buffer = [];
	}

	let addQuads__timeout;
	function addQuads(q)
	{
		buffer = buffer.concat(q);
		if (addQuads__timeout)
			clearTimeout(addQuads__timeout);
		addQuads__timeout = setTimeout(() => flush_buffer(), 300);
	}

	function addQuad(q)
	{
		addQuads([q]);
	}

	async function clear()
	{
		busy.set(true);
		/*await get(_writable).forEach(async (x) =>
		{
			try
			{
				await db.remove(x)
			} catch (e)
			{
				alert(e);
			}
		});
		*/
		let docs = get(_writable);
		docs.forEach(x =>
		{
			x._deleted = true;
		});
		db.bulkDocs(docs, {}, function (err)
		{
			if (err)
			{
				alert(err);
			}
		});
	}

	function query2()
	{

	}

	return {queries, raw_query, query2, addQuad, addQuads, bulkAddQuads, clear,drop, busy};
}


/*
What follows is the first layer of convenience, wrapping the purely non-deterministic-ish raw_query() interface.
*/

function xxx()
{
	const query_option_descriptions = {
		determinancy_check: {
			description: `
			An error is indicated if this is violated.
			Determinancy check happens before default_result logic, so, it acts on the actual results, not on results amended with defaults.			
			`,
			options: {
				'!': 'one solution',
				'?': 'zero or one solution',
				'+': 'one or more solutions',
				'*': 'any number of solutions'
			}
		},
		/*result_selector: {
			i guess not needed, determinancy_check already fully specifies if the result should be a single quad or a list..
		}*/
		result_inspector: {
			description: 'should the whole quad be returned, or just some node?',
			default: 'whole',
			options: {
				whole: "whole quad",
				/* approximating a prolog functor here lol:*/
				/*just: {type: 'variable', bound:false}}:'a particular node'
				for example:
				{just:'s'}: 'subject',
				{just:'p'}: 'predicate',
				{just:'o'}: 'object'
				*/
			}
		},
		default_result: {
			description: "in case of '!', what node to return if there was no result",
			options:
				{
					'no default': 'no default',
					default: 'string'
				}
		}
	}
}


/*
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


/*
The query functions functions return svelte stores, that is, objects that you can subscribe() to and be notified of changes. See https://svelte.dev/tutorial/readable-stores

These svelte stores will, in turn, be notified when the underlying quadstore changes. In future, we want a whole datalog or prolog engine underneath, instead o
f just a dumb quadstore. And, ideally, one whose queries will be persistent and reactive wrt it's underlying kb changes, propagating changes up the proof tree
with minimal overhead. At that point, this architecture will make more sense. Right now, when the underlying quadstore changes, all the queries just redo all t
he work.

svelte store subscription would fire always. in addition:
onreset would fire if no more specific event could fire.
specific events:
	onadd
	onremove

quadstore only implements subscribe for now.

*/


/*

multiple sources: for exapmle, one read-only,
one rw. The rw one is where we would also store what quads are currently used up



*/


function query_results_are_equal(a, b)
{
	if (a === undefined)
		return (b === undefined);
	if (b === undefined)
		return false;
	if (a.length != b.length)
		return false;
	for (let i = 0; i < a.length; i++)
		if (!quads_are_equal(a[i], b[i]))
			return false;
	return true;
}
