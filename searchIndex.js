// Pregenerates the search index. Improving performance.
// node searchIndex.js
const lunr = require('./assets/js/lunr.js')

const fs = require('fs');
let rawdata = fs.readFileSync('_site/assets/js/search-data.json');

var documents = JSON.parse(rawdata)

var idx = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 200 });
  this.field('content', { boost: 2 });
  this.field('relUrl');
  this.metadataWhitelist = ['position']

  Object.keys(documents).forEach(function (key) {
    this.add({id: key, title: documents[key].title, content: documents[key].content, relUrl: documents[key].relUrl})
  }, this)
})


callback = function(err){
  if(err) throw err;
}

var output = { docs: documents, index: idx }

fs.writeFile('assets/js/search-index.json', JSON.stringify(output), 'utf8', callback);
