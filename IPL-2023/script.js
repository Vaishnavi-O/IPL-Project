

var teamInfo = [];
var playerInfo = [];
var teamCards = document.getElementById("teams-container");
if (localStorage.getItem("teamArray") === null)
  localStorage.setItem("teamArray", JSON.stringify(teams));

if (localStorage.getItem("playerArray") === null)
  localStorage.setItem("playerArray", JSON.stringify(players));

teamInfo = JSON.parse(localStorage.getItem("teamArray"));
playerInfo = JSON.parse(localStorage.getItem("playerArray"));

var suggestArray = [];
for (var i = 0; i < teamInfo.length; i++) {
  suggestArray.push(teamInfo[i].sName);
}
let searchBar = document.querySelector(".search-bar");
let inputBox = searchBar.querySelector("#input");
let suggBox = searchBar.querySelector(".suggestions");
let icon = searchBar.querySelector(".icon");

inputBox.onkeyup = (e) => {
  if (e.keyCode == 13) {
    icon.click();
  }
  let userData = e.target.value;
  let emptyArray = [];
  if (userData) {
    emptyArray = suggestArray.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    searchBar.classList.add("active");
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "currentLi(this)");
    }
  } else {
    searchBar.classList.remove("active");
  }
};
function currentLi(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    window.open(`./teams.html?name=${element.textContent}`, "_self");
  };
  searchBar.classList.remove("active");
}
function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}

var teamMainBox = document.getElementById("teams-container");
for (var i = 0; i < teamInfo.length; i++) {
  teamMainBox.innerHTML += `

 <div class="team" onclick="makethisinclick('${i}')">
    <div class="team-img">
        <img src="${teamInfo[i].teamIcon}" alt="${teamInfo[i].sName}">
        <div class="overlay"></div>
    </div>

    <div class="team-info">
        <p class="team-name">${teamInfo[i].teamFullName}</p>
        <p class="Count">Won Count : ${teamInfo[i].WonCount} </p>
    </div>
</div

`;
}


function makethisinclick(res) {
  var clickedCard = teamInfo[res].sName;

  window.open(`./teams.html?name=${clickedCard}`, "_self");
}

var addteamclicked = () => {
  window.open("./addTeam.html", "_self");
};
var addPlayerClicked = () => {
  window.open("./addPlayer.html", "_self");
};