console.log("trees.js is running");

let scene = document.querySelector('a-scene');

function generateNumber ()
{
    return(Math.floor(Math.random()* 45));
  
}

function generatePositionVector()
{
    return(generateNumber() + " " + 2.3 + " " + generateNumber());
}

document.addEventListener('keyup', function (k){

    if(k.keyCode == 32)
    {
        let entity = document.createElement('a-entity');
        entity.setAttribute('position', generatePositionVector());
        entity.setAttribute('obj-model', 'obj: #rock_01-obj');
        entity.setAttribute('material', 'mtl: #rock_01-mat');
        entity.setAttribute('shadow', 'cast:true');
        entity.setAttribute('shadow', 'receive:true');        
        
    

        scene.appendChild(entity);

        console.log(generatePositionVector());
        console.log("keypress");
    }

});

//console.log(scene);