/* it's probably about time to switch it to typescript..*/
import {quadstore} from './pouchdb_quadstore';
let {addQuad,query,clear,busy} = quadstore();
let kb = query({});
export {
	addQuad,query,clear,busy,
	kb
};


