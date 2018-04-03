import React from 'react';

export class TextNode extends React.Component {
    render() {
        return (
            <span 
                id={ this.props.id }
                className={ this.props.className }
                onMouseOver={ () => this.props.onMouseOver() }
                onMouseOut={ () => this.props.onMouseOut() }>
                { this.props.text }
            </span>
        );
    }
}