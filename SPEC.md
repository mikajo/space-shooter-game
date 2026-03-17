# Retro 2D Space Shooter — Game Specification

## Overview

A vertical-scrolling retro space shooter built with **Phaser.js**, playable in the browser.
The player pilots a spaceship through waves of alien enemies, shooting them down before they
reach the bottom of the screen or collide with the player.

Inspired by classics like 1942 and Galaga.

---

## Requirements

### Gameplay
- Vertical auto-scroll: the background scrolls downward continuously, giving the illusion of forward flight
- Player controls the ship in all four directions (arrow keys or WASD)
- Player shoots upward with spacebar or a designated fire key
- Alien enemies fly in from the top in formation patterns, moving downward
- Collision between a bullet and an enemy destroys the enemy (explosion + hit FX)
- Collision between an enemy and the player costs a life (explosion on both)
- Player has 3 lives; game over when all lives are lost
- Score increments for each enemy destroyed
- HUD displays current score and remaining lives

### Technical
- Engine: **Phaser.js 3** (CDN or local)
- Runs in a modern browser, no install required
- Target resolution: 480×640 (portrait)
- All assets loaded from local relative paths
- Sprite animations driven by individual PNG frames

### Audio
- Sound effects for shooting, enemy hit, explosion, and player death
- Background music loop (if suitable OGG/WAV found in asset library)

---

## Pixel Art Assets

All paths are relative to the project root.

### Player Ship

| Asset | Path |
|---|---|
| Ship idle (4 frames) | `Legacy Collection/Assets/Misc/spaceship-unit/Sprites/Ship/frame1.png` … `frame4.png` |
| Ship + thrust (8 frames) | `Legacy Collection/Assets/Misc/spaceship-unit/Sprites/ShipandThrust/frame1.png` … `frame8.png` |
| Thrust only (2 frames) | `Legacy Collection/Assets/Misc/spaceship-unit/Sprites/Thrust/frame1.png`, `frame2.png` |
| Spritesheet | `Legacy Collection/Assets/Misc/spaceship-unit/Spritesheets/Spritesheet.png` |
| Preview GIF | `Legacy Collection/Assets/Misc/spaceship-unit/Gifs Previews/Ship-and-thrust.gif` |

Alternative ship (more dynamic rotation):

| Asset | Path |
|---|---|
| Ship frames (5 angles) | `Legacy Collection/Assets/Misc/Warped Fast Ship Files/Sprites/ship-sprites/ship-01.png` … `ship-05.png` |
| Thrust frames | `Legacy Collection/Assets/Misc/Warped Fast Ship Files/Sprites/thrust-sprites/thrust-preview1.png`, `thrust-preview2.png` |
| Fly spritesheet | `Legacy Collection/Assets/Misc/Warped Fast Ship Files/Spritesheets/ship-fly-preview.png` |
| Rotate spritesheet | `Legacy Collection/Assets/Misc/Warped Fast Ship Files/Spritesheets/ship-rotate-preview.png` |

### Enemy — Alien (Flying)

| Asset | Path |
|---|---|
| Fly animation (8 frames) | `Legacy Collection/Assets/Characters/alien-flying-enemy/sprites/alien-enemy-flying1.png` … `alien-enemy-flying8.png` |
| Spritesheet | `Legacy Collection/Assets/Characters/alien-flying-enemy/spritesheet.png` |
| Preview GIF | `Legacy Collection/Assets/Characters/alien-flying-enemy/Previews/alien-enemy-2-flying.gif` |

### Projectiles

