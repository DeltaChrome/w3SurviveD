AFRAME.registerComponent('collide-listener', {
  init: function () {
    console.log("Collide listener is running");
    let el = this.el;
    // let leftHand = document.querySelector('#left-hand');
    let scene = document.querySelector('a-scene');
    let rightHand = document.querySelector('#hand');
    let rightHandActual = document.querySelector('#right-hand');
    dropSound = document.querySelector('#createDropSound');
    axeSound = document.querySelector('#createAxeSound');
    axeSound.setAttribute('sound', 'volume: 1.5');
    dropSound.setAttribute('sound', 'volume: 1.5');

    let axe = document.querySelector('#axeHB');
    let bow = document.querySelector('#bowHB');
    let hammer = document.querySelector('#hammerHB');

    hammer.addEventListener('collide', function (e) 
    {
      //console.log("bow collided with: " + e.detail.body.el.getAttribute('id'));
      if(e.detail.body.el.getAttribute('id') == ('log') && e.detail.body.el.getAttribute('visible') == true)
      {
        let hammerSound = document.querySelector('#createHammerSound');

        e.detail.body.el.setAttribute('visible','false');
        window.SPAWN_SHELTER = true;
        hammerSound.components['sound'].stopSound();
        hammerSound.setAttribute('position', hammer.getAttribute('position'));
        hammerSound.components['sound'].playSound();
      }
    });

    bow.addEventListener('collide', function (e) 
    {
      //console.log("bow collided with: " + e.detail.body.el.getAttribute('id'));
      if(e.detail.body.el.getAttribute('id') == ('stickHB'))
      {
        //console.log("colliding bow with stick")
        window.MAKE_FIRE = true;
      }
    });

    axe.addEventListener('collide', function (e) {

      if(window.TOOL_TYPE == 1)//might be good to reduce collision checks when we add a lot of trees
      {

      }
      for(let i = 0; i < 48; i++)//change to select as i doesnt actually do anything here, i think
      {
        //console.log("axe collided with: " + e.detail.body.el.getAttribute('id'));
          if(e.detail.body.el.getAttribute('id') == ('popTreeH' + i) && e.detail.body.el.components['object-status'].data.dtSinceLastHit <= 0)
          {
            if(e.detail.body.el.components['object-status'].data.hitPoints > 0)
            {
              let hp = e.detail.body.el.components['object-status'].data.hitPoints;
              hp = hp - 1;

              axeSound.components['sound'].stopSound();
              rightHandActual.components['haptics'].pulse(1.0, 200);
              axeSound.setAttribute('position', axe.getAttribute('position'));
              //console.log("volume: " + axeSound.getAttribute('sound').volume);
              axeSound.components['sound'].playSound();
              
              e.detail.body.el.setAttribute('object-status','hitPoints: ' + hp + ';');
              e.detail.body.el.setAttribute('object-status','dtSinceLastHit: ' + 2.0 + ';');  
              if(hp == 0)
              {
                
                let currentTree = document.querySelector('#popTree' + i);
                currentTree.setAttribute('visible','false');  
                let log = document.createElement('a-entity');
                log.setAttribute('position', {x:currentTree.getAttribute('position').x,y:currentTree.getAttribute('position').y + 1.65,z:currentTree.getAttribute('position').z - 0.7});
                log.setAttribute('rotation','90 0 0');
                log.setAttribute('scale','0.15 0.15 0.15');
                log.setAttribute('dynamic-body', 'shape: none; angularDamping: 1.0; linearDamping: 1.0;');
                log.setAttribute('shape__log', 'shape: box; angularDamping: 1.0; linearDamping: 1.0; halfExtents: 0.8 6 0.8; offset: 0 6 0;');
                log.setAttribute('obj-model','obj: #log-obj');
                log.setAttribute('material','src: #log-mtl');
                log.setAttribute('id','log');
                log.setAttribute('class','Log');
                scene.appendChild(log);
                axeSound.components['sound'].stopSound();
                dropSound.setAttribute('position', currentTree.getAttribute('position'));
                dropSound.components['sound'].playSound();
              }
            }
          }
      }
    });

    rightHand.addEventListener('collide', function (e) 
    {
     // console.log('right hand collided: ' + e.detail.body.el.getAttribute('id'));
      //console.log(window.IS_GRABBING);
      
     if ((window.IS_GRABBING == true ) && ((e.detail.body.el.getAttribute('id') == 'rock') || (e.detail.body.el.getAttribute('id') == 'branch') || (e.detail.body.el.getAttribute('id') == 'leaf'))) 
      {
        if (e.detail.body.el.getAttribute('visible'))
        {
        
          e.detail.body.el.setAttribute('visible', 'false');

          if (e.detail.body.el.getAttribute('class') == 'Rock') 
          {
            window.NUM_ROCKS += 1;
          }
          else if (e.detail.body.el.getAttribute('class') == 'Branch')
          {
            window.NUM_TWIGS += 1;
          }
          else if (e.detail.body.el.getAttribute('class') == 'Leaves')
          {
            window.NUM_LEAVES += 1;
          }
          else if(e.detail.body.el.getAttribute('class') == 'Log')
          {
            window.NUM_LOGS += 1;
          }
        }
      }

      // e.detail.target.el;  // Original entity (playerEl).
      // e.detail.body.el;    // Other entity, which playerEl touched.
      // e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      // e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
  }
});
