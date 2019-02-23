// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Static
import albumImg from '../../../../static/images/album.png';
import privateImg from '../../../../static/images/private.png';

export default function AlbumTile(props) {
	return (
		<div id='album-tile'>
			<Link to='/test'>
				<div id='album-img-group'>
					<img src={ albumImg } className='album-img' />
					{/* Private image icon only if album is private*/}
					{ props.private ? <img src={ privateImg } className='priv-img' /> : null}
				</div>
			</Link>
			<h3>{ props.name }</h3>
		</div>
	)
}