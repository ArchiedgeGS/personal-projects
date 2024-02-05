// Inputs e displays:

    const titleButtonElement = document.getElementById("title-screen-button");

    const playButtonElement = document.getElementById("play-button");
    const optionsButtonElement = document.getElementById("options-button");
    const exitButtonElement = document.getElementById("exit-button");

    const optionsAudioButtonElement = document.getElementById("options-screen-audio-button");
    const backFromAudioOptionsButtonElement = document.getElementById("backfromaudio-options-button");

    const musicVolumeSliderElement = document.getElementById("music-volume-slider");
    let musicVolumeDisplayElement = document.getElementById("music-volume-display");
    const sfxVolumeSliderElement = document.getElementById("sfx-volume-slider");
    let sfxVolumeDisplayElement = document.getElementById("sfx-volume-display");

    const newGameButtonElement = document.getElementById("newgame-button");
    const continueGameButtonElement = document.getElementById("continue-button");

    const backFromLoadGameButtonElement = document.getElementById("backfromloadgame-button");
    const backFromOptionsButtonElement = document.getElementById("backfromoptions-button");

    const nextButtonElement = document.getElementById("next-button");
    const endButtonElement = document.getElementById("end-screen-button");
    
    let activeScreenElement = document.querySelector(".active");
    let onScreenNavigableButtonElements = activeScreenElement.querySelectorAll(".navigable-button:not(.inactive)");
    let hoveredButtonIndex = 0;



// Telas

    function hideElement(hideElementId) {
        document.getElementById(hideElementId).classList.remove('active');
        document.getElementById(hideElementId).classList.add('inactive');
    }

    function showElement(showElementId) {
        document.getElementById(showElementId).classList.remove('inactive');
        document.getElementById(showElementId).classList.add('active');
    }    

    function toggleElement(hideElementId, showElementId) {
        hideElement(hideElementId);
        showElement(showElementId);
    }



    let currentScreenId = activeScreenElement.id;
    const screens = [
        {
            name: 'goMainMenu',
            action: () => 
                { 
                    startSoundtrack("main-menu-soundtrack"); 
                    toggleElement(currentScreenId, 'main-menu-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
        {
            name: 'goLoadGame',
            action: () => 
                { 
                    toggleElement(currentScreenId, 'loadgame-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
        {
            name: 'goOptions',
            action: () => 
                { 
                    toggleElement(currentScreenId, 'options-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
        {
            name: 'goAudioOptions',
            action: () => 
                { 
                    toggleElement(currentScreenId, 'options-audio-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
        {
            name: 'goTitle',
            action: () => 
                { 
                    stopSoundtrack(); 
                    toggleElement(currentScreenId, 'title-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
        {
            name: 'goGame',
            action: () => 
                {
                    startSoundtrack("tavern-theme-soundtrack");
                    toggleElement(currentScreenId, 'game-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
        {
            name: 'goEnd',
            action: () => 
                { 
                    toggleElement(currentScreenId, 'end-screen'); 
                    activeScreenElement = document.querySelector(".active");
                    currentScreenId = activeScreenElement.id;w
                    onScreenNavigableButtonElements = activeScreenElement.querySelectorAll('.navigable-button:not(.inactive');
                    hoveredButtonIndex = 0;
                }
        },
    ];

    titleButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goMainMenu").action();
    });



    playButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goLoadGame").action();
    });
    optionsButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goOptions").action();
    });
    exitButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goTitle").action();
    });



    optionsAudioButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goAudioOptions").action();
    });

    backFromAudioOptionsButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goOptions").action();
    });



    newGameButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goGame").action();
    });
    continueGameButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goTitle").action();
    });



    backFromLoadGameButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goMainMenu").action();
    });
    backFromOptionsButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goMainMenu").action();
    });



    nextButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goEnd").action();
    });

    endButtonElement.addEventListener("click", () => 
    {
        screens.find(action => action.name === "goTitle").action();
    });



