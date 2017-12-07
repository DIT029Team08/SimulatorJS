
//Block of constants used to name classes of HTML elements created, if change needed change the constant's value

const processDivClassName = "processes";
const classesDivClassName = "classes";
const fieldsDivClassName = "fields";
const frameDivClassName = "frame"; //remember to remove this after refactor
const seqFrameDivClassName = "frameseq";
const parFrameDivClassName = "framepar";
const frameTitleClassName = "frameTitle";
const lifelines = "lifeLine";
const arrowDivClassNameL2R = "arrowLtoR";
const arrowDivClassNameR2L = "arrowRtoL";
const messageDivClassName = "messages";
//const activatorClassName = "activator";

var scrollBoolean = false;

//var animator = JSON.parse(localStorage.getItem('stringJSON'));
// localStorage.removeItem("stringJSON");
var mainDiv = document.getElementById("outputJSON");
var log = document.getElementById("logList");
var frameDiv;
var llHeight = 150;
var counter = 0;
addColor = false;
logCounter = 0;

// Checks if it's a sequence diagram
function outputAnimation(animator, tmpSocketIds) {
    socketIds = arrayifyString(tmpSocketIds);
    console.log(socketIds);
    // an if statement to check if animation is going on at the moment or not. If it already is running it will do nothing.
    if(scrollBoolean){}
    else{
        //Resets values used in the animation and clears the divs of previous content
        mainDiv.innerHTML = "";
        log.innerHTML = "";
        counter = 0;
        logCounter = 0;


        if (animator.type === 'sequence_diagram') {
                scrollBoolean = true;
                llHeight = 150;
                //Selects the processes array in JSON File and iterates for every element
                processDiv = document.createElement("div");
                processDiv.className = "processDiv";
                mainDiv.appendChild(processDiv);
                for (var i = 0; i < animator.processes.length; i++) {

                    createProcess(animator, i);

                    //Similar behavior as in the previous block, but this time the lifelines are given a unique ID, are appended to the <div> created in the previous block
                    //and the activators are appended to the lifeline divs.

                    createLifeline(animator, i);

                    // var activatorDiv = document.createElement("div");
                    // activatorDiv.className = activatorClassName;
                    // lifeLineDiv.appendChild(activatorDiv);
                }
                /*var animatorDiagramArray = Object.keys(animator.diagram); //In order to check whether or not the JSON element is a node, we must select the diagram object's keys.
                //if the JSON has no frame element, it will not go through the for loop as the length will be 0
                for (var i = 0; i < animatorDiagramArray.length; i++) {   //loop through the array of Keys created above
                    if (animatorDiagramArray[i] === 'node') {             //we check wether the JSON element is a node here
                        frameDiv = document.createElement("div");
                        frameDiv.className = frameDivClassName;
                        frameDiv.id = animator.diagram.node.toString();
                        mainDiv.appendChild(frameDiv);

                        var frameTitle = document.createElement("div");
                        frameTitle.className = frameTitleClassName;
                        frameTitle.id = animator.diagram.node.toString() + "Title";
                        frameTitle.innerHTML = animator.diagram.node.toString();
                        frameDiv.appendChild(frameTitle);
                    }
            */
            //createArrow(animator, 0, 0);
            objectArray = [];
            addColor = false;
            arrowCounter = 0;
            createNodes(animator.diagram, mainDiv);
            scrollBoolean = false;
            //createLog(animator, 0, 0, 0);
        }
// Checks if it's a class diagram
        if (animator.type === 'class_diagram') {
            var left = 25;
            var top = 25;
            for (var i = 0; i < animator.classes.length; i++) {
                createClass(animator, i, left, top);
                left = left + 400;
                top = top + 150;
            }
            classLog(animator);
            makeRelations(animator);
        }

        if (animator.type === 'deployment_diagram'){
            var left = 25;
            var top = 25;
            // creates the boxes for the deployment diagram
            var depBool = true;
            for (var i = 0; i < animator.mapping.length; i++) {
                createDeploymentClass(animator, i, left, top);
                if(mainDiv.clientWidth -400 < left && depBool){
                    depBool = false;
                    top += 150;
                }
                else if(left < 150 && !depBool) {
                    top += 150;
                    depBool = true;
                }
                else if (depBool) {
                    left = left + 260
                }
                else
                    left -= 260;

            }
            makeDeploymentRelations(animator);

        }
    }
}
/*
* This function creates arrows based on the direction of the arrow by using the functions arrowL2R and arrowR2L.
* It checks the start and end position of each arrow in the content of the diagram section provided in the JSON file.
* The function is set to a timeout in order to generate the arrows one by one with a timeout of one second.
*/

