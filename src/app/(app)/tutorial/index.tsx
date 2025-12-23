import { Back } from "@/components/back";
import { Title } from "@/components/title";
import { useCallback, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import YoutubeIframe from "react-native-youtube-iframe";
import { BottomButton } from "@/components/bottom-button";
import { useTranslation } from "react-i18next";

export default function Tutorial() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { i18n } = useTranslation();

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);
  
  return (
    <View className="flex-1 bg-zinc-950 px-8 relative items-center">
      <View className="flex w-full">
        <Back />

        <Title title="Tutorial" />
      </View>

      <View style={[styles.videoContainer, !isVideoReady && styles.skeleton]}>
        {!isVideoReady && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fe017f" />
          </View>
        )}

        <YoutubeIframe
          videoId={i18n.language === "es" ? "VOlpw90eKPo" : "lJjAqZ9smIA"}
          onFullScreenChange={onFullScreenChange}
          height={200}
          width={340}
          onReady={() => setIsVideoReady(true)}
        />
      </View>

      <View className="items-center flex-row justify-center mt-6 absolute bottom-0 w-full">
        <BottomButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    marginTop: 40,
    borderRadius: 20,
    overflow: "hidden",
    width: 340,
    height: 200,
  },
  skeleton: {
    backgroundColor: "#27272a",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
