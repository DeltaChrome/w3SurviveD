AFRAME.registerComponent("object-status", {
    schema:
    {

     hitPoints: {type: 'int', default: 5},
     dtSinceLastHit: {type: 'float', default: 0.0}
     //isChopped: {type: 'bool', default: false}

    },

    init: function ()
    {
        
    },

    tick: function()
    {
        //console.log( this.el.components['object-status'].data.dtSinceLastHit);
        if(this.el.components['object-status'].data.dtSinceLastHit > 0)
        {
            this.el.components['object-status'].data.dtSinceLastHit =  this.el.components['object-status'].data.dtSinceLastHit - window.DELTA_TIME;
            console.log(this.el.components['object-status'].data.dtSinceLastHit);
        }
        
    }

});
