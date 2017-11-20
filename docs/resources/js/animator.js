//Block of constants used to name classes of HTML elements created, if change needed change the constant's value

const processDivClassName = "processes";
const classesDivClassName = "classes";
const fieldsDivClassName = "fields";
const frameDivClassName = "frame";
const frameTitleClassName = "frameTitle";
const lifelines = "lifeLine";
const arrowDivClassNameL2R = "arrowLtoR";
const arrowDivClassNameR2L = "arrowRtoL";
const messageDivClassName = "messages";
//const activatorClassName = "activator";

var scrollBoolean = true;

var animator = JSON.parse(localStorage.getItem('stringJSON'));
var mainDiv = document.getElementById("outputJSON");
var frameDiv;
var llHeight = 100;

// Checks if it's a sequence diagram
if(animator.type === 'sequence_diagram') {

    window.onload = function animateJSON() {

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
            var animatorDiagramArray = Object.keys(animator.diagram); //In order to check whether or not the JSON element is a node, we must select the diagram object's keys.
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
            }
        createArrow(animator, 0, 0);
        createLog(animator, 0, 0, 0);
        pageScroll();
    }

}
// Checks if it's a class diagram
if(animator.type === 'class_diagram'){
    var left = 25;
    for (var i = 0; i < animator.classes.length; i++) {
        createClass(animator, i, left);
        left = left + 300;
    }
    classLog(animator);
    makeRelations(animator);
}

/*
* This function creates arrows based on the direction of the arrow by using the functions arrowL2R and arrowR2L.
* It checks the start and end position of each arrow in the content of the diagram section provided in the JSON file.
* The function is set to a timeout in order to generate the arrows one by one with a timeout of one second.
 */

function createArrow(animator, j, i) {


    // Lifeline height
    var LifeLinesArray = document.querySelectorAll('.lifeLine');
    if (llHeight > 500) {}
        else{
    llHeight = llHeight + 65;
}
    for (var k=0; k < LifeLinesArray.length; k++) {
        LifeLinesArray[k].style.height = (llHeight + "px");
    }


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

        arrowR2L(startPosition, endPosition, j, i);
    }
    else {

        arrowL2R(startPosition, endPosition, j, i);
    }
    
    // base case of the recursive loop

    if (animator.diagram.content[j].content[i + 1] === undefined && j + 1 === animator.diagram.content.length) {}

    // the recursive call of the loop and the incrementing of var i

    else {
        setTimeout(function () {
            i++;
            createArrow(animator, j, i, mainDiv);
        }, 1000);
    }
}


function createLog(animator, i, e, total) {
    var ul = document.getElementById("logList");

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
    ul.appendChild(li);

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

/*
 * This function generates an arrow with the specific direction of left to right. It also generates the div related to
 * the message that each arrow carries. As stated in the function, arrows are children of frameDiv.
 */

function arrowL2R(from, to, j, i) {

    var arrow = document.createElement("div");
    var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    var message = document.createElement("div");

    arrow.className = arrowDivClassNameL2R;
    var arrowLengthL2R = to.x - from.x;
    arrow.style.maxWidth = arrowLengthL2R + 'px';


    svg.setAttribute("preserveAspectRatio", "xMaxYMid slice");
    svg.setAttribute("viewBox", "0 0 1400 14");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "14");
    polygon.setAttribute("points", "1400,7 1385,1 1390,6 0,6 0,8 1390,8 1385,13 1400,7");

    arrow.style.left = from.x - 30 + 'px';

    message.className = messageDivClassName;
    message.innerHTML = animator.diagram.content[j].content[i].message.toString();

    arrow.appendChild(message);
    svg.appendChild(polygon);
    arrow.appendChild(svg);

    if (frameDiv === undefined) {
        mainDiv.appendChild(arrow);
    }
    else {
        frameDiv.appendChild(arrow);
    }

}

/*
 * This function generates an arrow with the specific direction of right to left. It also generates the div related to
 * the message that each arrow carries. As stated in the function, arrows are children of frameDiv.
 */

function arrowR2L(from, to, j, i) {

    var arrow = document.createElement("div");
    var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    var message = document.createElement("div");

    arrow.className = arrowDivClassNameR2L;
    var arrowLengthR2L = from.x - to.x;
    arrow.style.maxWidth = arrowLengthR2L + 'px';

    svg.setAttribute("preserveAspectRatio", "xMinYMid slice");
    svg.setAttribute("viewBox", "0 0 1400 14");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "14");
    polygon.setAttribute("points", "0,7 15,1 10,6 1400,6 1400,8 10,8 15,13 0,7");

    arrow.style.left =  to.x - 30 + 'px';

    message.className = messageDivClassName;
    message.innerHTML = animator.diagram.content[j].content[i].message.toString();

    arrow.appendChild(message);
    svg.appendChild(polygon);
    arrow.appendChild(svg);

    if (frameDiv === undefined) {
        mainDiv.appendChild(arrow);
    }
    else {
        frameDiv.appendChild(arrow);
    }
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
    div.innerHTML =
        animator.processes[i].name.toString() + ": " +  //Gives it a text output as specified in the JSON file, here the class and name of the object
        animator.processes[i].class.toString();         //here it is the class and name of the SSD object
    processDiv.appendChild(div);                           //Places the new <div> element under the mainDiv, as specified in the variable declaration in l.4



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

  var lastScroll = 0;
  function pageScroll() {
    
        //checks if it should continue scrolling or not
        if(scrollBoolean || lastScroll == 0){
            // some logic to do one more iteration of this function. Overwise it will skip the last scroll of the SSD.
            if(!scrollBoolean){
                lastScroll++;
            }
            //Scrolls to the bottom of the outputJSON page
            mainDiv.scrollBy(0,document.getElementById('outputJSON').scrollHeight); // horizontal and vertical scroll increments
            //scrolls to the bottom of the log
            log.scrollBy(0,document.getElementById('log').scrollHeight);
            setTimeout(function() {
            pageScroll();
        },1000); // scrolls every 1000 milliseconds
    }
}
function createClass(animator,i, left) {
    var div = document.createElement("div");
    div.className = classesDivClassName;
    div.innerHTML = animator.classes[i].name.toString();
    div.id = animator.classes[i].name.toString();
    mainDiv.appendChild(div);
    div.style.left = left + "px";


    var div2 = document.createElement("div");
    div2.className = "hr2";
    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.className = fieldsDivClassName;
    div.appendChild(div3);

    fillFields(animator, div3, i)
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
    var ul = document.getElementById("logList");
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
        ul.appendChild(li);
    }
}
function makeRelations(animator){
    for(var i = 0; i < animator.relationships.length; i++){
        var superClassPos = getPosition(document.querySelector("#" + animator.relationships[i].superclass.toString()));
        var subClassPos = getPosition(document.querySelector("#" + animator.relationships[i].subclass.toString()));

        console.log((i+1) +" - superClassPos X: "+superClassPos.x.toString());
        console.log((i+1) +" - superClassPos Y: "+superClassPos.y.toString());

        console.log((i+1) +" - subClassPos X: "+subClassPos.x.toString());
        console.log((i+1) +" - subClassPos Y: "+subClassPos.y.toString());

    }
}
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

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
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}