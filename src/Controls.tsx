import React from "react";
import { TouchableOpacity, View, ActivityIndicator, Image } from "react-native";
import styles from "./MediaControls.style";
import { getPlayerStateIcon } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

type ControlsProps = Pick<
  Props,
  "isLoading" | "mainColor" | "playerState" | "onReplay"
> & {
  onPause: () => void;
};

const Controls = (props: ControlsProps) => {
  const { isLoading, playerState, onReplay, onPause ,onSeek,progress} = props;
  const icon = getPlayerStateIcon(playerState);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;

  const content = isLoading ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <>
    <TouchableOpacity
      style={[{...styles.playButton,padding:30,height:100,width:400}]}
//       onPress={()=>onSeek(progress+15)}
    >
      <Image source={icon} style={styles.playIcon} />
    </TouchableOpacity>
    
    <TouchableOpacity
      style={[styles.playButton]}
      onPress={pressAction}
      accessibilityLabel={PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause"}
      accessibilityHint={"Plays and Pauses the Video"}
    >
      <Image source={icon} style={styles.playIcon} />
    </TouchableOpacity>
    
    <TouchableOpacity
      style={[{...styles.playButton,padding:30,height:100,width:400}]}
//       onPress={()=>onSeek(progress-15)}
    >
      <Image source={icon} style={styles.playIcon} />
    </TouchableOpacity>
      </>
  );

  return <View style={[{...styles.controlsRow ,justifyContent:isLoading ? 'center' : 'center' }]}>{content}</View>;
};

export { Controls };
