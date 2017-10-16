
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var obj = JSON.parse(this.responseText);
//         console.log(obj.processes[1].class + " " + obj.processes[1].name);
//     }
// };
// xmlhttp.open("GET", "json_test.txt", true);
// xmlhttp.send();


$.getJSON("../js/json_test.JSON", function(json) {
    console.log(json.meta.format);
    strJSON = JSON.stringify(json);
    $("#outputJSON").html(strJSON);
});