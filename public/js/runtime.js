AFRAME.registerComponent("runtime", {
   
    init: function ()
    {

    },

    tick: function()
    {
        //console.log("running...");

        //𝐴𝑥 + 𝐵𝑦 + 𝐶𝑧 + 𝐷 = 0
        //-D = 𝐴𝑥 + 𝐵𝑦 + 𝐶𝑧
        //x = player.x etc.
        //list of 100, every 10 is the edge every two plus 10 is the point underneath
        //vertex 1(i = 1) vertex 2(j = 2)
        //vertex 3(i + 10) vertex 4(j + 10)

        //9 rows/9 loops

        //make a box that the player is in, then find all the coords of terrain geo that fit inside said box
        //then take those and check to see which triangle of the possible planes in that box
        //take vertices from that triangle to make plane equation
        

        //console.log(window.GEO_VERTICES[0].z);

        //GET PLAYER X,Z POS
        //let p = document.querySelector('#Player').getAttribute("position");

        //console.log(p.x," ",p.z)

        // for(let i = 0; i < window.GEO_VERTICES; i++)
        // {
        //     console.log(i);
        // }

    }

});
