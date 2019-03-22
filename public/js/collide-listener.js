AFRAME.registerComponent('collide-listener', {
  init: function () {
    console.log("Collide listener is running");
    let el = this.el;
    // let leftHand = document.querySelector('#left-hand');
    let rightHand = document.querySelector('#hand');
    let rightHandActual = document.querySelector('#right-hand');
    axeSound = document.querySelector('#createAxeSound');
    
    let axe = document.querySelector('#axeHB');
    // leftHand.addEventListener('collide', function (e) {
    //   console.log('left hand collided' + e.detail.body.id);

    //   e.detail.target.el;  // Original entity (playerEl).
    //   e.detail.body.el;    // Other entity, which playerEl touched.
    //   e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
    //   e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    // });



    axe.addEventListener('collide', function (e) {

      for(let i = 0; i < 5; i++)
      {
          if(e.detail.body.el.getAttribute('id') == ('popTreeH' + i) && e.detail.body.el.components['object-status'].data.dtSinceLastHit <= 0)
          {
            if(e.detail.body.el.components['object-status'].data.hitPoints > 0)
            {
              let hp = e.detail.body.el.components['object-status'].data.hitPoints;
              hp = hp - 1;
              console.log(hp);

              rightHandActual.components['haptics'].pulse(1.0, 200);
              axeSound.setAttribute('sound', 'volume: 200');
              axeSound.components['sound'].playSound();

              e.detail.body.el.setAttribute('object-status','hitPoints: ' + hp + ';');
              e.detail.body.el.setAttribute('object-status','dtSinceLastHit: ' + 2.0 + ';');  
              if(hp == 0)
              {
                let currentTree = document.querySelector('#popTree' + i);
                currentTree.setAttribute('visible','false');  
              }
            }
            
          }
      }

    });

    rightHand.addEventListener('collide', function (e) 
    {
      console.log('right hand collided: ' + e.detail.body.el.getAttribute('id'));
      console.log(window.IS_GRABBING);
      
      if(e.detail.target.el.getAttribute('id') == 'axe')
      {
     
        //e.detail.body.el.setAttribute('', 'false');
        //e.detail.body.el.setAttribute('rotation', '0 0 0');

        //play chop sound
        //subtract health from tree
        

      }
      else if ((window.IS_GRABBING == true ) && (e.detail.body.el.getAttribute('id') != 'terrainGenerationObj') && (e.detail.body.el.getAttribute('id') != 'right-hand') && (e.detail.body.el.getAttribute('id') != 'axe') ) 
      {
        e.detail.body.el.setAttribute('visible', 'false');
      }

      // e.detail.target.el;  // Original entity (playerEl).
      // e.detail.body.el;    // Other entity, which playerEl touched.
      // e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      // e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
  }
});
