// JQuery Library required.
$(function(){
  var timeToAccelerate;
  var clickedElement;
  $('.vs-ni-arrow').on('mousedown',function(){
    clickedElement = $(this);
     updateValue(clickedElement)

     timeToAccelerate = setInterval(function(){updateValue(clickedElement)},150);

  });
  $(document).on('mouseup',function(){
    clearInterval(timeToAccelerate);
  })
  function updateValue(element){
  var value  = parseInt(element.siblings('input').val(),10);
     if(element.hasClass('up')){
       value += 1;
     } else {
       value -= 1;
       if(value<0) value = 0;
     }
    element.siblings('input').val(value);
}
})
