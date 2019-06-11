import React from 'react';
//import './App.css';

class Ad extends React.Component {
    render() {
        return(
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.message}</p>
                <span>{this.props.phone}</span>
            </div>
        );
    }
}

export default Ad;