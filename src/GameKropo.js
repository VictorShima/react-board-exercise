
import React from 'react';
import createReactClass from 'create-react-class';
import './Game.css';


let Game = createReactClass({


    getInitialState: function () {
        return {
            entries: [
                {
                    name: "KRP",
                    score: 4
                }
            ]
        };
    },


    /**
     * @definition entry
     *   - name {string}
     *   - score {integer}
     */
    buildEntry: function ( name ) {
        return {
            name: name,
            score: 0
        };
    },


    /**
     * Adds a new entry to the scoreboard with a random name and zero points.
     */
    addEntry: function () {
        var entries = [ ...this.state.entries ];

        this.setState({
            entries: entries
        });
    },


    /**
     * Removes the entry that matches with the same name.
     *
     * @param name {string}
     */
    removeEntry: function ( name ) {
        var entries = [ ...this.state.entries ];

        this.setState({
            entries: entries
        });
    },


    /**
     * Decreases the score of the entry that matches the same name.
     *
     * @param name {string}
     */
    decreaseEntryScore: function ( name ) {
        var entries = [ ...this.state.entries ];

        this.setState({
            entries: entries
        });
    },


    /**
     * Increases the score of the entry that matches the same name.
     *
     * @param name {string}
     */
    increaseEntryScore: function ( name ) {
        var entries = [ ...this.state.entries ];

        this.setState({
            entries: entries
        });
    },


    /**
     * Render the entire layout of the game.
     */
    render: function () {
        console.log("State: ", this.state);


        // Calculate the total score.
        var totalScore = "?";


        // Build all the components for the entries.
        var entryComponents = [];
        for ( let entry of this.state.entries ) {


            // Calculate the ratio with respect to the total point score.
            var ratio = 0;
            var prettyRatio = ( ratio === 0 ? " - " : 0 );


            // Construct all the score bar components
            var barComponents = [];
            for ( var i = 0; i < entry.score; ++i ) {
                var style = {
                    backgroundColor: 'rgb(70,70,70)'
                };
                var curBarComponent = (
                    <div key={i} className="entry-bar" style={style}></div>
                );
                barComponents.push( curBarComponent );
            }


            // Construct each entry row component.
            var curEntryComponent = (
                <div key={entry.name} className="entry">
                    <button onClick={() => this.removeEntry(entry.name)}>rm</button>
                    <span className="entry-name">{entry.name}</span>
                    <button onClick={() => this.decreaseEntryScore(entry.name)}>dec</button>
                    <button onClick={() => this.increaseEntryScore(entry.name)}>inc</button>
                    <div className="entry-bar-container">
                        {barComponents}
                    </div>
                    <span className="entry-score">{entry.score}</span>
                    <span className="entry-ratio">({prettyRatio})</span>
                </div>
            );
            entryComponents.push( curEntryComponent );
        }



        return (
            <div className="game">
                <div className="entry-container">
                    {entryComponents}
                </div>
                <div className="entry-footer">
                    <button onClick={() => this.addEntry()}>add</button>
                    <span className="entry-total">Total: {totalScore}</span>
                </div>
            </div>
        );
    }


});


export default Game;
