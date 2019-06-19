const odp = require(`./seeders/odp`);
const odc = require(`./seeders/odc`);
// Data source: LinkedIn

const merge=odp.push(...odc);
// Create the data 2D-array (vectors) describing the data
let vectors = new Array();
for (let i = 0 ; i < odp.length ; i++) {
  vectors[i] = [ odp[i]['lat'] , odp[i]['lon'], odp[i]['status_occ']];
}
let a=10;
let b=20;
const kmeans = require('node-kmeans');
kmeans.clusterize(vectors, {k: odp.length/4}, (err,res) => {
  if (err) console.error(err);
  else console.log('%o',res);
});