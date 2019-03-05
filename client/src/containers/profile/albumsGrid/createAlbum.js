// React
import React, { Component } from 'react';

export default function CreateAlbum(props) {
	return (
		<div>
			<button type="button" onClick={props.create} className="add-album-btn btn">+</button>
		</div>
	)
}