import React from 'react';

import {
  Text,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class FitBit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      detailLevel: "",
      startTime: "",
      endTime: "",
      viewPage: "FirstPage"
    }
  }

  handleStartDate = (text) => {
    this.setState({
      startDate: text
    });
  }

  handleEndDate = (text) => {
    this.setState({
      endDate: text
    });
  }

  handleStartTime = (text) => {
    this.setState({
      startTime: text
    });
  }

  handleEndTime = (text) => {
    this.setState({
      endTime: text
    });
  }

  handleDetailLevel = (text) => {
    this.setState({
      detailLevel: text
    });
    // console.log(this.state.detailLevel)
  }

  onSubmit = () => {

    console.log(this.state.startDate)
    console.log(this.state.endDate)
    console.log(this.state.detailLevel)
    console.log(this.state.startTime)
    console.log(this.state.endTime)
    this.props.navigation.navigate('SecondPage', {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      detailLevel: this.state.detailLevel,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    });
  }

  render() {

    return (
      <ScrollView>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 25, padding: 15, textAlign: 'center' }}>
            My Fit Bit Details
          </Text>
          <View style={{backgroundColor: "lightblue", textAlign: "center"}}>
            <Text style={styles.textStyle}>Enter the start date : </Text>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="YYYY-MM-DD"
            placeholderTextColor = "black"
            autoCapitalize="none"
            onChangeText={this.handleStartDate}
          />
          <Text style={styles.textStyle}>Enter the End date : </Text>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="YYYY-MM-DD"
            placeholderTextColor = "black"
            autoCapitalize="none"
            onChangeText={this.handleEndDate}
          />
          <Text style={styles.textStyle}>Enter the detail level range(1-15):</Text>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="MM"
            placeholderTextColor = "black"
            autoCapitalize="none"
            onChangeText={this.handleDetailLevel}
          />
          <Text style={styles.textStyle}>Enter the Start time : </Text>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="HH:MM"
            placeholderTextColor = "black"
            autoCapitalize="none"
            onChangeText={this.handleStartTime}
          />
          <Text style={styles.textStyle}>Enter the End time : </Text>
            <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="HH:MM"
            placeholderTextColor = "black"
            autoCapitalize="none"
            onChangeText={this.handleEndTime}
          />
          <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
            <Text style={{ fontSize: 20, color:'white' }}>Submit</Text>
          </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    );
  }
}

export default FitBit


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3F51B5',
    
    margin: 35,
    borderRadius: 20,
  },

  input: {
    margin: 25,
    padding: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
  },

  textStyle: {
    // backgroundColor: '#fff',
    fontSize: 20,
    marginTop: 10,
    color: 'black',
    textAlign: 'center'
  },
});



