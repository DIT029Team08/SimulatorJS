var fileInput = document.getElementById('JSONFile');
window.onload = function() {
    var button = document.getElementById('submitbutton');
    var message = document.getElementById('error');
    var regTypesAllowed =  /(.*?)\.(json|JSON)$/;
    message.style.opacity = 0;

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            // If there are 3 files
            if(fileInput.files.length > 2){
                console.log("3 files");
                var file1 = fileInput.files[0];
                var file2 = fileInput.files[1];
                var file3 = fileInput.files[2];
                // Check so the files are allowed
                if(file1.name.match(regTypesAllowed) && file2.name.match(regTypesAllowed) && file3.name.match(regTypesAllowed)){
                    button.disabled = false;
                    message.style.opacity = 0;

                }
                // If not allowed
                else{
                    button.disabled = true;
                    message.style.opacity = 100;
                }
            }

            // If there are 2 files
            else if(fileInput.files.length > 1){
                console.log("2 files");
                var file1 = fileInput.files[0];
                var file2 = fileInput.files[1];
                // Check so the files are allowed
                if(file1.name.match(regTypesAllowed) && file2.name.match(regTypesAllowed)){
                    button.disabled = false;
                    message.style.opacity = 0;

                }
                // If not allowed
                else{
                    button.disabled = true;
                    message.style.opacity = 100;
                }
            }

            // If there is only 1 file
            else{
                console.log("1 file");
                var file1 = fileInput.files[0];
                // Check so the file is allowed
                if (file1.name.match(regTypesAllowed)){
                    button.disabled = false;
                    message.style.opacity = 0;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                	localStorage.clear();
                    localStorage.setItem('file1', reader.result); // Once file is read, JSON text is put in local storage
                    };
                    reader.readAsText(file1);
                }
                else{
                    button.disabled = true;
                    message.style.opacity = 100;
                }
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