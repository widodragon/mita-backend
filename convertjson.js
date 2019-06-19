let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'odp.csv'; 
let fileOutputName = 'odp.json';
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);