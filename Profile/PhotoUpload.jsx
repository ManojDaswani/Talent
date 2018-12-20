/* Photo upload section */
import React, { Component } from 'react';
export default class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        //initialize functions
        this.getPhoto = this.getPhoto.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        //set default state
        this.state = {
            fileName: undefined,
            file: undefined,
            value: '',
        }
    };
    getPhoto() {

        let self = this;

        $.ajax({
            url: '/Home/GetProfilePhoto',
            type: 'GET',
            dataType: 'json',
            crossDomain: 'true',
            success: function (data) {
                console.log("GET");
                console.log(data);
                if (data.photoFileName != null) {
                    self.setState({
                        fileName: data.photoFileName
                    })
                    $('#photoIcon').attr('style', 'display:none');
                    let url = "/images/" + self.state.fileName;
                    $('#displayPhoto').attr('src', url);
                }
                else {

                }
            },
            error: function (data) {
                alert('error');
            }
        })
    }
    handlePhoto(event) {
        let file = event.target.files[0];
        let value = event.target.value;
        this.setState(
            {
                fileName: file.name,
                value: value,
                file: file,
            }, // dictionnary
            () => {
                this.uploadPhoto()
            },
        );

    }
    uploadPhoto() {
        var formData = new FormData();
        formData.append('file', this.state.file);
        var self = this;
        $.ajax({
            url: '/Home/UpdateProfilePhoto',
            type: 'POST',
            dataType: 'json',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            data: formData,
            success: function (data) {
                console.log("POST");
                console.log(data);
                if (data) {
                    self.setState({
                        fileName: data.newProfilePhotoName
                    })
                    self.getPhoto();
                }
                else {
                    alert('error');
                }
            }
        })
    };
    componentDidMount() {
        this.getPhoto();
    };
    render() {
        return (
            <div className="row">
                <div className="four wide column">
                    <h3>Profile Photo</h3>
                    <div className="tooltip">Upload samples of your work here</div>
                </div>
                <div className="twelve wide column">
                    <section>
                        <label className="work-sample-photo" htmlFor="file-input">
                            <i className="huge circular camera retro icon" id="photoIcon"></i>
                            <img className="ui medium circular image" id="displayPhoto" />
                            <input id="file-input" type="file" onChange={this.handlePhoto} style={{ display: 'none' }} />
                        </label>
                    </section>
                </div>
            </div>
        )
    }

}