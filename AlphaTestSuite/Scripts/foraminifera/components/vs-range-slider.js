(function () {
    var slider = document.getElementsByClassName('vs-range-slider');
    for (var i = 0; i < slider.length; i++) {
        var minimumNumber = slider[i].children[0].min;
        var maximumNumber = slider[i].children[0].max;
        var div = document.createElement('div');

        div.innerHTML = '<span>' + minimumNumber + '</span><span>' + maximumNumber + '</span>';
        slider[i].parentElement.appendChild(div);
        slider[i].children[1].innerHTML = slider[i].children[0].value
    }

})();


function slider(e) {
    e.parentElement.getElementsByClassName('vs-slider-output')[0].innerHTML = e.value
}
