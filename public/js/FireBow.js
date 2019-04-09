let ItemSelected = false;
let readyForCraft_Rock = false;
let readyForCraft_Stick = false;
let readyForCraft = false;
let craftDone = false;
let craftDone_Rock = false;
let craftDone_Stick = false;
let active = false;
let stickActive = false;
let rockActive = false;
let ToolComplete = false;
let SelectedItem = "None";
let touchCount_Rock = 0;
let touchCount_Stick = 0;
let rockProgress = 0;
let stickProgress = 0;

let CraftingArea = document.getElementById("SlotE");
let ToolArea = document.getElementById("SlotC");

//Buttons
let Material_A = document.getElementById("Material_A");
let Material_B = document.getElementById("Material_B");
let ToolA = document.getElementById("ToolA");
let ToolB = document.getElementById("ToolB");
let ToolC = document.getElementById("ToolC");
let progressBar = document.getElementById("Bar");
let progressText = document.getElementById("Hint");
let ButtonMaterial = document.getElementById("MatButton");
let ButtonTool = document.getElementById("ToolButton");

//OnClicks
Material_A.onclick = function(){MaterialButton_A()};
Material_B.onclick = function(){MaterialButton_B()};
ButtonMaterial.onclick = function(){myFunction()};
ButtonTool.onclick = function(){AddtoGame()};

//first alert
alert("Please tell the VR player to find a fire pit");


let hint = document.getElementById("progressText");
hint.className = 'hide';

window.setInterval(function(){
    progress();
}, 100);

function progress()
{
    if(readyForCraft_Rock === true && !craftDone_Rock)
    {
        hint.className = 'show';
        console.log("Hallefs");
    }

    if(readyForCraft_Stick === true && !craftDone_Stick)
    {
        hint.className = 'show';
        console.log("Hallefs");
    }

    if(readyForCraft_Rock)
    {
    rockProgress = (touchCount_Rock/5)* 100;
    progressBar.style.marginRight = (1 - (touchCount_Rock/5))* 100 + "%";
    progressText.innerHTML = "CRAFTING PROGRESS " + rockProgress + "%";
    }

    else if(readyForCraft_Stick)
    {
    stickProgress = (touchCount_Stick/5)* 100;
    progressBar.style.marginRight = (1 - (touchCount_Stick/5))* 100 + "%";
    progressText.innerHTML = "CRAFTING PROGRESS " + (stickProgress) + "%";
    }
    else{
        progressBar.style.marginRight = 1* 100 + "%";
    }

    if(craftDone_Rock && craftDone_Stick && !ToolComplete)
    {
        ButtonTool.innerHTML = "SEND FIREBOW";
        ButtonTool.className = "Ready";
        ToolComplete = true;
    }
}

//Rock
function MaterialButton_A(){
    
    if(active ===false &&  !craftDone_Rock)
    {
        if(ItemSelected === true && SelectedItem == "Rock")
        {
                ItemSelected = false;
                SelectedItem = "None";
                Material_A.src = "images/rock_colour.png"
                ButtonMaterial.className = "NotReady";
                ButtonMaterial.innerHTML = "MATERIAL";

                console.log(SelectedItem);
                return;
        }
        
        if(ItemSelected === true && SelectedItem == "Stick")
        {
                ItemSelected = true;
                SelectedItem = "Rock";
                Material_B.src = "images/stick_colour.png"
                Material_A.src = "images/rock_colour_Sel.png"
                ButtonMaterial.innerHTML = "ADD ROCK";

                ButtonMaterial.className = "Ready";
                console.log(SelectedItem);
                return;
    
        }
        if(ItemSelected === false)
            {
                ItemSelected = true;
                SelectedItem = "Rock";
                Material_B.src = "images/stick_colour.png"
                Material_A.src = "images/rock_colour_Sel.png"
                ButtonMaterial.innerHTML = "ADD ROCK";
                ButtonMaterial.className = "Ready";
                return;
                
        }
    }

    if(active)
    {
        if(readyForCraft_Rock === true)
            {
                touchCount_Rock++;
                console.log(touchCount_Rock);
            }

            if(touchCount_Rock === 6)
            {
                readyForCraft_Rock = false;
                craftDone_Rock = true;
                hint.className = 'hide';
                active= false;
            }

            if(craftDone_Rock)
            {
                ToolB.className = "show";
                console.log("Done");
                CraftingArea.removeChild(Material_A);
                touchCount_Rock = 0;
            }
            return;
        }
    }
