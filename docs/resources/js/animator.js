$.getJSON("../js/json_test.JSON", function(animator){

    var mainDiv = document.getElementById("outputJSON");
    const processDivClassName = "processes";
    const betweenDivClassname = "betweenProcess";

    for(var i = 0; i < animator.diagram.processes.length; i = i+2) {

        var div = document.createElement("div");
        div.className = processDivClassName;
        div.innerHTML =
            animator.diagram.processes[i].class.toString() + " " +
            animator.diagram.processes[i].name.toString();
        mainDiv.appendChild(div);

        if (i < animator.digram.processes.length) {
            var emptyDiv = document.createElement("div");
            div.className = betweenDivClassname;

            mainDiv.appendChild(emptyDiv);
    }
    }
});