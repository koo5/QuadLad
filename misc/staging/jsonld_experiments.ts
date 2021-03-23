import * as jsonld from 'jsonld';



const doc = {
  "http://schema.org/name": "Manu Sporny",
  "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
  "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
};
const context = {
  "name": "http://schema.org/name",
  "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
  "image": {"@id": "http://schema.org/image", "@type": "@id"}
};



const hh = {
  "@context": {"dcterms": "http://purl.org/dc/terms/"},
  "@id": "http://example.org/articles/8",
  "dcterms:title": [
    {
      "@value": "Das Kapital",
      "@language": "de"
    },
    {
      "@value": "Capital",
      "@language": "en"
    }
  ]
}

export async function ldo_test()
{
	//const compacted = await jsonld.compact(doc, context);
	//console.log(JSON.stringify(compacted, null, 2));
	//const nquads = await jsonld.toRDF(doc, {format: 'application/n-quads'});
	const nquads = await jsonld.toRDF(hh, {});
	console.log('ldo_test nquads:');
	console.log(nquads);
}
