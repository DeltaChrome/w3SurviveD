window.LAST_TIME;
window.DELTA_TIME;
AFRAME.registerComponent("runtime", {
    schema:
    {

    // PlayerGX: {type: int, default: 5},
    // PlayerGY: {type: int, default: 5}

    },

    init: function ()
    {
        window.LAST_TIME = Date.now();
    },

    tick: function()
    {
       
        let currentTime = Date.now();
        window.DELTA_TIME = currentTime - window.LAST_TIME;
        window.LAST_TIME  = currentTime;

        let hand = document.querySelector('#right-hand').getAttribute('rotation');
        let handpos = document.querySelector('#right-hand').getAttribute('position');
        let cameraRigPos = document.querySelector('#cameraRig').getAttribute('position');

        
        let actualHandX = handpos.x + cameraRigPos.x;
        let actualHandY = handpos.y + cameraRigPos.y;
        let actualHandZ = handpos.z + cameraRigPos.z;
        //console.log(cameraRigPos);
        //console.log("positions added: ", actualHandX);
        //let actualHand = cameraRigPos + handpos;
        let axe = document.querySelector('#axe');
        let axeHB = document.querySelector('#axeHB');
        axe.setAttribute('rotation', hand);
        axe.setAttribute('position', {x:actualHandX, y:actualHandY ,z:actualHandZ} );


        let axeHBX = axe.getAttribute('position').x;
        let axeHBY = axe.getAttribute('position').y;
        let axeHBZ = axe.getAttribute('position').z;


        axeHB.setAttribute('position', {x:axeHBX, y:axeHBY ,z:axeHBZ});
        axeHB.setAttribute('rotation', axe.getAttribute('rotation'));
        

        // console.log(axe.getAttribute('position'));

        // console.log('running');
    }

});
