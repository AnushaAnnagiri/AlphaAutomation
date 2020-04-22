(function () {
    var uploadButtons = document.getElementsByClassName("inlineUpload");

    for (var i = 0; i < uploadButtons.length; i++) {
        uploadButtons[i].addEventListener("click", function () {
            openDialog(this);
        });
    }
})()

function openDialog(ele) {
    var buttonClassname = ele.firstElementChild.firstElementChild.className;
    if (buttonClassname == "icon-chat-delivered buttonIcon") {
        ele.innerHTML =
            'Upload<span><i class="icon-upload-dash buttonIcon"></i></span>';
    }
    ele.nextElementSibling.firstElementChild.click();
}
function beforeUpload(input) {
    var file = input.value;
    if (file != "") {
        var fileSize = input.files[0].size / 1000;
    }
    let dataOptions = JSON.parse(input.getAttribute("data-options"));

    let errorMessage = { errorMessage: "", errorStatus: false };

    if (dataOptions != null && typeof dataOptions != "undefined") {
        let upperLimit =
            dataOptions["maxFileSize"] / 1000 < 1
                ? dataOptions["maxFileSize"] + "Kb"
                : dataOptions["maxFileSize"] / 1000 + "Mb";
        let lowerLimit =
            dataOptions["minFileSize"] / 1000 < 1
                ? dataOptions["minFileSize"] + "Kb"
                : dataOptions["minFileSize"] / 1000 + "Mb";
        if (
            typeof dataOptions["minFileSize"] != "undefined" &&
            typeof dataOptions["maxFileSize"] == "undefined" &&
            fileSize < dataOptions["minFileSize"]
        ) {
            errorMessage["errorMessage"] =
                "file size should be min " + lowerLimit;
            errorMessage["errorStatus"] = true;
            return errorMessage;
        } else if (
            typeof dataOptions["minFileSize"] == "undefined" &&
            typeof dataOptions["maxFileSize"] != "undefined" &&
            fileSize > dataOptions["maxFileSize"]
        ) {
            errorMessage["errorMessage"] =
                "file size should not excede " + upperLimit;
            errorMessage["errorStatus"] = true;
            return errorMessage;
        } else if (
            typeof dataOptions["minFileSize"] != "undefined" &&
            typeof dataOptions["maxFileSize"] != "undefined" &&
            (fileSize > dataOptions["maxFileSize"] ||
                fileSize < dataOptions["minFileSize"])
        ) {
            errorMessage["errorMessage"] =
                "file size should be between " +
                lowerLimit +
                " and " +
                upperLimit;
            errorMessage["errorStatus"] = true;
            return errorMessage;
        }
    }
    var filename = file.replace(/^.*[\\\/]/, "");

    var uploadId = input.parentElement.parentElement.firstElementChild;

    if (filename != "") {
        var element = input.parentElement.parentElement.getElementsByClassName(
            "inlineUpload"
        )[0];
        element.setAttribute("style", "padding:0px 24px 0px 16px;");
        element.innerHTML =
            'Uploading<span><i class="icon-loading vs-icon-spin buttonIcon" ></i></span>';
    }
    return errorMessage;
}
function uploadSuccess(ele) {
    // alert();
    var fileClassName = ele.parentElement.nextElementSibling.className;

    var file = ele.value;
    var filename = file.replace(/^.*[\\\/]/, "");
    var uploadId = ele.parentElement.parentElement.firstElementChild;

    if (filename != "") {
        uploadId.innerHTML =
            'Uploaded<span><i class="icon-chat-delivered buttonIcon" ></i></span>';
        uploadId.setAttribute("style", "padding:0px 16px 0px 16px;");
        ele.parentElement.nextElementSibling.setAttribute(
            "style",
            "color:black;"
        );
        ele.parentElement.nextElementSibling.innerHTML = filename;
        var crossIcon = document.createElement("i");
        ele.parentElement.nextElementSibling.appendChild(crossIcon);
        var fileClose =
            ele.parentElement.nextElementSibling.firstElementChild;
        fileClose.setAttribute("class", "icon-close");
        var chooseSameFile = ele.parentElement.firstElementChild;
        chooseSameFile.value = "";
        // chooseSameFile.dispatchEvent(new Event("change"));
        fileClose.addEventListener("click", function (e) {
            var el =
                e.target.parentElement.previousElementSibling.firstElementChild;
            el.value = "";
            el.dispatchEvent(new Event("change"));
            e.target.parentElement.innerHTML = "";
            uploadId.innerHTML =
                'Upload<span><i class="icon-upload-dash buttonIcon" ></i></span>';
        });
    }

}

function uploadFail(input, error) {
    input.parentElement.nextElementSibling.innerHTML = error;
    input.parentElement.nextElementSibling.setAttribute(
        "style",
        "color:red"
    );
    var uploadId = input.parentElement.parentElement.firstElementChild;
    uploadId.innerHTML =
        'upload<span class="failedToLoad"><i class="icon-upload-dash buttonIcon"></i></span>';
}

function selectFile(input) {
    let response = beforeUpload(input);
    if (response["errorStatus"] == true) {
        uploadFail(input, response["errorMessage"]);
        return false;
    }
    /*imitate AJAX call
      Use $.ajax() in place of settimeout()
    */

    setTimeout(function () {
        //after getting response from server
        let response = true;
        if (response) {
            uploadSuccess(input);
        }
        else {
            uploadFail(input, error)
        }

    }, 2000);


    /* 
           var fd = new FormData();
           var files = input.files[0];
           fd.append("file", files);
   
         $.ajax({
             url: "server-url.java",
             type: "post",
             data: fd,
             contentType: false,
             processData: false,
             success: function(response) {
               if (response != 0) {
                 uploadSuccess(input);
               } else {
                 let error = "error in file Upload";
                 uploadFail(input, error);
               }
             }
           });
       */
}