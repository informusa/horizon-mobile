/**
 * Settings Screen
 */

import { View, Text, Pressable, StyleSheet, Switch, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import type { GameSettings } from "@/lib/game/types";

interface SettingsScreenProps {
  settings: GameSettings;
  onUpdateSettings: (settings: GameSettings) => void;
  onBack: () => void;
}

export function SettingsScreen({ settings, onUpdateSettings, onBack }: SettingsScreenProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const toggleSetting = (key: keyof GameSettings) => {
    triggerHaptic();
    onUpdateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SETTINGS</Text>
      </View>

      {/* Settings options */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sound Effects</Text>
          <Switch
            value={settings.soundEnabled}
            onValueChange={() => toggleSetting("soundEnabled")}
            trackColor={{ false: "#334155", true: "#4ADE80" }}
            thumbColor={settings.soundEnabled ? "#EAEAEA" : "#94A3B8"}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Background Music</Text>
          <Switch
            value={settings.musicEnabled}
            onValueChange={() => toggleSetting("musicEnabled")}
            trackColor={{ false: "#334155", true: "#4ADE80" }}
            thumbColor={settings.musicEnabled ? "#EAEAEA" : "#94A3B8"}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Haptic Feedback</Text>
          <Switch
            value={settings.hapticEnabled}
            onValueChange={() => toggleSetting("hapticEnabled")}
            trackColor={{ false: "#334155", true: "#4ADE80" }}
            thumbColor={settings.hapticEnabled ? "#EAEAEA" : "#94A3B8"}
          />
        </View>
      </View>

      {/* Back button */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            triggerHaptic();
            onBack();
          }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FF6B35",
    letterSpacing: 2,
  },
  settingsContainer: {
    gap: 20,
    marginBottom: 50,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: "#16213E",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  settingLabel: {
    fontSize: 18,
    color: "#EAEAEA",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16213E",
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EAEAEA",
    letterSpacing: 1,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
