$(document).ready(function(){
    $("#JSONFile").on('click change', function validateJsonFile(){
        var file = document.querySelector("#JSONFile");
        if(/\.json$/i.test(file.files[0].name) === false){
            $("#JSONFile").get(0).setCustomValidity("Please select a .JSON File");
        }
        else {
            $("#JSONFile").get(0).setCustomValidity('');
        }
    
    });
});

