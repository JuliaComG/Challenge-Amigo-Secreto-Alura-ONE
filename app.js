let drawnPairs = [];
let friendsList = [];

//let friendsList = ["Helena", "Alice", "Laura", "Maria Alice","Sophia","Manuela","Maitê","Liz","Cecília","Isabella","Luísa","Eloá","Heloísa","Júlia","Ayla","Maria Luísa","Isis","Elisa","Antonella","Valentina","Maya","Maria Júlia","Aurora","Lara","Maria Clara","Lívia","Esther","Giovanna","Sarah","Maria Cecília","Lorena","Beatriz","Rebeca","Luna","Olívia","Maria Helena","Mariana","Isadora","Melissa","Maria","Catarina","Lavínia","Alícia","Maria Eduarda","Agatha","Ana Liz","Yasmin","Emanuelly","Ana Clara","Clara","Ana Júlia","Marina","Stella","Jade","Maria Liz","Ana Laura","Maria Isis","Ana Luísa","Gabriela","Alana","Rafaela","Vitória","Isabelly","Bella","Milena","Clarice","Mirella","Ana","Emilly","Betina","Mariah","Zoe","Maria Vitória","Nicole","Laís","Melina","Bianca","Louise","Ana Beatriz","Heloíse","Malu","Melinda","Letícia","Maria Valentina","Chloe","Maria Elisa","Maria Heloísa","Maria Laura","Maria Fernanda","Ana Cecília","Hadassa","Ana Vitória","Diana","Ayla Sophia","Eduarda","Ana Lívia","Isabel","Elis","Pérola"]; //Para teste

const baseUrlForQRCode = "https://juliacomg.github.io/Challenge-Amigo-Secreto-Alura-ONE/";

const minimumListSize = 3;
const maximumListSize = 100;

const buttonAdd = "button-add";
const buttonDraw = "button-draw";
const buttonRemoveList = "remove-all-list";

const iconDraw = "assets/shuffle.svg";
const textDraw = "Sortear amigo";
const linkDraw = "drawFriend()";

const iconDoItAgain = "assets/repeat.svg";
const textDoItAgain = "Novo sorteio";
const linkDoItAgain = "doItAgain()";

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

let didTheDrawHappen = false;
let areYouReadyToDrawAgain = false;
let isSoundEnabled = true;
let lastSoundIndex = -1;
let currentIndexForShowDrawNameByName = 0;

const keyPressDown = document.getElementById("name");
keyPressDown.addEventListener("keydown", keyPress);

const toggleSoundButton = document.getElementById("toggle-sound");
toggleSoundButton.addEventListener("click", toggleSound);

const soundIcon = document.getElementById("sound-icon");

window.onload = showAlertIfParametersExist;

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
}

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundIcon.src = isSoundEnabled ? "assets/sound-high.svg" : "assets/sound-off.svg";
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

function normalizeInput(name) {
    name = name.toLowerCase().trim();
    return capitalizeFirstLetterOfEachWord(name);
}

function capitalizeFirstLetterOfEachWord(name) {
    return name.split(" ")
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(" ");
}

function validateName(name) {
    
    if (name === "" || name === null) {
        showUIAlertMessage("Por favor, preencha o campo nome. ", "warning");
        focusInputName();
        return false;
    }

    if (isNaN(name) === false || isInvalidLength(name)) {
        showUIAlertMessage("Por favor, digite um nome válido. ", "error");
        focusInputName();
        return false;
    }

    if (isNameDuplicated(name)) {
        showUIAlertMessage(`O nome ${name} já está na lista. `, "warning");
        focusInputName();
        return false;
    }

    if (isInvalidName(name)) {
        showUIAlertMessage("Por favor, digite um nome válido (apenas letras e espaços). ", "error");
        focusInputName();
        return false;
    } 
    return true;
}

function focusInputName () {
    document.getElementById("name").focus();
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
    friendsList.push(name);
    playSound("addname");
    cleanInput();
    updateUIList();
    updateUIButtons();
}

function cleanInput() {
    document.getElementById("name").value = "";
}

function clearList() {
    friendsList = [];
    updateUIList();
    updateUIButtons();
    showUIAlertMessage("Lista de amigos foi apagada.", "success");
}

function clearResultList() {
    let resultList = document.getElementById("result-list");
    resultList.innerHTML = " ";
}

