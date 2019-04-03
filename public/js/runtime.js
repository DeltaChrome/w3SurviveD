window.LAST_TIME;
window.DELTA_TIME;
window.NUM_ROCKS;
window.NUM_TWIGS;
window.NUM_LEAVES;
window.TOOL_TYPE;//hands(0), axe(1), firebow(2), hammer(3)

AFRAME.registerComponent("runtime", {
    schema:
    {

    // PlayerGX: {type: int, default: 5},
    // PlayerGY: {type: int, default: 5}

    },

    init: function ()
    {
        window.LAST_TIME = Date.now();
        window.TOOL_TYPE = 0;

        document.querySelector('#createWindSound').setAttribute('sound','loop: true;');
        document.querySelector('#createWindSound').components['sound'].playSound();     
    
    },

    tick: function()
    {
       
        let currentTime = Date.now();
        window.DELTA_TIME = currentTime - window.LAST_TIME;
        window.LAST_TIME  = currentTime;

        let hand = document.querySelector('#right-hand').getAttribute('rotation');
        let handpos = document.querySelector('#right-hand').getAttribute('position');
        let cameraRigPos = document.querySelector('#cameraRig').getAttribute('position');
        let head = document.querySelector('#head').getAttribute('position');
        
        let actualHandX = handpos.x + cameraRigPos.x;
        let actualHandY = handpos.y + cameraRigPos.y;
        let actualHandZ = handpos.z + cameraRigPos.z;
        let axe = document.querySelector('#axe');
        let axeHB = document.querySelector('#axeHB');
        let bow = document.querySelector('#bow');
        let bowHB = document.querySelector('#bowHB');
        //console.log(cameraRigPos);
        //console.log("positions added: ", actualHandX);
        //let actualHand = cameraRigPos + handpos;

        if(window.TOOL_TYPE == 1)
        {
            axe.setAttribute('visible', 'true');
            bow.setAttribute('visible', 'false');
            
            axe.setAttribute('rotation', hand);
            axe.setAttribute('position', {x:actualHandX, y:actualHandY ,z:actualHandZ} );
    
            let axeHBX = axe.getAttribute('position').x;
            let axeHBY = axe.getAttribute('position').y;
            let axeHBZ = axe.getAttribute('position').z;
    
            axeHB.setAttribute('position', {x:axeHBX, y:axeHBY ,z:axeHBZ});
            axeHB.setAttribute('rotation', axe.getAttribute('rotation'));
            
        }
        else if(window.TOOL_TYPE == 2)
        {
            bow.setAttribute('visible', 'true');
            axe.setAttribute('visible', 'false');

            bow.setAttribute('rotation', {x:hand.x,y:hand.y,z:hand.z});
            bow.setAttribute('position', {x:actualHandX, y:actualHandY ,z:actualHandZ} );
            
            let bowHBX = bow.getAttribute('position').x;
            let bowHBY = bow.getAttribute('position').y;
            let bowHBZ = bow.getAttribute('position').z;

            bowHB.setAttribute('position', {x:bowHBX, y:bowHBY ,z:bowHBZ});
            bowHB.setAttribute('rotation', bow.getAttribute('rotation'));
            //console.log('setting position');

            //when the bow collides with stick
                //lock bow position to where it collided
                //based on player hands distance vectors move bow position
                //check for delta distance vector and add to previous
                //if distance vector is greater than some constant
                    //add 1 to a count var
                //if the count var is greater than some constant
                    //emit event or change flag for achieving fire
                    //release bow from stick
            
        }

        document.querySelector('#createWindSound').setAttribute('position',cameraRigPos);

        //update server with players inventory
        let inv = 
        {
            rocks: window.NUM_ROCKS,
            twigs: window.NUM_TWIGS,
            leaves: window.NUM_LEAVES
        }
        //call event updateInventory

        // console.log(axe.getAttribute('position'));
        // console.log('running');
    }

});
