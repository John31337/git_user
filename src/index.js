import React from 'react';
import ReactDOM from 'react-dom';

class GitHubSearch extends React.Component {

    constructor(props){
        super(props);
        this.textInput = null;

        this.setTextInputRef = element => {
            this.textInput = element;
        }

        this.state = {
            username: ''
        };
    }

    getUser() {
        alert(this.textInput.value);
        return fetch('https://api.github.com/users/' + this.textInput.value)
            .then(response => response.json())
            .then(response => {
                return response;
            })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let user = await this.getUser();
        this.setState({
            username: user.login,
            id: user.id,
            url: user.url,
            avatar_url: user.avatar_url,
        });
    }

    render() {
        let user;
        if(this.state.username) {
            user =
                <div>
                    <p>{this.state.username}
                        <br/>
                        {this.state.id}
                        <br/>
                    </p>
                    <img src={this.state.avatar_url}/>
                </div>
        }

        return (
            <div>
                <header>
                    <h1>Github User Search </h1>
                </header>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input ref={this.setTextInputRef} type='text' placeholder='username' />
                    <input type="submit" placeholder="Send"/>
                </form>
                <p>
                    {user}
                </p>
            </div>
        );
    }
}

ReactDOM.render(<GitHubSearch/>, document.getElementById('root'));