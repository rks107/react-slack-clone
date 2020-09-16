import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar, MainContainer } from './';
import { auth, firestore } from '../firebase';
// import URLSearchParams from 'url-search-params';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Slack(props) {
  const { history } = props;
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState({});
  const query = useQuery();
  let channelId = query.get('id');

  useEffect(() => {
    console.log('HOLA', auth.currentUser.uid);
    firestore
      .collection('channels')
      .where('members', 'array-contains', auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        // const channels = snapshot.docs;
        const channels = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        
        setChannels(channels);

        if (!channelId) {
            console.log("hdggdgd");
          history.push({
            pathname: '/',
            search: `?id=${channels[0].id}`,
          });
          setCurrentChannel(channels[0]);
        } else {
            //  console.log('########', channelId, '*****', channels[0].id);
          const filteredChannel = channels.filter((ch) => ch.id === channelId);
        //   console.log('************', filteredChannel[0]);
          setCurrentChannel(filteredChannel[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [channelId]);

  return (
    <div id="slack">
      <Sidebar channels={channels} />
      <MainContainer channel={currentChannel} />
    </div>
  );
}

export default Slack;
