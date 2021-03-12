import {addQuads} from './my_quadstore.js';
import {log} from './log_store.js';

export function f(data)
{
	const buffer = [];
	let id = "<"+data['@id']+">";
	if (data['parent'])
	{
		buffer.push({
			s: id,
			p: "rdf:type",
			o: 'delogic:node',
			g: '<idk#' + Date.now().toString() + '>'
		});
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
	addQuads(buffer);
}
