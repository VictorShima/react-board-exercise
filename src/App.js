
/* eslint no-loop-func:"off" */


import React from 'react';
import createReactClass from 'create-react-class';
import './App.css';


var App = createReactClass({


    getInitialState: function () {
        return {
            selectedGame: 'complete'
        };
    },


    games: {
        minimal: require('./GameMinimal.js').default,
        kropo: require('./GameKropo.js').default,
        complete: require('./GameComplete.js').default,
    },


    changeGame: function ( name ) {
        this.setState({
            selectedGame: name
        });
    },


    render: function () {

        // construct the links for each version
        var links = [];
        for ( let name in this.games ) {
            var newLink = (
                <span
                key={name}
                href="#"
                onClick={() => this.changeGame(name)}
                className={this.state.selectedGame === name ? 'app-game app-selected' : 'app-game'}
                >
                    {name}
                </span>
            );
            links.push( newLink );
        }

        // select the correct component by following the currently selected version
        var Game = this.games[ this.state.selectedGame ];

        return (
            <div className="app">
                <div className="app-header">
                    <h1 className="app-title">board</h1>
                    <p className="app-intro">
                        scoreboard to track the points of virtual entities
                    </p>
                    <p className="app-build">
                        {links}
                    </p>
                </div>
                <div className="app-window">
                    <Game />
                </div>
            </div>
        );
    }

});


export default App;
