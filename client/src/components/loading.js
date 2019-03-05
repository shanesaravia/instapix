// React
import React, { Component } from 'react';
// Static
import loading from 'static/images/loading.gif';

export const Loading = () => {
	return (
		<div>
        	<img src={ loading } style={{ width:'300px',display:'block',margin:'200px auto' }} />
		</div>
	)
}