/* Skill section */
import React from 'react';

export default class Skill extends React.Component {
    render() {
        return (
            <div className="row">
          
                <label>Skill section</label>
                <div className="ui container">
                    <select name="skill" id="skill-select" className="ui selection dropdown">
                        <option value="selectyourskills">Select your skills</option>
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>
        )
    }
};