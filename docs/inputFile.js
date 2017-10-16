$(document).ready(function(){
    $("#submitButtonId").attr("disabled", "disabled");
    $("#JSONFile").on('click change', function validateJsonFile(){
        var file = document.querySelector("#JSONFile");
        if(/\.JSON$/i.test(file.files[0].name) === false){
            alert("please select on JSON");
            $("#mixin").get(0).reset();
           
        }
        $("#submitButtonId").removeAttr("disabled");
    });
});

