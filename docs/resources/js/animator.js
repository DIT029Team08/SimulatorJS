$.getJSON("../js/json_test.JSON", function(animator){

    var mainDiv = document.getElementById("outputJSON");
    const processDivClassName = "processes";
    const betweenDivClassname = "betweenProcesses";
    const lifelines = "lifeLine";

    for(var i = 0; i < animator.processes.length; i++) {

        var div = document.createElement("div");
        div.className = processDivClassName;
        div.innerHTML =
            animator.processes[i].name.toString() + ": " +
            animator.processes[i].class.toString();
        mainDiv.appendChild(div);

        var lifeLineDiv = document.createElement("div");
        lifeLineDiv.className = lifelines;
        div.appendChild(lifeLineDiv);

        if (i < animator.processes.length -1) {
            var emptyDiv = document.createElement("div");
            emptyDiv.className = betweenDivClassname;

            mainDiv.appendChild(emptyDiv);
        }
    }
});