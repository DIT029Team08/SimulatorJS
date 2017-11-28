var fileInput = document.getElementById('JSONFile');
window.onload = function() {
    var button = document.getElementById('submitbutton');
    var message = document.getElementById('error');
    message.style.opacity = 0;

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            var fullFile = fileInput.files[0];
            var fileValue = fileForm.file.value; // Retrieves file extension submitted
            var regTypesAllowed =  /(.*?)\.(json|JSON)$/;

            if (fileValue.match(regTypesAllowed)) {
                button.disabled = false;
                message.style.opacity = 0;
                var reader = new FileReader();
                reader.onload = function(e) {
                	localStorage.clear();
                    localStorage.setItem('stringJSON', reader.result); // Once file is read, JSON text is put in local storage
                };
                reader.readAsText(fullFile);
            }
            else{
                button.disabled = true;
                message.style.opacity = 100;
            }
        });
    }

};
var selDiv = "";
document.addEventListener("DOMContentLoaded", init, false);  //event is fired when the initial HTML document has been completely loaded and parsed

function init() {
	fileInput.addEventListener("change", handleFileSelect, false);
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
            document.getElementById("JSONFile").value = null; //..clears the input file
            alert("Maximum of 3 files allowed");

		}
		selDiv.innerHTML += selectedJson.name + "<br/>"; //returns the HTML content (inner HTML) of an element.

	}
}