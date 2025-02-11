let friendsList = [];

const minimumListSize = 3;
const maximumListSize = 100;

const buttonAdd = "button-add";
const buttonDraw = "button-draw";

const shortestName = 2; // Jó
const longestName = 32; // Charlingtonglaevionbeecheknavare

const keySounds = [
    new Audio("sounds/keyboard-sounds1.mp3"),
    new Audio("sounds/keyboard-sounds2.mp3"),
    new Audio("sounds/keyboard-sounds3.mp3"),
    new Audio("sounds/keyboard-sounds4.mp3"),
    new Audio("sounds/keyboard-sounds5.mp3"),
    new Audio("sounds/keyboard-sounds6.mp3"),
    new Audio("sounds/keyboard-sounds7.mp3"),
    new Audio("sounds/keyboard-sounds8.mp3"),
    new Audio("sounds/keyboard-sounds9.mp3"),
    new Audio("sounds/keyboard-sounds10.mp3"),
    new Audio("sounds/keyboard-sounds11.mp3"),
    new Audio("sounds/keyboard-sounds12.mp3"),
    new Audio("sounds/keyboard-sounds13.mp3"),
];
const spaceSound = new Audio("sounds/keyboard-sounds14.mp3");
const alertSound = new Audio("sounds/alert-sound1.mp3");
const liNameSound = new Audio("sounds/add-name-sound.mp3");

keySounds.forEach(sound => {sound.load();})
spaceSound.load();
alertSound.load();
liNameSound.load();

let isSoundEnabled = true;
let lastSoundIndex = -1;

const keyPressDown = document.getElementById("name");
keyPressDown.addEventListener("keydown", keyPress);

const toggleSoundButton = document.getElementById("toggle-sound");
toggleSoundButton.addEventListener("click", toggleSound);

const soundIcon = document.getElementById("sound-icon");

function keyPress(event) {
    
    if (event.key === "Enter") {
        playSound("random");
        checkInput();
    } else if (event.key === "Space" || event.key === " "){
        playSound("space");
    } else if (event.key.length === 1 || event.key === "Backspace") {
        playSound("random");
    }
}

function showUIAlertMessage (message, type){
    playSound("alert");
    Toastify({
        text: message,
        duration: 10000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, 
        className: `toastify ${type}`,
    }).showToast();
}

function checkInput() {
    
    if (isTheListFull()){
        showUIAlertMessage(`O limite de ${maximumListSize} amigos foi atingido.`, "warning");
        return;
    }

    let name = document.getElementById("name").value;
    name = normalizeInput(name);

    if (validateName(name)) {
        addName(name);
    }
}

function isTheListFull(){
    return friendsList.length >= maximumListSize;
}

function validateName(name) {
    document.getElementById("name").focus();

    if (name === "" || name === null) {
        showUIAlertMessage("Por favor, preencha o campo nome. ", "warning");
        return false;
    }

    if (isNaN(name) === false || isInvalidLength(name)) {
        showUIAlertMessage("Por favor, digite um nome válido. ", "error");
        return false;
    }

    if (isNameDuplicated(name)) {
        showUIAlertMessage(`O nome ${name} já está na lista. `, "warning");
        return false;
    }

    if (isInvalidName(name)) {
        showUIAlertMessage("Por favor, digite um nome válido (apenas letras e espaços). ", "error");
        return false;
    } 
    
    return true;
}

function normalizeInput(name) {
    name = name.toLowerCase().trim();
    return capitalizeFirstLetterOfEachWord(name);
}

function capitalizeFirstLetterOfEachWord(name) {
    return name.split(" ")
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(" ");
}

function isInvalidLength(name) {
    return name.length < shortestName || name.length > longestName;
}

function isNameDuplicated(name) {
    return friendsList.includes(name);
}

function isInvalidName(name) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return !regex.test(name);
}

function addName(name) {
    playSound("addname");
    friendsList.push(name);
    cleanInput();
    updateUIList();
    updateUIButtons();
}

function cleanInput() {
    document.getElementById("name").value = "";
}

function updateUIList() {
    let uiList = document.getElementById("name-list");
    uiList.innerHTML = "";
    
    sortListAlphabetically();

    friendsList.forEach((name, index) => {
        let li = createListItem(name, index);
        uiList.appendChild(li);
    });
}

function sortListAlphabetically() {
    friendsList.sort();
}

function createListItem(name, index) {
    let li = document.createElement("li");
    li.classList.add("name-list");
    li.textContent = name;
    createRemoveButton(li, index);
    return li;
}

function createRemoveButton(li, index) {
    let buttonRemove = document.createElement("button");
    buttonRemove.textContent = "X";
    buttonRemove.onclick = () => removeName(index);
    li.appendChild(buttonRemove);
}

function removeName(index) {
    friendsList.splice(index, 1);
    updateUIList();
    updateUIButtons();
    playSound("addname");
}

function updateUIButtons(){
    checkSizeFriendList();
}

function checkSizeFriendList() {
    
    if (friendsList.length >= minimumListSize) {
        console.log("size <3: "+buttonDraw);
        enableButton(buttonDraw);
    } else {
        disableButton(buttonDraw);
    }

    if (isTheListFull()) {
        disableButton(buttonAdd);
    } else {
        enableButton(buttonAdd);
    }
}

function disableButton(buttonId) {
    document.getElementById(buttonId).setAttribute("disabled", true);
    return;
}

function enableButton(buttonId) {
    document.getElementById(buttonId).removeAttribute("disabled");
    return;
}

function drawFriendEasy() {
    // avisar que não poderá mais sortear
    // 
    // desabilitar botão de sortear
    
    // Regra de negócio
    // Embaralhar nome
    // Formar os pares (todos devem ter um par, ninguém pode tirar a si mesmo,  ninguém pode ter o mesmo amigo sorteado)

}

function drawFriend(){

}

function shuffleFriends(){
    let shuffledList = [...friendsList];
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    return(shuffledList);
}


function didIGetMyself (myself){
    //Eu tirei eu mesma?
    //Comparar se a pessoa sorteada é si mesmo
}

function hasThisFriendAlreadyBeenDrawn (friend){
    //Essa pessoa já foi sorteada ?
    // Já tem um correspondente?
}

function showDrawResult(){
    //Mostrar o resultado do sorteio
}

function changeTheDrawFriend(){

}

function playSound(type) {
    if (!isSoundEnabled) return;
    let sound;
    
    if (type === "random") {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * keySounds.length);
        } while (randomIndex === lastSoundIndex);

        lastSoundIndex = randomIndex;
        sound = keySounds[randomIndex];
    } else if (type === "space") {
        sound = spaceSound;
    } else if (type === "alert") {
        sound = alertSound;
    } else if (type === "addname"){
        sound = liNameSound;
    } else {
        return;
    }
    sound.currentTime = 0;
    sound.play();
    document.getElementById("name").focus();
}

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundIcon.src = isSoundEnabled ? "assets/sound-on-bl.png" : "assets/sound-off-bl.png";
    document.getElementById("name").focus();
}

