/*

document-ish fact store:, exactly json-ld, or rather my json-ld dialect?
for effisiency, we'd stick to a single level (flattened), no object nesting.
let list_of_objects = kb[graph][subject][predicate]

for example:

{
	'@default':
	{
		"node1":
		{
			"type": ["node"],
			"args": [["arg1"]],
			"parent": ["<rooot>"],
			"type": ["builtins#root"]
		}
	}
	'graph2':
	{

	}
}

what is important is that this could be effeciently queried only in one direction. Ie, normally, to store quads, you probably have a dict of quads:
{	q1: {s:sss,p:ppp,o:ooo,g:ggg}}
and indexes:
	opsg index: {ooo:{ppp:{sss:{ggg:q1}}}}
	...

i think what would be interesting for performance is to try, for some data, to keep just a single index / just have a document store, and only support the "unusual" traversal directions asynchronously. Possibly, every interval (let's say 500ms), first collect a list of "non-essential" queries, and then traverse the whole document store, basically coming up with the quads on-the-fly, and looking up matching queries :)


 */
