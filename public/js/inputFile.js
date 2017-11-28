window.onload = function() {
	var fileInput = document.getElementById("JSONFile");
    
<<<<<<< HEAD:docs/resources/js/inputFile.js
	if (fileInput) {
		fileInput.addEventListener("change", function(e) {
			var fullFile = fileInput.files[0];
			var fileValue = fileForm.file.value;
			var regTypesAllowed =  /(.*?)\.(json|JSON)$/;

            
			if (fileValue.match(regTypesAllowed)) {
				var reader = new FileReader();
				reader.onload = function(e) {
					localStorage.setItem("stringJSON", reader.result);
				};
				reader.readAsText(fullFile);
			}
		});
	}
=======
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
>>>>>>> d79bbfd871784b644b9b493759470886fda30613:public/js/inputFile.js
};
var selDiv = "";
document.addEventListener("DOMContentLoaded", init, false);  //event is fired when the initial HTML document has been completely loaded and parsed

function init() {
	document.querySelector("#JSONFile").addEventListener("change", handleFileSelect, false);
	selDiv = document.querySelector("#selectedFiles");
}

function handleFileSelect(e) {

	if (!e.target.files) return;

	selDiv.innerHTML = ""; //sets the HTML content (inner HTML) of an element.

	var files = e.target.files;
    
	//goes through a list of selected jsons and saves and appends to the div html
	for (var i = 0; i < files.length ; i++) {
		var selectedJson;
		if (this.files.length < 4){
			selectedJson = files[i];
		}
		else {
			document.getElementById("JSONFile").setCustomValidity("Max 3 json per upload");
			document.getElementById("JSONFile").value = null; //..clears the input file
			
		}
		selDiv.innerHTML += selectedJson.name + "<br/>"; //returns the HTML content (inner HTML) of an element.

	}
}