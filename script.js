const items = [
    {
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
        icon: "assets/plus.png",
        key: "done"
    }
];

const trelloDiv = document.querySelector(".trello");


items.map(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const img = document.createElement("img");
    img.classList.add("imageIcon");
    img.src = item.icon;
    img.alt = item.title;

    const title = document.createElement("p");
    title.textContent = item.title;

    itemDiv.appendChild(title);
    itemDiv.appendChild(img);

    trelloDiv.appendChild(itemDiv);
});
