// React
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Third Party
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Static
import albumImg from 'static/images/album.png';
// Requests
import { instaAPI } from 'src/utils/axios';
// Configs
import { apiConfig } from 'configs/config';
// Individual album modules
import AlbumTile from './albumTile';
import CreateAlbum from './createAlbum';

const mySwal = withReactContent(swal);

export default class Albums extends Component {
	constructor(props) {
		super(props);

		this.state = {
            token: localStorage.getItem('access_token'),
            albums: null
		}

		this.getAlbums = this.getAlbums.bind(this);
		this.createAlbum = this.createAlbum.bind(this);
	}

	componentDidMount() {
		this.getAlbums();
	}

	getAlbums() {
		const headers = { Authorization: `Bearer ${this.state.token}` };
		instaAPI.get(apiConfig.endpoints.get_albums_url.replace(':userId', this.props.userId), {headers}).then(albums => {
			// Filter out private albums if not users own profile
			if (!this.props.myProfile) {
				const filteredAlbums = albums.data.filter((album) => {
					return album.private == false;
				})
				this.setState({albums: filteredAlbums});
			} else {
				this.setState({albums: albums.data});
			}
		})
	}

	showAlbums() {
		if (this.state.albums) {
			const items = this.state.albums.map((album, key) => {
				return (
					<AlbumTile key={key} name={album.id} private={album.private} />
				)
			})
			return items;
		} else {
			return null;
		}
	}

	createAlbum() {
		const albumNames = this.state.albums.map(album => album.id);
		mySwal.fire({
			title: 'Create an album',
			input: 'text',
			inputValidator: (value) => {
				if (!value) {
					return 'Album name cannot be blank';
				} else if (value.includes(' ')) {
					return 'Album name cannot contain spaces';
				} else if (albumNames.includes(value)) {
					return 'Album name already exists';
				}
			},
			html: 
				`<select id="select-privacy" class="dropdown">
					<option value="private">Private</option>
					<option value="public">Public</option>
				</select>`,
		    onOpen: function(ele) {
		        $(ele).find('.dropdown').insertAfter($(ele).find('.swal2-input'));
		    }
		}).then(async data => {
			const privacy = $('#select-privacy').find(":selected").val();
			// Prevents the api calls from running if data is invalid
			if (!data.value) {
				return false;
			}
			const headers = { Authorization: `Bearer ${this.state.token}` };
			data = {
				name: data.value,
				privacy: privacy
			}
			instaAPI.post(apiConfig.endpoints.create_album_url.replace(':userId', this.props.userId), data, {headers}).then(() => {
				setTimeout(() => {
					this.getAlbums();
				}, 500);
			})
		})
	}

    render() {
    	const createAlbumBtn = this.props.myProfile ? <CreateAlbum create={this.createAlbum} /> : null
    	return (
    		<div>
				{createAlbumBtn}
				<div id="albums-grid">
					{this.showAlbums()}
	    		</div>
	    	</div>
    	)
    }
}