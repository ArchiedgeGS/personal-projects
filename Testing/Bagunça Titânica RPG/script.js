const titleButtonElement = document.getElementById("title-screen-button");

const playButtonElement = document.getElementById("play-button");
const optionsButtonElement = document.getElementById("options-button");
const exitButtonElement = document.getElementById("exit-button");

const newGameButtonElement = document.getElementById("newgame-button");
const continueGameButtonElement = document.getElementById("continue-button");
const deleteSaveButtonElement = document.getElementById("deletesave-button");

const backFromLoadGameButtonElement = document.getElementById("backfromloadgame-button");
const backFromOptionsButtonElement = document.getElementById("backfromoptions-button");

const nextButtonElement = document.getElementById("next-button");
const endButtonElement = document.getElementById("end-screen-button");

function startSoundtrack () {    
    let audioElement = document.getElementById("soundtrack");
    if(audioElement.paused) {
    audioElement.play();
    }
}

function stopSoundtrack () {    
    let audioElement = document.getElementById("soundtrack");
    audioElement.currentTime = 0;
    if(audioElement.play) {
    audioElement.pause();
    }
}

function toggleScreen(hideScreenId, showScreenId) {
    document.getElementById(hideScreenId).classList.remove('active');
    document.getElementById(showScreenId).classList.add('active');
}

let currentScreen = "title-screen";
const gameScreen = [
    {
        name: 'goMainMenu',
        action: () => 
            { 
                startSoundtrack(); 
                toggleScreen(currentScreen, 'main-menu-screen'); 
                currentScreen = "main-menu-screen";
            }
    },
    {
        name: 'goLoadGame',
        action: () => 
            { 
                toggleScreen(currentScreen, 'loadgame-screen'); 
                currentScreen = "loadgame-screen";
            }
    },
    {
        name: 'goOptions',
        action: () => 
            { 
                toggleScreen(currentScreen, 'options-screen'); 
                currentScreen = "options-screen";
            }
    },
    {
        name: 'goTitle',
        action: () => 
            { 
                stopSoundtrack(); 
                toggleScreen(currentScreen, 'title-screen'); 
                currentScreen = "title-screen";
            }
    },
    {
        name: 'goGame',
        action: () => 
            { 
                toggleScreen(currentScreen, 'game-screen'); 
                currentScreen = "game-screen";
            }
    },
    {
        name: 'goEnd',
        action: () => 
            { 
                toggleScreen(currentScreen, 'end-screen'); 
                currentScreen = "end-screen";
            }
    }
];

titleButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goMainMenu").action();
});



playButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goLoadGame").action();
});
optionsButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goOptions").action();
});
exitButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goTitle").action();
});



newGameButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goGame").action();
});
continueGameButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goTitle").action();
});
deleteSaveButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goTitle").action();
});



backFromLoadGameButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goMainMenu").action();
});
backFromOptionsButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goMainMenu").action();
});



nextButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goEnd").action();
});

endButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goTitle").action();
});