/*

here the goal is sketching out a fact-store that doesn't internally use quads, but a deep data structure like a json(-ld) document.

// first variant, a store that doesn't even try to handle any uris or somesuch


data = [
{
	a: 'delogic#node',
	str: "bdbbbbbb",
	slots: [
		{
			has_child:
			{
				str: 'xxxxxx',
				slots: []
			}
		}
	]
}
]

query:
	?what a 'delogic#node'.
	limits answering logic such:
		if subject is a variable, subject is iteratively unified with every item of data.
			the bound result is a js reference to the js object.
		if subject is a js object, the own props and values are iterated.

in other words, an initial query from the ui returns a js object reference,






















 */
