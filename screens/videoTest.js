/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
const VideoTest = ({ navigation }) => {


  return (
    <View style={styles.container}>
      {/*<VideoPlayer source={require('../assets/Module.mp4')}   // Can be a URL or a local file.
           paused={false}
           progressUpdateInterval={250.0}
         resizeMode="cover"     
    videoStyle={styles.backgroundImage} />*/}
    </View>
  );
}
export default VideoTest;
const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  backgroundImage: {

    height: 300,
    width: '100%',
  }
});