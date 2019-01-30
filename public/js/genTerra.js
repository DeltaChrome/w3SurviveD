console.log("genTerra.js is running");

scene = document.querySelector('a-scene');

function generateNumber ()
{
    return(Math.floor(Math.random()* 45));
  
}

var geometry = new THREE.PlaneGeometry( 25, 25, 100 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
for (let i = 0; i < geometry.vertices.length; i++)
{
    //generateNumber
    //geometry.vertices[i].x = generateNumber();
    geometry.vertices[i].x = generateNumber();
}
var plane = new THREE.Mesh( geometry, material );
scene.object3D.add( plane );