// Soundtracks e configurações de som    

    function increaseSliderValue(slider) {
        const step = parseFloat(slider.step) || 1;
        const newValue = parseFloat(slider.value) + step;
        slider.value = newValue > parseFloat(slider.max) ? slider.max : newValue;
    }

    function decreaseSliderValue(slider) {
        const step = parseFloat(slider.step) || 1;
        const newValue = parseFloat(slider.value) - step;
        slider.value = newValue < parseFloat(slider.min) ? slider.min : newValue;
    }



    const soundtracks = [
        {
            id: "main-menu-soundtrack",
            element: document.getElementById("main-menu-soundtrack"),
        },
        {
            id: "tavern-theme-soundtrack",
            element: document.getElementById("tavern-theme-soundtrack"),
        },
    ];

    let currentSoundtrackElement = document.getElementById("main-menu-soundtrack");
    let currentSoundtrackId = currentSoundtrackElement.id;

    if(!currentSoundtrackElement.paused) {
        currentSoundtrackElement.addEventListener("ended", () => 
        {
            currentSoundtrackElement.currentTime = 0;
        }
        )
    }

    function changeMusic (soundtrackId) {
        let currentSoundtrack = soundtracks.find(soundtrack => soundtrack.id === soundtrackId);
        currentSoundtrackElement = currentSoundtrack.element;
        currentSoundtrackElement.volume = musicVolumeSliderElement.value / 100;
        currentSoundtrackId = soundtrackId;
    };

    function startSoundtrack (newSoundtrackId) {
        if(newSoundtrackId !== currentSoundtrackId) {
            currentSoundtrackElement.pause();
            currentSoundtrackElement.currentTime = 0;
            changeMusic(newSoundtrackId);
            currentSoundtrackElement.play();
        }
        else {
            currentSoundtrackElement.play();
        }
    }
    
    function stopSoundtrack () {    
        currentSoundtrackElement.pause();
        currentSoundtrackElement.currentTime = 0;
    }
    
    

    const sfxs = [
        {
            id: "buttonPress-sfx",
            element: document.getElementById("buttonPress-sfx"),
        },
        {
            id: "swordHit0-sfx",
            element: document.getElementById("swordHit0-sfx"),
        },
        {
            id: "swordHit2-sfx",
            element: document.getElementById("swordHit2-sfx"),
        },
        {
            id: "swordHit4-sfx",
            element: document.getElementById("swordHit4-sfx"),
        },
        {
            id: "swordHit6-sfx",
            element: document.getElementById("swordHit6-sfx"),
        },
        {
            id: "swordHit8-sfx",
            element: document.getElementById("swordHit8-sfx"),
        },
        {
            id: "swordHit10-sfx",
            element: document.getElementById("swordHit10-sfx"),
        },
    ];

    let currentSfxElement = document.getElementById("buttonPress-sfx");

    function changeSfx (sfxId) {
        let currentSfx = sfxs.find(sfx => sfx.id === sfxId);
        currentSfxElement = currentSfx.element;
        currentSfxElement.volume = sfxVolumeSliderElement.value / 100;
    };

    const buttonSoundElements = document.querySelectorAll('.button-sound');

    buttonSoundElements.forEach(button => {
        button.addEventListener('click', () => {   
        currentSfxElement.pause();
        currentSfxElement.currentTime = 0;
        changeSfx("buttonPress-sfx");
        currentSfxElement.play();
        });
    });

    musicVolumeSliderElement.addEventListener("input", () => 
    {
    const volume = musicVolumeSliderElement.value / 100;
    currentSoundtrackElement.volume = volume;
    musicVolumeDisplayElement.textContent = musicVolumeSliderElement.value
    });

    musicVolumeSliderElement.addEventListener("click", () => 
    {
    const volume = musicVolumeSliderElement.value / 100;
    currentSoundtrackElement.volume = volume;
    musicVolumeDisplayElement.textContent = musicVolumeSliderElement.value
    });

    sfxVolumeSliderElement.addEventListener("input", () => 
    {
    const volume = sfxVolumeSliderElement.value / 100;
    currentSfxElement.volume = volume;
    sfxVolumeDisplayElement.textContent = sfxVolumeSliderElement.value
    });

    sfxVolumeSliderElement.addEventListener("click", () => 
    {
    const volume = sfxVolumeSliderElement.value / 100;
    currentSfxElement.volume = volume;
    sfxVolumeDisplayElement.textContent = sfxVolumeSliderElement.value
    });



// Controles

    document.addEventListener("keydown", (event) => 
    {
        switch (event.key) {
            case "ArrowUp":
            case "w":
                event.preventDefault();
                hoveredButtonIndex = (hoveredButtonIndex - 1 + onScreenNavigableButtonElements.length) % onScreenNavigableButtonElements.length;
                break;

            case "ArrowLeft":
            case "a":
                event.preventDefault();
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === musicVolumeSliderElement) {
                    decreaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    musicVolumeSliderElement.click();
                }
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === sfxVolumeSliderElement) {
                    decreaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    sfxVolumeSliderElement.click();
                }
                break;
            
            case "ArrowDown":
            case "s":
                event.preventDefault();
                hoveredButtonIndex = (hoveredButtonIndex + 1) % onScreenNavigableButtonElements.length;
                break;

            case "ArrowRight":
            case "d":
                event.preventDefault();
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === musicVolumeSliderElement) {
                    increaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    musicVolumeSliderElement.click();
                }
                if(onScreenNavigableButtonElements[hoveredButtonIndex] === sfxVolumeSliderElement) {
                    increaseSliderValue(onScreenNavigableButtonElements[hoveredButtonIndex]);
                    sfxVolumeSliderElement.click();
                }
                break;

            case " ":
            case "Enter":
                event.preventDefault();
                onScreenNavigableButtonElements[hoveredButtonIndex].click();
                break;

            default:
                break;
        }

        onScreenNavigableButtonElements.forEach((button, index) => {
            if (index === hoveredButtonIndex) {
                button.classList.add('hovered');
                button.focus();
            } else {
                button.classList.remove('hovered');
            }
        });
    });



// Save States

if (localStorage) {
    console.log("Info: localStorage é suportado pelo seu Browser, seu progresso será salvo!");
    document.getElementById("localStorage-compatibility-text").textContent = "localStorage é suportado pelo seu Browser, seu progresso será salvo!";
/*
O formato para criar um item no armazenamento local é:
localStorage.setItem("chave (pode ser qualquer nome que quiser)", JSON.stringify(valor que se deseja armazenar));

Para usar esse item deve-se usar uma variável nova e inicializá-la com o valor igual a:
JSON.parse(localStorage.getItem("chave"))

Obs: JSON.stringify transforma um valor em string e JSON.parse transforma uma string em um valor de volta ao original
*/

}
else {
    console.log("Erro: localStorage NÃO é suportado pelo seu Browser, recarregar a página reiniciará seu progresso");
    document.getElementById("localStorage-compatibility-text").textContent = "localStorage NÃO é suportado pelo seu Browser, recarregar a página reiniciará seu progresso";
}