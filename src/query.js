export function filter_quads_by_query(query, quads)
{
	let result = [];
	var i = 0;
	//log(quads);
	quads?.forEach(quad =>
	{
		i++;
		if (
			match(query.s, quad.s) &&
			match(query.p, quad.p) &&
			match(query.o, quad.o) &&
			match(query.g, quad.g)
		)
			result.push({...quad, idx: i});
	});
	return result;
}

function match(query, node)
{
	return (query == undefined || query == "?" || query == node);
}


