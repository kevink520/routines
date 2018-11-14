import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header 
          centerComponent={{
            title: 'Kevin\'s Routines',
            style: styles.headerTitle,
          }}
        />
        <View style={styles.routine}>
          <Text>Last B time: 10am, Friday, November 9, 2018</Text>
          <Text>Next B time: 10am, Monday, November 12, 2018</Text>
          <Button
            title="Log B Time"
          />
        </View>
        <View style={styles.routine}>
          <Text>Last S time: 12pm, Friday, November 9, 2018</Text>
          <Text>Next S time: 12am, Saturday, November 10, 2018</Text>
          <Button
            title="Log S Time"
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
  },
});
