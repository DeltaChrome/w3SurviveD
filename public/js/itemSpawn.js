AFRAME.registerComponent("spawnItems-component", {
   
    init: function ()
    {
        let scene = document.querySelector('a-scene');

        let entity = document.createElement('a-entity');
            entity.setAttribute('position', {x:0,y:0,z:0});
            entity.setAttribute('obj-model', 'obj: #Backpack_1-obj');
            entity.setAttribute('material', 'mtl: #Backpack_1-mat');
            entity.setAttribute('scale', '1 1 1');

            scene.appendChild(entity);
    }
});