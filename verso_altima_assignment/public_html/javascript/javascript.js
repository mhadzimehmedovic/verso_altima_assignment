var people = ["Adam Ivan", "Marko Stjepan", "Stjepan Adam", "Robert Stjepan", "Fran Ivan", "Leopold Luka"];
var jsonpeople = JSON.stringify(people);

//I've made the program work, but border rules aren't implemented

//defining main arrays
var children = [];
var parents = [];
//array that would be used for single tree
var arrayTree = [];

window.onload = setUp();//onload call setUp function
function setUp() {

    for (var i in people) {//splitting parents and children
        var split = people[i].split(" ");
        children.push(split[0]);
        parents.push(split[1]);
    }
    var unique2 = findTopParent(children, parents);//finding top Node
    //console.log(getTree('Ivan'));
    //if(checkIfDuplicateExists(getTree('Ivan'))) {
    //  document.getElementById("treeOfNames").innerHTML = 'Cyclic border broken!';


//  }else

    document.getElementById("treeOfNames").innerHTML = makeUL(unique2);//setting html to UL

}



//A function find all children from top node downwards recursivly
function findChildren(parent, parents, children) {

    var childGroup = [];
    var cond = false;//condition


    for (var j in parents) {//looping through all parents

        if (parent == parents[j]) {
            cond = true;//condition filled
            childGroup.push(children[j]);
        }


    }

    if (cond) {//if 1 or more children
        for (var i = 0; i < childGroup.length; i++) {
            if (findChildren(childGroup[i], parents, children).length == 0) {//breaking at last child
                break;
            }
            findChildren(childGroup[i], parents, children);//recursion

        }

    }
    return childGroup;
}

//A function to find the top Node
function findTopParent(children, parents) {
    var names = parents.slice();//copying parents

    for (var j in parents) { //looping through all of the children and parents
        for (var k in children) {
            if (parents[j] == children[k]) {//if we find a match remove that parent
                var pos = names.indexOf(parents[j]);
                names.splice(pos, 1);

            }
        }
    }
    return [...new Set(names)];//unique names
}

//creating all the unordered lists, takes a name as parameter
function makeUL(topName) {
    var result = '<ul>';//starting point
    for (var k in topName) {
        result = result + '<li>' + topName[k] + '</li>';//adding each node
        result = result + makeUL(findChildren(topName[k], parents, children));//recursion
//console.log(childs);

    }
    result = result + '</ul>';
    return result;
}

//get Tree for a specific top node, not fully working
function getTree(topName) {
    arrayTree.push(topName);//adding to array

    if (findChildren(topName, parents, children).length >= 1) {
        var djeca = findChildren(topName, parents, children);
        for (var k in djeca) {
            if (findChildren(djeca[k], parents, children).length == 0) {
                break;
            }
            getTree(djeca[k]);//recursion
        }
    } else
        return arrayTree;

    return arrayTree;
}


//Function to get single parent based on child name(takes childname as param)
function getParent(child) {
    var parent = '';
    for (var k in children) {//looping through each child
        if (child === children[k]) {
            parent = parents[k];
        }
    }

    return parent;
}

//a method to check if a duplciate exists in array
//planned to use it but never did
function checkIfDuplicateExists(w) {
    return new Set(w).size !== w.length;
}
