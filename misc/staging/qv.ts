	//
	//
	// function view(uri)
	// {
	// 	return view_domain_specific_type(uri)
	// 		|| view_generic_type(uri);
	// }
	//
	// function view_domain_specific_type(uri)
	// {
	// 	view_type('ldit:alert', uri)
	// 	||
	//
	// }
	//
	// /* note this function. The template/method chosen to display a particular iri is ..*/
	// function view_type(
	//
	// 'ldit:alert', uri
	// )
	// {
	// 	q(uri, 'a', ldit
	// :
	// 	alert, g
	// ).
	// 	map((g) =>
	// 		graph(g, q(uri, 'ldit:key', key, g5).map(() =>
	// 			graph(g5, [span(key), ':', view_type('ldit:alert_value', val)]))));
	// }
	//
	// function view_generic_type(uri)
	// {
	// 	return '?'
	// }
	//


