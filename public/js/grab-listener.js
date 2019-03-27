
window.IS_GRABBING;

AFRAME.registerComponent('grab-listener', {
    init: function () {
        console.log("grab listener is running");
        let el = this.el;

        // let leftHand = document.querySelector('#left-hand');
        let rightHand = document.querySelector('#right-hand');

        rightHand.addEventListener('gripdown', function (e) {

            window.IS_GRABBING = true;
            console.log("player is grabbing!");

        });

        rightHand.addEventListener('gripup', function (e) {

            window.IS_GRABBING = false;
            console.log("player is NOT grabbing!");

        });
    }
});