function updateUIList() {
    let uiList = document.getElementById("name-list");
    uiList.innerHTML = "";

    if (friendsList.length === 0) {
        let li = document.createElement("li");
        li.textContent = "Nenhum amigo adicionado.";
        uiList.appendChild(li);
        return;
    }else{
        sortListAlphabetically();

        friendsList.forEach((name, index) => {
            let li = createListItem(name, index);
            uiList.appendChild(li);
        });
    }
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
    if (friendsList.length >= minimumListSize) {
        enableButton(buttonDraw);
    } else {
        disableButton(buttonDraw);
    }

    if (isTheListFull()) {
        disableButton(buttonAdd);
    } else {
        enableButton(buttonAdd);
    }

    if (friendsList.length === 0) {
        disableButton(buttonRemoveList);
    } else {
        enableButton(buttonRemoveList);
    } 

    if (didTheDrawHappen === true) {
        disableButton(buttonAdd);
        disableButton(buttonRemoveList);
    }

    if (areYouReadyToDrawAgain === true) {
        changeTextAndIconButton(textDoItAgain, iconDoItAgain, buttonDraw);
        changeButtonLink(buttonDraw, linkDoItAgain);
        enableButton(buttonDraw);
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

function changeTextAndIconButton(text, icon, buttonId) {
    let button = document.getElementById(buttonId);
    let newIcon = button.querySelector("img"); 
    let newText = button.querySelector("span");

    newIcon.src = icon;
    newIcon.alt = text;
    newText.textContent = text; 
}

function changeButtonLink(buttonId, link){
    let button = document.getElementById(buttonId);
    button.setAttribute("onclick", link);
}

function drawFriend() {
    if (friendsList.length < minimumListSize) {
        showUIAlertMessage(`É necessário ter pelo menos ${minimumListSize} amigos para sortear.`, "error");
        return;
    }

    let shuffledList = shuffleFriends();

    for (let i = 0; i < friendsList.length; i++) {
        let myself = friendsList[i];
        let drawnFriend = shuffledList[i];
        drawnFriend = didIGetMyself(shuffledList, friendsList, i);
        drawnPairs.push({ myself, drawnFriend });
    }

    didTheDrawHappen = true;
    updateUIButtons();

    showUIAlertMessage("Sorteio realizado com sucesso!", "success");
    wayToShowTheResult();
}

function shuffleFriends(){
    let shuffledList = [...friendsList];
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    return(shuffledList);
}

function didIGetMyself (shuffledList, friendsList, index){
    let i = index;
    let myself = friendsList[i];
    let drawnFriend = shuffledList[i];

    if (myself === drawnFriend) {
        if (i < friendsList.length - 1) {
            [shuffledList[i], shuffledList[i + 1]] = [shuffledList[i + 1], shuffledList[i]];
            drawnFriend = shuffledList[i];
        } else {
            //troca com a primeira
            [shuffledList[i], shuffledList[0]] = [shuffledList[0], shuffledList[i]];
            drawnFriend = shuffledList[i];
        }
    }
    return drawnFriend;
}

function wayToShowTheResult(){
    Swal.fire({
        title: 'Como deseja visualizar o resultado?',
        html: `<p>Escolha uma das opções abaixo para visualizar o resultado do sorteio:</p>
                <ul>
                    <li><strong>Modo Simples:</strong> Nesse será sorteado aleatoriamente nomes até que todos os nomes da lista tenha se esgotado.</li>
                    <li><strong>Modo Pares:</strong> Aqui será mostrado os pares de amigos oculto. Mostrando a relação de todos os participantes e seus respectivos amigos para ser presenteado.</li>
                    <li><strong>Modo QR Code:</strong> Esse é o modo mais sigiloso. Cada pessoa terá um QR Code, ao ler o código, você será redirecionado a uma página e só então seu amigo secreto será revelado. </li>
                </ul>`,
        icon: 'question',
        input:'select',
        inputOptions: {
            'simple': 'Modo Simples',
            'pairs': 'Modo Pares',
            'qr': 'Modo QR Code'
        },
        inputPlaceholder: 'Selecione uma opção',
        showCancelButton: true,
        cancelButtonText: 'Fechar',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',

        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa selecionar uma opção!';
            }
        }
    }).then((result) => {
        Swal.close();
        if (result.isConfirmed) {
            document.getElementById("result-list").removeAttribute("hidden");
            switch (result.value) {
                case 'simple':
                    showDrawNameByName();
                    break;
                case 'pairs':
                    showDrawPairs();
                    break;
                case 'qr':
                    showDrawQR();
                    break;
                case 'cancel':
                    Swal.fire('Operação cancelada', 'Nenhuma ação foi tomada.', 'info');
                    break;
                default:
                    Swal.fire('Erro', 'Opção inválida selecionada.', 'error');
            }
        }
    });
}

