import {f} from "./trace_import.js";
f( {
  "@id":"node1",
  "args": ["arg1" ],
  "parent":"<dummy>",
  "type":"control:tracer_invocation"
});
f( {
  "@id":"node2",
  "args": ["arg2", "arg3" ],
  "parent":"arg1",
  "type":"proof:conjunction"
});
f( {
  "@id":"node3",
  "args": ["arg4" ],
  "parent":"arg2",
  "type":"proof:loaded"
});
f( {"@id":"node3", "str":"node3"});
f( {
  "@id":"node4",
  "args": ["arg5", "arg6" ],
  "parent":"arg4",
  "type":"proof:conjunction"
});
f( {
  "@id":"node5",
  "args": ["arg7" ],
  "parent":"arg5",
  "type":"proof:loaded"
});
f( {"@id":"node5", "str":"node5"});
f( {
  "@id":"node6",
  "args": ["arg8", "arg9" ],
  "parent":"arg7",
  "type":"proof:conjunction"
});
f( {
  "@id":"node7",
  "args": ["arg10" ],
  "parent":"arg8",
  "type":"proof:loaded"
});
f( {"@id":"node7", "str":"node7"});
f( {"@id":"node8", "args": [], "parent":"arg10", "type":"proof:true"});
f( {
  "@id":"node9",
  "args": ["arg11" ],
  "parent":"arg9",
  "type":"proof:loaded"
});
f( {"@id":"node9", "str":"node9"});
f( {
  "@id":"node10",
  "args": ["arg12", "arg13" ],
  "parent":"arg11",
  "type":"proof:conjunction"
});
f( {
  "@id":"node11",
  "args": ["arg14" ],
  "parent":"arg12",
  "type":"proof:loaded"
});
f( {"@id":"node11", "str":"node11"});
f( {
  "@id":"node12",
  "args": ["arg15", "arg16" ],
  "parent":"arg14",
  "type":"proof:conjunction"
});
f( {
  "@id":"node13",
  "args": ["arg17", "arg18", "arg19" ],
  "parent":"arg15",
  "type":"proof:ifthenelse"
});
f( {
  "@id":"node14",
  "args": ["arg20", "arg21" ],
  "parent":"arg17",
  "type":"proof:conjunction"
});
f( {
  "@id":"node16",
  "args": ["arg23" ],
  "parent":"arg19",
  "type":"proof:loaded"
});
f( {"@id":"node16", "str":"node16"});
f( {
  "@id":"node17",
  "args": ["arg24", "arg25" ],
  "parent":"arg23",
  "type":"proof:conjunction"
});
f( {
  "@id":"node18",
  "args": ["arg26" ],
  "parent":"arg24",
  "type":"proof:loaded"
});
f( {"@id":"node18", "str":"node18"});
f( {
  "@id":"node19",
  "args": ["arg27", "arg28" ],
  "parent":"arg26",
  "type":"proof:conjunction"
});
f( {
  "@id":"node20",
  "args": ["arg29", "arg30", "arg31" ],
  "parent":"arg27",
  "type":"proof:ifthenelse"
});
f( {
  "@id":"node21",
  "args": ["arg32", "arg33" ],
  "parent":"arg29",
  "type":"proof:conjunction"
});
