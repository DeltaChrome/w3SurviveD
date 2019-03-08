AFRAME.registerComponent('mesh-smooth', {
    init: function () {
        let Context = this;
      this.el.addEventListener('object3dset', (e) => {
          let mesh = Context.el.getObject3D('mesh');
          mesh.traverse((node) => {
          if (node.isMesh) node.geometry.computeVertexNormals();
        });
      });
    }
  });