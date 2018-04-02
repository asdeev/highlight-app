import React from 'react';
import { TextNode } from './TextNode';
import { PhraseList } from './PhraseList';

export class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            textNodes: {},
            outputWords: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let words = this.props.value;
        words = words.split(' ');
        this.setState({ words: words }, () => {
            this.processInput();
        });
    }

    processInput() {
        let textNodes = {};
        for (let list in PhraseList) {
            for (let phrase of PhraseList[list]) {
                phrase = phrase.split(' ');
                let node = this.findMatch(list, phrase, textNodes);
                if (node !== null) {
                    Object.assign(textNodes, node);
                }
            }
        }
        this.setState({ textNodes: textNodes }, () => {
            this.renderNodes();
        });
    }

    findMatch(list, phrase, textNodes) {
        let words = this.state.words;
        let tempNodes = {};
        for (let i = 0; i < words.length - phrase.length + 1; i++) {
            let tempWords = [];
            let node = words.slice(i, i + phrase.length);
            let diff = node.filter(x => {
                tempWords.push(x);
                return phrase.indexOf(x.toLowerCase().replace(/[,.!?]/g, '')) < 0;
            });
            if (diff.length < 1) {
                let wordIndex = i;
                let textNode;
                for (let j = 0; j < phrase.length; j++) {
                    textNode = {
                        priority: [list],
                        text: tempWords[j],
                        prev: null,
                        next: null
                    }
                    if (textNodes.hasOwnProperty(wordIndex) && !textNodes[wordIndex].priority.includes(list)) {
                        textNode = textNodes[wordIndex];
                        textNode.priority.push(list);
                    }
                    textNode['prev'] = (j - 1 > -1) ? (wordIndex - 1) : textNode.prev;
                    textNode['next'] = (j + 1 < phrase.length) ? (wordIndex + 1) : textNode.next;
                    tempNodes[wordIndex] = textNode;
                    wordIndex++;
                }
            }
        }
        return tempNodes;
    }

    renderNodes() {
        let words = this.state.words;
        let outputWords = [];
        for (let i in words) {
            let textNode;
            if (this.state.textNodes.hasOwnProperty(i)) {
                let node = this.state.textNodes[i];
                textNode = <TextNode id={ i } key={ i } className={ node.priority[0] } node={ node } nodes={ this.state.textNodes } text={ node.text } />;
            } else {
                textNode = <TextNode id={ i } key={ i }  text={ words[i] } />;
            }
            outputWords.push(textNode);
        }
        this.setState({ outputWords: outputWords });
    }

    render() {
        return (
            <div>
                <button onClick={ this.handleClick }>Process Input</button>
                <div className="container">
                    { this.state.outputWords }
                </div>
            </div>
        );
    }
}