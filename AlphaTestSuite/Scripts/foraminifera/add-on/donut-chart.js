function showTooltip(evt, text,renderAt,settings) {

  let tooltip = document.querySelectorAll(`#${renderAt} .vs-donut-tooltip`)[0];

  tooltip.innerHTML =`<span class="vs-tooltiptext-${settings.tooltip_position}">${text}</span>`;
  tooltip.style.display = "block";
  tooltip.style.left = evt.pageX + 0 + 'px';
  tooltip.style.top = evt.pageY + 0 + 'px';
}

function hideTooltip(renderAt) {
  var tooltip = document.querySelectorAll(`#${renderAt} .vs-donut-tooltip`)[0];
  tooltip.style.display = "none";
}


  function renderDonutChart(renderAt,data,settings={'tooltip_position':'top'}){


    document.getElementById(renderAt).innerHTML=`<div class="vs-donut-tooltip vs-tooltip"  style="position: absolute; display: none;"></div>`;

    var colorArray=['#069ABC','#00B16A','#FF0000','#FFB900','#004B87','#40C1AC','#DE3E33','#000000','#EEEEEE','#84BD00','#00263A']
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns,'svg');
        svg.setAttributeNS(null,'class','donut');
        svg.setAttributeNS(null,'width','100%');
        svg.setAttributeNS(null,'height','100%');
        svg.setAttributeNS(null,'viewBox','0 0 42 42');

        function innerText(data){
             var g= document.createElementNS(ns,'g');
             g.setAttributeNS(null,'class','vs-donut-text');
             var text = document.createElementNS(ns,'text');
             text.setAttributeNS(null,'x','50%');
             text.setAttributeNS(null,'y','50%');
             text.setAttributeNS(null,'class','vs-donut-number');
             text.innerHTML= typeof data.totalVaue !='undefined'? `${data.totalVaue}`:'';
             g.appendChild(text);
             return g;
        }

        function drawCircle(){

            var segment =0;
            var offset=0;
            var stroke=0;

            data['items'].forEach(function(item,index){
                segment = parseInt(item.value);
                segmentLeft = 100-segment;
                stroke+=segment;
              var circle = document.createElementNS(ns,'circle');
              circle.setAttributeNS(null,'class','donut-segment');
              circle.setAttributeNS(null,'cx','21');
              circle.setAttributeNS(null,'cy','21');
              circle.setAttributeNS(null,'r','15.91549430918954');
              circle.setAttributeNS(null,'fill','none');
              circle.setAttributeNS(null,'stroke',`${colorArray[index]}`);
              circle.setAttributeNS(null,'stroke-width','4');
              circle.setAttributeNS(null,'onmouseover',`showTooltip(evt,'${item.label}','${renderAt}','${settings}');`);
              circle.setAttributeNS(null,'onmouseout',`hideTooltip('${renderAt}')`);
              circle.setAttributeNS(null,'stroke-dasharray',`${segment} ${segmentLeft}`);
              circle.setAttributeNS(null,'stroke-dashoffset',`${offset}`);
              offset=100-stroke;
              svg.appendChild(circle);
            });
              var insideText = innerText(data);
              svg.appendChild(insideText);
          return  svg;
        }


        var div = document.getElementById(renderAt);

        div.appendChild(drawCircle());
  }
