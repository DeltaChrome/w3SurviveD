AFRAME.registerComponent("genterra-component", {
   
    init: function ()
    {
        console.log("genTerra.js is running");

        scene = document.querySelector('a-scene');

        function generateNumber ()
        {
            return(Math.floor(Math.random()* 3));
        
        }

        var geometry = new THREE.BoxGeometry( 100, 100, 1, 10, 10, 1 );
        var material = new THREE.MeshStandardMaterial( {color: "#556b4a"} );

        material.roughness = 0.8;
        material.metalness = 0.0;

        //console.log(geometry.faces);

        for (let i = 0; i < geometry.vertices.length; i++)
        {
            //generateNumber
            //geometry.vertices[i].x = generateNumber();
            //console.log(geometry.vertices[i]);   
            if(geometry.vertices[i].z == -0.5)
            {
                geometry.vertices[i].z = -generateNumber();
            }
        //
            console.log(geometry.vertices[i].z);
            //console.log(geometry.vertices[i]);    
            
        }

        console.log(geometry.vertices.length);


        //material.receiveShadow = true;

        let plane = new THREE.Mesh( geometry, material );

        plane.castShadow = true;
        plane.receiveShadow = true;
        //plane.shader = "standard";



        //plane.customDepthMapMaterial = material;
        //plane.rotateZ = THREE.Math.degToRad(90);

        //var a = new THREE.Vector3( 0, 0, 1 );
        //plane.translateY(2);
        //plane.rotateOnWorldAxis(a,1.4)
        plane.rotateX(THREE.Math.degToRad(90));
        //console.log(plane.rotation.z);

        //newObj.rotateZ(THREE.Math.degToRad(90));

        scene.object3D.add( plane );
        scene = document.querySelector('a-scene');

        // let uniforms = {
        //     time: {
        //         value: generateNumber()
        //     }
        // }





        // let landscape = new THREE.Mesh(
        //     new THREE.PlaneBufferGeometry(300, 300, 128, 128),
        //     new THREE.ShaderMaterial({
        //         uniforms,
        //         vertexShader: `
        //             varying vec3 vPos;
        //             uniform float time;
        //             //  https://github.com/BrianSharpe/Wombat/blob/master/  SimplexPerlin2D.glsl
        //             float SimplexPerlin2D( vec2 P ) {
        //                 const float SKEWFACTOR = 0.36602540378443864676372317075294;
        //                 const float UNSKEWFACTOR = 0.21132486540518711774542560974902;
        //                 const float SIMPLEX_TRI_HEIGHT = 0.70710678118654752440084436210485;
        //                 const vec3 SIMPLEX_POINTS = vec3( 1.0-UNSKEWFACTOR, -UNSKEWFACTOR, 1.0-2.0*UNSKEWFACTOR );
        //                 P *= SIMPLEX_TRI_HEIGHT;
        //                 vec2 Pi = floor( P + dot( P, vec2( SKEWFACTOR ) ) );
        //                 vec4 Pt = vec4( Pi.xy, Pi.xy + 1.0 );
        //                 Pt = Pt - floor(Pt * ( 1.0 / 71.0 )) * 71.0;
        //                 Pt += vec2( 26.0, 161.0 ).xyxy;
        //                 Pt *= Pt;
        //                 Pt = Pt.xzxz * Pt.yyww;
        //                 vec4 hash_x = fract( Pt * ( 1.0 / 951.135664 ) );
        //                 vec4 hash_y = fract( Pt * ( 1.0 / 642.949883 ) );
        //                 vec2 v0 = Pi - dot( Pi, vec2( UNSKEWFACTOR ) ) - P;
        //                 vec4 v1pos_v1hash = (v0.x < v0.y) ? vec4(SIMPLEX_POINTS.xy, hash_x.y, hash_y.y) : vec4(SIMPLEX_POINTS.yx, hash_x.z, hash_y.z);
        //                 vec4 v12 = vec4( v1pos_v1hash.xy, SIMPLEX_POINTS.zz ) + v0.xyxy;
        //                 vec3 grad_x = vec3( hash_x.x, v1pos_v1hash.z, hash_x.w ) - 0.49999;
        //                 vec3 grad_y = vec3( hash_y.x, v1pos_v1hash.w, hash_y.w ) - 0.49999;
        //                 vec3 grad_results = inversesqrt( grad_x * grad_x + grad_y * grad_y ) * ( grad_x * vec3( v0.x, v12.xz ) + grad_y * vec3( v0.y, v12.yw ) );
        //                 const float FINAL_NORMALIZATION = 99.204334582718712976990005025589;
        //                 vec3 m = vec3( v0.x, v12.xz ) * vec3( v0.x, v12.xz ) + vec3( v0.y, v12.yw ) * vec3( v0.y, v12.yw );
        //                 m = max(0.5 - m, 0.0);
        //                 m = m*m;
        //                 return dot(m*m, grad_results) * FINAL_NORMALIZATION;
        //             }
        //             void main() {
        //                 vPos = position;
        //                 vPos.z += 32.0 * SimplexPerlin2D(uv * 4.0 + time * 0.6);
        //                 vPos.z += 32.0 * sin(18.0 * length(uv) + time * 2.0);
        //                 float smoothEdge = 0.1;
        //                 float edges = (
        //                       smoothstep(0.0, smoothEdge, uv.x)
        //                       * smoothstep(0.0, smoothEdge, uv.y)
        //                       * smoothstep(1.0, 1.0 - smoothEdge, uv.x)
        //                       * smoothstep(1.0, 1.0 - smoothEdge, uv.y)
        //                 );
        //                 vPos.z *= edges;
        //                 gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
        //             }
        //         `,
        //         fragmentShader: `
        //             varying vec3 vPos;
        //             float when_gt(float x, float y) {
        //               return max(sign(x - y), 0.0);
        //             }
        //             float when_le(float x, float y) {
        //               return 1.0 - when_gt(x, y);
        //             }
        //             float grid(vec3 pos, vec3 axis, float size) {
        //                 float width = 1.0;
        //                 // Grid size
        //                 vec3 tile = pos / size;
        //                 // Grid centered gradient
        //                 vec3 level = abs(fract(tile) - 0.5);
        //                 // Derivative (crisp line)
        //                 vec3 deri = fwidth(tile);
        //                 vec3 grid3D = clamp((level - deri * (width - 1.0)) / deri, 0.0, 1.0);
        //                 // Shorter syntax but pow(0.0) fails on some GPUs
        //                 // float lines = float(length(axis) > 0.0) * pow(grid3D.x, axis.x) * pow(grid3D.y, axis.y) * pow(grid3D.z, axis.z);
        //                 float lines = float(length(axis) > 0.0)
        //                     * (when_gt(axis.x, 0.0) * grid3D.x + when_le(axis.x, 0.0))
        //                     * (when_gt(axis.y, 0.0) * grid3D.y + when_le(axis.y, 0.0))
        //                     * (when_gt(axis.z, 0.0) * grid3D.z + when_le(axis.z, 0.0));
        //                 return 1.0 - lines;
        //             }
        //             void main() {
        //                 float l = grid(vPos, vec3(1.0, 1.0, 1.0), 4.0);
        //                 gl_FragColor = vec4(mix(vec3(0.1), vec3(1.0), l), 1.0);
        //                 if (vPos.z < 0.0) discard;
        //             }
        //         `,
        //         extensions: {
        //             derivatives: true
        //         }
        //     })
        // )
        // landscape.rotation.x = -Math.PI * 0.5
        // scene.object3D.add(landscape)
    }
});