function vs_createSearchableDropDown() {
    var x, i, j, selElmnt, a, b, c, disabled, selected, allowSearch, clickHandler;
    /*look for any elements with the class "vs-custom-select-search":*/
    x = document.getElementsByClassName("vs-custom-select-search");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        allowSearch = x[i].getAttribute('data-search') == 'true' ? 'true' : 'false';
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        /////a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        input = document.createElement("input");
        input.setAttribute("type", "text");
        if (allowSearch == 'false') { input.setAttribute("readonly", "readonly"); }

        if (x[i].classList.contains("vs-custom-select-small")) {
            input.setAttribute("class", "vs-select-search-box vs-custom-select-small");
            a.setAttribute("class", "vs-select-search-selected vs-arraow-small");
        }
        else {
            input.setAttribute("class", "vs-select-search-box");
            a.setAttribute("class", "vs-select-search-selected");
        }

        if(x[i].getAttribute("clickInd")!=null && x[i].getAttribute("clickInd")!=undefined && x[i].getAttribute("clickInd")!=""){
            clickHandler = x[i].getAttribute("clickInd");
        }
        else{
            clickHandler = "";
        }

        input.value = selElmnt.options[selElmnt.selectedIndex].innerHTML;

        a.appendChild(input);
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "vs-select-search-items vs-select-search-hide");

        b.addEventListener('mouseover', function (e) {
            if (e.target != this) {
                e.target.parentNode.getElementsByClassName('pointed-at').length != 0 ?
                    e.target.parentNode.getElementsByClassName('pointed-at')[0].classList.remove('pointed-at') : '';
                e.target.classList.add('pointed-at');
            }


        });


        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.setAttribute("class", "vs-select-option");
            c.innerHTML = selElmnt.options[j].innerHTML;
            disabled = selElmnt.options[j].getAttribute('disabled');
            selected = selElmnt.options[j].getAttribute('selected');
            if (selected != null) {
                c.classList.toggle("pointed-at");
                c.classList.toggle("option-selected");
                //active_item.classList.add("option-selected");
            }
            if (disabled == null) {
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/

                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    //h = this.parentNode.previousSibling;
                    //this.classList.add('pointed-at');

                    h = this.parentNode.previousSibling.childNodes[0];
                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            //h.innerHTML = this.innerHTML;
                            h.value = this.innerHTML;

                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                                y[k].classList.remove("same-as-selected");
                            }
                            this.classList.add("same-as-selected");
                            this.parentNode.getElementsByClassName('option-selected').length != 0 ?
                                this.parentNode.getElementsByClassName('option-selected')[0].classList.remove('option-selected') : '';
                            this.classList.add("option-selected");
                            break;
                        }
                    }
                    h.click();
                });
                if(clickHandler!="")
                    c.setAttribute("onClick",clickHandler);
            } else {
                c.classList.toggle("disabled-item");
                c.classList.toggle("vs-select-option");
            }

            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("vs-select-search-hide");
            this.classList.toggle("vs-select-arrow-active");
        });
    }

    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
    /*get the search box by classname and search in the list*/
    var select_search_box = document.getElementsByClassName('vs-select-search-box');
    for (var i = 0; i < select_search_box.length; i++) {
        var search_box = select_search_box[i]
        search_box.addEventListener('keyup', searchSelectValue);
        search_box.addEventListener('click', showAllValuesonFocus);
    }

}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("vs-select-search-items");
    y = document.getElementsByClassName("vs-select-search-selected");

    for (i = 0; i < y.length; i++) {

        if (elmnt == y[i]) {
            arrNo.push(i);
            if (y[i].nextSibling.getElementsByClassName("pointed-at").length != 0) {
                y[i].nextSibling.getElementsByClassName("pointed-at")[0].classList.toggle('pointed-at')
                y[i].nextSibling.getElementsByClassName("option-selected").length != 0 ?
                    y[i].nextSibling.getElementsByClassName("option-selected")[0].classList.toggle('pointed-at') :
                    y[i].nextSibling.firstChild.classList.add('pointed-at');
            } else {
                y[i].nextSibling.firstChild.classList.add('pointed-at');
            }
        } else {
            y[i].classList.remove("vs-select-arrow-active");
        }
    }

    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("vs-select-search-hide");

        }
    }
}


