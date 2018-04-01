
import React from 'react';
import createReactClass from 'create-react-class';
import './Game.css';


let Game = createReactClass({


    getInitialState: function () {
        return {
            entries: [
                {
                    name: "RVS",
                    score: 4
                },
                {
                    name: "ABC",
                    score: 1
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

        var dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var name = (
            dict[ Math.floor( Math.random() * dict.length ) ]
            + dict[ Math.floor( Math.random() * dict.length ) ]
            + dict[ Math.floor( Math.random() * dict.length ) ]
        );
        var newEntry = this.buildEntry( name );

        this.setState({
            entries: [ ...this.state.entries , newEntry ]
        });
    },


    /**
     * Removes the entry that matches with the same name.
     *
     * @param name {string}
     */
    removeEntry: function ( name ) {
        var entries = this.state.entries.filter(
            item => ( item.name !== name )
        );

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
        this._alterEntryScore( name, -1 );
    },


    /**
     * Increases the score of the entry that matches the same name.
     *
     * @param name {string}
     */
    increaseEntryScore: function ( name ) {
        this._alterEntryScore( name, +1 );
    },


    /**
     * Internal method that changes an entry score by a given value.
     *
     * @param name {string}
     * @param value {integer}
     */
    _alterEntryScore: function ( name, value ) {
        var entries = this.state.entries.map(
            item => ({
                ...item,
                ...(
                    item.name === name
                    ? { score: Math.max( item.score + value, 0 ) }
                    : {}
                )
            })
        );

        this.setState({
            entries: entries
        });
    },


    /**
     * Render the entire layout of the game.
     */
    render: function () {
        console.log("Global: ", isNaN(true));


        // Calculate the total score.
        var totalScore = 0;
        for ( let entry of this.state.entries ) {
            totalScore += entry.score;
        }


        // Calculate the highest score.
        var highestScore = 0;
        for ( let entry of this.state.entries ) {
            if ( entry.score > highestScore ) {
                highestScore = entry.score;
            }
        }


        // Build all the components for the entries.
        var entryComponents = [];
        for ( let entry of this.state.entries ) {


            // Calculate the ratio with respect to the total point score.
            var ratio = entry.score / totalScore;
            var prettyRatio = (
                ! isNaN( ratio )
                ? String( Math.floor( ratio * 100 ) ) + "%"
                : " - "
            );


            // Construct all the score bar components
            var barComponents = [];
            for ( var i = 0; i < entry.score; ++i ) {
                var redColor = 180 - Math.floor( (i+1) / highestScore * 150 );
                var greenColor = 30 + Math.floor( (i+1) / highestScore * 150 );
                var style = {
                    backgroundColor: 'rgb(' + redColor + ',' + greenColor + ',30)'
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
