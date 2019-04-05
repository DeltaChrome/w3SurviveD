window.LAST_TIME;
window.DELTA_TIME;
window.NUM_ROCKS;
window.NUM_TWIGS;
window.NUM_LEAVES;
window.NUM_LOGS;
window.TOOL_TYPE;//hands(0), axe(1), firebow(2), hammer(3)
window.MAKE_FIRE;
window.FIRE_PROGRESS;
window.FIRE_COOLDOWN;
window.FIRE_COMPLETE;
window.PREVIOUS;
window.SPAWN_SHELTER;

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
        window.MAKE_FIRE = false;

        window.NUM_ROCKS = 0;
        window.NUM_TWIGS = 0;
        window.NUM_LEAVES = 0;
        window.NUM_LOGS = 0;
        window.FIRE_PROGRESS = 0; 
        window.FIRE_COMPLETE = false;               
        window.FIRE_COOLDOWN = false;   
        window.SPAWN_SHELTER = false;            

        document.querySelector('#createWindSound').setAttribute('sound','loop: true;');
        document.querySelector('#createWindSound').components['sound'].playSound();     
    
    },

    tick: function()
    {
       
        let currentTime = Date.now();
        window.DELTA_TIME = currentTime - window.LAST_TIME;
        window.LAST_TIME  = currentTime;

        let rightHand = document.querySelector('#right-hand');
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
        let stickHB = document.querySelector('#stickHB');
        let hammer = document.querySelector('#hammer');
        let hammerHB = document.querySelector('#hammerHB');
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
            
            if(window.MAKE_FIRE == false)
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

                window.PREVIOUS = bowHB.getAttribute('position'); 
                //console.log('setting position');
            }
            else if(window.FIRE_COMPLETE == false)
            {
                
                console.log("make fire is true");
                bow.setAttribute('visible', 'true');
                axe.setAttribute('visible', 'false');

                let stickHBX = stickHB.getAttribute('position').x;
                let stickHBY = stickHB.getAttribute('position').y;
                let stickHBZ = stickHB.getAttribute('position').z;

                let bowX = bow.getAttribute('position').x;
                let bowY = bow.getAttribute('position').y;
                let bowZ = bow.getAttribute('position').z;

                bow.setAttribute('rotation', {x:0,y:0,z:0});
                bowHB.setAttribute('rotation', bow.getAttribute('rotation'));
                
                // let bowXOffset = bow.getAttribute('position').x;
                // let bowYOffset = bow.getAttribute('position').y;
                // let bowZOffset = bow.getAttribute('position').z;
 
                if((actualHandZ < stickHBZ + 0.6) && (actualHandZ > stickHBZ))
                {
                    bow.setAttribute('position', {x:stickHBX + 0.05, y:stickHBY + 0.35,z:actualHandZ} );
                    
                    let bowHBX = bow.getAttribute('position').x;
                    let bowHBY = bow.getAttribute('position').y;
                    let bowHBZ = bow.getAttribute('position').z;
                    
                    bowHB.setAttribute('position', {x:bowX, y:bowY ,z:bowZ});
                    bowHB.setAttribute('rotation', bow.getAttribute('rotation'));
                    let difference = Math.abs(window.PREVIOUS - bowHB.getAttribute('position').z);
                    
                    console.log("previous z position" + window.PREVIOUS);
                    console.log("difference between positions" + difference);

                    window.PREVIOUS = bowHB.getAttribute('position').z;          

                    if(difference > 0.001)
                    {
                        console.log("small feedback");
                        rightHand.components['haptics'].pulse(0.1, 1500 * difference);
                    }
                    window.FIRE_COOLDOWN = true;
                }
                else if((actualHandZ > stickHBZ + 1.4) || (actualHandZ < stickHBZ - 0.6))
                {
                    window.MAKE_FIRE = false;
                }
                else if(window.FIRE_COOLDOWN == true)
                {
                    window.FIRE_PROGRESS += 1;
                    window.FIRE_COOLDOWN = false;
                    rightHand.components['haptics'].pulse(0.5, 200);
                    if(window.FIRE_PROGRESS > 5)
                    {
                        window.FIRE_COMPLETE = true;
                    }
                }

                //console.log('setting position');
            }
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
        else if(window.TOOL_TYPE == 3)
        {
            axe.setAttribute('visible', 'false');
            bow.setAttribute('visible', 'false');
            hammer.setAttribute('visible', 'true');
            
            hammer.setAttribute('rotation', hand);
            hammer.setAttribute('position', {x:actualHandX, y:actualHandY ,z:actualHandZ} );
    
            let hammerHBX = hammer.getAttribute('position').x;
            let hammerHBY = hammer.getAttribute('position').y;
            let hammerHBZ = hammer.getAttribute('position').z;
    
            hammerHB.setAttribute('position', {x:hammerHBX, y:hammerHBY ,z:hammerHBZ});
            hammerHB.setAttribute('rotation', hammer.getAttribute('rotation'));

            if(window.SPAWN_SHELTER == true)
            {
                let shelter = document.createElement('a-entity');
                shelter.setAttribute('obj-model', 'obj: #Shelter-obj');
                shelter.setAttribute('material', 'src: #Shelter-mtl');
                shelter.setAttribute('scale', '0.4 0.4 0.4');
                shelter.setAttribute('position',{x:cameraRigPos.x, y:cameraRigPos.y + 1, z:cameraRigPos.z});
                shelter.setAttribute('rotation', '0 0 0');
                shelter.setAttribute('shadow', 'cast:true');
                shelter.setAttribute('visible', 'true');
                shelter.setAttribute('shadow', 'receive:true');
    
                shelter.setAttribute('id', 'shelter');
    
                scene.appendChild(shelter);
                window.SPAWN_SHELTER = false;
            }
        }

        document.querySelector('#createWindSound').setAttribute('position',cameraRigPos);

        //update server with players inventory
        let inv = 
        {
            rocks: window.NUM_ROCKS,
            twigs: window.NUM_TWIGS,
            leaves: window.NUM_LEAVES,
            logs: window.NUM_LOGS
        }
        //call event updateInventory

        // console.log(axe.getAttribute('position'));
        // console.log('running');
    }

});
