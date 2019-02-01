AFRAME.registerComponent("gentrees-component", {
   
    init: function ()
    {


        console.log("trees.js is running");

        let scene = document.querySelector('a-scene');

        function generateNumber ()
        {
            return(Math.floor(Math.random()* 45));
        
        }

        function generatePositionVector(off)
        {
            return(generateNumber() + " " + off + " " + generateNumber());
        }

        //document.addEventListener('keyup', function (k){

            for(let i = 0; i < 15; i++)
            {
                let entity = document.createElement('a-entity');
                entity.setAttribute('position', generatePositionVector(2.3));
                entity.setAttribute('obj-model', 'obj: #rock_01-obj');
                entity.setAttribute('material', 'mtl: #rock_01-mat');
                entity.setAttribute('shadow', 'cast:true');
                entity.setAttribute('shadow', 'receive:true');        
                
                scene.appendChild(entity);
                
            }
            
            for(let i = 0; i < 2; i++)
            {
                let entity = document.createElement('a-entity');
                entity.setAttribute('position', generatePositionVector(0));
                entity.setAttribute('obj-model', 'obj: #tree_1-obj');
                entity.setAttribute('material', 'mtl: #tree_1-mat');
                entity.setAttribute('shadow', 'cast:true');
                entity.setAttribute('shadow', 'receive:true');        
                entity.setAttribute('shader', 'standard');  
                
                scene.appendChild(entity);

            }

            for(let i = 0; i < 2; i++)
            {
                let entity = document.createElement('a-entity');
                entity.setAttribute('position', generatePositionVector(0));
                entity.setAttribute('obj-model', 'obj: #tree_2-obj');
                entity.setAttribute('material', 'mtl: #tree_2-mat');
                entity.setAttribute('shadow', 'cast:true');
                entity.setAttribute('shadow', 'receive:true');          
                entity.setAttribute('shader', 'standard');  

                scene.appendChild(entity);

            }

            for(let i = 0; i < 2; i++)
            {
                let entity = document.createElement('a-entity');
                entity.setAttribute('position', generatePositionVector(0));
                entity.setAttribute('obj-model', 'obj: #tree_3-obj');
                entity.setAttribute('material', 'mtl: #tree_3-mat');
                entity.setAttribute('shadow', 'cast:true');
                entity.setAttribute('shadow', 'receive:true'); 
                entity.setAttribute('scale', '4 5 4');           
                entity.setAttribute('shader', 'standard');  

                scene.appendChild(entity);

            }
        }
    });