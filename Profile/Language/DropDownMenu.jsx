/*Drop-down menu for Table Element*/
import React from 'react';

export class DropDownMenu extends React.Component {
    render() {
        return (
            <div className="four wide column" onChange={this.props.controlFunc} style={{ display: this.props.display }}>
                <select value={this.props.selected}>
                    <option value="Basic">Basic</option>
                    <option value="conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native/Bilingual">Native/Bilingual</option>
                </select>
            </div>
        )
    }
}