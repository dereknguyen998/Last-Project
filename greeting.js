import React from 'react';

// Create a class
// Memorize this part
export default class Greetings extends React.Component{
    constructor(props) {
        super(props);
    }

    showGreeting(){
        if(this.props.greetingsContainerState){
            return (<span>{this.props.author.firstName} {this.props.author.lastName} </span>)
        }
    }

    render() {
        return (
            <div>
                <span>{this.showGreeting()}</span>
                {
                    <button onClick={this.props.toggleHandler}>Who is the author?</button>
                }
            </div>
        )
    }
}