function searchSelectValue(e) {
    //console.log(e);

    var input, filter, ul, li, a, i, txtValue, current_item, next_item, prev_item, isSearchable, s;
    filter = e.target.value.toUpperCase();
    isSearchable = e.target.getAttribute('readonly')
    li = this.parentNode.nextSibling.childNodes;

    //console.log(this.parentNode.nextSibling.scrollTop=32);
    if (isSearchable != 'readonly' && e.keyCode != 13 && e.keyCode != 38 && e.keyCode !== 40) {


        for (i = 0; i < li.length; i++) {
            a = li[i];
            txtValue = a.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                li[i].classList.contains('disabled-item') == false ?
                    li[i].classList.add('vs-select-option') : '';

            } else {
                li[i].style.display = "none";
                li[i].classList.remove('vs-select-option');
                li[i].classList.remove('pointed-at');
            }
        }
        if (filter == '') {
            this.parentNode.nextSibling.getElementsByClassName('pointed-at').length != 0 ?
                this.parentNode.nextSibling.getElementsByClassName('pointed-at')[0].classList.remove('pointed-at') : '';
            this.parentNode.nextSibling.getElementsByClassName('option-selected').length != 0 ?
                this.parentNode.nextSibling.getElementsByClassName('option-selected')[0].classList.remove('option-selected') : '';
            this.parentNode.nextSibling.firstChild.classList.add('pointed-at');
        }
        if (this.parentNode.nextSibling.getElementsByClassName('pointed-at').length == 0
            && this.parentNode.nextSibling.getElementsByClassName('vs-select-option').length != 0) {
            this.parentNode.nextSibling.getElementsByClassName('vs-select-option')[0].classList.add('pointed-at');;
        }

    } else if (e.keyCode == 13) {
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];

        var pointed_item = this.parentNode.nextSibling.getElementsByClassName('pointed-at')[0];
        var active_item = this.parentNode.nextSibling.getElementsByClassName('option-selected').length != 0 ?
            this.parentNode.nextSibling.getElementsByClassName('option-selected')[0].classList.remove('option-selected') : '';
        this.value = pointed_item.innerHTML;
        pointed_item.classList.add("option-selected");
        this.parentNode.nextSibling.classList.add("vs-select-search-hide");
        for (var j = 0; j < s.length; j++) {
            if (s.options[j].innerHTML == pointed_item.innerHTML) {
                s.selectedIndex = j;
                break;
            }
        }
    } else if (e.keyCode == 40) {
        current_item = this.parentNode.nextSibling.getElementsByClassName('pointed-at')[0];

        if (typeof current_item == 'undefined') {
            //this.parentNode.nextSibling.firstChild.classList.add('pointed-at')
        }
        if (typeof current_item != 'undefined' && current_item.nextSibling != null) {
            current_item.classList.remove('pointed-at');
            next_item = findNextNode(current_item, this.parentNode.nextSibling.querySelectorAll('.vs-select-option'));

            //console.log(next_item);
            //  this.parentNode.nextSibling.scrollTop=scrollToNextNode(next_item,this.parentNode.nextSibling);
            next_item.classList.add('pointed-at');
            next_item.scrollIntoView();

        }


    } else if (e.keyCode == 38) {
        current_item = this.parentNode.nextSibling.getElementsByClassName('pointed-at')[0];
        if (typeof current_item != 'undefined' && current_item.previousSibling != null) {
            current_item.classList.remove('pointed-at');
            prev_item = findPrevNode(current_item, this.parentNode.nextSibling.querySelectorAll('.vs-select-option'));

            prev_item.classList.add('pointed-at');
            prev_item.scrollIntoView();
            //this.parentNode.nextSibling.scrollTop=scrollToPrevNode(current_item,this.parentNode.nextSibling);


        }
    }


}

function showAllValuesonFocus(e) {
    var li, a, i;
    li = this.parentNode.nextSibling.childNodes;
    for (i = 0; i < li.length; i++) {
        li[i].style.display = "";
    }
}
function findNextNode(current_item, list_items) {
    for (var i = 0; i < list_items.length; i++) {
        if (list_items[i] == current_item) {
            if (i < list_items.length - 1) {
                return list_items[i + 1];
            } else {
                return list_items[list_items.length - 1];
            }
        }
    }
}
function findPrevNode(current_item, list_items) {
    for (var i = 0; i < list_items.length; i++) {
        if (list_items[i] == current_item) {
            if (i > 0) {
                return list_items[i - 1];
            } else {
                return list_items[0];
            }
        }
    }
}
function scrollToNextNode(item, scroll_pos) {
    console.clear();
    //console.log(item.offsetTop,scroll_pos.scrollTop);
    if (item.offsetTop % 192 == 0) {
        //return item.offsetTop;
        return scroll_pos.scrollTop + 192;
    }
    else {
        return scroll_pos.scrollTop;
        // return item.offsetTop;
    };
}
function scrollToPrevNode(item, scroll_pos) {

    //  console.log('item->',item.offsetTop,'scroll->',scroll_pos.scrollTop);
    if (item.offsetTop % 192 == 0) {
        //console.log('scroll->',item.offsetTop-192);
        return scroll_pos.scrollTop - 192;
        //return item.offsetTop;

    }
    else {
        //console.log('else scroll ->',scroll_pos.scrollTop);
        return scroll_pos.scrollTop;
        //return item.offsetTop;
    };

}
