import React, {Component} from 'react';
import './Canvas.css';
import Eraser from './Eraser';

class Canvas extends Component {

    componentDidMount() {
        var canvas = this.refs.canvas;
        var ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        const postcard = this.refs.postcard
        postcard.onload = () => {
            ctx.drawImage(postcard, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        }
    }

    onMouseMoveCallback = (x, y, radius) => {
        var canvas = this.refs.canvas;
        var ctx = canvas.getContext("2d");

        //Eraser circle
        ctx.beginPath();
        ctx.globalCompositeOperation="destination-out";
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.arc(x,y,radius,0,Math.PI*2,false);
        ctx.fill();
    }
    
    render(){
        return (
            <div>
                <canvas ref="canvas" className="full-image gradient-border" 
                    style={{ zIndex: this.props.zIndex}}> </canvas>
                <img className="background-img" src='/img/fathers-day-letter.png' alt='fathers-day-letter.png'/>
                <img ref="postcard" src='/img/fathers-day.png' style={{display:'none'}} alt='fathers-day.png'/>
                <Eraser onMouseMoveCallback={this.onMouseMoveCallback}/>
            </div>
        );
    }
}

//

Canvas.defaultProps = {
    zIndex: 0
}

export default Canvas;