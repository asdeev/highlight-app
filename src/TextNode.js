import React from 'react';

export class TextNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            prevNeighbors: [],
            nextNeighbors: []
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    hasPrev(node, neighborNodes) {
        if (node.prev && this.props.nodes[node.prev].priority.includes(this.props.className)) {
            document.getElementById(node.prev).setAttribute('class', `${this.props.className}-hover`);
            neighborNodes.push(node.prev);
            this.hasPrev(this.props.nodes[node.prev], neighborNodes);
        }
        return neighborNodes;
    }

    hasNext(node, neighborNodes) {
        if (node.next && this.props.nodes[node.next].priority.includes(this.props.className)) {
            document.getElementById(node.next).setAttribute('class', `${this.props.className}-hover`);
            neighborNodes.push(node.next);
            this.hasNext(this.props.nodes[node.next], neighborNodes);
        }
        return neighborNodes;
    }

    handleMouseOver(e) {
        if (this.props.node) {
            let prevNeighbors = [];
            let nextNeighbors = [];
    
            this.nodeId.setAttribute('class', `${this.props.className}-hover`);
    
            prevNeighbors = this.hasPrev(this.props.node, prevNeighbors);
            this.setState({ prevNeighbors: prevNeighbors });
    
            nextNeighbors = this.hasNext(this.props.node, nextNeighbors);
            this.setState({ nextNeighbors: nextNeighbors });
        }
    }

    handleMouseOut(e) {
        if (this.props.node) {
            this.nodeId.setAttribute('class', this.props.className);
            for (let i in this.state.prevNeighbors) {
                let node = this.state.prevNeighbors[i];
                document.getElementById(node).setAttribute('class', this.props.nodes[node].priority[0]);
            }
    
            for (let i in this.state.nextNeighbors) {
                let node = this.state.nextNeighbors[i];
                document.getElementById(node).setAttribute('class', this.props.nodes[node].priority[0]);
            }
        }
    }

    render() {
        return (
            <span 
                id={ this.props.id }
                className={ this.props.className }
                onMouseOver={ this.handleMouseOver }
                onMouseOut={ this.handleMouseOut }
                ref = {
                    nodeId => { 
                        this.nodeId = nodeId;
                    }
                }
                node = { this.props.node }
                nodes = { this.props.nodes } >
                { this.props.text }
            </span>
        );
    }
}