function incrementLifeline() {


    // Lifeline height
    var LifeLinesArray = document.querySelectorAll('.lifeLine');

    llHeight = llHeight + 75;

    for (var k=0; k < LifeLinesArray.length; k++) {
        LifeLinesArray[k].style.height = (llHeight + "px");
    }
    /*
        // resets the i and increment j as for loop inside a for loop  to get all messages.
        if (animator.diagram.content[j].content.length === i) {

            i = 0;
            j++;

            var lineBreak = document.createElement('hr');

            if (frameDiv != undefined) {
                frameDiv.appendChild(lineBreak);

                // Lifeline height
                var LifeLinesArray = document.querySelectorAll('.lifeLine');
                llHeight = llHeight + 65;

                for (var k=0; k < LifeLinesArray.length; k++) {
                    LifeLinesArray[k].style.height = (llHeight + "px");
                }
            }
        }

        var startPosition = getPosition(document.querySelector("#" + animator.diagram.content[j].content[i].from.toString()));
        var endPosition = getPosition(document.querySelector("#" + animator.diagram.content[j].content[i].to.toString()));


        // decides what direction the arrow will go, and makes the length of the arrows

        if (startPosition.x > endPosition.x) {

            arrowR2L(animator, startPosition, endPosition, j, i);
        }
        else {

            arrowL2R(animator, startPosition, endPosition, j, i);
        }

        // base case of the recursive loop

        if (animator.diagram.content[j].content[i + 1] === undefined && j + 1 === animator.diagram.content.length) {}

        // the recursive call of the loop and the incrementing of var i

    else {
        setTimeout(function () {
            i++;
            createArrow(animator, j, i, mainDiv);
        }, 1000);
    }*/
}


function createLog(animator, i, e, total) {

    // resets the i and increment e as for loop inside a for loop to get all messages.

    if (animator.diagram.content[e].content.length === i) {
        i = 0;
        e++;
    }

    var li = document.createElement("li");
    li.setAttribute('id', ((total + 1) + ": Sending message From: " +
        animator.diagram.content[e].content[i].from.toString() + " To: " +
        animator.diagram.content[e].content[i].to.toString() + " || Message: " +
        animator.diagram.content[e].content[i].message.toString()));
    li.appendChild(document.createTextNode((total + 1) + ": Sending message From: " +
        animator.diagram.content[e].content[i].from.toString() + " To: " +
        animator.diagram.content[e].content[i].to.toString() + " || Message: " +
        animator.diagram.content[e].content[i].message.toString()));
    log.appendChild(li);

    if (animator.diagram.content.length > e) {

        // base case of the recursive loop

        if (animator.diagram.content[e].content[i + 1] === undefined && e + 1 === animator.diagram.content.length) {
            scrollBoolean = false;
        }

        // the recursive call of the loop and the incrementing of var i

        else {
            setTimeout(function () {
                i++;
                total++;
                createLog(animator, i, e, total);
            }, 1000);
        }
    }
}

function concatLog(to, from, messageString) {
    logCounter++;
    var li = document.createElement("li");
    li.setAttribute('id', logCounter + ":" +  messageString);
    li.appendChild(document.createTextNode(logCounter + ". Sending message From: \"" + from +
                     "\" To: \"" + to + "\" || Message: " +  messageString));
    log.appendChild(li);
    document.getElementById('logList').scrollBy(0, document.getElementById('logList').scrollHeight);
}

/*
 * This function generates an arrow with the specific direction of left to right. It also generates the div related to
 * the message that each arrow carries. As stated in the function, arrows are children of frameDiv.
 */

