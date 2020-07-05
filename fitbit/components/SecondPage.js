import React from 'react';
import {
  Text,
  Alert,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import CsvDownload from 'react-json-to-csv';
import config from '../config'

// import RNFetchBlob from 'react-native-fetch-blob';
// import FileSaver from 'file-saver';
// var RNFS = require('react-native-fs');

class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    const navigation = this.props.navigation.state.params;
    this.state = {
      startTime: navigation.startTime,
      endTime: navigation.endTime,
      startDate: navigation.startDate,
      endDate: navigation.endDate,
      detailLevel: navigation.detailLevel,
    };
    console.log(navigation.endDate);
  }

  onheart = async () => {
    console.log('https://api.fitbit.com/1/user/-/activities/distance/date/'+this.state.startDate+'/'+this.state.endDate+'/'+this.state.detailLevel+'min/time/'+this.state.startTime+'/'+this.state.endTime+'.json')
    await axios.get('https://api.fitbit.com/1/user/-/activities/distance/date/'+this.state.startDate+'/'+this.state.endDate+'/'+this.state.detailLevel+'min/time/'+this.state.startTime+'/'+this.state.endTime+'.json', {
            headers: {
				      'Authorization': 'Bearer '+ access_token,
            }
        }).then((resp) => {
        console.log(resp.data);
        var array = resp.data['activities-distance-intraday']['dataset'];
        var str = 'time,value';

        for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
          }
          str += '\r\n' + line;
        }
        <CsvDownload data={str} filename="export.csv" />;
        console.log(str);
      });
  };

  onCal = async () => {
    console.log('https://api.fitbit.com/1/user/-/activities/calories/date/'+this.state.startDate+'/'+this.state.endDate+'/'+this.state.detailLevel+'min/time/'+this.state.startTime+'/'+this.state.endTime+'.json')
    await axios.get('https://api.fitbit.com/1/user/-/activities/calories/date/'+this.state.startDate+'/'+this.state.endDate+'/'+this.state.detailLevel+'min/time/'+this.state.startTime+'/'+this.state.endTime+'.json', {
            headers: {
				      'Authorization': 'Bearer '+ access_token,
            }
        }).then((resp) => {
            console.log(resp.data)
            var array = resp.data["activities-calories-intraday"]["dataset"]
            var str2 = 'level,mets,time,value';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line !== '') line += ','
                    line += array[i][index];
                }
                str2 += '\r\n' + line ;
            }
            console.log(str2)
            return (
              <CsvDownload data={str2} filename="export.csv" />
            )
        });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 25, padding: 15, textAlign: 'center' }}>
            You can Download your Fit Bit Data Here
          </Text>
          <View>
            <Text
              style={{
                fontSize: 25,
                padding: 15,
                textAlign: 'center',
                backgroundColor: 'lightblue',
              }}>
              To see the distance travelled download this csv file:
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.onheart}>
              <Text
                style={{ fontSize: 20, color: 'white' }}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
          <View>
            <Text
              style={{
                fontSize: 25,
                padding: 15,
                textAlign: 'center',
                backgroundColor: 'lightblue',
              }}>
              To see the calories burned per day download this csv file:
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.onCal}>
              <Text
                style={{ fontSize: 20, color: 'white' }}>
                calories
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SecondPage;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3F51B5',

    margin: 35,
    borderRadius: 20,
  },
});

