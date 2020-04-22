var searchBox = document.getElementById("searchItems");
searchBox.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        search();
    }
});

function search() {
   var name = document.getElementById("searchItems").value;
   var elmnt= document.getElementById(name);
   elmnt.scrollIntoView();
   window.scrollBy(0, -80);
}