function arrowL2R(from, to, messageSent, frameToAppend) {

    var arrow = document.createElement("div");
    var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    var message = document.createElement("div");

    arrow.className = arrowDivClassNameL2R;
    var arrowLengthL2R = to.x - from.x;
    arrow.style.maxWidth = arrowLengthL2R + 'px';

    if (addColor === true) {
        console.log("GOT TRUE");
        console.log("------------");
        arrow.className += " redText";
    }


    svg.setAttribute("preserveAspectRatio", "xMaxYMid slice");
    svg.setAttribute("viewBox", "0 0 1400 14");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "14");
    polygon.setAttribute("points", "1400,7 1385,1 1390,6 0,6 0,8 1390,8 1385,13 1400,7");

    arrow.style.left = from.x - 20 + 'px';

    message.className = messageDivClassName;
    message.innerHTML = messageSent;

    arrow.appendChild(message);
    svg.appendChild(polygon);
    arrow.appendChild(svg);
    frameToAppend.appendChild(arrow);
    mainDiv.scrollBy(0,document.getElementById('outputJSON').scrollHeight);
}

/*
 * This function generates an arrow with the specific direction of right to left. It also generates the div related to
 * the message that each arrow carries. As stated in the function, arrows are children of frameDiv.
 */

function arrowR2L(from, to, messageSent, frameToAppend) {

    var arrow = document.createElement("div");
    var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    var message = document.createElement("div");

    arrow.className = arrowDivClassNameR2L;
    var arrowLengthR2L = from.x - to.x;
    arrow.style.maxWidth = arrowLengthR2L + 'px';

     if (addColor === true) {
         console.log("GOT TRUE");
         console.log("------------");
         arrow.className += " redText";
     }

    svg.setAttribute("preserveAspectRatio", "xMinYMid slice");
    svg.setAttribute("viewBox", "0 0 1400 14");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "14");
    polygon.setAttribute("points", "0,7 15,1 10,6 1400,6 1400,8 10,8 15,13 0,7");

    arrow.style.left =  to.x - 20 + 'px';

    message.className = messageDivClassName;
    message.innerHTML = messageSent;

    arrow.appendChild(message);
    svg.appendChild(polygon);
    arrow.appendChild(svg);
    frameToAppend.appendChild(arrow);
    mainDiv.scrollBy(0,document.getElementById('outputJSON').scrollHeight);
}


/*
 * Helper function that gets an arrow's exact position by using its dedicated id
 */

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

/*
 * This function creates an object (process) in the SSD diagram from the list of processes in the JSON file provided.
 */



function createProcess(animator, i) {

    div = document.createElement("div");            //Creates an HTML <div> element
    div.className = processDivClassName;                //assigns it a class


    stickyProcessContainerDiv = document.createElement("div");            //Creates an HTML <div> element
    stickyProcessContainerDiv.className = "stickyProcessContainerDiv";                //assigns it a class

    processDiv.appendChild(stickyProcessContainerDiv);

    stickyDiv = document.createElement("div");            //Creates an HTML <div> element

    stickyDiv.className = "stickyDiv";                //assigns it a class
    stickyDiv.innerHTML =
        animator.processes[i].name.toString() + ": " +  //Gives it a text output as specified in the JSON file, here the class and name of the object
        animator.processes[i].class.toString();         //here it is the class and name of the SSD object
    stickyProcessContainerDiv.appendChild(stickyDiv);



    if(animator.processes.length === socketIds.length){
        div.id = socketIds[i];
        stickyDiv.id = socketIds[i];
    }

    else if (animator.processes.length > socketIds.length){
        if (counter < socketIds.length){
            div.id = socketIds[i];
            stickyDiv.id = socketIds[i];
            counter++;
        }
        else if(i-counter === socketIds.length){
            counter += socketIds.length;
            div.id = socketIds[i- counter];
            stickyDiv.id = socketIds[i- counter];
        }
        else{
            div.id = socketIds[i - counter]
            stickyDiv.id = socketIds[i - counter]
        }
    }

    else if(animator.processes.length < socketIds.length){
        if (counter < animator.processes.length){
            div.id = socketIds[i];
            stickyDiv.id = socketIds[i];
            counter++;
        }
        else{}
    }
    console.log("Div id: " + div.id);
    console.log("stickyDiv id: " + stickyDiv.id);


    div.innerHTML =
        animator.processes[i].name.toString() + ": " +  //Gives it a text output as specified in the JSON file, here the class and name of the object
        animator.processes[i].class.toString();         //here it is the class and name of the SSD object
    mainDiv.appendChild(div);                           //Places the new <div> element under the mainDiv, as specified in the variable declaration in l.4

    /** stickyProcessContainerDiv is a container div for stickyDiv. It is inside a container so we can you z-index
     *  to hide everything behind it.
     * stickyDiv is just the process that is made again but got position sticky so it will
     * stick to the top of the page. No lifelines are attached to this div.
     */

}

