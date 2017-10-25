$.getJSON("../js/json_test.JSON", function(animator){



    var mainDiv = document.getElementById("outputJSON");
    const processDivClassName = "processes";
    const betweenDivClassname = "betweenProcess";

    for(var i = 0; i < animator.processes.length; i++) {

        var div = document.createElement("div");
        div.className = processDivClassName;
        div.innerHTML =
            animator.processes[i].class.toString() + " " +
            animator.processes[i].name.toString();
        mainDiv.appendChild(div);
        console.log(div);

        if (i < animator.processes.length) {
            var emptyDiv = document.createElement("div");
            div.className = betweenDivClassname;

            mainDiv.appendChild(emptyDiv);
    }
    }
});