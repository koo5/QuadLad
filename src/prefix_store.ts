import {writable} from 'svelte/store';

export class PrefixDeclaration
{
	constructor(
		public prefix:string,
		public uri:string
	){}
}

export const prefix_store = writable([
	new PrefixDeclaration('l', 'http://rdf.lodgeit.net.au/'),
	new PrefixDeclaration('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
	new PrefixDeclaration('rdfs', 'http://www.w3.org/2000/01/rdf-schema#'),
	new PrefixDeclaration('mrkev', 'https://rdf.lodgeit.net.au/mrkev#'),

]);
