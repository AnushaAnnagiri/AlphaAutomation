
//Tab
function vsOpenTabContent(evt, tabContainerID) {
    var i, tabcontent, tablinks;

    //Make all button unselected
    tabcontent = document.getElementsByClassName("vs-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Change all tabs display to None.
    tablinks = document.getElementsByClassName("vs-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    //Set corresponding tabs display to block.
    document.getElementById(tabContainerID).style.display = "block";
    //Set corresponding button display to active.
    evt.currentTarget.className += " active";
}



function vsOpenTabTrigger(tab_container, tab_clicked) {
    var i, tabcontent, tablinks;

    var parentofSelectedButton = document.getElementById(tab_clicked).parentNode; // gives the parent DIV
    var childrenBtns = parentofSelectedButton.children;
    for (var i=0; i < childrenBtns.length; i++) {
        if (childrenBtns[i].tagName = "BUTTON") {
            childrenBtns[i].className = childrenBtns[i].className.replace(" active", "");
        }
    }

    document.getElementById(tab_clicked).classList.add("active");

    var parentofSelectedTab = document.getElementById(tab_container).parentNode; // gives the parent DIV
    var children = parentofSelectedTab.children;
    for (var i=1; i < children.length; i++) {
        if (children[i].tagName = "DIV") {
            children[i].style.display = "none";
            // break;
        }
    }

    document.getElementById(tab_container).style.display = "block";


}

//Accordion
var vs_acc = document.getElementsByClassName("vs-accordion");
var i;
for (i = 0; i < vs_acc.length; i++) {
  vs_acc[i].addEventListener("click", function() {
    this.classList.toggle("vs-active");

    var parent = this.parentElement;
    var panel = parent.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//Search Box
function vs_search_list(trigger_input,target_area) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(trigger_input);
    filter = input.value.toUpperCase();

    var my_no_data = target_area + "_no_data"
    var no_data_content = '<div class=\"vs-banner-message\" id=' + my_no_data + '><div><i class=\"icon-large icon-info-outline\"></i></div><div><h4 class=\"vs-h4-light-secondary vs-txt-aln-center\">No result found please try again</h4></div></div>';

    var list_occurence = 0;
    ul = document.getElementById(target_area);
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1)
        {
            li[i].style.display = "";
        } else {
          li[i].style.display = "none";
          list_occurence++;
        }
    }
    if(list_occurence == li.length){
      if(document.getElementById(my_no_data) == null){
        ul.insertAdjacentHTML("afterend",no_data_content);
      }
    }
    else{
      var elem = document.getElementById(my_no_data);
      if(elem!=null){
        elem.parentNode.removeChild(elem);
      }
    }
}

//Overlay Model
function vs_model_show(model_id) {
    var html = document.documentElement;
    console.log(html);
    html.style.overflow = "hidden";
    document.getElementById(model_id).style.display = "block";
}

function vs_model_hide(model_id) {
    var html = document.documentElement;
    html.style.overflow = "visible";
    document.getElementById(model_id).style.display = "none";
}

//Alert bar
var alrt_close_btn = document.getElementsByClassName("vs-alert-closebtn");
var alert_box_count;

for (alert_box_count = 0; alert_box_count < alrt_close_btn.length; alert_box_count++) {
    alrt_close_btn[alert_box_count].onclick = function(){
        var parent_div = this.parentElement;
        var grand_parent_div = parent_div.parentElement;
        // grand_parent_div.style.opacity = "0";
        setTimeout(function(){ grand_parent_div.style.display = "none"; }, 600);
    }
}

/*
Function: To call alert message of type success and info.
Paramenters:
1. parentid - Will be the id of parent where alert box needs to be prepened with exisiting textContent
2. alertType - 1 for Success message and 0 for Error message
3. message - Message for the alert box
*/

function generate_alert(parentId,alertType,message){
  // Get parent id
  var parent_div=document.getElementById(parentId);
  // Generate a random id to alert box with alrt_ prefixed
  var alertId=Math.floor((Math.random() * 100) + Math.random());
    if(alertType == 1){
        // Append success alert box from top to this parent
        parent_div.innerHTML = '<div class="vs-alert success" id="alert_'+alertId+'"><div><strong>Success!</strong>'+ message+'</div><div><span class="vs-alert-closebtn">&times;</span></div></div>' +parent_div.innerHTML;
        //Set Timer for this alert box
        setTimeout(function(){ document.getElementById("alert_"+alertId+"").style.display = "none"; },5000);
    }
    else{
        parent_div.innerHTML = '<div class="vs-alert info" id="alert_'+alertId+'"><div><strong>Info!</strong>'+ message+'</div><div><span class="vs-alert-closebtn">&times;</span></div></div>' +parent_div.innerHTML;
        setTimeout(function(){ document.getElementById("alert_"+alertId+"").style.display = "none"; },5000);
    }
}


//Mini loader
function show_mini_loader(loader_container){

  //Storing loader_container's original position in session
  var session_variable = "mini_load_" + loader_container;
  sessionStorage.SessionName = session_variable;

  //Get original position
  // var current_position = document.getElementById(loader_container).position;\

  //Check if the position is static or any other position type
  if(typeof document.getElementById(loader_container).position == 'undefined'){
    sessionStorage.setItem(session_variable,"");
  }
  else{
    sessionStorage.setItem("mini_load_" + loader_container,document.getElementById(loader_container).position);
  }

  //Change original position to relative
  document.getElementById(loader_container).style.position = "relative";

  //Condition to check if this parent already has a child div named "vs-small-spinner"
  var parent = document.getElementById(loader_container);
  for (var i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i].className == "vs-small-spinner") {
          return;
      }
  }

  //Add a new div named "vs-small-spinner" if parent doesnt have any.
  var div = document.createElement('div');
  div.className = 'vs-small-spinner';
  div.innerHTML ='<span>Loading please wait &#8230;</span>';
  document.getElementById(loader_container).appendChild(div);

}

