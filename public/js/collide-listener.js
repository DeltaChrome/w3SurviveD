AFRAME.registerComponent('collide-listener', {
  init: function () {
    console.log("Collide listener is running");
    let el = this.el;
    // let leftHand = document.querySelector('#left-hand');
    let rightHand = document.querySelector('#hand');
    // leftHand.addEventListener('collide', function (e) {
    //   console.log('left hand collided' + e.detail.body.id);

    //   e.detail.target.el;  // Original entity (playerEl).
    //   e.detail.body.el;    // Other entity, which playerEl touched.
    //   e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
    //   e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    // });
    rightHand.addEventListener('collide', function (e) 
    {
      console.log('right hand collided: ' + e.detail.body.el.getAttribute('id'));
      console.log(window.IS_GRABBING);
      if(e.detail.body.el.getAttribute('id') == 'axe')
      {
        //e.detail.body.el.setAttribute('', 'false');
      }
      else if ((window.IS_GRABBING == true ) && (e.detail.body.el.getAttribute('id') != 'terrainGenerationObj') && (e.detail.body.el.getAttribute('id') != 'right-hand')) 
      {
        e.detail.body.el.setAttribute('visible', 'false');
      }

      e.detail.target.el;  // Original entity (playerEl).
      e.detail.body.el;    // Other entity, which playerEl touched.
      e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
  }
});
