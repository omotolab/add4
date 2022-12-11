
<!-- <template lang="pug">
div.uk-background-muted
    .uk-container
        // search
        .uk-grid.uk-grid-collapse(uk-height-viewport="offset-top: true; offset-bottom: true")
            div
                .uk-section.uk-section-small
                    .uk-flex.uk-grid.uk-grid-small.uk-child-width-1-2
                        div
                            div(:id="id" class="display").uk-width-medium.uk-height-medium.uk-card-default
                        div
                            display(:items="points" :at="at.data").uk-height-medium.uk-card-default
            div.uk-width-expand
                nuxt
            div.uk-width-small
                aside
                    div {{ at.data }}
                    input(
                        v-for="{ z } in points"
                        v-model.number="z"
                        min="-1"
                        max="1"
                        step="0.01"
                        type="range")
            
        // uk-off-canvas.uk-width-medium
</template> -->
<script>
import { useFullscreen } from 'vue-use-web';
import { ref, onMounted } from '@vue/composition-api';

export default {
  setup() {
    const el = ref('app');
    const { enterFullscreen, exitFullscreen } = useFullscreen(el);
    const control = {
        screen: () => enterFullscreen()
    }
    const index = {
        'account': {
            icon: 'user'
        },
        'projects': {
            icon: 'thumbnails'
        }
    }

    const action = {
        author: {
            displayName: "autonaut",
            displayStatus: Date.now()
        }
    }

    onMounted(() => {
      setInterval(() => {
        exitFullscreen();
      }, 5000);
    });

    return {
      el,
      enterFullscreen,
      control,
      index,
      ...action
    };
  }
};
</script>
<template lang="pug">
div(ref="app").uk-height-viewport.uk-card.uk-card-small.uk-card-default
    .uk-card-header
        .uk-container
            nuxt-nav(:author="author" :control="enterFullscreen")
    .uk-card-body(uk-height-viewport="offset-top: true; offset-bottom: true").uk-overflow-auto
        .uk-container
            nuxt
</template>
<!-- <script>
import { useFullscreen } from 'vue-use-web';
import { ref, onMounted } from '@vue/composition-api';
var Viva = require('vivagraphjs')
const toList = require('@@/:./stream/assets/scripts/object/list').default

const createGraph = () => {
    const graph = Viva.Graph.graph();
    return graph
}

const updateGraphics = ( { graphics, graph }, $ ) => {
    const nodeSize = 24
    const highlightRelatedNodes = function(nodeId, isOn) {
        // just enumerate all realted nodes and update link color:
        graph.forEachLinkedNode(nodeId, function(node, link){
            var linkUI = graphics.getLinkUI(link.id);
            if (linkUI) {
                // linkUI is a UI object created by graphics below
                linkUI.attr('stroke', isOn ? 'red' : 'gray');
            }
        });
    };

    const highlightRelatedLinks = function(linkId, isOn) {
        // just enumerate all realted nodes and update link color:
        var linkUI = graphics.getLinkUI(linkId);
        linkUI.attr('stroke', isOn ? 'red' : 'gray');
        
        const parts = linkId.split('👉').map(part => part.trim())
       
        parts.forEach((nodeId) => {
            var nodeUI = graphics.getNodeUI(nodeId);
            if (nodeUI) {
                // linkUI is a UI object created by graphics below
                nodeUI
                    .link(isOn ? 'https://via.placeholder.com/20/' : 'https://secure.gravatar.com/avatar/' + nodeId);
            }
        });
        
    };

    graphics.node(function(node) {
        var ui = Viva.Graph.svg('image')
                .attr('width', nodeSize)
                .attr('height', nodeSize)
                .link('https://secure.gravatar.com/avatar/' + node.data);

        ui.addEventListener("click", () => $.at = node);
        ui.addEventListener("mouseover", () => highlightRelatedNodes(node.id, true));
        ui.addEventListener("mouseleave", () => highlightRelatedNodes(node.id, false));
        
        return ui;
    }).placeNode(function(nodeUI, pos) {
        // console.log(nodeUI)
        nodeUI.attr('x', pos.x - nodeSize / 2).attr('y', pos.y - nodeSize / 2);
    });
    
    graphics.link(function(link){
        var ui = Viva.Graph.svg('path')
                .attr('stroke', 'gray');

        ui.addEventListener("click", () => $.at = link );
        ui.addEventListener("mouseover", () => highlightRelatedLinks(link.id, true));
        ui.addEventListener("mouseleave", () => highlightRelatedLinks(link.id, false));

        return ui
    }).placeLink(function(linkUI, fromPos, toPos) {
        var data = 'M' + fromPos.x + ',' + fromPos.y +
                    'L' + toPos.x + ',' + toPos.y;

        linkUI.attr("d", data);
    })

}

