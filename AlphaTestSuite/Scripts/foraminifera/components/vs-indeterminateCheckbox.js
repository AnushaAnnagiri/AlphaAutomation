function indeterminateState(ele){        
                          
    var checkboxId = document.getElementById(ele); 
    //var vsCheckboxId = checkboxId.nextElementSibling; 
    var checkboxAttr = checkboxId.getAttribute("isIndeterminate");                                     
    console.log(checkboxAttr)  
    if(checkboxAttr == "false" ){     
        checkboxId.indeterminate = true;
        checkboxId.setAttribute("isIndeterminate","true");                       
    }else{
        checkboxId.indeterminate = false;
        checkboxId.setAttribute("isIndeterminate","false"); 
    }                     
}
function setIndeterminateState(ele){                                 
    var checkboxId = document.getElementById(ele);
    checkboxId.setAttribute("isIndeterminate","false");
}