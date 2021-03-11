/* it's probably about time to switch it to typescript..*/
import {log} from './log_store.js';
import {quadstore} from './pouchdb_quadstore';
let {queries,addQuad,addQuads,bulkAddQuads,raw_query,clear,busy} = quadstore();
let kb = raw_query({});
export {
	queries,addQuad,addQuads,bulkAddQuads,raw_query,clear,busy,
	kb
};


