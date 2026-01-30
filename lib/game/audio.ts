/**
 * Audio Manager - Game sound effects and music
 * Note: Audio files would be added to assets/audio/ directory
 * For this demo, we're setting up the structure without actual audio files
 */

import { Audio } from "expo-av";
import type { GameSettings } from "./types";

export class AudioManager {
  private sounds: Map<string, Audio.Sound> = new Map();
  private music: Audio.Sound | null = null;
  private settings: GameSettings;

  constructor(settings: GameSettings) {
    this.settings = settings;
    this.initAudio();
  }

  private async initAudio() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  async loadSounds() {
    // Sound effects would be loaded here
    // Example:
    // const jumpSound = await Audio.Sound.createAsync(require('@/assets/audio/jump.mp3'));
    // this.sounds.set('jump', jumpSound.sound);
  }

  async playSound(soundName: string) {
    if (!this.settings.soundEnabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.error(`Failed to play sound ${soundName}:`, error);
      }
    }
  }

  async playMusic() {
    if (!this.settings.musicEnabled || this.music) return;

    // Background music would be loaded and played here
    // Example:
    // const { sound } = await Audio.Sound.createAsync(
    //   require('@/assets/audio/background.mp3'),
    //   { isLooping: true, volume: 0.5 }
    // );
    // this.music = sound;
    // await this.music.playAsync();
  }

  async stopMusic() {
    if (this.music) {
      try {
        await this.music.stopAsync();
        await this.music.unloadAsync();
        this.music = null;
      } catch (error) {
        console.error("Failed to stop music:", error);
      }
    }
  }

  updateSettings(settings: GameSettings) {
    this.settings = settings;

    if (!settings.musicEnabled) {
      this.stopMusic();
    } else if (settings.musicEnabled && !this.music) {
      this.playMusic();
    }
  }

  async cleanup() {
    await this.stopMusic();

    for (const [name, sound] of this.sounds.entries()) {
      try {
        await sound.unloadAsync();
      } catch (error) {
        console.error(`Failed to unload sound ${name}:`, error);
      }
    }

    this.sounds.clear();
  }
}
