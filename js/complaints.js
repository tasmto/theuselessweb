const appContainer = document.querySelector('#complaints');
const heading = appContainer.querySelector('h1');
const form = appContainer.querySelector('form');
const nameInput = form.querySelector('.name-input');
const emailInput = form.querySelector('.email-input');
const msgInput = form.querySelector('.msg-input');
const btn = form.querySelector('button');

const messeges = {
    name: ['I suck!', 'Complainer', 'Entitled', 'Troll'],
    email: ['dumm@dum.dum', 'dontcare@duh.com'],
    msg: ['who cares!', 'stop... just stop...', 'seriously, an actual complain?']
}

let i = 0;
let speed = 30;
let txt;
let inputValue;


const typeWriter = () => {
    if (i < txt.length) {
        inputValue.value += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

const replaceValue = (input, element) => {
    const randomNumber = (Math.random() * (messeges[input].length - 1) + 0).toFixed(0);
    const messegeArray= messeges[input];

    element.value = "";
    i = 0;
    inputValue = element;
    txt = messegeArray[randomNumber];
    
    typeWriter ();
}


const formClicked = () => {
    btn.style.webkitAnimationPlayState = "running";
    btn.innerHTML = "Agggggg!";
    btn.onanimationend = () => {
        form.classList.add('hide');
        appContainer.innerHTML = '<div id="loading-screen"><img class="loading-image" src="./images/loading.gif" alt=""></div>';
        setTimeout(function () {
            appContainer.innerHTML = '<div id="loading-screen"><h1>🤔 That last request... It didnt work,<br> I didnt like your tone of voice in that one. <br> And one more thing:</h1></div>';
            setTimeout(function () {
                appContainer.innerHTML = '<div id="loading-screen"><h1>🤔 That last request... It didnt work,<br> I didnt like your tone of voice in that one. <br> And one more thing:</h1><img class="large-image" src="./images/the-rock.gif" alt=""></div>';
                setTimeout(function () {
                    appContainer.innerHTML = '<div id="loading-screen"><h1>🤔 That last request... It didnt work,<br> I didnt like your tone of voice in that one. <br> And one more thing:</h1><img class="large-image" src="./images/the-rock.gif" alt=""><p><br><br><a href="./index.html">Back to game</a></p></div>';
                }, 4000)
            }, 2500)
        }, 4000)
    }
}






// ONLOAD EXECUTE...
(function () {
    nameInput.setAttribute('onfocusout', 'replaceValue("name", this)');
    emailInput.setAttribute('onfocusout', 'replaceValue("email", this)');
    msgInput.setAttribute('onfocusout', 'replaceValue("msg", this)');
    btn.setAttribute('onclick', 'formClicked()');
} ())



