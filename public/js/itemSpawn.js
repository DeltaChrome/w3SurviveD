AFRAME.registerComponent("SpawnItems-component", {
   
    init: function ()
    {
        let scene = document.querySelector('a-scene');

        let entity = document.createElement('a-entity');
            entity.setAttribute('position', {x:0,y:0,z:0});
            entity.setAttribute('obj-model', 'obj: #Axe_1-obj');
            entity.setAttribute('material', 'mtl: #Axe_1-mat');
            entity.setAttribute('scale', '100 100 100');
            entity.setAttribute('shadow', 'cast:true');
            entity.setAttribute('shadow', 'receive:true');

        //     entity.setAttribute('static-body', 'shape: box;');
        //     entity.setAttribute('constraint','target: #right-hand; type: pointToPoint; targetPivot: 0 0 0; axis: 0 0 0;')
        //     entity.setAttribute('id','axe');

        //     scene.appendChild(entity);

        // let hand = document.querySelector('#hand');
        // hand.setAttribute('constraint', 'target: #LightSUN');
        // hand.setAttribute('visible', 'true');
    }
});