/* Language section */
import React from 'react';
import { InputBox } from './Language/InputBox.jsx';
import { DropDownMenu } from './Language/DropDownMenu.jsx';
import { Button } from './Language/Button.jsx';
import { TableElement } from './Language/TableElement.jsx';

export default class Language extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            languageList: [], //example: 0: {personLanguageId: 3257, language: "English", languageLevel: "fluent"}
            tempLanguage: '',
            tempLevel: 'basic',
            languageBarDisplay: 'block'
        };
        this.addLanguage = this.addLanguage.bind(this);
        this.displayLanguageBarNone = this.displayLanguageBarNone.bind(this);
        this.displayLanguageBar = this.displayLanguageBar.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    componentDidMount() {
        this.getLanguages();
    }

    getLanguages() {
        self = this;
        $.ajax({
            url: '/Home/GetLanguages',
            type: 'GET',
            success: function (result) {
                self.setState({
                    languageList: result
                });
                //console.log(result);
            }
        });
    }

    addLanguage() {
        console.log(this.state.tempLanguage);
        console.log(this.state.tempLevel);
        var data = {
            Name: this.state.tempLanguage,
            Level: this.state.tempLevel
        };
        $.ajax({
            url: "/Home/AddLanguage",
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                window.location.reload();
            }
        });
    }

    handleLanguageChange(event) {
        console.log("wahaha something new");
        this.setState({
            tempLanguage: event.target.value
        });
        console.log(event.target.value);
    }

    handleLevelChange(event) {
        console.log("Level change!!");
        this.setState({
            tempLevel: event.target.value
        });
        console.log(event.target.value);
    }

    displayLanguageBarNone(event) {
        this.setState({ languageBarDisplay: 'none' });
    }

    displayLanguageBar(event) {
        this.setState({ languageBarDisplay: 'block' });
    }


    render() {
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Language section</h3>
                    <p>How many languages do you speak?</p>
                </div>
                <div className="twelve wide column">
                    <div className="form-wrapper">
                        <div className="ui grid">
                            <div className="row" style={{ display: this.state.languageBarDisplay }}>
                                <InputBox handleInput={this.handleLanguageChange} />
                                <DropDownMenu handleInput={this.handleLevelChange} />
                                <Button nameTag="Add" onClick={this.addLanguage} display="block" />
                                <Button nameTag="Cancel" onClick={this.displayLanguageBarNone} display="block" />
                            </div>
                            <div className="row">
                                <div className="sixteen wide column">
                                    <table className="ui table">
                                        <thead>
                                            <tr>
                                                <th className="four wide">Language</th>
                                                <th className="four wide">Level</th>
                                                <th className="two wide" />
                                                <th className="two wide" />
                                                <th className="one wide" />
                                                <th className="three wide"><Button nameTag="+Add New" onClick={this.displayLanguageBar} display="block" /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.languageList.map(list => <TableElement item={list} />)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}