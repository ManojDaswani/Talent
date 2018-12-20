/*Common button*/
import React from 'react';

export class Button extends React.Component {
    render() {
        return (
            <div className="two wide column">
                <button
                    className="ui button"
                    type="button"
                    onClick={this.props.onClick}
                    style={{ display: this.props.display }}
                >
                    {this.props.nameTag}
                </button>
            </div>
        )
    }
}