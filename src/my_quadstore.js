/* it's probably about time to switch it to typescript..*/
import {quadstore} from './pouchdb_quadstore';
let {addQuad,bulkAddQuads,raw_query,clear,busy} = quadstore();
let kb = raw_query({});
export {
	addQuad,bulkAddQuads,raw_query,clear,busy,
	kb
};


