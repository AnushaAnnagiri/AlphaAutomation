var vsJsonDualBox = {};

function vs_dual_box_helper(jsonData) {
    vsJsonDualBox = JSON.parse(jsonData);
    var temp = "";
    Object.keys(vsJsonDualBox).forEach(function (key1) {
        Object.keys(vsJsonDualBox[key1]).forEach(function (key2) {
            temp += '<div><hr class="vs-separator-ruler"><div class="vs-body-medium-secondary vs-caption-uppercase-text vs-dual-box-parent vs-mgn-8" value="' + key2 + '">' +
                key2 + '</div><hr class="vs-separator-ruler"><ul class="vs-gc-listname-component vs-dual-box-children vs-mgn-8">'
            helperVal = vsJsonDualBox[key1][key2];
            helperVal.forEach(function (value, childKey) {
                temp += '<li onclick="vs_moveItemsToBox(this)" class="vs-dual-box-child" value="' + value + '">' +
                    '<div>' + value + '</div></li>';
            });
            temp += '</ul></div>'
        });
        document.getElementById(key1).innerHTML = temp;
        temp = "";
    });
}

function vs_moveItemsToBox(ele) {
    if (ele.classList.contains("vs-dual-box-child-selected")) {
        ele.classList.remove("vs-dual-box-child-selected");
    }
    else {
        ele.classList.add("vs-dual-box-child-selected");
    }
}

function vs_selectected_dual_box_child(fromId, toId, ind, action) {
    if (ind == "all") {
        var tempArray = document.getElementById(fromId).querySelectorAll(".vs-dual-box-child");
    }
    else {
        var tempArray = document.getElementById(fromId).querySelectorAll(".vs-dual-box-child-selected");
    }

    for (var i = 0; i < tempArray.length; i++) {
        var dataValue = tempArray[i].parentElement.parentElement.querySelector(".vs-dual-box-parent").getAttribute("value");
        var value = tempArray[i].getAttribute("value");
        if (vsJsonDualBox[toId][dataValue] == undefined) {
            vsJsonDualBox[toId][dataValue] = [];
        }
        if (vsJsonDualBox[fromId][dataValue] != undefined && !vsJsonDualBox[toId][dataValue].includes(value)) {
            vsJsonDualBox[toId][dataValue].push(value);
        }
        if (action != "copy" && vsJsonDualBox[fromId][dataValue] != undefined && vsJsonDualBox[fromId][dataValue].includes(value)) {
            var index = vsJsonDualBox[fromId][dataValue].indexOf(value);
            vsJsonDualBox[fromId][dataValue].splice(index, 1);
            if (vsJsonDualBox[fromId][dataValue].length == 0) {
                delete vsJsonDualBox[fromId][dataValue];
            }
        }
    }
    vs_dual_box_helper(JSON.stringify(vsJsonDualBox));
}