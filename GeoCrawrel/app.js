const https = require('https');

const suburbs = [
    'Addington',
    'Aranui',
    'Avondale',
    'Avonhead',
    'Avonside',
    'Beckenham',
    'Belfast',
    'Bexley',
    'Bishopdale',
    'Bottle Lake',
    'Bromley',
    'Brooklands',
    'Broomfield',
    'Bryndwr',
    'Burnside',
    'Burwood',
    'Casebrook',
    'Cashmere',
    'Christchurch Airport',
    'Christchurch Central',
    'Clifton',
    'Cracroft',
    'Dallington',
    'Edgeware',
    'Fendalton',
    'Ferrymead',
    'Halswell',
    'Harewood',
    'Heathcote Valley',
    'Hei Hei',
    'Hillmorton',
    'Hillsborough',
    'Hoon Hay',
    'Hornby',
    'Hornby South',
    'Huntsbury',
    'Ilam',
    'Islington',
    'Kainga',
    'Kennedys Bush',
    'Linwood',
    'Mairehau',
    'Marshland',
    'Mcleans Island',
    'Merivale',
    'Middleton',
    'Moncks Bay',
    'Mount Pleasant',
    'New Brighton',
    'North New Brighton',
    'Northcote',
    'Northwood',
    'Opawa',
    'Papanui',
    'Parklands',
    'Phillipstown',
    'Redcliffs',
    'Redwood',
    'Riccarton',
    'Richmond',
    'Richmond Hill',
    'Russley',
    'Saint Albans',
    'Saint Martins',
    'Shirley',
    'Sockburn',
    'Somerfield',
    'South New Brighton',
    'Southshore',
    'Spreydon',
    'Strowan',
    'Styx',
    'Sumner',
    'Sydenham',
    'Templeton',
    'Upper Riccarton',
    'Waimairi Beach',
    'Wainoni',
    'Waltham',
    'Westmorland',
    'Wigram',
    'Woolston',
    'Yaldhurst'
];

function addDataToFile(suburbsArray) {
    console.log("Iam in the function");
    const merge = ( ...objects ) => ( { ...objects } );
    let parsedData = {};
    let data = {"type":"FeatureCollection","features":[]}; 
    console.log("initial datda" + JSON.stringify(data));
    console.log(typeof(data));
    console.log("initial feaut" + JSON.stringify(data.features));
    for (let i=0; i<suburbsArray.length; i++) {
        console.log("Iam in the for cycle");
        // let url = `https://s3-stats.cloud.eaglegis.co.nz/arcgis/rest/services/GBV/GBVOtherGeographies/MapServer/2/query?where=&text=${suburbsArray[i]}&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`;
    let url = `https://s3-stats.cloud.eaglegis.co.nz/arcgis/rest/services/GBV/GBVOtherGeographies/MapServer/2/query?where=&text=${suburbsArray[i]}&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`;
    https.get(url, (res) => {
        const { statusCode } = res;
        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (error) {
          console.error(error.message);
          // Consume response data to free up memory
          res.resume();
          return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
           parsedData = JSON.parse(rawData);
           data.features = parsedData.features;
           console.log("After data" + JSON.stringify(data));  
        //    let obj = new Object;
        //    Object.assign(obj, parsedData.features);
        //    let data = JSON.stringify(obj);
        //    console.log(obj);
            const fs = require('fs');
    fs.appendFile('parseddata.geojson', JSON.stringify(data.features)+",", (err) => {
        if (err) throw err;
        console.log('The geodata has been saved!');
      });
          } catch (e) {
            console.error(e.message);
          }
        });
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
      });
      } 
    // 
    
 
    };

    // sub1.forEach(element => getGeoData(element));

    // addDataToFile(suburbs);
    
