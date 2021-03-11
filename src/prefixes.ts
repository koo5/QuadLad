import {PrefixDeclaration,prefix_store} from './prefix_store';
import {get} from "svelte/store";
//import {log} from './log_store.js';


export function prefixes_as_dict()
{
	const r:any = {}
	get(prefix_store).forEach((x:PrefixDeclaration) => {
		r[x.prefix] = x.uri
	});
	return r
}

export function try_to_shorten_uri(uri:string)
{
	const matches:Array<PrefixDeclaration> =
		get(prefix_store).filter(
			(prefix_declaration:PrefixDeclaration) => uri.startsWith(prefix_declaration.uri))
	if (matches.length == 0)
		return;
	matches.sort(function(a:PrefixDeclaration, b:PrefixDeclaration) {
		return a.uri.length - b.uri.length || a.uri.localeCompare(b.uri);});
	const match = matches[0];
	if (matches.length > 1)	window.alert('debug me')
	return match.prefix + ':' + uri.substring(match.uri.length)
}

export function expand_prefix(prefix:string)
{
	const matches:Array<PrefixDeclaration> = get(prefix_store).filter((x:PrefixDeclaration) => x.prefix == prefix)
	if (matches.length == 1)
		return matches[0].uri
	if (matches.length > 1)
		throw 'multiple prefixes match'
}


