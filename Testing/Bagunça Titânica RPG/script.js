const titleButtonElement = document.getElementById("title-screen-button");

const playButtonElement = document.getElementById("play-button");
const optionsButtonElement = document.getElementById("options-button");
const exitButtonElement = document.getElementById("exit-button");

const optionsAudioButtonElement = document.getElementById("options-screen-audio-button");
const backFromAudioOptionsButtonElement = document.getElementById("backfromaudio-options-button");
const musicVolumeSliderElement = document.getElementById("music-volume-slider");
let musicVolumeValueElement = document.getElementById("music-volume-slider-value");
const sfxVolumeSliderElement = document.getElementById("sfx-volume-slider");
let sfxVolumeValueElement = document.getElementById("sfx-volume-slider-value");

let mainMenuSoundtrackElement = document.getElementById("main-menu-soundtrack");
mainMenuSoundtrackElement.volume = 0.2;

let currentSoundtrackId = mainMenuSoundtrackElement.id;
let previousSoundtrackId = currentSoundtrackId;

const newGameButtonElement = document.getElementById("newgame-button");
const continueGameButtonElement = document.getElementById("continue-button");
const deleteSaveButtonElement = document.getElementById("deletesave-button");

const backFromLoadGameButtonElement = document.getElementById("backfromloadgame-button");
const backFromOptionsButtonElement = document.getElementById("backfromoptions-button");

const nextButtonElement = document.getElementById("next-button");
const endButtonElement = document.getElementById("end-screen-button");



function startSoundtrack (newCurrentSoundtrackId) {
    previousSoundtrackId = currentSoundtrackId;
    currentSoundtrackId = newCurrentSoundtrackId;

    const previousAudioElement = document.getElementById(previousSoundtrackId);
    if(previousAudioElement.play) {
        previousAudioElement.pause();
    }
    const currentAudioElement = document.getElementById(currentSoundtrackId);
    if(currentAudioElement.paused) {
        currentAudioElement.play();
    }
}

function stopSoundtrack () {    
    const currentAudioElement = document.getElementById(currentSoundtrackId);
    currentAudioElement.currentTime = 0;
    if(currentAudioElement.play) {
        currentAudioElement.pause();
    }
}

optionsAudioButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goAudioOptions").action();
});

backFromAudioOptionsButtonElement.addEventListener("click", () => 
{
    gameScreen.find(action => action.name === "goOptions").action();
});

musicVolumeSliderElement.addEventListener("input", () => 
{
    const volume = musicVolumeSliderElement.value / 100;
    mainMenuSoundtrackElement.volume = volume;
    musicVolumeValueElement.textContent = musicVolumeSliderElement.value
});

sfxVolumeSliderElement.addEventListener("input", () => 
{
    const volume = sfxVolumeSliderElement.value / 100;
    mainMenuSoundtrackElement.volume = volume;
    musicVolumeValueElement.textContent = musicVolumeSliderElement.value
});



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
                startSoundtrack(mainMenuSoundtrackElement.id); 
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
        name: 'goAudioOptions',
        action: () => 
            { 
                toggleScreen(currentScreen, 'options-audio-screen'); 
                currentScreen = "options-audio-screen";
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
