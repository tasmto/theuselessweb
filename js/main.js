// LETS DEFINE A COUPLE OF KEY ELEMENTS AS GLOBALS
const appContainer = document.querySelector('#root');

// VARIABLE TO TRACK THE CURRENT LEVEL
let currentState;

let errorMesseges = {
    failedDataFetch: 'Terrible news.. Seems like we werent able to the actual game code... But on the bright side; we dicovered the One Piece...',
    placeholder: 'ooof'
}

// DECLARED A GLOBAL TO STORE DID YOU KNOWS
let didYouKnowFacts;

// STORE THE CHARACTER AND ATTRIBUTES IN AN OBJECT
let characters;

// GLOABAL VARIABLE WHICH WILL CONTAIN HTML FOR THE DIFFENT LEVELS
let gameHTML;


// ERROR HANDLING
const printErrorMessege = (errorMessege, errorCode) => {
    // IF THE CALL HAS AN ERROR CODE DEFINED
    if (errorCode) {
        const errorHTML = `<div class='messege-screen'><h1>${errorCode}</h1>
        <p>${errorMesseges[errorMessege]}</p></div>`;
        appContainer.innerHTML = errorHTML;
    } else {
        const errorHTML = `<div class='messege-screen'><p>${errorMesseges[errorMessege]}</p></div>`;
        appContainer.innerHTML = errorHTML;
    }
}


const buildScreen = () => { }

const printRandomFact = (messegeList, time) => {
    const messegeElement = appContainer.querySelector('.messege');

    // LETS CREATE A NEW INSTANSE OF THE MESSEGE ARRAY WE ARE USING
    const newMessegeArray = [...messegeList];

    setInterval(function () {
        // PROBLEM; I CANNOT HAVE FACTS REPEAT; SOLUTION: MAKE A NEW INSTNCE OF THE FACTS THEN EVERYTIME A NEW FCT IS GENERATED REMOVE IT FROM THE NEW FACT ARRAY
        const randomNumber = (Math.random() * (newMessegeArray.length - 0) + 0).toFixed(0);
        if (!(newMessegeArray.length === 0)) {
            messegeElement.innerHTML = newMessegeArray[randomNumber];
            newMessegeArray.splice(randomNumber, 1);
        } else {
            newMessegeArray.concat[messegeList]
        }

    }, time)
}


// FOR THE TITLE SCREEN
const titleScreenMoveToNextScreenOnAction = () => {
    const titleScreenContainer = document.querySelector('#title-screen');
    document.addEventListener("keyup", function () {
        if (currentState === 'title') {
            activateScreen('characterSelect');
        }
    });
    document.addEventListener("click", function () {
        if (currentState === 'title') {
            activateScreen('characterSelect');
        }
    });
}

// FOR THE CHARACTER SELECTS SCREEN 
const removeFilledStatsBars = (characterElement) => {
    const filledBars = characterElement.querySelectorAll('.fill');

    filledBars.forEach(filledBar => {
        filledBar.classList.remove('fill')
    });
}

const buildCharacterStats = (selected) => {
    const characterElement = document.querySelector('#character');
    const statsBars = characterElement.querySelectorAll('.bars-container');
    const characterStats = characters[selected].stats;

    removeFilledStatsBars(characterElement);

    let i;
    for (i = 0; i < characterStats.length; i++) {

        const currentBar = Array.from(statsBars[i].childNodes)

        let n;
        for (n = 0; n < characterStats[i]; n++) {
            currentBar[n].classList.add('fill');
        }
    }

}


const characterSelectScreenFunctionality = () => {
    // ON CLICK CHANGE CURRENT CARD
    document.addEventListener('click', e => {
        //WHAT IMAGE/ BUTTON WAS CLICKED ON
        const targetImg = e.target.closest('img');
        const targetPlayBtn = e.target.closest('button');

        // IF THE IMAGE CLICKED IS ONE OF THE CHARACTER SELECT IMAGES
        if (targetImg && (!(targetImg.id == ("")))) {
            selected = targetImg.id;
            const characterElement = document.querySelector('#character');

            characterElement.querySelector('.character-image').src = `./images/${selected}.png`;
            characterElement.querySelector('.name').innerHTML = characters[selected].name;

            buildCharacterStats(selected);
        }
        // ON PLAY BUTTON CLICK
        else if (targetPlayBtn) {
            activateScreen('loading');
        }



    });


}

const activateScreen = (screenName) => {

    // UPDATE THE LEVEL TRACKER
    currentState = screenName;

    // CREATE TEMP VARIABLE AND CONSTRUCT THE NEXT LEVEL ELEMENT
    // I REALIZE A SIMPLER SOLUTION MAY HAVE BEEN TO SAY appContainer.InerHTML... BUT I WANTED A MORE ONE SSTEP SOLUTION THROUGH AN ALREADY CONSTRUCTED ELEMENT WHICH I COULD MANIPULATE (ADD CLASSES, INLINE JS ETC) IN ONE STEP 
    const n = document.createElement('div');
    n.id = gameHTML[screenName].id;
    n.innerHTML = gameHTML[screenName].content;
    appContainer.innerHTML = null;
    appContainer.appendChild(n);

    // USED TO MOVE TO THE NEXT SCREEN; ACTIVATING ANY FUNCTION DEPENDENCIES FOR THAT SCREEN

    // THE WINDOW FUNCTION OBJECT IS USED FOR UNSTRINGING NORMAL TEXT (NOT A NUMBER) AND WAS TAKEN FROM THE FOLLOWING ARTICLE
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
    //  I CHANGED IT SO THAT IT RAN IN A LOOP
    (gameHTML[screenName].action).forEach(action => {
        Function('"use strict";return (' + action + ')')();
    });
}

// THIS CODE WAS TAKEN FROM A METHOD EXPLAINED HERE (https://medium.com/@bluntjackson/truly-understanding-javascript-promises-await-and-async-f3f51e283554)
// MODIFICATIONS WERE MADE TO IT HOWEVER

// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function getGameData() {
    var req = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        req.onreadystatechange = function () {
            // IF THE REQUEST HAS BEEN COMPLETED
            if (req.readyState == 4) {
                // IF THE REQUEST STATUS IF A FAIL (300, 400 etc...)
                if (req.status >= 300) {
                    reject(req.status)
                }
                // IF THE REQUEST WAS A SUCCESS (200)
                else {
                    resolve(req.responseText);
                }
            }
        }
        req.open('get', 'https://api.jsonbin.io/v3/b/5f04924a5d4af74b0128113f/2', true);
        req.setRequestHeader('X-Master-Key', '$2b$10$XEEvKn1dj1PgbpLNrTaroOaCiCBqPG19JCnWcumifAZaxpxuThl8y');
        req.send();
    });
}


getGameData().then(
    // IF EVERYTHING WORKED OUT...
    function (result) {
        const gameCode = (JSON.parse(result)).record;

        // STORE ERROR AND DID YOU KNOW MESSEGES
        errorMesseges = gameCode.Messeges.errorMesseges;
        didYouKnowFacts = gameCode.Messeges.didYouKnowFacts;

        // STORE THE CHARACTER DATA
        characters = gameCode.characters;

        // STORE GAME LEVEL HTML
        gameHTML = gameCode.screenBlueprints;

        activateScreen('title');
    },
    // IF THE WORLD BURNS 
    function (errorCode) {
        printErrorMessege('failedDataFetch', errorCode)
    }
)