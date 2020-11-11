var map , drawingTools;
var myScript = ( function () {
  return {
    func1 : function () {
      alert('Loading Map');
      GetMap ();
    }
  }
} )(myScript||{})
(function hello() {
  alert('Hellottttttt!!!');
})()
function GetMap () {
  alert("hello")
  //Initialize a map instance.
  map = new atlas.Map ( 'myMap' , {
    center : [ - 100 , 35 ] ,
    zoom : 3 ,
    view : 'Auto' ,

    //Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
    authOptions : {
      authType : 'subscriptionKey' ,
      subscriptionKey : 'xfX7d36UCgLDsl4KdIIEP6zBF-gzvjW-wIpZKJAnLK8'
    }
  } );

  //Wait until the map resources are ready.
  map.events.add ( 'ready' , function () {
    //Load the drawing tools.
    drawingTools = new PolygonDrawingTool ( map , null , function ( polygon ) {
      //Do something with the polygon.
    } );
  } );
}
