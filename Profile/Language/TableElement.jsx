/*Table element -> a single row with three <td>*/
import React from 'react';
import { Button } from './Button.jsx';
import { DropDownMenu } from '../Language/DropDownMenu.jsx';
import { InputBox } from '../Language/InputBox.jsx';

export class TableElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editLanguage: this.props.item.language,
            editLanguageLevel: this.props.item.languageLevel,
            displayUpdateUI: 'none',
        };
        this.showUpdateUI = this.showUpdateUI.bind(this);
        this.hideUpdateUI = this.hideUpdateUI.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleLanguageLevelChange = this.handleLanguageLevelChange.bind(this);
    }

    update() {
        var self = this;
        var data = {
            Name: this.state.editLanguage,
            Level: this.state.editLanguageLevel,
            Id: this.props.item.personLanguageId
        };

        $.ajax({
            type: 'POST',
            url: '/Home/UpdateLanguage',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                self.setState({ displayUpdateUI: 'none' });
            }
        });
    }

    delete(Id) {
        $.ajax({
            type: 'post',
            url: '/Home/DeleteLanguage/' + Id,
            success: function (result) {
                if (result.success === true) {
                    window.location.reload();
                }
            }
        });
    }

    showUpdateUI(event) {
        this.setState({ displayUpdateUI: 'block' });
    }

    hideUpdateUI(event) {
        this.setState({ displayUpdateUI: 'none' });
    }

    handleLanguageChange(event) {
        console.log(event.target.value);
        this.setState({
            editLanguage: event.target.value
        })
    }

    handleLanguageLevelChange(event) {
        console.log(event.target.value);
        this.setState({
            editLanguageLevel: event.target.value
        });
    }

    render() {
   
        const { language, languageLevel, personLanguageId } = this.props.item;
        console.log(this.state.editLanguage);
        return (

            <tr key={personLanguageId}>

                <td>
                    <div style={{ display: (this.state.displayUpdateUI === 'none') ? 'block' : 'none' }}>
                        {this.state.editLanguage}
                    </div>
                    {
                        this.state.displayUpdateUI === 'block' ?
                            <div className="ui input" display={this.state.displayUpdateUI} onChange={this.handleLanguageChange} >
                                <input type="text" placeholder={this.state.editLanguage} />
                            </div> : null
                    }
                  
                </td>

                <td>
                    <div style={{ display: (this.state.displayUpdateUI === 'none') ? 'block' : 'none' }}>
                        {this.state.editLanguageLevel}
                    </div>
                    <DropDownMenu value={this.state.editLanguageLevel} display={this.state.displayUpdateUI} controlFunc={this.handleLanguageLevelChange} />
                </td>

                <td><Button nameTag="Update" onClick={this.update} display={this.state.displayUpdateUI} /></td>

                <td><Button nameTag="Cancel" onClick={this.hideUpdateUI} display={this.state.displayUpdateUI} /></td>

                <td />

                <td>
                    <i className="large close icon" onClick={() => this.delete(personLanguageId)} />
                    <i className="large pencil alternate icon" onClick={this.showUpdateUI} />
                </td>
            </tr>

        );
    }
}