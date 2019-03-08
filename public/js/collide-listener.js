AFRAME.registerComponent('collide-listener', {
    init: function () {
      console.log("Collide listener is running");
      let el = this.el;
      // let leftHand = document.querySelector('#left-hand');
      let rightHand = document.querySelector('#right-hand');
      // leftHand.addEventListener('collide', function (e) {
      //   console.log('left hand collided' + e.detail.body.id);
      
      //   e.detail.target.el;  // Original entity (playerEl).
      //   e.detail.body.el;    // Other entity, which playerEl touched.
      //   e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      //   e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
      // });
      rightHand.addEventListener('collide', function (e) {
        console.log('right hand collided' + e.detail.body.id);
        
        e.detail.target.el;  // Original entity (playerEl).
        e.detail.body.el;    // Other entity, which playerEl touched.
        e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
        e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
      });
    }
  });



