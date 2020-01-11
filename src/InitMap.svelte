<script>
  require([
    "esri/layers/GeoJSONLayer",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Feature"
  ], function(GeoJSONLayer, Map, MapView, Feature) {

    const template = {
          title: "Suburb Info",
          content: [
            {
              type: "text",
              text: "{rating} is rating for {AU2017_NAME} </br> </br><b>Review</b>"
        },
                 {
                // You can set a media element within the popup as well. This
                // can be either an image or a chart. You specify this within
                // the mediaInfos. The following creates a pie chart in addition
                // to two separate images. The chart is also set up to work with
                // related tables. Similar to text elements, media can only be set within the content.
                type: "media", // MediaContentElement
                mediaInfos: {
                    type: "image",
                    value: {
                      sourceURL:
                        "./images/{imageURL}"   
                                         }
                  }
              }
          ]
    };

   const renderer = {
          type: "simple",
           symbol: {
            type: "simple-fill",
            outline: {
              width: 1,
              color: "black"
            }
          },
          visualVariables: [
            {
              type: "color",
              field: "rating",
              stops: [
                {
                  value: 1,
                  color: "#ff0000"
                },
                {
                  value: 10,
                  color: "#00ffaa"
                }
              ]
            }
          ]
        };

  const suburbNames = {
          labelExpressionInfo: {
            expression: "$feature.AU2017_NAME"
          },
           symbol: {
                      type: "text", // autocasts as new TextSymbol()
                      font: {
                        size: 9,
                        family: "Noto Sans"
                      },
                      horizontalAlignment: "left",
                      color: "#2b2b2b"
        }
        };


  const geojsonLayer = new GeoJSONLayer({
    url: "./suburbs.geojson",
    renderer: renderer,
    popupTemplate: template,
    labelingInfo: suburbNames
  });

   const map = new Map({
      basemap: "gray-vector",
      layers: [geojsonLayer]
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [172.646493, -43.521198], // longitude, latitude
      zoom: 12,
       popup: {
            autoOpenEnabled: false
          }
    });

    let buttonToChCh = document.createElement("button");
    buttonToChCh.setAttribute("id", "goToChCh");
    buttonToChCh.innerHTML = "Center to Christchurch";
    view.ui.add(buttonToChCh, "top-right");

    document.getElementById("goToChCh").addEventListener("click", function() {
      view.goTo({
        center: [172.646493, -43.521198],
        zoom: 11
      });
    });

view.when().then(function() {
          // Create a default graphic for when the application starts
          const graphic = template;

          // Provide graphic to a new instance of a Feature widget
          const feature = new Feature({
            container: "widget",
            graphic: graphic,
            map: view.map,
            spatialReference: view.spatialReference
          });



          view.whenLayerView(geojsonLayer).then(function(layerView) {
            let highlight;
            // listen for the pointer-move event on the View
            view.on("pointer-move", function(event) {
              // Perform a hitTest on the View
              view.hitTest(event).then(function(event) {
                // Make sure graphic has a popupTemplate
                let results = event.results.filter(function(result) {
                  return result.graphic.layer.popupTemplate;
                });
                let result = results[0];
                highlight && highlight.remove();
                // Update the graphic of the Feature widget
                // on pointer-move with the result
        
                  if (result) {
                     highlight = layerView.highlight(result.graphic);
                  feature.graphic = result.graphic;
                  
                } else {
                  feature.graphic = graphic;
                }
  
              });
            });

            // view.on(["click"], function(event) {
            //   // Perform a hitTest on the View
            //   view.hitTest(event).then(function(event) {
            //     // Make sure graphic has a popupTemplate
            //     let results = event.results.filter(function(result) {
            //       return result.graphic.layer.popupTemplate;
            //     });
            //     let result = results[0];
            //     // Update the graphic of the Feature widget
            //     // on pointer-move with the result
            //     if (result) {
            //       feature.graphic = result.graphic;
            //     } else {
            //       feature.graphic = graphic;
            //     }
            //   });
            // });
          });

        });


  });
</script>

<style>
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }

      #viewDiv {
        float: left;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 70%;
      }

      #widget {
        float: left;
        width: 30%;
        height: 100%;
        padding: 1em;
      }
    </style>


<div id="viewDiv"></div>
<div id="widget"></div>

