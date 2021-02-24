import {quadstore} from './pouchdb_quadstore';
let {addQuad,query,clear,busy} = quadstore();
let kb = query({});
export {
	addQuad,query,clear,busy,
	kb
};


