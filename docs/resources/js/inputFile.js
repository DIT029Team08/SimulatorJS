window.onload = function() {
    var fileInput = document.getElementById('JSONFile');

    fileInput.addEventListener('change', function(e) {
        var fullFile = fileInput.files[0];
        var fileValue = fileForm.file.value;
        var regTypesAllowed =  /(.*?)\.(json|JSON)$/;

        
        if (fileValue.match(regTypesAllowed)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                localStorage.setItem('stringJSON', reader.result);
            };
            reader.readAsText(fullFile);
        }
    });
};