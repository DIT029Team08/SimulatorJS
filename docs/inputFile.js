$(document).ready(function(){
    $("#submitButtonId").attr("disabled", "disabled");
    $("#JSONFile").on('click change', function validateJsonFile(){
        var file = document.querySelector("#JSONFile");
        if(/\.JSON$/i.test(file.files[0].name) === false){
            $('#JSONFile').get(0).setCustomValidity('enter correct format');
        }
        $("#submitButtonId").removeAttr("disabled");
    });
});

