(function() {
    var tiles = document.getElementsByClassName("vs-tile-lay-grid");
    for (var i = 0; i < tiles.length; i++) {
      var div = document.createElement("div");
      var span = document.createElement("div");
      span.setAttribute("class", "selTile");
      span.innerHTML = '<i class="icon-chat-delivered"></i>';
      span.addEventListener("click", function(e) {
        OnTileClick(this);
      });
      div.appendChild(span);
      tiles[i].appendChild(div);
     // var selectedGrid = tiles[i].lastElementChild.firstElementChild;
     showSelectedTileIcon(tiles[i],span);
    }
  })();
  function OnTileClick(ele) {
    var grid = ele.parentElement.parentElement;
    grid.classList.toggle("tile-selected");
    showSelectedTileIcon(grid,ele)
  }

  function showSelectedTileIcon(grid,icon){

    if( grid.classList.contains("tile-selected")){
        icon.innerHTML = '<i class="icon-accepted-round"></i>';
    }
    else{
        icon.innerHTML = '<i class="icon-chat-delivered"></i>';
    }
  }

  function gridLayout(ele) {
    var gridElementLayoutLength =
      ele.parentElement.nextElementSibling.children.length;
    for (var i = 0; i < gridElementLayoutLength; i++) {
      var gridElement = ele.parentElement.nextElementSibling.children[i];
      if (
        gridElement.classList.contains("tile-selected") ||
        gridElement.classList.contains("vs-tile-lay-list")
      ) {
        gridElement.classList.remove("vs-tile-lay-list");
        gridElement.classList.add("vs-tile-lay-grid");
      }
    }
  }

  function listLayout(ele) {
    var gridElementLayoutLength =
      ele.parentElement.nextElementSibling.children.length;
    for (var i = 0; i < gridElementLayoutLength; i++) {
      var gridElement = ele.parentElement.nextElementSibling.children[i];
      if (
        gridElement.classList.contains("tile-selected") ||
        gridElement.classList.contains("vs-tile-lay-grid")
      ) {
        gridElement.classList.remove("vs-tile-lay-grid");
        gridElement.classList.add("vs-tile-lay-list");
      }
    }
  }