import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { logBTime, fetchBTimes, logSTime, fetchSTimes } from '../actions';
import firebase from 'firebase';
import moment from 'moment';

class Routines extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return;
      }

      this.props.fetchBTimes();
      this.props.fetchSTimes();
    });
  }

  displayLastBTime = () => {
    const keys = Object.keys(this.props.bTimes);
    const lastBTimeKey = keys.slice(-2, -1);
    if (!this.props.bTimes[lastBTimeKey]) {
      return '';
    }

    const lastBTimestamp = this.props.bTimes[lastBTimeKey].timestamp;
    return moment(lastBTimestamp).format('dddd, MMMM Do, YYYY [at] hh:mm a');
  }

  displayNextBTime = () => {
    const keys = Object.keys(this.props.bTimes);
    const nextBTimeKey = keys.slice(-1);
    if (!this.props.bTimes[nextBTimeKey]) {
      return '';
    }
    
    const nextBTimestamp = this.props.bTimes[nextBTimeKey].timestamp;
    return moment(nextBTimestamp).format('dddd, MMMM Do, YYYY [at] hh:mm a');
  }

  displayLastSTime = () => {
    const keys = Object.keys(this.props.sTimes);
    const lastSTimeKey = keys.slice(-2, -1);
    if (!this.props.sTimes[lastSTimeKey]) {
      return '';
    }
    
    const lastSTimestamp = this.props.sTimes[lastSTimeKey].sTimestamp;
    return moment(lastSTimestamp).format('dddd, MMMM Do, YYYY [at] hh:mm a');
  }

  displayNextWTime = () => {
    const keys = Object.keys(this.props.sTimes);
    const nextWTimeKey = keys.slice(-2, -1);
    if (!this.props.sTimes[nextWTimeKey]) {
      return '';
    }
    
    const nextWTimestamp = this.props.sTimes[nextWTimeKey].wTimestamp;
    return moment(nextWTimestamp).format('dddd, MMMM Do, YYYY [at] hh:mm a');
  }

  displayNextSTime = () => {
    const keys = Object.keys(this.props.sTimes);
    const nextSTimeKey = keys.slice(-1);
    if (!this.props.sTimes[nextSTimeKey]) {
      return '';
    }
    
    const nextSTimestamp = this.props.sTimes[nextSTimeKey].sTimestamp;
    return moment(nextSTimestamp).format('dddd, MMMM Do, YYYY [at] hh:mm a');
  }

  render() {
    if (!this.props.user) {
      return <LoginForm />
    }

    return (
      <View style={styles.container}>
        <Header 
          centerComponent={{
            text: 'Kevin’s Routines',
            style: styles.headerTitle,
          }}
          outerContainerStyles={styles.headerContainer}
        />
        <View style={styles.routine}>
          <Text style={styles.timeLabel}>LAST B TIME:</Text>
          <Text style={styles.dateTime}>{this.displayLastBTime()}</Text>
          <Text style={styles.timeLabel}>NEXT B TIME:</Text>
          <Text style={styles.dateTime}>{this.displayNextBTime()}</Text>
          <Button
            title="Log B Time"
            containerViewStyle={{marginBottom: 30}}
            onPress={this.props.logBTime}
          />
        </View>
        <View style={styles.routine}>
          <Text style={styles.timeLabel}>LAST S TIME:</Text>
          <Text style={styles.dateTime}>{this.displayLastSTime()}</Text>
          <Text style={styles.timeLabel}>NEXT W TIME:</Text>
          <Text style={styles.dateTime}>{this.displayNextWTime()}</Text>
          <Text style={styles.timeLabel}>NEXT S TIME:</Text>
          <Text style={styles.dateTime}>{this.displayNextSTime()}</Text>
          <Button
            title="Log S Time"
            containerViewStyle={{marginBottom: 30}}
            onPress={this.props.logSTime}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    marginBottom: 30,
  },

  headerTitle: {
    color: '#fff',
  },

  timeLabel: {
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: '600',
    color: '#808080',
  },

  dateTime: {
    marginHorizontal: 15,
    marginBottom: 15,
    fontSize: 17,
    color: '#555',
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
  bTimes: state.bTimes,
  sTimes: state.sTimes,
});

export default connect(mapStateToProps, { logBTime, fetchBTimes, logSTime, fetchSTimes })(Routines);
