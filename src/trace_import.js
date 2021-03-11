import {bulkAddQuads} from './my_quadstore.js';

let buffer = [];
let my_timeout;

function flush_buffer()
{
	if (buffer.length != 0)
	{
		console.log('flush_buffer() o-> bulkAddQuads');
		bulkAddQuads(buffer);
		buffer = [];
	}
}

export function f(data)
{


	if (my_timeout)
		clearTimeout(my_timeout);

	my_timeout = setTimeout(() =>
	{
		flush_buffer();
	}, 300);



	let id = "<"+data['@id']+">";
	if (data['parent'])
	{
		buffer.push({
			s: id,
			p: "delogic:parent",
			o: data['parent'],
			g: '<idk#' + Date.now().toString() + '>'
		});
	}
	if (data['str'])
	{
		buffer.push({
			s: id,
			p: "delogic:str",
			o: data['str'],
			g: '<idk#' + Date.now().toString() + '>'
		});
	}
	if (data['type'])
	{
		buffer.push({
			s: id,
			p: "delogic:type",
			o: data['type'],
			g: '<idk#' + Date.now().toString() + '>'
		});
	}
	if (data['args'])
	{
		buffer.push({
			s: id,
			p: "delogic:args",
			o: data['args'],
			g: '<idk#' + Date.now().toString() + '>'
		});
	}
}
