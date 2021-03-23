/* it's probably about time to switch it to typescript..*/
import {quadstore} from './pouchdb_quadstore';
const st = quadstore();
st.kb = st.raw_query({});
let {addQuads,clear,drop,queries,busy,addQuad,raw_query,kb} = st;
export default st;
export {addQuads,clear,drop,queries,busy,addQuad,raw_query,kb};
