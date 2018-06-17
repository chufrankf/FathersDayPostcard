import React, { Component } from 'react';
import './Eraser.css';

class Eraser extends Component{
    
    constructor(props) {
        super(props);

        //Initialize State
        this.state = {
            pos: this.props.initialPos,
            dragging: false,
            rel: null
        }

        //Event Binders
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    //Allows object to follow mouse, since mouse movement may be too fast for the object
    componentDidUpdate(props, state){
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this._onMouseMove)
          document.addEventListener('mouseup', this._onMouseUp)
        } 
        else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this._onMouseMove)
          document.removeEventListener('mouseup', this._onMouseUp)
        }

    }

    _onMouseDown(e) {
        this.setState({
            dragging: true,
            rel: {
                x: e.pageX - this.state.pos.x,
                y: e.pageY - this.state.pos.y
            }
        });
        e.stopPropagation();
        e.preventDefault();
    }

    _onMouseMove(e) {
        if(!this.state.dragging) return
        
        this.setState({
            pos: {
                x: e.pageX - this.state.rel.x, 
                y: e.pageY - this.state.rel.y}
        });

        this.props.onMouseMoveCallback(e.pageX, e.pageY, (this.refs.eraser.offsetWidth / 1.5) );
        
        e.stopPropagation();
        e.preventDefault();
    }
    
    _onMouseUp(e) {
        this.setState({dragging: false});
        e.stopPropagation();
        e.preventDefault();
    }

    render(){
        return (
            <div 
                className="eraser"
                ref="eraser"
                onMouseDown={this._onMouseDown}
                onMouseUp={this._onMouseUp}
                onMouseMove={this._onMouseMove}
                style={{
                    position:'absolute',
                    left: this.state.pos.x,
                    top: this.state.pos.y,
                    zIndex: this.props.zIndex
                }}>
            </div>
        );
    }
}

Eraser.defaultProps = {
    initialPos: {x: 120, y: 100},
    zIndex: 1000
}

export default Eraser;