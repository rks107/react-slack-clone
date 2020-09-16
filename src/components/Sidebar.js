import React, { Component } from 'react';
import { signOut, firestore, auth} from '../firebase';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  state = {
    showGroupForm: false,
    groupName: '',
    groupDescription: '',
  };

  handleAddGroup = () => {
    this.setState({
      showGroupForm: true,
    });
  };

  handleGroupNameChange = (e) => {
    this.setState({
      groupName: e.target.value,
    });
  };
  handleGroupDescriptionChange = (e) => {
    this.setState({
      groupDescription: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.groupName,
      description: this.state.groupDescription,
      created_by: auth.currentUser.uid,
      members: [auth.currentUser.uid],
    };

    firestore
      .collection('channels')
      .add(data)
      .then((data) => {
        this.setState({
          showGroupForm: false,
          groupDescription: '',
          groupName: '',
        });
      });
  };

  // If User Decide not to create group
  handleCancelCreateGroup = (e) => {
    e.preventDefault();
    this.setState({
      showGroupForm: false
    });
  }
  render() {
    console.log('AUTH', auth.currentUser);
    const { channels } = this.props;
    const userName = auth.currentUser.displayName;
    const photoURL = auth.currentUser.photoURL;

    if (this.state.showGroupForm) {
      return (
        <div className="group-form">
          <form onSubmit={this.handleSubmit}>
            <div className="icon">
              <img
                src="https://www.pngfind.com/pngs/m/588-5881278_lets-connect-logo-png-download-lets-connect-transparent.png"
                alt="IconImage"
              />
            </div>
            <h1> Create Group </h1>
            <input
              type="text"
              placeholder="Enter Group Name"
              onChange={this.handleGroupNameChange}
            />
            <input
              type="text"
              placeholder="Enter Group Description"
              onChange={this.handleGroupDescriptionChange}
            />
            <button type="submit">Submit</button>
            <button onClick={this.handleCancelCreateGroup}>Cancel</button>
          </form>
        </div>
      );
    }
    return (
      <div id="sidebar">
        <div className="user-profile">
          <div className="avatar">
            <img 
              style={{borderRadius:'40%'}}
              src={photoURL} 
              alt="profilePhoto" 
            />
          </div>
          <div>{userName}</div>
          <div
            style={{ marginLeft: 10, marginTop: 2, cursor: 'pointer' }}
            onClick={signOut}
          >
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2150/2150480.svg"
              height="25"
              alt="SignOutButton"
            />
          </div>
        </div>
        <hr className="sidebar-spacer" />

        <div className="channels">
          <div className="channels-group">
            <div className="header">Channels</div>
            <div
              style={{ marginLeft: 10, marginTop: 10, cursor: 'pointer' }}
              onClick={this.handleAddGroup}
            >
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/660/660540.svg"
                height="25"
                alt="CreatGroupIcon"
              />
            </div>
          </div>

          <ul className="channels-list">
            {channels.map((channel) => (
              <li key={channel.id}>
                <Link className="temp" to={`/?id=${channel.id}`}># {channel.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
