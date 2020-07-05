import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import qs from 'qs';
import config from '../config';

function OAuth(client_id, cb) {
 Linking.addEventListener('url', handleUrl);
 function handleUrl(event) {
  console.log(event.url);
  Linking.removeEventListener('url', handleUrl);
  const [, query_string] = event.url.match(/\#(.*)/);
  console.log(query_string);
  const query = qs.parse(query_string);
  console.log(`query: ${JSON.stringify(query)}`);
  cb(query.access_token);
}
const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
 client_id,
 response_type: 'token',
 scope: 'heartrate activity activity profile sleep',
 redirect_uri: 'fitbit://fit',
 expires_in: '31536000',
})}`;
console.log(oauthurl);
Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
}


function getData(access_token) {
fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2017-06-27.json', {
method: 'GET',
headers: {
 Authorization: `Bearer ${access_token}`,
},
body: `root=auto&path=${Math.random()}`
})
.then(res => res.json())
.then(res => {
console.log(`res: ${JSON.stringify(res)}`);
})
.catch(err => {
  console.error('Error: ', err);
});
}
export default class App extends Component {
  
  componentDidMount() {
      OAuth(config.client_id, getData);
  }
 
  onSubmit = () => {
    this.props.navigation.navigate('FitBit', {
      });
  }

 render() {
  return (
  <View style={styles.container}>
    <Text style={styles.welcome}>
     Welcome to Fitbit Integration
    </Text>
    <View>
      <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
        <Text style={{ fontSize: 20, color:'white' }}>Click here to browse your data</Text>
      </TouchableOpacity>
    </View>
  </View> 
  );
 }
}


const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#00a8b5',
},
welcome: {
 fontSize: 25,
 textAlign: 'center',
 color: '#fff',
 margin: 10,
},
});

