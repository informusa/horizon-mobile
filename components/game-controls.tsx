/**
 * Game Controls - Touch input buttons
 */

import { View, Pressable, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "./ui/icon-symbol";

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onStopMove: () => void;
  onJump: () => void;
  onPause: () => void;
  hapticEnabled: boolean;
}

export function GameControls({
  onMoveLeft,
  onMoveRight,
  onStopMove,
  onJump,
  onPause,
  hapticEnabled,
}: GameControlsProps) {
  const triggerHaptic = () => {
    if (hapticEnabled && Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={styles.container}>
      {/* Pause button */}
      <Pressable
        onPress={() => {
          triggerHaptic();
          onPause();
        }}
        style={({ pressed }) => [styles.pauseButton, pressed && styles.buttonPressed]}
      >
        <IconSymbol name="pause.fill" size={24} color="#EAEAEA" />
      </Pressable>

      {/* Movement controls */}
      <View style={styles.leftControls}>
        <Pressable
          onPressIn={() => {
            triggerHaptic();
            onMoveLeft();
          }}
          onPressOut={onStopMove}
          style={({ pressed }) => [styles.moveButton, pressed && styles.buttonPressed]}
        >
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={32} color="#EAEAEA" />
        </Pressable>

        <Pressable
          onPressIn={() => {
            triggerHaptic();
            onMoveRight();
          }}
          onPressOut={onStopMove}
          style={({ pressed }) => [styles.moveButton, styles.moveButtonRight, pressed && styles.buttonPressed]}
        >
          <IconSymbol name="chevron.right" size={32} color="#EAEAEA" />
        </Pressable>
      </View>

      {/* Jump button */}
      <Pressable
        onPress={() => {
          triggerHaptic();
          onJump();
        }}
        style={({ pressed }) => [styles.jumpButton, pressed && styles.buttonPressed]}
      >
        <IconSymbol name="paperplane.fill" size={32} color="#1A1A2E" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "box-none",
  },
  pauseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(22, 33, 62, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  leftControls: {
    position: "absolute",
    bottom: 40,
    left: 20,
    flexDirection: "row",
    gap: 15,
  },
  moveButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(22, 33, 62, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  moveButtonRight: {
    marginLeft: 10,
  },
  jumpButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#EAEAEA",
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