const createMonitor = ({id, graph}, $) => {

    console.log($)

    if(!graph) {
        const graph = createGraph()
        return createMonitor({id, graph})
    }

    const container = document.getElementById(id)
    const graphics = Viva.Graph.View.svgGraphics()

    updateGraphics({ graphics, graph }, $)

    const monitor = Viva.Graph.View.renderer(graph, {
        container,
        graphics, 
    });

    return monitor

}

const setNodes = (nodes, graph) => {
    if(!Array.isArray(nodes)) {
        const nodesList = toList(nodes)
        setNodes(nodesList, graph)
        return 
    }

    nodes.forEach(({ key }, nodeIndex) => {
        graph.addNode(key, {
            position: nodeIndex
        });
    })
}

const setLinks = (links, graph) => {
    if(!Array.isArray(links)) {
        const linksList = toList(links)
        setLinks(linksList, graph)
        return
    }

    links.forEach(({ from, to, at }, linkIndex) => {
        graph.addLink(from, to, at);
    })
}

const setGraph = ({ nodes, links }, graph) => {

    if(!graph) {
        const graph = createGraph()
        return setGraph({ nodes, links }, graph)
    }

    if(nodes) {
        setNodes(nodes, graph)
    }

    if(links) {
        setLinks(links, graph)
    }
    
    return graph
}

const setMonitor = ( id, graph ) => {
    if(!monitor) {
        const monitor = createMonitor(id)
        return setMonitor(id, monitor)
    } 

    return monitor
}

const points = [
        {
            z: -2.5,
            href: 'tetrahedron'
        },
        {
            z: 0,
            href: 'sphere'
        },
        {
            z: 2.5,
            href: 'sphere'
        }
]

const index = {
    'account': {
        icon: 'user'
    },
    'projects': {
        icon: 'thumbnails'
    }
}

const action = {
    author: {
        displayName: "autonaut",
        displayStatus: Date.now()
    }
}

export default {
    data() {
        return {
            id: 'data-graph',
            edit: true,
            activity: null,
            monitor: {},
            points,
            index,
            ...action,
            at: {}
        }
    },
    mounted() {

        setInterval( console.log(Date.now()) , 2000 )

        const structure = {
            nodes: {
                '#/source': {
                    icon: 'history',
                },
                'profile': {
                    icon: 'user',
                },
                'message': {
                    icon: 'comment',
                },
                'process': {
                    icon: 'cog',
                },
                '#/target': {
                    icon: 'future',
                },
            },
            links: {
                'author': {
                    from: 'account',
                    to: 'balance',
                    at: { z: -2.5, href: 'tetrahedron'}
                },
                'control': {
                    from: 'balance',
                    to: `condition`,
                    at: { z: 0, href: 'tetrahedron'}
                },
                "transfer": {
                    from: 'condition',
                    to: `document`,
                    at: { z: 2.5, href: 'tetrahedron'}
                }
            },
        }
        
        this.graph = setGraph( { links: structure.links } )
        /* this.monitor[this.id] = createMonitor({ id: this.id, graph: this.graph }, this)
        this.monitor[this.id].run() */

        
        
    },
    computed: {
        map() {
            const names = this.$router.options.routes.map(route => route.name)
            const seed = names.filter(name => name === 'index')
            const stems = names.filter(name => (name.split('-').length === 1 && name !== seed[0] ));
            const tree = {
                seed,
                stems
            }
            console.log(tree)
            return tree
        },
        details() {
            if(!this.graph) {
                return null
            }
            
            const nodeCount = {
                key: 'node-count',
                value: this.graph.getNodesCount()
            }

            const linkCount = {
                key: 'link-count',
                value: this.graph.getLinksCount()
            }

            return [
                nodeCount,
                linkCount
            ]
        },
    },
    methods: {
        async fetchActivity() {
            const activity = await this.$axios.$get('https://api.github.com/events')
            this.activity = activity
        },

    }
}
</script> -->
<style >
.display > svg {
    height: 100%;
    width: 100%
}
</style>
