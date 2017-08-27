import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

const url = "http://localhost:3001/api/";

class Place extends Component {
	constructor(props) {
		super(props);

		this.handleTakePlace = this.handleTakePlace.bind(this);
	}

	handleTakePlace(event) {
		axios.post(url + "place", {
			place: this.props.id,
			id: this.props["data-queue-id"],
			name: localStorage.getItem("name"),
			photo: localStorage.getItem("photo")
		}).then(response => {
			console.log(response);
		});
	}

	render() {
		if(this.props.info) {
			return (
				<div className="place" data-id={this.props.id}>
					<img src={this.props.info.photo} alt="" />
				</div>
			);
		} else {
			return <div className="place free" data-id={this.props.id} onClick={this.handleTakePlace}></div>;
		}
	}
}

export default connect(
	(state, ownProps) => ({
		info: state.queues[ownProps["data-queue-id"]].places[ownProps.id]
	}),
	dispatch => ({})
)(Place);