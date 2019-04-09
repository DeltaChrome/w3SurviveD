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
                       
                    //    if(o > 0)
                    //    {
                        pitch = w / (2.0 ** o);
                    //    }
                    //     else
                    //    {
                    //        pitch = w;
                    //    }
                        
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

        let currentTree = [];

        function planeEquation(vertex1, vertex2, vertex3)
        {
            //create vectors from points
            let vector1 = vertex3 - vertex2;
            let vector2 = vertex2 - vertex1;

            //then cross product
            let crossProduct = new THREE.Vector3(0,0,0);
            crossProduct.crossVectors(vector1,vector2);
        }

        function generatePositionVector(off)
        {
            let vertexIndex = generateNumber(100);

            currentTree[0] = geometry.vertices[vertexIndex].x;
            currentTree[1] = geometry.vertices[vertexIndex].y + off;
            currentTree[2] = geometry.vertices[vertexIndex].z;

            return(geometry.vertices[vertexIndex].x + " " + (geometry.vertices[vertexIndex].y + off) + " " + geometry.vertices[vertexIndex].z);
           //return(geometry.vertices[vertexIndex]);

        }
        function generatePositionVectorRayCasted(index)
        {
            let xOffset = generateNumber(10) - 5;
            let zOffset = generateNumber(10) - 5;

            let currentV = geometry.vertices[index];
            let sideRV = geometry.vertices[index + 1];
            let aboveV = geometry.vertices[index - 10];
            let adjacentTRV = geometry.vertices[index - 9];//or -10 + 1

            let sideLV = geometry.vertices[index - 1];
            let belowV = geometry.vertices[index + 10];
            let adjacentTLV = geometry.vertices[index - 11];//or -10 - 1
            let adjacentBLV = geometry.vertices[index + 9];//or +10 - 1
            let adjacentBRV = geometry.vertices[index + 11];//or +10 + 1

            //let pointToCheck =  new THREE.Vector3(currentV[index].x, currentV[index].y, currentV[index].z) + new THREE.Vector3(xOffset, 0, zOffset);

            if(xOffset > 0)
            {
                if(zOffset < 0)
                {
                    //take current vertex
                    //take current vertex - 10(as index)
                    //take current vertex - 10(as index) + 1
                    //if in this triangle call plane equation
                    //else
                    //take current vertex
                    //take current vertex + 1
                    //take current vertex - 10(as index) + 1
                    let x1 = currentV.x;
                    let x2 = sideRV.x;
                    let x3 = adjacentTRV.x;
                    let y1 = currentV.z;
                    let y2 = sideRV.z;
                    let y3 = adjacentTRV.z;

                    console.log("current vertex at x: " + x1);

                    let areOfLargeTriangle = (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
                    
                    x1 = pointToCheck.x;
                    y1 = pointToCheck.z;

                    let areOfLargeTP1 = (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
                    
                    x2 = sideRV.x;
                    y2 = sideRV.z;

                    let areOfLargeTP2 = (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
                    
                    x3 = currentV.x;
                    y3 = currentV.z;

                    let areOfLargeTP3 = (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
                    

                    if((areOfLargeTP1 + areOfLargeTP2 + areOfLargeTP3) == areOfLargeTriangle)
                    {
                        //then do plane equation
                    }
                    else
                    {
                        //do plane equation of the other triangle
                    }

                }
                else
                {

                }
            }
            else
            {
                if(zOffset < 0)
                {

                }
                else
                {

                }
            }





            let objectVertexPosition = new THREE.Vector3(geometry.vertices[index].x,geometry.vertices[index].y,geometry.vertices[index].z);

            




            return(objectVertexPosition);
        }

        window.GEO_VERTICES = geometry.vertices;

        ///////////////////////////////pick up items/////////////////////////////////////

        console.log("position for first vertex: " + window.GEO_VERTICES[0].x);
        console.log("position for first vertex: " + window.GEO_VERTICES[9].x);
        console.log("position for first vertex: " + window.GEO_VERTICES[0].z);
        console.log("position for first vertex: " + window.GEO_VERTICES[99].z);

        let listOfValidVertices = [];
        let count = 0;

        for(let i = 0; i < 100; i++)
        {
            if(i > 10 && i < 90)
            {
                if(!(i % 10 == 9 || i % 10 == 0))
                {
                    listOfValidVertices[i] = i;
                    count += 1;
                }
               
            }
        }

        let randomValidVertexIndex = generateNumber(64);

        let randomValidVertex = generatePositionVectorRayCasted(randomValidVertexIndex);
        
        //IF THERE IS TIME, RAY CAST EACH ITEM TO BE ON THE ANGLE OF A SURFACE AND NOT JUST PLACED AT A VERTEX
        for (let i = 0; i < 1; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 

            //pick random vertex that is not on the outer ring

            //check vertices of local plane and do point of intersection

            //return point where object can spawn
            //may also be able to rotate object based on normal of plane/triangle



            /*

                    𝑃𝑂𝐿(𝑡) =
                            𝑥1 + (𝑥2 − 𝑥1) 𝑡
                            𝑦1 + (𝑦2 − 𝑦1) 𝑡
                            𝑧1 + (𝑧2 − 𝑧1) 𝑡

                    𝑑 =
                        𝑃2 − 𝑃1 × 𝑃1 − 𝑃0
                        /
                        𝑃2 − 𝑃1

            */
           
          // let tempX = generateNumber(150) - 75;
          // let tempZ = generateNumber(150) - 75;












            entity.setAttribute('position', );
            entity.setAttribute('obj-model', 'obj: #rock1-obj');
            entity.setAttribute('material', 'mtl: #rock1-mat');
            entity.setAttribute('scale', '0.1 0.1 0.1');
            entity.setAttribute('static-body',{});
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('id', 'rock');
            entity.setAttribute('class', 'Rock');
            scene.appendChild(entity);
        }

        //purple pointy
        for (let i = 0; i < 2; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(0));
            entity.setAttribute('obj-model', 'obj: #branch-obj');
            entity.setAttribute('material', 'src: #branch-mtl');
            entity.setAttribute('scale', '0.05 0.05 0.05');
            entity.setAttribute('rotation', '0 0 90');
            entity.setAttribute('static-body','shape: none;');
            entity.setAttribute('shape__branch', 'shape: box; angularDamping: 1.0; linearDamping: 1.0; halfExtents: 0.3 0.3 3; offset: 0 0 3.5;');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');
            entity.setAttribute('id', 'branch');
            entity.setAttribute('class', 'Branch');            
            scene.appendChild(entity);
        }

////////////////////////////////////////////Rocks///////////////////////////////////////////////

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

        //rock 2
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_02-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);
        }

        //rock 3
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_03-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
            
            scene.appendChild(entity);
        } 
     
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_04-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
            
            scene.appendChild(entity);
        } 
        
        //rock 5
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(-0.2));
            entity.setAttribute('obj-model', 'obj: #rock_05-obj');
            entity.setAttribute('material', 'src: #rock');
            entity.setAttribute('scale', '2 2 2');
            
            scene.appendChild(entity);
        } 
        for (let i = 0; i < 3; i++) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('remove-component', {}); 
            entity.setAttribute('position', generatePositionVector(0));
            entity.setAttribute('obj-model', 'obj: #rock5-obj');
            entity.setAttribute('material', 'mtl: #rock5-mat');+
            entity.setAttribute('scale', '4 4 4');          
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

            scene.appendChild(entity);

        }

       

        /////////////////////////////////popcorn trees/////////////////////////////////////////
        treePositions = new Array();
        
        let numTrees = 0;

        for(let i = 0; i < 49; i++)
        {
            let entity = document.createElement('a-entity');

            currentTreePosition = generatePositionVector(-1.5);

            for(let j = 0; j < treePositions.length; j++)
            {
                if(currentTreePosition == treePositions[j])
                {

                    //console.log("changing position");
                    //onsole.log(j);
                    currentTreePosition = generatePositionVector(-1.5);
                    j = 0;

                } else if (currentTree[1] < -6 && i == 48) 
                {
                    currentTreePosition = generatePositionVector(-1.5);
                    j = 0;
                }
            }

           // console.log("tree position y: " + currentTree[1]);

            if(currentTree[1] < -6 && i < 48)
            {
               // console.log(currentTree[1]);
               console.log("test");
                currentTree[1] = 600;
            }
            treePositions.push(currentTreePosition);
            //console.log("added tree");
            //console.log("current tree" + currentTreePosition);

            entity.setAttribute('position', {x:currentTree[0],y:currentTree[1],z:currentTree[2]});
            if(i < 10)
            {
                entity.setAttribute('obj-model', 'obj: #tree_1-obj');                
                entity.setAttribute('material', 'src: #popcornGreen-mtl');
              
            }
            else if (i < 20)
            {
                entity.setAttribute('obj-model', 'obj: #tree_1-obj');                
                entity.setAttribute('material', 'src: #popcornYellow-mtl');
              
            }
            else if(i < 30)
            {
                entity.setAttribute('obj-model', 'obj: #tree_1-obj');                                
                entity.setAttribute('material', 'src: #popcornRed-mtl');
                
            }
            else if(i < 40)
            {
                entity.setAttribute('obj-model', 'obj: #tree_1-obj');                                
                entity.setAttribute('material', 'src: #popcornPurple-mtl');
                
            }
            else if(i < 42)
            {
                entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
                entity.setAttribute('material', 'src: #pointyGreen-mtl');
            }
            else if(i < 44)
            {
                entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
                entity.setAttribute('material', 'src: #pointylight-mtl');
            }
            else if(i < 46)
            {
                entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
                entity.setAttribute('material', 'src: #pointyBrown-mtl');
            }
            else if(i < 48)
            {
                entity.setAttribute('obj-model', 'obj: #pointy-tree-obj');
                entity.setAttribute('material', 'src: #pointyPurple-mtl');
            }
            else if(i < 49)
            {
                let firestick = document.createElement('a-entity');
                //firepit.setAttribute('remove-component', {});
                // firepit.setAttribute('position', generatePositionVector(-0.2));
                entity.setAttribute('position', { x: currentTree[0], y: currentTree[1] + 1.4, z: currentTree[2] });
                entity.setAttribute('obj-model', 'obj: #Firepit-obj');
                entity.setAttribute('material', 'src: #Firepit-mtl');
                entity.setAttribute('scale', '0.1 0.1 0.1');
                entity.setAttribute('shadow', 'cast:true');
                entity.setAttribute('shadow', 'receive:true');
                entity.setAttribute('id', 'firepit');
                scene.appendChild(entity);

                firestick.setAttribute('position', { x: currentTree[0] - 0.5, y: currentTree[1] + 1.6, z: currentTree[2] -0.5 });
                firestick.setAttribute('obj-model', 'obj: #branch-obj');
                firestick.setAttribute('material', 'src: #branch-mtl');
                firestick.setAttribute('scale', '0.02 0.02 0.02');
                firestick.setAttribute('shadow', 'cast:true');
                firestick.setAttribute('shadow', 'receive:true');
                firestick.setAttribute('id', 'firestick');
                scene.appendChild(firestick);

                //HIT BOX//
                let stickHB = document.createElement('a-box');
                
                stickHB.setAttribute('dynamic-body', 'shape: none; angularDamping: 1.0; linearDamping: 1.0');
                stickHB.setAttribute('shape__stick', 'shape: box; angularDamping: 1.0; linearDamping: 1.0; halfExtents: 0.3 3 0.3; offset: 0 3.5 0;');
                stickHB.setAttribute('scale', '0.1 0.1 0.1');
                stickHB.setAttribute('position',{ x: currentTree[0] - 0.5, y: currentTree[1] + 1.6, z: currentTree[2] -0.5 });
                //     axeHB.setAttribute('constraint','type: pointToPoint; maxForce: 10000000; collideConnected: false; target: #axe');
                stickHB.setAttribute('id', 'stickHB');
                stickHB.setAttribute('visible', 'false');
                scene.appendChild(stickHB)

            }
            
            if (i < 48) 
            {
                //entity.setAttribute('mesh-smootha',{});
                entity.setAttribute('shadow', 'cast:true');
                entity.setAttribute('shadow', 'receive:true');
                entity.setAttribute('shader', 'standard');
                entity.setAttribute('scale', '0.8 0.8 0.8');
                entity.setAttribute('static-body', 'shape: box;');
                entity.setAttribute('constraint', 'collideConnected: false;');
                entity.setAttribute('id', 'popTree' + i);

                scene.appendChild(entity);
                let box = document.createElement('a-box');
                box.setAttribute('dynamic-body', 'shape: box; linearDamping: 1.0; angularDamping: 1.0;');
                box.setAttribute('scale', '1.4 20 1.4');
                box.setAttribute('constraint', 'type: pointToPoint; maxForce: 10000000; collideConnected: false; target: #popTree' + i + ';');
                box.setAttribute('object-status', 'hitPoints: 5;');
                box.setAttribute('id', 'popTreeH' + i);// + i
                box.setAttribute('visible', 'false');
                box.setAttribute('class', 'ground');
                entity.appendChild(box);
            }


            
            // if(i == 47)
            // {
            //     currentTreePosition = generatePositionVector(-0.2);

            //     console.log("in 47th");

            //     for(let j = 0; j < treePositions.length; j++)
            //     {
            //         if(currentTreePosition == treePositions[j])
            //         {
    
            //             console.log("changing position of firepit");
            //             //onsole.log(j);
            //             currentTreePosition = generatePositionVector(-0.2);
            //             j = 0;
    
            //         } else if (currentTree[1] < -6) 
            //         {
            //             // console.log(currentTree[1]);
                        
            //             console.log("test firepit");
            //             currentTreePosition = generatePositionVector(-0.2);
            //             j = 0;
            //         }
            //     }

            //     let firepit = document.createElement('a-entity');
            //     firepit.setAttribute('remove-component', {});
            //     // firepit.setAttribute('position', generatePositionVector(-0.2));
            //     firepit.setAttribute('position', {x:currentTree[0],y:currentTree[1],z:currentTree[2]});
            //     firepit.setAttribute('obj-model', 'obj: #Firepit-obj');
            //     firepit.setAttribute('material', 'src: #Firepit-mtl'); 
            //     firepit.setAttribute('scale', '0.1 0.1 0.1');
            //     firepit.setAttribute('shadow', 'cast:true');
            //     firepit.setAttribute('shadow', 'receive:true');
            //     firepit.setAttribute('id','firepit');
            //     scene.appendChild(firepit);
            // }

        }



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
            //rightHand.setAttribute('teleport-controls', "cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; type: parabolic; collisionEntities: .ground; curveShootingSpeed: 10; ");
            leftHand.setAttribute('collide-listener', {});
            //rightHand.setAttribute('haptics',{})

            let hand = document.querySelector('#hand');
            let rHand = document.querySelector('#right-hand');
            let head = document.querySelector('#head');
         
            let axeEntity = document.createElement('a-entity');

            // entity.setAttribute('position', rHand.getAttribute('position'));
            // entity.setAttribute('rotation', rHand.getAttribute('rotation'));

            axeEntity.setAttribute('obj-model', 'obj: #Axe_1-obj');
            axeEntity.setAttribute('material', 'src: #Axe_1-mtl');
            axeEntity.setAttribute('scale', '0.2 0.2 0.2');
            axeEntity.setAttribute('position','0 0 0');
            axeEntity.setAttribute('rotation', '0 0 0');
            axeEntity.setAttribute('shadow', 'cast:true');
            axeEntity.setAttribute('visible', 'false');
            axeEntity.setAttribute('shadow', 'receive:true');
           // entity.setAttribute('static-body','shape: box; angularDamping: 1.0;');
          //  entity.setAttribute('constraint','type: pointToPoint; collideConnected: false; target: #right-hand');
            axeEntity.setAttribute('id', 'axe');

            scene.appendChild(axeEntity);
            //rHand.appendChild(entity);
            
            axeHB = document.createElement('a-box');
            axeHB.setAttribute('static-body','shape: none; angularDamping: 1.0;');
            axeHB.setAttribute('shape__axehead','shape: box; angularDamping: 1.0; halfExtents: 0.8 0.8 0.8; offset: 0 -1.5 -5.5;');
            axeHB.setAttribute('scale','0.1 0.1 0.1');
            
           // axeHB.setAttribute('constraint','type: pointToPoint; maxForce: 10000000; collideConnected: false; target: #axe');
            axeHB.setAttribute('id','axeHB');
            axeHB.setAttribute('visible', 'false');
            scene.appendChild(axeHB);

            //********************************* CODE FOR NEXT TOOL ********************************/
            let bowEntity = document.createElement('a-entity');
            bowEntity.setAttribute('obj-model', 'obj: #Bow_1-obj');
            bowEntity.setAttribute('material', 'src: #Bow-mtl');
            bowEntity.setAttribute('scale', '0.2 0.2 0.2');
            bowEntity.setAttribute('position','0 0 0');
            bowEntity.setAttribute('rotation', '0 0 0');
            bowEntity.setAttribute('shadow', 'cast:true');
            bowEntity.setAttribute('visible', 'false');
            bowEntity.setAttribute('shadow', 'receive:true');

            bowEntity.setAttribute('id', 'bow');

            scene.appendChild(bowEntity);

            //HIT BOX//
            bowHB = document.createElement('a-box');
            bowHB.setAttribute('static-body', 'shape: none; angularDamping: 1.0;');
            bowHB.setAttribute('shape__bowstring', 'shape: box; angularDamping: 1.0; halfExtents: 0.3 0.3 2.8; offset: -0.25 0 -2.5;');
            bowHB.setAttribute('scale', '0.1 0.1 0.1');

            
            bowHB.setAttribute('id', 'bowHB');
            bowHB.setAttribute('visible', 'false');
            scene.appendChild(bowHB);
            //********************************* CODE FOR NEXT TOOL ********************************/

            //********************************* CODE FOR NEXT TOOL ********************************/
            let hammerEntity = document.createElement('a-entity');
            hammerEntity.setAttribute('obj-model', 'obj: #Hammer_1-obj');
            hammerEntity.setAttribute('material', 'src: #Hammer-mtl');
            hammerEntity.setAttribute('scale', '0.2 0.2 0.2');
            hammerEntity.setAttribute('position','0 0 0');
            hammerEntity.setAttribute('rotation', '0 0 0');
            hammerEntity.setAttribute('shadow', 'cast:true');
            hammerEntity.setAttribute('visible', 'false');
            hammerEntity.setAttribute('shadow', 'receive:true');

            hammerEntity.setAttribute('id', 'hammer');

            scene.appendChild(hammerEntity);

            //HIT BOX//
            hammerHB = document.createElement('a-box');
            hammerHB.setAttribute('static-body', 'shape: none; angularDamping: 1.0;');
            hammerHB.setAttribute('shape__hammerhead', 'shape: box; angularDamping: 1.0; linearDamping: 1.0; halfExtents: 0.8 0.8 0.8; offset: 0 4 0;');
            hammerHB.setAttribute('scale', '0.1 0.1 0.1');
            
            hammerHB.setAttribute('id', 'hammerHB');
            hammerHB.setAttribute('visible', 'false');
            scene.appendChild(hammerHB);
            //********************************* CODE FOR NEXT TOOL ********************************/

        });
        terraObj.setObject3D('mesh', plane);
        terraObj.setAttribute('class','ground');

        // let log = document.createElement('a-entity');
        // log.setAttribute('position', '0 0 0');
        // log.setAttribute('rotation', '90 0 0');
        // log.setAttribute('scale', '0.15 0.15 0.15');
        // log.setAttribute('dynamic-body', 'shape: none; angularDamping: 1.0; linearDamping: 1.0;');
        // log.setAttribute('shape__log', 'shape: box; angularDamping: 1.0; linearDamping: 1.0; halfExtents: 0.8 6 0.8; offset: 0 6 0;');
        // log.setAttribute('obj-model', 'obj: #log-obj');
        // log.setAttribute('material', 'src: #log-mtl');
        // log.setAttribute('id', 'log');
        // log.setAttribute('class', 'Log');
        // scene.appendChild(log);
        // let waterGeo = new THREE.PlaneGeometry(1000, 1000);
        // for (let i = 0; i < waterGeo.vertices.length; i++) 
        // {

        //     waterGeo.vertices[i].z = -8;

        // }
        let waterMaterial = new THREE.MeshStandardMaterial({ shader: 'ocean', color: "#24529e" });
        //let waterPlane = new THREE.Mesh(waterGeo, waterMaterial);
       // waterPlane.rotateX(THREE.Math.degToRad(270));
        waterMaterial.roughness = 0.9;
        waterMaterial.metalness = 0.0;
        let waterEntity = document.createElement('a-entity');
        waterEntity.setAttribute('geometry', 'primitive: plane; width: 1000; height: 1000;');
        waterEntity.setAttribute('material', waterMaterial);
        waterEntity.setAttribute('rotation','-90 0 0');
        waterEntity.setAttribute('position','0 -9 0');
        waterEntity.setAttribute('id','waterFloor');
        waterEntity.setAttribute('class','ground');
        scene.appendChild(waterEntity);

       // scene.object3D.add(waterPlane);
  
            // water.rotation.x = - Math.PI / 2;
            // scene.object3D.add( water );
        //let headthing = document.querySelector('#head');

        //CLOSEST
        //document.querySelector('#cameraRig').setAttribute('position', window.GEO_VERTICES[55].x + " " + (window.GEO_VERTICES[55].y + 1) + " " + window.GEO_VERTICES[55].z);
        
        
        //console.log("position before: "+ headthing.getAttribute('position').y);
        //document.querySelector('#head').setAttribute('position', window.GEO_VERTICES[0].x + " " + (window.GEO_VERTICES[0].y) + " " + window.GEO_VERTICES[0].z);
        //console.log("position before: "+ headthing.getAttribute('position').y);        

        //document.querySelector('#cameraRig').setAttribute('position',  {x:cameraRig.x,y:cameraRig.y,z:cameraRig.z});
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
