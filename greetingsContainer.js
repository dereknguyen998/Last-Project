import React from 'react';
import Greetings from "./greeting.js";
import axios from 'axios';

export default class GreetingsContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            greetingsContainerState: false,
            authors: [
                {firstName: "Derek", lastName: "Nguyen"},
                {firstName: "Anthony", lastName: "Tran"},
                {firstName: "Adan", lastName: "Hoang"}
            ]
        }
        this.toggleGreetingState = this.toggleGreetingState.bind(this)
    }

    /*
async componentDidMount(){
    await this.loadAuthorsFromRESTAPI();
}


async loadAuthorsFromRESTAPI() {
    const authorsResponse = await axios.get('http://localhost:9000/user');
    const authors = authorsResponse.data;

    authors.forEach(author =>{
        this.setState({
            authors: this.state.authors.concat(
                {firstName: author.firstName, lastName: author.lastName})
        })
    })
}
*/

    toggleGreetingState(){
        this.setState({greetingsContainerState:!this.state.greetingsContainerState});
    }

    // Remember this line this is weird
    render(){
        return(
            <div>
                <Greetings author = {this.state.authors[0]}
                           toggleHandler = {this.toggleGreetingState}
                           greetingsContainerState = {this.state.greetingsContainerState}/>
                <Greetings author = {this.state.authors[1]}
                           toggleHandler = {this.toggleGreetingState}
                           greetingsContainerState = {this.state.greetingsContainerState}/>
                <Greetings author = {this.state.authors[2]}
                           toggleHandler = {this.toggleGreetingState}
                           greetingsContainerState = {this.state.greetingsContainerState}/>
            </div>
        )
    }
}