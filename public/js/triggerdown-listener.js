AFRAME.registerComponent('triggerdown-listener', {
    init: function () {
      var el = this.el;
      el.addEventListener('triggerdown', function (evt) {

        //if colliding with a rock or other collectable materials
        

        el.setAttribute('visible', !el.getAttribute('visible'));
      });
    }
  });