$(document).ready(function() {
    getAWSData();
});

 function getAWSData() {
    //Create and config a new instance of AWS S3 Bucket
    AWS.config.region = 'eu-west-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:91485a9b-7736-4a9a-96bc-e24adef8d550',
    });

    window.s3 = new AWS.S3();

    //Name of bucket and the file to be retrieved
    var params = {
        Bucket: "dissertation-bucket",
        Key: "webDisplay.json"
    };

    //Callback function to ensure launchUI() only runs when S3 has returned the data
    getFile(params, function callUI() {
        launchUI();
    });
 }

function getFile(params, callback) {
    window.s3.getObject(params, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            //data.body.toString() returns the raw data from getObject call
            const fileContents = data.Body.toString();
            window.split = fileContents.split("\n");
            callback();
        }
    });
}

/**
 * Generate animated graph using Cytoscape.js
 */
 function launchUI() {
     var options = {
        klay: {
            addUnnecessaryBendpoints: true,
            direction: 'VERTICAL',
            fixedAlignment: 'BALANCED'
        }
     };
     console.log(window.split[0]);
     console.log(window.split[1]);
    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        style: [
            {
                selector: 'node',
                style: {
                    'content': 'data(id)'
                }
            },

            {
                selector: 'edge',
                style: {
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],

        elements: {
            nodes: JSON.parse(window.split[0]),
            edges: JSON.parse(window.split[1])
        },

        layout: {
            name: 'breadthfirst'
        }
    });

    //When the user taps a given node, update the information displayed
    cy.on('tap', 'node', function(evt){
        updateDisplay(evt);
    });
}

function updateDisplay(evt) {
    const source = (evt.target).id();
    //elements 0 and 1 are node/edge arrays and can be ignored
    for(let i = 2; i < window.split.length; i++) {
        //Returns the id which represents the node the data is attached to
        var id = (Object.keys(JSON.parse(window.split[i])))[0].replace(/\D/g,'');
        if(id === source) {
            formatData(JSON.parse(window.split[i]), id, function callUpdate() {
                updateContentArea();
            });
            break;
        }
    }
}

function formatData(data, id, callback) {
    const temp = "Branch" + id;
    //Gets each element of original JSON data
    window.dataLines = data[temp].split(", ");
    if(JSON.stringify(window.dataLines[0]).includes("Branches")) {
        addBranchTitle(id, window.dataLines[0]);
        //Remove first array element as no longer needed
        window.dataLines.splice(0, 1);
    }else {
        addBranchTitle(id);
    }
    //Updates the area showing the branch detail
    callback();
}

function addBranchTitle(id, branches) {
     //Branches optional parameter, only present if node represents many branches
     if(branches === undefined) {
         $("#branchArea").text("Branch: " + id);
     }else {
         //Remove identifier text before displaying
         var newTitle = branches.replace('[Branches <', '');
         newTitle = newTitle.replace('>', '');
         newTitle = newTitle.split(' ').join(', ');
         var display = id + ", " + newTitle;
         $("#branchArea").text("Branches: " + display);
     }
}

function updateContentArea() {
    //Clear old display
    $("div.contentHolder").remove();
    $("#contentArea div").empty().removeAttr("style");
    for(let i = 0; i < window.split.length; i++) {
        window.deferredManager = $.Deferred();
        //Root is an identifier with no data
        if(window.dataLines[i] === '[ROOT') {
            i++;
        }
        const classID = "element" + i;
        const toolTextID = "tooltip" + i;
        $( "<div />", {
            "class": classID,
            "id": classID,
            text: window.dataLines[i],
            on: {
                mouseover: function() {
                    changeStyle(this.id, i);
                },
                mouseleave: function() {
                    revertStyles(this.id);
                },
            },
            css: {
                paddingBottom: "10px",
                width: "100%",
                paddingTop: "10px",
            }
        })
            .appendTo( "#contentArea" );

        const helperText = getHelpText(classID);
        (function() {
            $.when(window.deferredManager).done(function() {
                console.log("Before call: " + helperText);
                createHiddenDiv(i, toolTextID, classID, helperText);

            });
        })();

        //Create a tooltip for each line of output
        $("#" + classID).qtip({
            content: {
                //Get text content from hidden div
                text: $("#" + toolTextID)
            },
            show: {
                event: 'mouseover'
            }
        })
            .attr('title', 'Help');
    }
}

function createHiddenDiv(count, toolTextID, classID, displayText) {
    console.log("Finished: " + displayText);
    //Hidden div inside of element with tooltip info
    $( "<div />", {
        "class": toolTextID,
        "id": toolTextID,
        //Get text from dictionary
        text: displayText,
        css: {
            display: "none"
        }
    })
        .appendTo("#element" + count);
}

function changeStyle(source, id) {
    //on hover change the background color
    $(  "#" + source).css({
        "background": "rgb(109, 109, 109)"
    });
}

function revertStyles(source) {
     //When not hovering, revert background to original
     $("#" + source).css({
        "background": "rgb(155, 155, 155)"
    });
}

function getHelpText(source, callback) {
    //Bucket and object to use
    var params = {
        Bucket: "dissertation-bucket",
        Key: "Dictionary.json"
    };
    //callback function to ensure dictionary is available before searching it
    getDictionary(params, function callFindDef() {
        var finished = findDefinition(source);
        window.deferredManager.resolve();
        return finished;
    });

}

function getDictionary(params, callback) {
    window.s3.getObject(params, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            //data.body.toString() returns the raw data from getObject call
            const fileContents = data.Body.toString();
            window.dictionary = fileContents.split(",");
            callback();
        }
    });
}

function findDefinition(source) {
    var text = $('#' + source).text();
    //Return the object with the correct definition
    var returnVal = window.dictionary[((text.split(' '))[1])];
    //Undefined if no help available for given opcode
    console.log("Actual: " + returnVal);
    if(returnVal === undefined) {
        return "No help available";
    }else {
        return returnVal;
    }
}