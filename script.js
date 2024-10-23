const items = [{
        title: "Todo",
        icon: "assets/plus.png",
        key: "todo"
    },
    {
        title: "Inprogress",
        icon: "assets/plus.png",
        key: "inprogress"
    },
    {
        title: "Blocked",
        icon: "assets/plus.png",
        key: "blocked"
    },
    {
        title: "Done",
        icon: "assets/checkMark.png",
        key: "done"
    }
];


const trelloDiv = document.querySelector(".trello");

let inputData = {
    todo: [],
    inprogress: [],
    blocked: [],
    done: []
}



let itemDiv;


const addInput = (item, itemDiv) => {
    const input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.classList.add('inputText');
    let itemDivcc = document.getElementsByClassName(item.key)[0];
    itemDiv ? itemDivcc.appendChild(input) : null
    input.focus()
    input.addEventListener("keypress", (event) => keyPressToStore(event, input, item.key))
};


const keyPressToStore = (event, input, item) => {

    if (event.key === 'Enter') {
        const dissapiaerInput = document.getElementsByClassName('inputText')[0];
        if (inputData[item]) {
            inputData[item].push(input.value);
            localStorage.setItem('session', JSON.stringify(inputData));
            let gettinResultInputData = JSON.parse(localStorage.getItem('session'));
            console.log("🚀 ~ keyPressToStore ~ gettinResultInputData:", gettinResultInputData)
            
        }

        dissapiaerInput.remove();
    }
}




items.map(item => {
    itemDiv = document.createElement("div");
    itemDiv.classList.add(`${item.key}`);
    const img = document.createElement("img");
    img.classList.add("imageIcon");
    img.src = item.icon;
    img.alt = item.title;
    img.addEventListener("click", () => addInput(item, itemDiv))

    const title = document.createElement("p");
    title.textContent = item.title;

    itemDiv.appendChild(title);
    itemDiv.appendChild(img);

    trelloDiv.appendChild(itemDiv);
});