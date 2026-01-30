/**
 * Audio Manager - Game sound effects and music
 */

import { Audio } from "expo-av";
import type { GameSettings } from "./types";

export class AudioManager {
  private sounds: Map<string, Audio.Sound> = new Map();
  private music: Audio.Sound | null = null;
  private settings: GameSettings;
  private initialized: boolean = false;

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
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  async loadSounds() {
    if (!this.initialized) return;

    try {
      // Note: Sound files should be placed in assets/audio/ directory
      // For now, we'll handle missing files gracefully
      
      // Uncomment these when you add actual MP3 files:
      /*
      const jumpSound = await Audio.Sound.createAsync(
        require('@/assets/audio/jump.mp3')
      );
      this.sounds.set('jump', jumpSound.sound);

      const collisionSound = await Audio.Sound.createAsync(
        require('@/assets/audio/collision.mp3')
      );
      this.sounds.set('collision', collisionSound.sound);

      const powerupSound = await Audio.Sound.createAsync(
        require('@/assets/audio/powerup.mp3')
      );
      this.sounds.set('powerup', powerupSound.sound);

      const gameoverSound = await Audio.Sound.createAsync(
        require('@/assets/audio/gameover.mp3')
      );
      this.sounds.set('gameover', gameoverSound.sound);

      const levelcompleteSound = await Audio.Sound.createAsync(
        require('@/assets/audio/levelcomplete.mp3')
      );
      this.sounds.set('levelcomplete', levelcompleteSound.sound);
      */

      console.log("Audio manager ready. Add MP3 files to assets/audio/ to enable sounds.");
    } catch (error) {
      console.error("Failed to load sounds:", error);
    }
  }

  async playSound(soundName: string) {
    if (!this.settings.soundEnabled || !this.initialized) return;

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
    if (!this.settings.musicEnabled || this.music || !this.initialized) return;

    try {
      // Uncomment when you add background music:
      /*
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/audio/background.mp3'),
        { isLooping: true, volume: 0.5 }
      );
      this.music = sound;
      await this.music.playAsync();
      */
      console.log("Background music ready. Add background.mp3 to assets/audio/ to enable.");
    } catch (error) {
      console.error("Failed to play music:", error);
    }
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
