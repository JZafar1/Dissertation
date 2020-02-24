var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape.stylesheet()
        .selector('node')
        .style({
            'content': 'data(id)'
        })
        .selector('edge')
        .style({
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
        })
        .selector('.highlighted')
        .style({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
        }),

    elements: {
        nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } },
            { data: { id: 'f' } }
        ],

        edges: [
            { data: { id: 'a"e', weight: 1, source: 'a', target: 'e',} },
            { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
            { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
            { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
            { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
            { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
            { data: { id: 'de', weight: 7, source: 'd', target: 'e' } },
            { data: { id: 'df', weight: 7, source: 'd', target: 'f' } }
        ]
    },

    layout: {
        name: 'breadthfirst',
        directed: false,
        roots: '#a',
        padding: 10
    }
});


var bfs = cy.elements().bfs('#a', function(){}, true);

var i = 0;
var highlightNextEle = function(){
    if( i < bfs.path.length ){
        bfs.path[i].addClass('highlighted');
        i++;
        setTimeout(highlightNextEle, 1000);
    }
};
// kick off first highlight
highlightNextEle();


var j = cy.$('#a');


// listen with some other handler
j.on('tap', function(event){
    console.log('some other handler');
});