/*
 * This function creates the lifeline related to each object (process) in the SSD diagram. It also assigns an id to
 * each lifeline including the name of its object's name. This id is used later in locating the start and end position
 * of the arrows.
 */

function createLifeline(animator, i) {

    var lifeLineDiv = document.createElement("div");
    lifeLineDiv.className = lifelines;
    lifeLineDiv.id = animator.processes[i].name.toString();
    div.appendChild(lifeLineDiv);

}

function createClass(animator, i, left, top) {
    var div = document.createElement("div");
    div.className = classesDivClassName;
    div.innerHTML = animator.classes[i].name.toString();
    div.id = animator.classes[i].name.toString();
    mainDiv.appendChild(div);
    div.style.left = left + "px";
    div.style.top = top + "px";

    var div2 = document.createElement("div");
    div2.className = "hr2";
    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.className = fieldsDivClassName;
    div.appendChild(div3);

    fillFields(animator, div3, i);
    dragElement(div);
}
function fillFields(animator, div, i){
    for (var x = 0; x < animator.classes[i].fields.length; x++) {
        var text = document.createElement("div");
        text.innerHTML = animator.classes[i].fields[x].name.toString() + ": " +
            animator.classes[i].fields[x].type.toString();
        div.appendChild(text);
    }
}
function classLog(animator){
    var relation = "";
    for(var i = 0; i < animator.relationships.length; i++){
        var li = document.createElement("li");
        if(animator.relationships[i].type === 'inheritance'){
            relation = " inherits "
        }
        else{
            relation = " poops on "
        }
        li.setAttribute('id',((i+1)+": " +
            animator.relationships[i].subclass.toString() +
            relation +
            animator.relationships[i].superclass.toString()));
        li.appendChild(document.createTextNode((i+1)+": " +
            animator.relationships[i].subclass.toString() +
            relation +
            animator.relationships[i].superclass.toString()));
        log.appendChild(li);
    }
}
function makeRelations(animator){
    for(var i = 0; i < animator.relationships.length; i++){
        // If both are defined - Do nothing
        if (document.getElementById("SUPER" + animator.relationships[i].superclass.toString() &&
                document.getElementById("SUB" + animator.relationships[i].subclass.toString()))) {
            // Nothing
        }
        // If super is defined - Make sub
        else if(document.getElementById("SUPER" + animator.relationships[i].superclass.toString())){
            makeSub(animator, i);
            makeLine(animator, i);
        }
        // If sub is defined - Make super
        else if(document.getElementById("SUB" + animator.relationships[i].subclass.toString())){
            makeSuper(animator, i);
            makeLine(animator, i);
        }
        // If none are defined - Make both
        else {
            makeSuper(animator, i);
            makeSub(animator, i);
            makeLine(animator, i);
        }
    }
}
function makeSuper(animator, i) {
    var superClass = document.querySelector("#" + animator.relationships[i].superclass.toString());
    var superCont = document.createElement("div");
    superCont.className = "svgCont";
    superCont.id = "SUPER" + animator.relationships[i].superclass.toString();
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    svg.setAttribute("height", "25px");
    svg.setAttribute("width", "25px");
    polygon.setAttribute("points","1,12.5 24,1 24,24");
    polygon.setAttribute("style","fill:white;stroke:black;stroke-width:3");
    svg.appendChild(polygon);
    superCont.appendChild(svg);
    mainDiv.appendChild(superCont);
    superCont.style.left = superClass.offsetLeft + 250 + "px";
    superCont.style.top = superClass.offsetTop + 60 + "px";
}
function makeSub(animator, i) {
    var subClass = document.querySelector("#" + animator.relationships[i].subclass.toString());
    var subCont = document.createElement("div");
    subCont.className = "svgCont";
    subCont.id = "SUB" + animator.relationships[i].subclass.toString();
    //var polygon2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    var svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute("height", "25px");
    svg2.setAttribute("width", "25px");
    //                              0 0,0% 100%, 100% 50%
    //polygon2.setAttribute("points","1,1 1,25 25,12.5");
    //polygon2.setAttribute("style","fill:white;stroke:black;stroke-width:3");
    //svg2.appendChild(polygon2);
    subCont.appendChild(svg2);
    mainDiv.appendChild(subCont);
    subCont.style.left = subClass.offsetLeft + 125 + "px";
    subCont.style.top = subClass.offsetTop + 60 + "px";
}
function makeLine(animator, i) {
    var main = $("#outputJSON");
    var lineCont = document.createElement("div");
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    line.id = animator.relationships[i].superclass.toString() + animator.relationships[i].subclass.toString();
    lineCont.className = "lineCont";

    svg.appendChild(line);
    lineCont.appendChild(svg);
    mainDiv.appendChild(lineCont);

    svg.setAttribute("height", main.innerHeight());
    svg.setAttribute("width", main.innerWidth());
    line.setAttribute("x1" , (document.getElementById("SUPER" + animator.relationships[i].superclass.toString()).offsetLeft + 13 + "px"));
    line.setAttribute("y1" , (document.getElementById("SUPER" + animator.relationships[i].superclass.toString()).offsetTop + 13 + "px"));
    line.setAttribute("x2" , (document.getElementById("SUB" + animator.relationships[i].subclass.toString()).offsetLeft + 13 + "px"));
    line.setAttribute("y2" , (document.getElementById("SUB" + animator.relationships[i].subclass.toString()).offsetTop + 13 + "px"));
    line.setAttribute("style","stroke:black;stroke-width:2");
}
function makeFrom(animator, i) {
    var subClass = document.querySelector("#" + animator.mapping[i].process.toString());
    var subCont = document.createElement("div");
    subCont.className = "svgCont";
    subCont.id = "FROM" + animator.mapping[i].process.toString() + "FROM" + animator.mapping[i].process.toString();
    var svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute("height", "25px");
    svg2.setAttribute("width", "25px");
    subCont.appendChild(svg2);
    mainDiv.appendChild(subCont);
    subCont.style.left = subClass.offsetLeft + 125 + "px";
    subCont.style.top = subClass.offsetTop + 50 + "px";
}
function makeTo(animator, i) {
    var subClass = document.querySelector("#" + animator.mapping[i].process.toString());
    var subCont = document.createElement("div");
    subCont.className = "svgCont";
    subCont.id = "TO" + animator.mapping[i].process.toString()+"TO" + animator.mapping[i].process.toString();
    var svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute("height", "25px");
    svg2.setAttribute("width", "25px");
    subCont.appendChild(svg2);
    mainDiv.appendChild(subCont);
    subCont.style.left = subClass.offsetLeft + 125 + "px";
    subCont.style.top = subClass.offsetTop + 50 + "px";
}
function makeDeploymentRelations(animator){
    for(var i = 0; i < animator.mapping.length; i++){
        if (i < 1) {
            makeFrom(animator, i);
            createDeploymentLines(animator, i);
        }
        else if(i == animator.mapping.length-1){
            makeTo(animator, i);
            createDeploymentLines(animator, i);
        }
        else{
            makeFrom(animator, i);
            makeTo(animator, i);
            createDeploymentLines(animator, i);
        }
    }
}