function showLoadingAlert() {
    Swal.fire({
        title: 'Gerando QR Codes...',
        html: 'Por favor, aguarde enquanto os QR Codes estão sendo gerados.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

function closeLoadingAlert() {
    Swal.close();
}

function showDrawNameByName() {
    if (currentIndexForShowDrawNameByName >= drawnPairs.length) {
        areYouReadyToDrawAgain = true;
        updateUIButtons();
        showUIAlertMessage("Todos os nomes foram sorteados.", "success");
        return;
    }

    let pair = drawnPairs[currentIndexForShowDrawNameByName];
    let resultList = document.getElementById("result-list");

    resultList.innerHTML = "";

    let titleElement = document.createElement("h2");
    titleElement.textContent = "🎉 Resultado do Sorteio 🎁";
    titleElement.classList.add("section-title-result");
    resultList.appendChild(titleElement);

    let resultElement = document.createElement("div");
    resultElement.classList.add("pairs-container-list");
    resultElement.textContent = `${pair.drawnFriend}`;
    resultList.appendChild(resultElement);

    currentIndexForShowDrawNameByName++;

    if (currentIndexForShowDrawNameByName < drawnPairs.length) {
        changeTextAndIconButton("Sortear amigo", iconDraw, buttonDraw);
        changeButtonLink(buttonDraw, "showDrawNameByName()");
    } else {
        Swal.fire ({
            titlle: "Todos os nomes foram sorteados!",
            html: "Clique em 'Novo sorteio' para sortear novamente.",
            icon: "success",
            timer: 10000,
        });
        areYouReadyToDrawAgain = true;
        updateUIButtons();
    }
}

function showDrawPairs() {
    let resultList = document.getElementById("result-list");
    resultList.innerHTML = "";

    let titleElement = document.createElement("h2");
    titleElement.textContent = "🎉 Resultado do Sorteio 🎁";
    titleElement.classList.add("section-title-result");
    resultList.appendChild(titleElement);

    let pairsContainer = document.createElement("div");
    pairsContainer.classList.add("pairs-container-list");

    drawnPairs.forEach(pair => {
        let pairElement = document.createElement("div");
        pairElement.classList.add("pair");

        let pairText = document.createElement("p");
        pairText.textContent = `${pair.myself} tirou ${pair.drawnFriend}`;

        pairElement.appendChild(pairText);
        pairsContainer.appendChild(pairElement);
    });

    resultList.appendChild(pairsContainer);
    areYouReadyToDrawAgain = true;
    updateUIButtons();
}

function showDrawQR() {
    showLoadingAlert();
    setTimeout(() => {
        generateCards(drawnPairs);
        areYouReadyToDrawAgain = true;
        updateUIButtons();
        closeLoadingAlert();
    }, 100);
}

function generateCards() {
    let pairs = drawnPairs;
    let resultList = document.getElementById("result-list-sub");

    let titleElement = document.createElement("h2");
    titleElement.textContent = "🎉 Resultado do Sorteio 🎁";
    document.getElementById("section-title-result").innerHTML = titleElement.outerHTML;

    pairs.forEach(pair => {
        let card = document.createElement("div");
        card.classList.add("card");

        let cardTitle = document.createElement("h3");
        cardTitle.textContent = pair.myself;
        card.appendChild(cardTitle);

        let qrCodeDiv = document.createElement("div");
        qrCodeDiv.classList.add("qr-code");
        card.appendChild(qrCodeDiv);

        let encryptedFriend = encryptData(pair.drawnFriend);
        let url = generateUniqueURL(pair.myself, encryptedFriend);
        
        card.addEventListener("click", () => {
            copyToClipboard(url);
            card.classList.add("copied");
        });

        new QRCode(qrCodeDiv, {
            text: url,
            width: 100,
            height: 100
        });

        resultList.appendChild(card);
    });
}

function encryptData(data) {
    return btoa(encodeURIComponent(data));
}

function decryptData(encryptedData) {
    return decodeURIComponent(atob(encryptedData));
}

function generateUniqueURL(myself, encryptedFriend) {
    let baseURL = baseUrlForQRCode;
    let encodedMyself = encodeURIComponent(myself);
    return `${baseURL}?myself=${encodedMyself}&friend=${encryptedFriend}`;
}

function showAlertIfParametersExist() {
    let myself = getParameterByName('myself');
    let encryptedFriend = getParameterByName('friend');

    if (myself && encryptedFriend) {
        const drawnFriend = decryptData(encryptedFriend);
        Swal.fire({
            title: 'Boas-vindas!',
            html: `Olá, <strong>${myself}</strong>!<br>Você tirou <strong>${drawnFriend}</strong> no amigo secreto.`,
            icon: 'success',
            confirmButtonText: 'Fechar'
        });
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function doItAgain(){
    didTheDrawHappen = false;
    areYouReadyToDrawAgain = false;
    currentIndexForShowDrawNameByName = 0;
    drawnPairs = [];
    friendsList = [];
    clearList();
    clearResultList();
    updateUIList();
    updateUIButtons();
    changeTextAndIconButton (textDraw, iconDraw, buttonDraw);
    changeButtonLink(buttonDraw, linkDraw);
    showUIAlertMessage("Agora você pode fazer um novo sorteio.", "success");
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showUIAlertMessage("Link copiado!", "success");
    }).catch(() => {
        showUIAlertMessage("Erro ao copiar o link para a área de transferência.", "error");
    });
}