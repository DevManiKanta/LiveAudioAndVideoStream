import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
const videoSource =
  "file:///private/var/mobile/Containers/Data/Application/41407F9F-668B-4620-ACB7-9467809F4B95/tmp/81D5F14A-576F-464E-9126-CE8CF474D2F7.mov";
export default function VideoScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUri, setVideoUri] = useState(videoSource);
  const params = useLocalSearchParams();
  const [status, setStatus] = useState({});
  const router = useRouter();
  const { path } = useLocalSearchParams();
  useEffect(() => {
    if (path) {
      setVideoUri(path);
    }
  }, []);
  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };
  return (
    <View style={styles.contentContainer}>
      {/* Video component from expo-av */}
      <Video
        source={{ uri: videoUri }} // Video source URL
        rate={1.0} // Speed of the video
        volume={1.0} // Volume of the video
        isMuted={false} // Mute option
        shouldPlay={isPlaying} // Control playback with the state
        resizeMode="fill" // How the video should be resized
        isLooping={true} // Loop the video
        onPlaybackStatusUpdate={(status) => setStatus(status)} // Handle playback updates
        style={styles.video}
      />
      <View style={styles.controlsContainer}>
        {/* Button to toggle play/pause */}
        <Button
          title={isPlaying ? "Pause" : "Play-Recorded-Video"}
          onPress={togglePlayPause}
        />
        <Button title={"Play-Recorded-Audio"} />
      </View>
      <Button title={"Back-to-VideoRecord"} onPress={() => router.back()} />
      {/* Display the playback status */}
      <Text>Status: {status.isPlaying ? "Playing" : "Paused"}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "white",
  },
  video: {
    width: "100%",
    height: "50%",
  },
  controlsContainer: {
    padding: 10,
  },
});
// import React, { useState } from "react";
// import { View, Button, Alert, StyleSheet } from "react-native";
// import * as FileSystem from "expo-file-system";
// import { Audio } from "expo-av";

// const audioSource =
//   " file:///var/mobile/Containers/Data/Application/846A618A-A887-4078-A0A4-4B48509F9D2C/Documents/audioData.wav";
// export default function AudioPlayer() {
//   const [sound, setSound] = useState(null);

//   const playAudio = async () => {
//     try {
//       console.log("🔹 Checking file existence...");
//       const fileInfo = await FileSystem.getInfoAsync(audioSource);
//       console.log("File Info:", fileInfo);

//       if (!fileInfo.exists) {
//         console.error("❌ File does not exist:", audioSource);
//         Alert.alert("Error", "Audio file not found!");
//         return;
//       }

//       console.log("✅ File exists, loading audio...");
//       // Stop and unload previous sound if exists
//       if (sound) {
//         await sound.stopAsync();
//         await sound.unloadAsync();
//         setSound(null);
//       }

//       // Load and play the audio file
//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: audioSource },
//         { shouldPlay: true }
//       );

//       setSound(newSound);
//       console.log("🎵 Playing audio...");

//       // Cleanup when audio finishes
//       newSound.setOnPlaybackStatusUpdate(async (status) => {
//         if (status.didJustFinish) {
//           console.log("✅ Playback finished, unloading...");
//           await newSound.unloadAsync();
//           setSound(null);
//         }
//       });
//     } catch (error) {
//       console.error("❌ Error playing audio:", error);
//       Alert.alert("Error", "Could not play audio!");
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Button title="Play Audio" onPress={playAudio} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
// });
