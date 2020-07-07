// TO IMPROVE FETCH SPEED
const root = document.querySelector('#root');

const hideActiveScreen = () => {
    // IF THERE IS AN ACTIVE SCREEN
    if (root.querySelector('.showing')) {
        root.querySelector('.showing').classList.remove('showing');
    }
};

showLoadingScreen = () => {
    hideActiveScreen();
    root.querySelector('#loading-screen').classList.add('showing');
}

const showScreen = (screen) => {
    showLoadingScreen ();
    setTimeout(
        function () {
            hideActiveScreen();
            root.querySelector(`#${screen}`).classList.add('showing');
        }, 3000)
};

const removeTitleScreenFunctionality = () => {
    document.removeEventListener('keypress', xxx());
    document.removeEventListener('click', xxx());
}
const removeScreenFunctionality = () => {
    if (screen === "title-screen") {removeTitleScreenFunctionality(); }
};

const xxx = () => {
    removeScreenFunctionality("title-screen");
    showScreen('character-screen');
}

const addTitleScreenFunctionality = () => {
    document.addEventListener('keypress', xxx());
    document.addEventListener('click', xxx());
};

const addScreenFunctionality = (screen) => {
    if (screen === "title-screen") {addTitleScreenFunctionality(); }
};


(function () {
    showScreen("title-screen");
    addScreenFunctionality("title-screen");
}());