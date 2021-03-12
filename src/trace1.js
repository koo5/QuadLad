import {f} from "./trace_import.js";
f({
  "type":"node",
  "@id":"node1",
  "args": ["arg1" ],
  "parent":"<rooot>",
  "type":"builtins#root"
});
f( {
  "type":"node",
  "@id":"node2",
  "args": ["arg2", "arg3" ],
  "parent":"arg1",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node3",
  "args": ["arg4" ],
  "parent":"arg2",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node3", "str":"node3"});
f( {
  "type":"node",
  "@id":"node4",
  "args": ["arg5", "arg6" ],
  "parent":"arg4",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node5",
  "args": ["arg7" ],
  "parent":"arg5",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node5", "str":"node5"});
f( {
  "type":"node",
  "@id":"node6",
  "args": ["arg8", "arg9" ],
  "parent":"arg7",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node7",
  "args": ["arg10" ],
  "parent":"arg8",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node7", "str":"node7"});
f( {
  "type":"node",
  "@id":"node8",
  "args": [],
  "parent":"arg10",
  "type":"builtins#true"
});
f( {
  "type":"node",
  "@id":"node9",
  "args": ["arg11" ],
  "parent":"arg9",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node9", "str":"node9"});
f( {
  "type":"node",
  "@id":"node10",
  "args": ["arg12", "arg13" ],
  "parent":"arg11",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node11",
  "args": ["arg14" ],
  "parent":"arg12",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node11", "str":"node11"});
f( {
  "type":"node",
  "@id":"node12",
  "args": ["arg15", "arg16" ],
  "parent":"arg14",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node13",
  "args": ["arg17", "arg18", "arg19" ],
  "parent":"arg15",
  "type":"builtins#ifthenelse"
});
f( {
  "type":"node",
  "@id":"node14",
  "args": ["arg20", "arg21" ],
  "parent":"arg17",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node15",
  "args": ["arg23" ],
  "parent":"arg19",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node15", "str":"node15"});
f( {
  "type":"node",
  "@id":"node16",
  "args": ["arg24", "arg25" ],
  "parent":"arg23",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node17",
  "args": ["arg26" ],
  "parent":"arg24",
  "type":"builtins#loaded"
});
f( {"type":"node", "@id":"node17", "str":"node17"});
f( {
  "type":"node",
  "@id":"node18",
  "args": ["arg27", "arg28" ],
  "parent":"arg26",
  "type":"builtins#conjunction"
});
f( {
  "type":"node",
  "@id":"node19",
  "args": ["arg29", "arg30", "arg31" ],
  "parent":"arg27",
  "type":"builtins#ifthenelse"
});
f( {
  "type":"node",
  "@id":"node20",
  "args": ["arg32", "arg33" ],
  "parent":"arg29",
  "type":"builtins#conjunction"
});