function remove_mini_loader(loader_container){

  //Fetch the assiociated session variable name with original position value.
  var session_variable = "mini_load_" + loader_container;

  //Get original position
  var previous_position = sessionStorage.getItem(session_variable);

  //Remove loader div from this parent div
  var parent_div=document.getElementById(loader_container);
  var child_item = parent_div.getElementsByClassName("vs-small-spinner");
  var has_imm_loader_child = false;

  if (parent_div.childNodes.length < 0){
    return;
  }
  else
  {
    for (var i = 0; i < parent_div.childNodes.length; i++)
    {
      // Check if parent has any immediate child with name vs-small-spinner
      if (parent_div.childNodes[i].className == "vs-small-spinner")
      {
        has_imm_loader_child = true; // Has a valid immediate child with spinner
        parent_div.childNodes[i].remove();
        break;
      }
    }

    if(has_imm_loader_child == false)
    {
      // Shows this parent does not have any immediate child with class as vs-small-spinner
      return;
    }
  }

  //Change position to original position
  document.getElementById(loader_container).style.position = previous_position;

  //Remove previous stored session variable.
  sessionStorage.removeItem(session_variable);

}

function vs_text_tooltip(txt_value,txt_id) {
  document.getElementById(txt_id).setAttribute('title',txt_value);
}



//Load below after DOM gets loaded
document.addEventListener("DOMContentLoaded",function(event){
  const el = document.getElementById('vs-resizable');
  const handle = document.getElementById('vs-handle-horizontal');
  handle.addEventListener('mousedown', setup, false);

  let startX, startHeight;

  function setup(event){
    startY = event.clientY //Shows where was the click coordinate
    startHeight = parseInt(window.getComputedStyle(el).height, 10) //Returns integer
    document.documentElement.addEventListener('mousemove', drag, false)
  	document.documentElement.addEventListener('mouseup', destroy, false)
  }

  function drag(event) {
    if (event.clientY > 100 && event.clientY < window.innerHeight - 40){
      el.style.height = (startHeight - event.clientY + startY) + 'px';
    }
  }

  function destroy(e) {
  	document.documentElement.removeEventListener('mousemove', drag, false);
  	document.documentElement.removeEventListener('mouseup', destroy, false);
  }
});
