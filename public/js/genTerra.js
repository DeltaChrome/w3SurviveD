window.GEO_VERTICES;

AFRAME.registerComponent("genterra-component", {
    
    init: function ()
    {
        // console.log("genTerra.js is running");
        //var GEO_VERTICES;
        scene = document.querySelector('a-scene');
        let terraObj = this.el;


        function generateNumber (max)
        {
            return(Math.floor(Math.random()* max));
        
        }

        function getPerlinNoise(w, h, seed, octave, bias)//output was reference to an array for values
        {
            // for(let i = 0; i < seed.length; i++)
            // {
            //     console.log(seed[i]);
            // }
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
                        
                        //console.log(Math.floor((x / pitch)), " x,y: ", x,y, " pitch: ", pitch);
                        
                        sampleX1 = Math.floor(Math.floor((x / pitch)) * pitch);
                        sampleY1 = Math.floor(Math.floor((y / pitch)) * pitch);
                        
                        //  console.log("samples x,y 1", o);
                        //  console.log(sampleX1);
                        //  console.log(sampleY1);
                        sampleX2 = Math.floor((sampleX1 + pitch) % w);
                        sampleY2 = Math.floor((sampleY1 + pitch) % w);
                        // console.log("samples x,y 2");
                        // console.log(sampleX2);
                        // console.log(sampleY2);
                        let blendX = (x - sampleX1) / (pitch);//fix this, supposed to be float values
                        let blendY = (y - sampleY1) / (pitch);
                        // console.log("blend X and y");
                        // console.log(blendX);
                        // console.log(blendY);
                        let sampleT = (1.0 - blendX) * seed[sampleY1 * w + sampleX1] + blendX * seed[sampleY1 * w + sampleX2]
                        let sampleB = (1.0 - blendX) * seed[sampleY2 * w + sampleX1] + blendX * seed[sampleY2 * w + sampleX2]
                        // console.log("seed: ");
                        // console.log(sampleY1 * w + sampleX1);
                        // // console.log(seed[sampleY1 * w + sampleX1]);
                        // // console.log(seed[sampleY2 * w + sampleX2]);
                        // // console.log("samples x,y 2");
                        // // console.log(sampleX2);
                        // // console.log(sampleY2);
                        // console.log("sampleT, sampleB");
                        // console.log(sampleT);
                        // console.log(sampleB);

                        scaleAcc += scale;
                        noise += (blendY * (sampleB - sampleT) + sampleT) * scale;
                        scale = scale / bias;
                    }
                    
                    output[y * w + x] = noise / scaleAcc;
                    //console.log(output[y * w + x], "number at: ", x);
                    
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

        material.roughness = 0.8;
        material.metalness = 0.0;

        let oneFace = [];
        let noiseCounter = 0;
        
        perlinNoiseValues = getPerlinNoise(w, h, randSeed, octave, scaleBias);
  
        // for(let i = 0; i < w; i++)
        // {
        //     perlinNoiseValues[i] = perlinNoiseValues[i] / 4;
        //     //perlinNoiseValues[i] = 0.1;
        // }
  
        // for(let i = 900; i < w + 900; i++)
        // {
        //     perlinNoiseValues[i] = 0.1;
        //     // perlinNoiseValues[i] = perlinNoiseValues[i] / 2;
        // }
        // perlinNoiseValues[100] = 0.1;
        // perlinNoiseValues[199] = 0.1;
        // perlinNoiseValues[200] = 0.1;
        // perlinNoiseValues[299] = 0.1;
        // perlinNoiseValues[300] = 0.1;
        // perlinNoiseValues[399] = 0.1;
        // perlinNoiseValues[400] = 0.1;
        // perlinNoiseValues[499] = 0.1;
        // perlinNoiseValues[500] = 0.1;
        // perlinNoiseValues[599] = 0.1;
        // perlinNoiseValues[600] = 0.1;
        // perlinNoiseValues[699] = 0.1;
        // perlinNoiseValues[700] = 0.1;
        // perlinNoiseValues[799] = 0.1;
        // perlinNoiseValues[800] = 0.1;
        // perlinNoiseValues[899] = 0.1;
        // perlinNoiseValues[900] = 0.1;

        for (let i = 0; i < geometry.vertices.length; i++)
        {

           // geometry.vertices[i].z = ((perlinNoiseValues[i]) *100) -35;
            geometry.vertices[i].z = ((perlinNoiseValues[i]) *100) -60;
            // console.log(geometry.vertices);
        }

        geometry.rotateX(THREE.Math.degToRad(270));

        function generatePositionVector(off)
        {
            let vertexIndex = generateNumber(100);
            
           return(geometry.vertices[vertexIndex].x + " " + (geometry.vertices[vertexIndex].y + off) + " " + geometry.vertices[vertexIndex].z);
           //return(geometry.vertices[vertexIndex]);

        }

        window.GEO_VERTICES = geometry.vertices;
        
        //pointy tree

        for (let i = 0; i < 8; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(2));
            entity.setAttribute('obj-model', 'obj: #pointy_tree-obj');
            entity.setAttribute('material', 'src: #brown_Pointy');
            entity.setAttribute('scale', '1 1 1');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            
            //entity.setAttribute('grabbable',{}); 
            //entity.setAttribute('class','collidable');
            entity.setAttribute('static-body', 'shape: box; mass: 5;');
            //entity.setAttribute('id','rock');

            scene.appendChild(entity);

        } 

        for (let i = 0; i < 8; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(2));
            entity.setAttribute('obj-model', 'obj: #rock_01-obj');
            entity.setAttribute('material', 'mtl: #rock_01-mat');
            entity.setAttribute('scale', '0.2 0.2 0.2');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            
            //entity.setAttribute('grabbable',{}); 
            //entity.setAttribute('class','collidable');
            entity.setAttribute('static-body', 'shape: box; mass: 5;');
            //entity.setAttribute('id','rock');

            scene.appendChild(entity);

        } 
        for (let i = 0; i < 10; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_01-obj');
            entity.setAttribute('material', 'mtl: #rock_01-mat');
            entity.setAttribute('scale', '2 2 2');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        } 
        
        for (let i = 0; i < 15; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('position', generatePositionVector(-1.5));
            entity.setAttribute('obj-model', 'obj: #tree_1-obj');
            entity.setAttribute('material', 'src: #popcornGreen');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('shader', 'standard');
            entity.setAttribute('scale', '0.8 0.8 0.8');            

            scene.appendChild(entity);

        }

      

        let plane = new THREE.Mesh( geometry, material );

        plane.castShadow = true;
        plane.receiveShadow = true;

        let Context_AF = this;
        this.el.addEventListener('object3dset', function(e){
            console.log("mesh loaded");
            const leftHand = document.querySelector("#left-hand");
            const rightHand = document.querySelector("#right-hand");
           // teleport-controls=""
            //leftHand.setAttribute('teleport-controls', "cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; type: parabolic; collisionEntities: #terrainGenerationObj;");
           rightHand.setAttribute('teleport-controls', "cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; type: parabolic; collisionEntities: #terrainGenerationObj; curveShootingSpeed: 20; ");
           rightHand.setAttribute('collide-listener',{});

            console.log(Context_AF.el.getObject3D('mesh'));

        });
        terraObj.setObject3D('mesh', plane );
       
        let helper = new THREE.VertexNormalsHelper( plane, 2, 0x00ff00, 1 );
        scene.object3D.add(helper);


        //console.log(document.querySelector('#terrainGenerationObj'));

        let waterGeo = new THREE.PlaneGeometry( 1000, 1000);
        for (let i = 0; i < waterGeo.vertices.length; i++)
        {

            waterGeo.vertices[i].z = -(generateNumber(10));
            
        }
        let waterMaterial = new THREE.MeshStandardMaterial( {color: "#4d7fd1"} );
        let waterPlane = new THREE.Mesh( waterGeo, waterMaterial );
        waterPlane.rotateX(THREE.Math.degToRad(270));
        scene.object3D.add( waterPlane );
     
        document.querySelector('#head').setAttribute('position', window.GEO_VERTICES[55].x + " " + (window.GEO_VERTICES[55].y + 1) + " " + window.GEO_VERTICES[55].z);

    },

     tick: function()
    {
         //material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
        //console.log(generateNumber(3));

    }
});
