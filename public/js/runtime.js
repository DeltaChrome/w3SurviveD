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
        let axe = document.querySelector('#axe');
        axe.setAttribute('rotation', hand);



        // console.log('running');
    }

});
