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
                // Check so the files are allowed
                if(fileInput.files[0].name.match(regTypesAllowed) &&
                    fileInput.files[1].name.match(regTypesAllowed) &&
                    fileInput.files[2].name.match(regTypesAllowed)) {

                    button.disabled = false;
                    message.style.opacity = 0;

                    setupReader(fileInput.files, 0);
                }
                // If not allowed
                else{
                    button.disabled = true;
                    message.style.opacity = 100;
                }
            }

            // If there are 2 files
            else if(fileInput.files.length > 1){
                // Check so the files are allowed - then text and parse them
                if(fileInput.files[0].name.match(regTypesAllowed) &&
                    fileInput.files[1].name.match(regTypesAllowed)){

                    button.disabled = false;
                    message.style.opacity = 0;

                    setupReader(fileInput.files, 0);
                }
                // If not allowed
                else{
                    button.disabled = true;
                    message.style.opacity = 100;
                }
            }

            // If there is only 1 file
            else{
                // Check so the file is allowed
                if (fileInput.files[0].name.match(regTypesAllowed)){
                    button.disabled = false;
                    message.style.opacity = 0;

                    setupReader(fileInput.files, 0);
                }
                else{
                    button.disabled = true;
                    message.style.opacity = 100;
                }
            }
        });
    }
};

function setupReader(files, i) {
    var file = files[i];
    var textVersion = [];
    var JSONFiles = [];
    var reader = new FileReader();
    reader.onload = function(e){
        // Once done reading - call loaded
        readerLoaded(e, files, textVersion, JSONFiles, i);
    };
    reader.readAsText(file);
}
function readerLoaded(e, files, textVersion, JSONFiles, i) {
    // Get the file content as text
    textVersion[i] = e.target.result;
    // Parse it and put in JSON array
    JSONFiles[i] = JSON.parse(textVersion[i]);

    // If there's a file left to load
    if (i < files.length - 1) {
        // Load the next file
        setupReader(files, i+1);
    }
    // If not, everything is done, make the comparisons and add to local storage
    else{
        console.log("Done reading " + (i+1) + " files");
        // If there are 3 files
        if(textVersion.length > 2){
            // DO THINGS WITH 3 FILES
        }
        // If there are 2 files
        else if(textVersion.length > 1){
            // DO THINGS WITH 2 FILES
        }
        // If there is only one file. set it to the local storage as file 1, which is default.
        else{
            localStorage.clear();
            localStorage.setItem('file1', textVersion[0]);
        }
    }
}

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