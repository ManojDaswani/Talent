/*Language input box*/
import React from 'react';

export class InputBox extends React.Component {
    render() {
        return (
            <div className="five wide column">
                <input
                    type="text"
                    placeholder="Add language"
                    //name={props.name}
                    //value={props.language}
                    onChange={this.props.handleInput}
                />
            </div>
        )
    }
}
