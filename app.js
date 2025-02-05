let friendsList = [];
const minimumListSize = 3;
const maximumListSize = 100;
const buttonAdd = "button-add";
const buttonDraw = "button-draw";

document.getElementById("name").addEventListener("keydown", pressEnter);

function pressEnter(event) {
    if (event.key === "Enter") {
        checkInput();
    }
}

function checkInput() {
    
    if (isTheListFull()){
        alert(`O limite de ${maximumListSize} amigos foi atingido.`);
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
    if (name === "" || name === null) {
        alert("Por favor, preencha o campo nome.");
        return false;
    }

    if (isNaN(name) === false || isInvalidLength(name)) {
        alert("Por favor, digite um nome válido.");
        return false;
    }

    if (isNameDuplicated(name)) {
        alert("Nome já está na lista.");
        return false;
    }

    if (isInvalidName(name)) {
        alert("Por favor, digite um nome válido (apenas letras e espaços).");
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
    const shortestName = 2; // Jó
    const longestName = 32; // Charlingtonglaevionbeecheknavare
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
        console.log("size >4: "+buttonAdd);
        disableButton(buttonAdd);
    } else {
        enableButton(buttonAdd);
    }
}

function disableButton(buttonId) {
    console.log("disable: "+buttonId);
    document.getElementById(buttonId).setAttribute("disabled", true);
    return;
}

function enableButton(buttonId) {
    console.log("enable: "+buttonId);
    document.getElementById(buttonId).removeAttribute("disabled");
    return;
}

function drawFriend() {

}