/* Nationality section */
import React, { Component } from 'react';



export default class Nationality extends React.Component {
    
    render() {
        return (
            <div className="row">
                <label>Nationality</label>
                <div className="ui container">
                    <select name="nationality" id="nationality-select" className="ui selection dropdown">
                        <option value="selectyournationality">Select your nationality</option>
                        <option value="australia">Australia</option>
                        <option value="british">British</option>
                        <option value="India">India</option>
                    </select>
                </div>

            </div>

        )
    }
}

