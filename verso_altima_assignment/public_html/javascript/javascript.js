var people = ["Adam Ivan", "Marko Stjepan", "Stjepan Adam", "Robert Stjepan", "Fran Ivan", "Leopold Luka"];
var children = [];
var parents = [];
var jsonpeople = JSON.stringify(people);
var names;
var arrayTree = [];
window.onload = setUp();
function setUp() {

    for (var i in people) {
        var split = people[i].split(" ");
        children.push(split[0]);
        parents.push(split[1]);
    }
    var unique2 = findTopParent(children, parents);
    document.getElementById("treeOfNames").innerHTML = makeUL(unique2);

}

function findChildren(parent, parents, children) {

    var childGroup = [];
    var sisted = [];
    var cond = false;
    for (var j in parents) {

        if (parent === parents[j]) {
            cond = true;
            childGroup.push(children[j]);
        }


    }

    if (cond) {
        for (var i = 0; i < childGroup.length; i++) {

            findChildren(childGroup[i], parents, children);

        }

    }
    console.log(sisted);
    return childGroup;
}
function findTopParent(children, parents, people) {

    names = parents.slice();
    for (var j in parents) {
        for (var k in children) {
            if (parents[j] === children[k]) {
                var pos = names.indexOf(parents[j]);
                names.splice(pos, 1);

            }
        }
    }
    return [...new Set(names)];
}

function makeUL(topName) {
    var other = '';
    var result = '<ul>';
    for (var k in topName) {
        result = result + '<li>' + topName[k] + '</li>';
        result = result + makeUL(findChildren(topName[k], parents, children));
//console.log(childs);

    }

    var result = result + '</ul>';
//console.log(result);
    return result;
}
function findFullTree(tP) {

    var string = tP;
    var smth = findChildren(tP, parents, children);
    string += smth;
    for (var t in smth) {
        string = string + ' ' + findChildren(smth[t], parents, children);
        findFullTree(smth[t]);
    }
    return string;
}


