window.onload = function() {
    var fileInput = document.getElementById('JSONFile');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            var fullFile = fileInput.files[0];
            var fileValue = fileForm.file.value;
            var regTypesAllowed =  /(.*?)\.(json|JSON)$/;

            
            if (fileValue.match(regTypesAllowed) && 'localStorage' in $window && $window.localStorage !== null) {
                var reader = new FileReader();
                try{
                reader.onload = function(e) {
                    $window.localStorage.setItem('stringJSON', reader.result);
                    $window.localStorage.removeItem('stringJSON');
                };
                reader.readAsText(fullFile);
            }catch(e){
                reader = false;
            }  
            }
        });
    }
};


    /**JavaScript
    var scroll = setInterval(function(){ window.scrollBy(0,1000); }, 2000); */