| Asset | Path |
|---|---|
| Bolt (4 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/Bolt/Sprites/bolt1.png` … `bolt4.png` |
| Bolt spritesheet | `Legacy Collection/Assets/Misc/Warped shooting fx/Bolt/spritesheet.png` |
| Charged shot (6 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/charged/Sprites/charged1.png` … `charged6.png` |
| Charged spritesheet | `Legacy Collection/Assets/Misc/Warped shooting fx/charged/spritesheet.png` |
| Pulse (4 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/Pulse/Sprites/pulse1.png` … `pulse4.png` |
| Waveform (4 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/waveform/Sprites/waveform1.png` … `waveform4.png` |

### Hit & Explosion Effects

| Asset | Path |
|---|---|
| Explosion (9 frames) | `Legacy Collection/Assets/Misc/Explosion/sprites/explosion-animation1.png` … `explosion-animation9.png` |
| Explosion spritesheet | `Legacy Collection/Assets/Misc/Explosion/spritesheet/explosion-animation.png` |
| Explosion JSON | `Legacy Collection/Assets/Misc/Explosion/spritesheet/explosion-animation.json` |
| Hit (3 frames) | `Legacy Collection/Assets/Misc/Hit/Sprites/hit1.png` … `hit3.png` |
| Hits FX set 1 (5 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/hits/hits-1/Sprites/hits-1-1.png` … `hits-1-5.png` |
| Hits FX set 2 (7 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/hits/Hits-2/Sprites/hits-2-1.png` … `hits-2-7.png` |
| Hits FX set 3 (5 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/hits/Hits-3/Sprites/hits-3-1.png` … `hits-3-5.png` |
| Crossed FX (6 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/crossed/Sprites/crossed1.png` … `crossed6.png` |
| Spark FX (5 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/spark/Sprites/spark-preview1.png` … `spark-preview5.png` |

### Background / Environment

| Asset | Path |
|---|---|
| Background far layer (slow) | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-back.png` |
| Background near layer (fast) | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-stars.png` |
| Combined preview | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-with-stars.png` |
| Prop — big planet | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/prop-planet-big.png` |
| Prop — small planet | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/prop-planet-small.png` |
| Prop — asteroid 1 | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/asteroid-1.png` |
| Prop — asteroid 2 | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/asteroid-2.png` |
| Pack preview | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/blue-preview.png` |

---

## Milestones

Each milestone produces a fully playable build. Open `index.html` in a browser to play.

---

### Milestone 1 — Core Loop (Playable prototype)

**Goal:** A ship that moves and shoots against a scrolling background. No enemies, no scoring — just
verifying controls, animation, and the game loop feel.

**Deliverables:**
- `index.html` + Phaser.js loaded (CDN)
- Vertically scrolling background (parallax with `back.png` and `back-2.png`)
- Player ship rendered with thrust animation
- 4-directional movement clamped to screen bounds
- Single fire button shoots bolt projectiles upward
- Bolt disappears when it exits the top of the screen

**Assets used:**
- Ship: `spaceship-unit/Sprites/ShipandThrust/` (frames 1–8)
- Bullet: `Warped shooting fx/Bolt/Sprites/` (frames 1–4)
- Background: `space_background_pack/Blue Version/layered/blue-back.png` (far), `blue-stars.png` (near)

**Definition of playable:** You can fly the ship around the full screen and fire bullets.

---

### Milestone 2 — Enemies & Combat (First complete game loop)

**Goal:** Alien enemies spawn, move, and can be destroyed. The game has a win/lose condition per wave.

**Deliverables:**
- Alien enemies spawn from the top in simple formation patterns (rows, V-shapes)
- Enemies move downward; they are destroyed on bullet hit
- Hit FX plays on bullet impact; explosion plays on enemy death
- Player loses a life on collision with an enemy or enemy bullet (enemies fire back)
- 3 lives shown as ship icons in HUD
- Score counter displayed; increments per kill
- Wave clears when all enemies are destroyed → next wave spawns
- Game over screen when all lives are lost, with restart button

**Assets used:**
- Enemy: `alien-flying-enemy/sprites/` (frames 1–8)
- Hit FX: `Warped shooting fx/hits/hits-1/Sprites/` (frames 1–5)
- Explosion: `Explosion/sprites/` (frames 1–9)
- Player death: `Explosion/sprites/` (larger scale)
- HUD life icon: `spaceship-unit/Sprites/Ship/frame1.png`

**Definition of playable:** Full game loop — fight enemies, lose lives, see game over, restart.

---

### Milestone 3 — Polish & Progression (Shippable v1.0)

**Goal:** Multiple enemy waves with increasing difficulty, a charged power-up shot, sound effects,
and a polished start/end screen.

**Deliverables:**
- Start screen with title and "Press Space to Play"
- 5 progressively harder waves (more enemies, faster movement, tighter formations)
- Power-up: collecting a dropped pickup switches the bolt to a charged shot (3 hits)
- Charged shot uses a distinct projectile and larger hit FX
- Sound effects: shoot, enemy hit, explosion, player death, power-up collect
- High score saved to `localStorage` and shown on game over screen
- Smooth screen shake on player hit

**Assets used:**
- Charged shot: `Warped shooting fx/charged/Sprites/` (frames 1–6)
- Charged hit FX: `Warped shooting fx/hits/Hits-2/Sprites/` (frames 1–7)
- Spark on pickup: `Warped shooting fx/spark/Sprites/` (frames 1–5)
- Crossed FX (multi-hit): `Warped shooting fx/crossed/Sprites/` (frames 1–6)
- Waveform (screen pulse): `Warped shooting fx/waveform/Sprites/` (frames 1–4)

**Definition of playable:** Complete, presentable game — start screen, 5 waves, high score, all FX and audio.

---

## Out of Scope (v1.0)

- Boss enemies
- Multiple player ships / unlockables
- Mobile touch controls
- Online leaderboard
- Procedural level generation