//Stick
function MaterialButton_B(){

    if(active === false && !craftDone_Stick)
    {
        if(ItemSelected === true && SelectedItem == "Stick")
        {
                ItemSelected = false;
                SelectedItem = "None";
                console.log(SelectedItem);
                ButtonMaterial.innerHTML = "MATERIAL";
                Material_B.src = "images/stick_colour.png";
                ButtonMaterial.className = "NotReady";
                return;
        }
        
        if(ItemSelected === true && SelectedItem == "Rock")
        {
                ItemSelected = true;
                SelectedItem = "Stick";
                console.log(SelectedItem);
                Material_B.src = "images/stick_colour_Sel.png";
                Material_A.src = "images/rock_colour.png";
                ButtonMaterial.innerHTML = "ADD STICK";
                ButtonMaterial.className = "Ready";
                return;
    
        }
    
        if(ItemSelected === false)
        {
                ItemSelected = true;
                SelectedItem = "Stick";
                console.log(SelectedItem);
                Material_B.src = "images/stick_colour_Sel.png";
                Material_A.src = "images/rock_colour.png";
                ButtonMaterial.innerHTML = "ADD STICK";
                ButtonMaterial.className = "Ready";
                return;
        }
    }

    if(active)
    {
        if(readyForCraft_Stick === true)
            {
                touchCount_Stick++;
                console.log(touchCount_Stick);
            }

            if(touchCount_Stick === 6)
            {
                readyForCraft_Stick = false;
                touchCount_Stick = 0;
                active = false;
                craftDone_Stick = true;
                hint.className = 'hide';
            }

            if(craftDone_Stick)
            {
                readyForCraft_Stick = false;
                console.log(touchCount_Stick);
                ToolA.className = "show";
                ToolC.className = "show";
                console.log("Hello");
                CraftingArea.removeChild(Material_B);
            }
            return;
        }
    }

function myFunction(){
    
    Material_B.src = "images/stick_colour.png"
    Material_A.src = "images/rock_colour.png"

    if(active === false)
    {

        if(SelectedItem === "Rock" && !craftDone_Rock)
    {
        SlotE.appendChild(Material_A);
        ButtonMaterial.className = "NotReady";
        readyForCraft_Rock = true;
        rockActive = true;
        stickActive = false;
        active = true;  
        console.log("RockAdded");
        // Material_A.style.bottom = "50%";
        return;
    }
    if(SelectedItem === "Stick" && !craftDone_Stick)
    {
        CraftingArea.appendChild(Material_B);
        ButtonMaterial.className = "NotReady";
        readyForCraft_Stick = true;
        stickActive = true;
        rockActive = false;
        active = true;
        console.log("StickAdded");
        // Material_B.style.bottom = "40%";
        return;
    }
}

}

function AddtoGame(){
    
    let socket = io();
        
    //default connect event
    socket.on('connect', function() {
        console.log("connected!");
    });

    if(ToolComplete)
    {

        let toolType =
        {
            tool: 2
        }

        let toolTypeJSON = JSON.stringify(toolType);

        console.log("firebow html sends bow");
        socket.emit('createObject', toolTypeJSON);
        //last alert
        alert("Please ask the Vr player to start a fire by using the fireBow on the stick found in the fire pit");

        ToolA.style.visibility = "Hidden";
        ToolB.style.visibility = "Hidden";
        ToolC.style.visibility = "Hidden";
        ButtonTool.innerHTML = "TOOL";
        ButtonTool.className = "NotReady";

        //next page
        document.location.href = 'Hammer.html';
    }

}

// if(readyForCraft === true)
//     {
//         document.getElementsByTagName("H1")[1].innerHTML = touchCount;
//         touchCount++;
//     }

//     if(touchCount_MATA === 11)
//     {
//         readyForCraft = false;
//         craftDone = true;
//         active= false;
//     }

//     if(craftDone)
//     {
//         ToolArea.appendChild(Material_A);
//     }
//     return;