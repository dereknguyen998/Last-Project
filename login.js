import React from 'react';
import axios from 'axios';
import Store from "./store.js";
const ScrollArea = require('react-scrollbar');

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            jwt : ' ',
            welcomemsg : ' ',
            query : '',
            showItemflag : false,
            showSearchflag : false,
            storeItems: []
        }
        this.loginEventHandler = this.loginEventHandler.bind(this);
        this.loginInputHandler = this.loginInputHandler.bind(this);
        this.loginPasswordHandler = this.loginPasswordHandler.bind(this);
        this.searchInputHandler = this.searchInputHandler.bind(this);
        this.showStore = this.showStore.bind(this);
        this.getStoreItem = this.getStoreItem.bind(this);
        this.showStoreItems = this.showStoreItems.bind(this);
        this.showStore = this.showStore.bind(this);
        this.search = this.search.bind(this);
    }

    async loginEventHandler() {
        const loginBody = {
            login: this.state.login,
            password: this.state.password
        }

        // If response is not found
        try {
            const response = await axios.post('http://localhost:9000/user/login', loginBody);
            if (response) {
                this.setState({jwt: 'Bearer ' + response.data.accessToken});
                this.setState({welcomemsg: "Welcome Back " + response.data.user.firstName + " " + response.data.user.lastName + "!"});
                alert(this.state.welcomemsg);
                await this.getStoreItem();
            }
        }catch(err){
            this.setState({jwt: "noJwt"});
            this.setState({welcomemsg: "Username or password is incorrect"});
            alert(err);
        }
    }

    // This is for the show Store Items
    async showStoreItems(){
        await this.setState({showItemflag:!this.state.showItemflag});
    }
    // This is for the show Store Items
    showStore(){
        if(this.state.showItemflag == true){
            return this.state.storeItems;
        }
    }


    // This is for the search button
    async search(){
        await this.getStoreItem();
        if(this.state.showSearchflag == false){
            this.setState({showSearchflag:!this.state.showSearchflag});
        }
    }


    // This is also for the search button
    showSearch(){
        if(this.state.showSearchflag == true){
            return this.state.storeItems;
        }
    }

    // This function is to wait for the data to load
    async loadDate(){

    }


    async getStoreItem(){
        // Testing
        try{
            // Testing the storeItem route using the token
            const newresponse = await axios.get('http://localhost:9000/StoreItem', {headers: {Authorization: this.state.jwt}}, {params: {query: this.state.query}});
            if(newresponse){
                let listArray = [];
                newresponse.data.forEach(item =>{
                    listArray.push(<li>{item.name}</li>);
                    listArray.push(<button>Add item</button>)
                })
                this.setState({storeItems:listArray})
            }
        }catch(err){
            alert(err);
        }
    }

    loginInputHandler(event){
        this.setState({login:event.target.value});
    }

    loginPasswordHandler(event){
        this.setState({password:event.target.value});
    }

    searchInputHandler(event){
        this.setState({query:event.target.value});
    }

/* <input placeholder={"Login"} onBlur = {this.loginInputHandler}></input>
                <input type="password"  placeholder="Password" onChange = {this.loginPasswordHandler}></input>
                <button onClick ={this.loginEventHandler}>Log in!</button>
*/
//               <ul>{this.showStore()}</ul>

    render() {
        return (
            <div>
                <input placeholder={"Login"} onBlur = {this.loginInputHandler}></input>
                <input type="password"  placeholder="Password" onChange = {this.loginPasswordHandler}></input>
                <button onClick ={this.loginEventHandler}>Log in!</button>
                <button onClick = {this.showStoreItems}>Show Store's Items</button>
                <ul id = "myDIV">{this.showStore()}</ul>
                <input placeholder={"What are you searching for"} onBlur = {this.searchInputHandler}></input>
                <button onClick ={this.search}>Search</button>
                <ul id = "myDIV2">{this.showSearch()}</ul>
            </div>
        );
    }
}
export default Login