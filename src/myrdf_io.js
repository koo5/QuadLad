import * as N3 from 'n3';


export function try_parse_rdf_node(x)
{
	const r = rdf_node_parsing_result(x);
	if ('errors' in r)
		throw r;
	else
	{
		return r.value;
	}
}

export function rdf_node_parsing_result(x)
{
	return {value:x};
}

export function rdf_node_textual_representation(n)
{
	return n;
}


function my_quad_to_n3_quad(i)
{


}

function n3_quad_to_my_quad(i)
{


}



export async function fetch_dataset_from_uri()
{
	const url = "dataset1.n3";
	let response = await fetch(url);
	if (!response.ok) throw Error(response.statusText);
	let text = await response.text();
	return await load_dataset_from_text(text);
}

async function load_dataset_from_text(n3_text)
{
	const kb = [];
	const parser = new N3.Parser({format: 'N3'});
	await parser.parse(n3_text,
		(error, quad, prefixes) =>
		{
			if (error)
				console.log(error);
			if (quad)
				kb.push(quad);
		});
	/*console.log("n3 text loaded:");
	console.log(kb);*/
	return kb;
}


export function save_myrdf_quad_query_as_file_download($query)
{
	const writer = new N3.Writer({ prefixes: prefixes_as_dict() });
	const q = $query;
	const cb = (x) => {if (x)console.log(x)}
	for (var i = 0; i < q.length; i++)
		writer.addQuad(my_quad_to_n3_quad(q[i]),cb);
	writer.end((error, result) => {
		if (error)
			throw error;
		let blob = new Blob([result], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "hello world.trig");
	})
}


