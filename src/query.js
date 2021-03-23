import {derived} from 'svelte/store';
import st from './my_quadstore';

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

export function single_prop_expected_quad_query(s)
{
	return p => derived(st.raw_query({s, p}), x => x[0]);
}
export function single_rprop_expected_quad_query(o)
{
	return p => derived(st.raw_query({o, p}), x => x[0]);
}
