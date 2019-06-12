import React from 'react';
//import './App.css';

class Ad extends React.Component {
    render() {
        return(
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.message}</p>
                <span>{this.props.phone}</span>
                <button className="delete-btn" onClick={() => this.props.deleteHandler(this.props.key)}>Delete Ad</button>
            </div>
        );
    }
}

export default Ad;