// React
import React, { Component } from 'react';
// Static
import uploadBtn from 'static/images/upload.png';
// Third Party
import * as FilePond from 'filepond';

export const Upload = () => {

	return (
		<div id="uploadBtn">
        	<img src={ uploadBtn } />
			<input type="file" />
			<script>
			const inputElement = document.querySelector('input[type="file"]');
			const pond = FilePond.create( inputElement );
			</script>
		</div>
	)
}