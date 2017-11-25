window.onload = function() {
    var fileInput = document.getElementById('JSONFile');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            var fullFile = fileInput.files[0];
            var fileValue = fileForm.file.value; // Retrieves file extension submitted
            var regTypesAllowed =  /(.*?)\.(json|JSON)$/;

            
            if (fileValue.match(regTypesAllowed)) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    localStorage.setItem('stringJSON', reader.result); // Once file is read, JSON text is put in local storage
                };
                reader.readAsText(fullFile);
            }
        });
    }
};


    /**JavaScript
    var scroll = setInterval(function(){ window.scrollBy(0,1000); }, 2000);
         
            if (fileValue.match(regTypesAllowed) && && $window.localStorage !== null) {
                var reader = new FileReader();
                try{
                reader.onload = function(e) {
                    localStorage.setItem('stringJSON', reader.result);
                    //localStorage.removeItem('stringJSON');
                };
                reader.readAsText(fullFile);
            }catch(e){
                reader = false;
            }  
            } */