function createDeploymentClass(animator,i,left,top){
    var div = document.createElement("div");
    div.className = classesDivClassName + " deploymentBox";
    div.innerHTML = "&lt;&lt;" + animator.mapping[i].device.toString() + "&gt;&gt;";
    div.id = animator.mapping[i].process.toString();
    mainDiv.appendChild(div);
    div.style.left = left + "px";
    div.style.top = top + "px";
    dragElement(div);
}
function createDeploymentLines(animator, i) {

    if(i == animator.mapping.length-1){}
    else {
        var main = $("#outputJSON");
        var lineCont = document.createElement("div");
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        line.id = "FROM" + animator.mapping[i].process.toString() +"FROM" + animator.mapping[i].process.toString() +
            "TO" + animator.mapping[i + 1].process.toString()+"TO" + animator.mapping[i + 1].process.toString();
        lineCont.className = "lineCont";

        svg.appendChild(line);
        lineCont.appendChild(svg);
        mainDiv.appendChild(lineCont);

        svg.setAttribute("height", main.innerHeight());
        svg.setAttribute("width", main.innerWidth());
        line.setAttribute("x1", (document.getElementById(animator.mapping[i].process.toString()).offsetLeft + 13 + "px"));
        line.setAttribute("y1", (document.getElementById(animator.mapping[i].process.toString()).offsetTop + 13 + "px"));
        line.setAttribute("x2", (document.getElementById(animator.mapping[i + 1].process.toString()).offsetLeft + 13 + "px"));
        line.setAttribute("y2", (document.getElementById(animator.mapping[i + 1].process.toString()).offsetTop + 13 + "px"));
        line.setAttribute("style", "stroke:black;stroke-width:2");
    }
}

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    console.log(element);
    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";

        moveRelation(element, pos2, pos1);
    }
    function moveRelation(element, pos2, pos1) {
        // If both are defined - move both
        if(document.getElementById("SUPER"+element.id.toString()) && document.getElementById("SUB"+element.id.toString())){
            var SUPER = document.getElementById("SUPER"+element.id.toString());
            var SUB = document.getElementById("SUB"+element.id.toString());
            SUPER.style.top = (SUPER.offsetTop - pos2) + "px";
            SUPER.style.left = (SUPER.offsetLeft - pos1) + "px";
            SUB.style.top = (SUB.offsetTop - pos2) + "px";
            SUB.style.left = (SUB.offsetLeft - pos1) + "px";
            // Get all lines that has a connection to this SUPER
            var elements = $("line[id^='"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x1" , ((SUPER.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y1" , ((SUPER.offsetTop -pos1) + 13) + "px");
            }
            // Get all lines that has a connection to this SUB
            var elements = $("line[id$='"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x2" , ((SUB.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y2" , ((SUB.offsetTop -pos1) + 13) + "px");
            }
        }
        // If only super is defined - move super
        else if(document.getElementById("SUPER"+element.id.toString())){
            // Move the SUPERcont
            var SUPER = document.getElementById("SUPER"+element.id.toString());
            SUPER.style.top = (SUPER.offsetTop - pos2) + "px";
            SUPER.style.left = (SUPER.offsetLeft - pos1) + "px";
            // Get all lines that has a connection to this SUPER
            var elements = $("line[id^='"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x1" , ((SUPER.offsetLeft -pos2 + 13)) + "px");
                e.setAttribute("y1" , ((SUPER.offsetTop -pos1) + 13) + "px");
            }
        }
        // If only sub is defined - move sub
        else if(document.getElementById("SUB"+element.id.toString())){
            // Move the SUBcont
            var SUB = document.getElementById("SUB"+element.id.toString());
            SUB.style.top = (SUB.offsetTop - pos2) + "px";
            SUB.style.left = (SUB.offsetLeft - pos1) + "px";
            // Get all lines that has a connection to this SUB
            var elements = $("line[id$='"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x2" , ((SUB.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y2" , ((SUB.offsetTop -pos1) + 13) + "px");
            }
        }
        else if(document.getElementById("FROM"+element.id.toString()+"FROM"+element.id.toString()) &&
            document.getElementById("TO"+element.id.toString()+"TO"+element.id.toString())){
            var SUPER = document.getElementById("FROM"+element.id.toString()+"FROM"+element.id.toString());
            var SUB = document.getElementById("TO"+element.id.toString()+"TO"+element.id.toString());
            SUPER.style.top = (SUPER.offsetTop - pos2) + "px";
            SUPER.style.left = (SUPER.offsetLeft - pos1) + "px";
            SUB.style.top = (SUB.offsetTop - pos2) + "px";
            SUB.style.left = (SUB.offsetLeft - pos1) + "px";
            // Get all lines that has a connection to this FROM
            var elements = $("line[id^='FROM"+element.id.toString()+"FROM"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x1" , ((SUPER.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y1" , ((SUPER.offsetTop -pos1) + 13) + "px");
            }
            // Get all lines that has a connection to this TO
            var elements = $("line[id$='TO"+element.id.toString()+"TO"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x2" , ((SUPER.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y2" , ((SUPER.offsetTop -pos1) + 13) + "px");

            }


        }
        else if(document.getElementById("FROM"+element.id.toString()+"FROM"+element.id.toString())){
            var SUPER = document.getElementById("FROM"+element.id.toString()+"FROM"+element.id.toString());
            console.log(SUPER);
            SUPER.style.top = (SUPER.offsetTop - pos2) + "px";
            SUPER.style.left = (SUPER.offsetLeft - pos1) + "px";

            // Get all lines that has a connection to this FROM
            var elements = $("line[id^='FROM"+element.id.toString()+"FROM"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x1" , ((SUPER.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y1" , ((SUPER.offsetTop -pos1) + 13) + "px");
            }
        }
        else if(document.getElementById("TO"+element.id.toString()+"TO"+element.id.toString())){
            var SUB = document.getElementById("TO"+element.id.toString()+"TO"+element.id.toString());
            console.log(SUB);
            SUB.style.top = (SUB.offsetTop - pos2) + "px";
            SUB.style.left = (SUB.offsetLeft - pos1) + "px";
            // Get all lines that has a connection to this TO
            var elements = $("line[id$='TO"+element.id.toString()+"TO"+element.id.toString()+"']");
            // Loop through them and change their points
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i];
                e.setAttribute("x2" , ((SUB.offsetLeft -pos2) + 13) + "px");
                e.setAttribute("y2" , ((SUB.offsetTop -pos1) + 13) + "px");
            }
        }
        // If nothing is defined - do nothing
        else{
            // Nothing
        }
    }
    function closeDragElement() {
        // Stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

/*
 *This function is responsible for parsing the JSON File nodes in its entirety.
 *It takes two parameters, a JSON Object (this could also be an array) as well as the frame
 *to append the nodes to.
 *
 *It is called recursively after each node creation and stops once the parsing is done.
 *The JSON must have at least one "send" node otherwise the function will hang
 */


function createNodes(object, frameToAppend){
    var arrayOfNodes = []; //this array will contain all the JSON Objects (nodes) inside object
    var arrayOfObjects = []; //this array will contain the "content" objects in the object

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            if (key == "node") {
                arrayOfNodes.push(object[key]);
            }
            else if (key == "content") {
                arrayOfObjects = object[key];
            }
        }
    }



    for (var i = 0; i < arrayOfNodes.length; i++) {
        for (key in arrayOfNodes) {
            if (arrayOfNodes[i] === "seq") {
                var seqFrameDiv = document.createElement("div");    //create frame div seqFrame
                seqFrameDiv.className = seqFrameDivClassName;
                frameToAppend.appendChild(seqFrameDiv);
                // NO FRAMETITLE FOR YOUUUU
                for (var j = 0; j < arrayOfObjects.length; j++) {
                    createNodes(arrayOfObjects[j], seqFrameDiv);    //calls the function to create objects contained in seq
                }
            }
            else if (arrayOfNodes[i] === "par") {
                var parFrameDiv = document.createElement("div");    //create frame div parFrame
                parFrameDiv.className = parFrameDivClassName;
                frameToAppend.appendChild(parFrameDiv);
                var parFrameTitle = document.createElement("div");
                parFrameTitle.className = frameTitleClassName;
                parFrameTitle.innerHTML = "par";                    //create frameTitle with "par" title
                parFrameDiv.appendChild(parFrameTitle);             //call createFrame(object content, frame parFrame)
                for (var j = 0; j < arrayOfObjects.length; j++) {
                    createNodes(arrayOfObjects[j], parFrameDiv);    //calls the function to create objects contained in par
                }
            }
            else if (arrayOfNodes[i] === "send") {
                //create arrow from "from" to "to"
                var fromNode = getPosition(document.querySelector("#" + object.from.toString()));
                var toNode = getPosition(document.querySelector("#" + object.to.toString()));
                //console.log(fromNode.x + " " + toNode.x);
                var messageToSend = "";

                if (object.message.length == 1) {
                    messageToSend += object.message[0];
                }
                else { //this clause serves to format the message if it contains function arguments
                    for (var j = 0; j < object.message.length; j++) {
                        if (j == 0) {
                            messageToSend += object.message[0] + "(";
                        }
                        else if (j == object.message.length - 1) {
                            messageToSend += object.message[j] + ")";
                        }
                        else {
                            messageToSend += object.message[j] + ", ";
                        }
                    }
                }
                var lifelineElement = document.getElementById(object.from);
                objectArray.push({fromNode: fromNode, toNode: toNode, messageToSend: messageToSend,
                    frameToAppend: frameToAppend, objectFrom: object.from, lifelineElement: lifelineElement});

                setTimeout(function () {serverRequest(); concatLog(object.from, object.to, messageToSend);}, arrowCounter * 1000);
                arrowCounter++;


            }
        }
    }
}

function arrayifyString(string){
    var array = string.split(",");
    return array;
}