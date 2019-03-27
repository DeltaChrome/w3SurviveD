window.GEO_VERTICES;


AFRAME.registerComponent("genterra-component", {
    
    init: function ()
    {

        scene = document.querySelector('a-scene');
        let terraObj = this.el;

        function generateNumber (max)
        {
            return(Math.floor(Math.random()* max));
        
        }

        function getPerlinNoise(w, h, seed, octave, bias)//output was reference to an array for values
        {

            let output = new Array();
            for(let x = 0; x < w; x++)
            {
               
                for(let y = 0; y < h; y++)
                {
                 
                    let noise = 0.0;
                    let scaleAcc = 0.0;
                    let scale = 1.0;
                    let sampleX1 = 0;
                    let sampleY1 = 0;
                    let sampleX2 = 0.0;
                    let sampleY2 = 0.0; 
                    let pitch = 0.0;
                    for(let o = 0; o < octave; o++)
                    {
                       
                       if(o > 0)
                       {
                           pitch = w / (2.0 * o);
                       }
                        else
                       {
                           pitch = w;
                       }
                        

                        sampleX1 = Math.floor(Math.floor((x / pitch)) * pitch);
                        sampleY1 = Math.floor(Math.floor((y / pitch)) * pitch);
                        

                        sampleX2 = Math.floor((sampleX1 + pitch) % w);
                        sampleY2 = Math.floor((sampleY1 + pitch) % w);

                        let blendX = (x - sampleX1) / (pitch);//fix this, supposed to be float values
                        let blendY = (y - sampleY1) / (pitch);

                        let sampleT = (1.0 - blendX) * seed[sampleY1 * w + sampleX1] + blendX * seed[sampleY1 * w + sampleX2]
                        let sampleB = (1.0 - blendX) * seed[sampleY2 * w + sampleX1] + blendX * seed[sampleY2 * w + sampleX2]


                        scaleAcc += scale;
                        noise += (blendY * (sampleB - sampleT) + sampleT) * scale;
                        scale = scale / bias;
                    }
                    
                    output[y * w + x] = noise / scaleAcc;

                }
            }
            
            return output;
        }

        var geometry = new THREE.PlaneGeometry( 150, 150, 9, 9);

        //var geometry = new THREE.BoxGeometry( 100, 100, 1, 99, 99, 0 );
        var material = new THREE.MeshStandardMaterial( {color: "#26421f"} );
        
        let w = 10;
        let h = 10;

        let randSeed = [];
        let octave = 3;
        let scaleBias = (0.2 * generateNumber(6)) + 1;

        console.log("scale bias ",scaleBias);
        console.log("octave ",octave);
        let perlinNoiseValues = [];

        for (let i = 0; i < w * h; i++) 
        {
            randSeed[i] = Math.random();
        }

        material.roughness = 0.9;
        material.metalness = 0.0;

        let oneFace = [];
        let noiseCounter = 0;
        
        perlinNoiseValues = getPerlinNoise(w, h, randSeed, octave, scaleBias);

        let sum = 0;
        for (let i = 0; i < geometry.vertices.length; i++)
        {
           
           // geometry.vertices[i].z = ((perlinNoiseValues[i]) *100) -35;
            geometry.vertices[i].z = ((perlinNoiseValues[i]) *100) -60;
            sum += geometry.vertices[i].z;
            // console.log(geometry.vertices);
        }

        let avg = sum / geometry.vertices.length;

        console.log("Before average: ", avg, "Before sum: ", sum);

        sum = 0;

        //subtract the avg and move it to a better height
        if(avg > 0)
        {
            for (let i = 0; i < geometry.vertices.length; i++)
            {
                geometry.vertices[i].z -= Math.abs(avg) + 3;
                sum +=  geometry.vertices[i].z;
            }
        }
        if(avg < 0)
        {
            for (let i = 0; i < geometry.vertices.length; i++)
            {
                geometry.vertices[i].z += Math.abs(avg) - 3;
                sum +=  geometry.vertices[i].z;
            }
        
        }    
        
        avg = sum / geometry.vertices.length;

        console.log("After average: ", avg, "After sum: ", sum);

        for (let i = 0; i < 10; i++)//frontside adjust
        {
            
            geometry.vertices[i].z = -9;//front
            geometry.vertices[i * 10].z = -9;//left
            geometry.vertices[i + 90].z = -9;//back
            if(i > 1)
            {
                geometry.vertices[(i * 10) - 1].z = -9;//right
            }
            
        }

        geometry.rotateX(THREE.Math.degToRad(270));

        function generatePositionVector(off)
        {
            let vertexIndex = generateNumber(100);

            return(geometry.vertices[vertexIndex].x + " " + (geometry.vertices[vertexIndex].y + off) + " " + geometry.vertices[vertexIndex].z);
           //return(geometry.vertices[vertexIndex]);

        }

        window.GEO_VERTICES = geometry.vertices;
        ///////////////////////////////////////Pointy trees///////////////////////////////////////////
        
        for (let i = 0; i < 1; i++) {
            console.log("created Tree");
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
            entity.setAttribute('material', 'src: #pointyGreen');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '1 1 1');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
            entity.setAttribute('material', 'src: #pointylight');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
            entity.setAttribute('material', 'src: #pointyBrown');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
            entity.setAttribute('material', 'src: #pointyPurple');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }




////////////////////////////////////////////Rocks///////////////////////////////////////////////
/*
        for (let i = 0; i < 5; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_01-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        } 

        for (let i = 0; i < 5; i++) {
            let bush = new THREE.MeshStandardMaterial({ color: "#304f11" });
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_02-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
            entity.setAttribute('position', generatePositionVector(0));
            entity.setAttribute('obj-model', 'obj: #bush-obj');
            entity.setAttribute('material', bush);
            entity.setAttribute('scale', '0.2 0.2 0.2');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        }

        for (let i = 0; i < 5; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_03-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
        } 
        // for (let i = 0; i < 3; i++) {
        //     let entity = document.createElement('a-entity');
        //     entity.setAttribute('remove-component', {}); 
        //     entity.setAttribute('position', generatePositionVector(-0.5));
        //     entity.setAttribute('obj-model', 'obj: #rock1-obj');
        //     entity.setAttribute('material', 'mtl: #rock1-mat');
        //     entity.setAttribute('scale', '6 6 6');
        //     entity.setAttribute('shadow', 'cast:true');
        //     entity.setAttribute('shadow', 'receive:true');
        //     entity.setAttribute('id', 'largeRock')
        //     scene.appendChild(entity);

        // } 
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(0));
            entity.setAttribute('obj-model', 'obj: #rock2-obj');
            entity.setAttribute('material', 'mtl: #rock2-mat');
            entity.setAttribute('scale', '4 4 4');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        }

        for (let i = 0; i < 5; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_04-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
        } 
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.5));
            entity.setAttribute('obj-model', 'obj: #rock3-obj');
            entity.setAttribute('material', 'mtl: #rock3-mat');
            entity.setAttribute('scale', '8 8 8');            
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        }

        for (let i = 0; i < 5; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_05-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
        } 
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.5));
            entity.setAttribute('obj-model', 'obj: #rock4-obj');
            entity.setAttribute('material', 'mtl: #rock4-mat');
            entity.setAttribute('scale', '4 4 4');            
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        } 
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(0));
            entity.setAttribute('obj-model', 'obj: #rock5-obj');
            entity.setAttribute('material', 'mtl: #rock5-mat');
            entity.setAttribute('scale', '4 4 4');          
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        }
        */
        /////////////////////////////////popcorn trees/////////////////////////////////////////

        for (let i = 0; i < 10; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #tree_1-obj');
            entity.setAttribute('material', 'src: #popcornGreen');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            
            entity.setAttribute('static-body','shape: box;');
            entity.setAttribute('constraint','collideConnected: false;');
            entity.setAttribute('id','popTree' + i);
            scene.appendChild(entity);
            let box = document.createElement('a-box');
            box.setAttribute('dynamic-body','shape: box; linearDamping: 1.0; angularDamping: 1.0;');
            box.setAttribute('scale','1.4 20 1.4');
            box.setAttribute('constraint','type: pointToPoint; maxForce: 10000000; collideConnected: false; target: #popTree' + i +';');
            box.setAttribute('object-status','hitPoints: 5;');
            box.setAttribute('id','popTreeH' + i);// + i
            box.setAttribute('visible', 'false');
            box.setAttribute('class','ground');
            entity.appendChild(box);

            
        }

        for (let i = 0; i < 10; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #tree_1-obj');
            entity.setAttribute('material', 'src: #popcornYellow');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 10; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #tree_1-obj');
            entity.setAttribute('material', 'src: #popcornRed');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 10; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #tree_1-obj');
            entity.setAttribute('material', 'src: #popcornPurple');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }
      
        //////////////////////////////////Thicc Tree////////////////////////////////////
        
        for (let i = 0; i < 1; i++) {
            
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #thicc-tree-obj');
            entity.setAttribute('material', 'src: #pointyGreen');
            // entity.setAttribute('shadow', 'cast:true');
            // entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '1 1 1');            

            scene.appendChild(entity);
            console.log("wy");
        }

        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #thicc-tree-obj');
            entity.setAttribute('material', 'src: #pointylight');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '1 1 1');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #thicc-tree-obj');
            entity.setAttribute('material', 'src: #pointyBrown');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '1 1 1');            

            scene.appendChild(entity);

        }

        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #thicc-tree-obj');
            entity.setAttribute('material', 'src: #pointyPurple');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '1 1 1');            

            scene.appendChild(entity);

        }
        

        /*
        for (let i = 0; i < 5; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-0.5));
            entity.setAttribute('obj-model', 'obj: #tree_2-obj');
            entity.setAttribute('material', 'src: #tree_2-mat');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('static-body','shape: box;');
            entity.setAttribute('id','iceTree' + i);
            scene.appendChild(entity);

        }
        */

        let plane = new THREE.Mesh( geometry, material );

        plane.castShadow = true;
        plane.receiveShadow = true;

        let Context_AF = this;
        this.el.addEventListener('object3dset', function (e) {
            console.log("mesh loaded");
            const leftHand = document.querySelector("#left-hand");
            const rightHand = document.querySelector("#right-hand");
            // teleport-controls=""
            //leftHand.setAttribute('teleport-controls', "cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; type: parabolic; collisionEntities: #terrainGenerationObj;");
            rightHand.setAttribute('teleport-controls', "cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; type: parabolic; collisionEntities: .ground; curveShootingSpeed: 10; ");
            rightHand.setAttribute('collide-listener', {});
            //rightHand.setAttribute('haptics',{})

            let hand = document.querySelector('#hand');
            let rHand = document.querySelector('#right-hand');
            let head = document.querySelector('#head');

            let currentHandRotation = rHand.getAttribute('rotation');
            let currentHandPosition = rHand.getAttribute('position');

            console.log(currentHandRotation);
         
            let entity = document.createElement('a-entity');

            // entity.setAttribute('position', rHand.getAttribute('position'));
            // entity.setAttribute('rotation', rHand.getAttribute('rotation'));

            entity.setAttribute('obj-model', 'obj: #Axe_1-obj');
            entity.setAttribute('material', 'src: #Axe_1-mtl');
            entity.setAttribute('scale', '0.2 0.2 0.2');
            entity.setAttribute('position','0 0 0');
            entity.setAttribute('rotation', '0 0 0');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('visible', 'false');
            entity.setAttribute('shadow', 'receive:true');
           // entity.setAttribute('static-body','shape: box; angularDamping: 1.0;');
          //  entity.setAttribute('constraint','type: pointToPoint; collideConnected: false; target: #right-hand');
            entity.setAttribute('id', 'axe');

            scene.appendChild(entity);
            //entity.setAttribute('rotation', currentHandRotation);
            //rHand.appendChild(entity);
            
            axeHB = document.createElement('a-box');
            axeHB.setAttribute('static-body','shape: none; angularDamping: 1.0;');
            axeHB.setAttribute('shape__axehead','shape: box; angularDamping: 1.0; halfExtents: 0.8 0.8 0.8; offset: 0 -1.5 -5.5;');
            axeHB.setAttribute('scale','0.1 0.1 0.1');
            
           // axeHB.setAttribute('constraint','type: pointToPoint; maxForce: 10000000; collideConnected: false; target: #axe');
            axeHB.setAttribute('id','axeHB');
            axeHB.setAttribute('visible', 'false');
            scene.appendChild(axeHB)
            //console.log(Context_AF.el.getObject3D('mesh'));

        });
        terraObj.setObject3D('mesh', plane);
        terraObj.setAttribute('class','ground');

        // let waterGeo = new THREE.PlaneGeometry(1000, 1000);
        // for (let i = 0; i < waterGeo.vertices.length; i++) 
        // {

        //     waterGeo.vertices[i].z = -8;

        // }
        let waterMaterial = new THREE.MeshStandardMaterial({ shader: 'ocean', color: "#2759aa" });
        //let waterPlane = new THREE.Mesh(waterGeo, waterMaterial);
       // waterPlane.rotateX(THREE.Math.degToRad(270));
        
        let waterEntity = document.createElement('a-entity');
        waterEntity.setAttribute('geometry', 'primitive: plane; width: 1000; height: 1000;');
        waterEntity.setAttribute('material', waterMaterial);
        waterEntity.setAttribute('rotation','-90 0 0');
        waterEntity.setAttribute('position','0 -8 0');
        waterEntity.setAttribute('id','waterFloor');
        waterEntity.setAttribute('class','ground');
        scene.appendChild(waterEntity);

       // scene.object3D.add(waterPlane);
  
            // water.rotation.x = - Math.PI / 2;
            // scene.object3D.add( water );
        document.querySelector('#head').setAttribute('position', window.GEO_VERTICES[55].x + " " + (window.GEO_VERTICES[55].y + 1.7) + " " + window.GEO_VERTICES[55].z);
        //document.querySelector('#head').setAttribute('position', '0 0 0');

    },

     tick: function()
    {
        // var time = performance.now() * 0.001;
        // water.material.uniforms[ "time" ].value += 1.0 / 60.0;
         //material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
        //console.log(generateNumber(3));

    }
});
