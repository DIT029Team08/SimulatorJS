
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
    console.log(json);
    strJSON = JSON.stringify(json, null, 4);
    $("#outputJSON").html(strJSON);

    var ul = document.getElementById("logList");
    for(var i = 0; i < json.diagram.content[0].content.length; i++){
        var li = document.createElement("li");
        li.setAttribute('id',((i+1)+": Sending message From: " +
            json.diagram.content[0].content[i].from.toString() +" To: "+
            json.diagram.content[0].content[i].to.toString() +" || Message: "+
            json.diagram.content[0].content[i].message.toString()));
        li.appendChild(document.createTextNode((i+1)+": Sending message From: " +
            json.diagram.content[0].content[i].from.toString() +" To: "+
            json.diagram.content[0].content[i].to.toString() +" || Message: "+
            json.diagram.content[0].content[i].message.toString()));
        ul.appendChild(li);
    }
});
