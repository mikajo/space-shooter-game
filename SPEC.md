# Retro 2D Space Shooter — Game Specification

## Overview

A vertical-scrolling retro space shooter built with **Phaser.js 3**, playable in the browser.
The player pilots a spaceship through endless waves of alien enemies, shooting them down before they
reach the bottom of the screen or collide with the player.

Inspired by classics like 1942 and Galaga.

> **Status: v1.0 complete — all three milestones shipped.**

---

## Requirements

### Gameplay
- Vertical auto-scroll: the background scrolls downward continuously, giving the illusion of forward flight
- Player controls the ship in all four directions (arrow keys or WASD)
- Player shoots upward with Spacebar
- Alien enemies fly in from the top in formation patterns, moving downward with sine-wave horizontal drift
- Enemies fire back at the player
- Collision between a bullet and an enemy destroys the enemy (hit FX + explosion)
- Collision between an enemy or enemy bullet and the player costs a life
- Player has 3 lives shown as ship icons; game over when all lives are lost
- Invincibility window (1.6 s) with flashing effect after each hit
- Score increments 100 pts per kill
- HUD: score (top right), lives icons (top left), charge ammo indicator (below score)
- Power-up pickups drop randomly (28 % chance per kill); collecting one grants 3 charged shots
- Charged shots are larger, faster, and use distinct projectile art and hit FX
- Screen shake on player hit
- High score persisted in `localStorage`

### Technical
- Engine: **Phaser.js 3.60** (CDN)
- Runs in a modern browser via a local HTTP server (`npx serve .` or equivalent)
- Resolution: **720 × 960** (portrait) — `480 × 1.5` by `640 × 1.5`
- All assets loaded from local relative paths
- Sprite animations driven by individual PNG frames
- All collision detection is manual (bounds intersection in `update()`) to avoid a
  Phaser 3.60 bug that nullifies sprite physics bodies when single sprites are passed
  directly to `physics.add.overlap()`
- Scenes: `StartScene → GameScene → GameOverScene`

### Audio
- Background music loop: `Sun Tribe.ogg`
- Sound effects: shoot, enemy hit, explosion, player death, power-up collect

---

## Assets Used in Game

All paths are relative to the project root.

### Player Ship

| Asset | Path |
|---|---|
| Ship + thrust (8 frames) | `Legacy Collection/Assets/Misc/spaceship-unit/Sprites/ShipandThrust/frame1.png` … `frame8.png` |

### Enemy — Alien (Flying)

| Asset | Path |
|---|---|
| Fly animation (8 frames) | `Legacy Collection/Assets/Characters/alien-flying-enemy/sprites/alien-enemy-flying1.png` … `alien-enemy-flying8.png` |

### Projectiles

| Asset | Path |
|---|---|
| Bolt / normal shot (4 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/Bolt/Sprites/bolt1.png` … `bolt4.png` |
| Charged shot (6 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/charged/Sprites/charged1.png` … `charged6.png` |

### Hit & Explosion Effects

| Asset | Path |
|---|---|
| Explosion (9 frames) | `Legacy Collection/Assets/Misc/Explosion/sprites/explosion-animation1.png` … `explosion-animation9.png` |
| Hit FX — normal (5 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/hits/hits-1/Sprites/hits-1-1.png` … `hits-1-5.png` |
| Hit FX — charged (7 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/hits/Hits-2/Sprites/hits-2-1.png` … `hits-2-7.png` |
| Spark — pickup animation (5 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/spark/Sprites/spark-preview1.png` … `spark-preview5.png` |
| Crossed FX — pickup collect (6 frames) | `Legacy Collection/Assets/Misc/Warped shooting fx/crossed/Sprites/crossed1.png` … `crossed6.png` |

### Background

| Asset | Path |
|---|---|
| Far layer (slow scroll) | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-back.png` |
| Near layer (fast scroll) | `Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-stars.png` |

### Audio

| Asset | Path |
|---|---|
| Shoot SFX | `Legacy Collection/Assets/Packs/SpaceShooter/Space Shooter files/Sound FX/shot 1.wav` |
| Hit SFX | `Legacy Collection/Assets/Packs/SpaceShooter/Space Shooter files/Sound FX/hit.wav` |
| Explosion SFX | `Legacy Collection/Assets/Packs/SpaceShooter/Space Shooter files/Sound FX/explosion.wav` |
| Player death SFX | `Legacy Collection/Assets/Packs/Sewers pack files/Sounds/player-death.wav` |
| Pickup SFX | `Legacy Collection/Assets/Packs/grotto_escape_pack/Base pack/sounds/pickup.wav` |
| Background music | `Legacy Collection/Assets/Packs/Meta data assets files/sounds/music/Sun Tribe.ogg` |

---

## Milestones

Each milestone produces a fully playable build. Serve the project locally then open `http://localhost:PORT`.

---

### Milestone 1 — Core Loop ✅

**Goal:** A ship that moves and shoots against a scrolling background.

**Deliverables:**
- `index.html` + Phaser.js 3.60 loaded (CDN)
- Vertically scrolling parallax background (far + near layers)
- Player ship rendered with 8-frame thrust animation
- 4-directional movement clamped to screen bounds
- Spacebar fires bolt projectiles upward; bolts disappear off-screen

**Definition of playable:** You can fly the ship around the full screen and fire bullets.

---

### Milestone 2 — Enemies & Combat ✅

**Goal:** Alien enemies spawn, move, and can be destroyed. Full win/lose loop per wave.

**Deliverables:**
- Alien enemies spawn in formation patterns (rows, V-shapes)
- Enemies drift downward with sine-wave horizontal movement; destroyed on bullet hit
- Hit FX on bullet impact; explosion on enemy death
- Enemies fire back (orange-tinted bolts)
- Player loses a life on enemy collision or enemy bullet hit
- 3 lives shown as ship icons in HUD; life dims on loss
- Score counter; increments 100 pts per kill
- Wave clears → next wave spawns after 1.5 s delay
- Game over screen (score + wave) with PLAY AGAIN button / SPACE shortcut

**Definition of playable:** Full game loop — fight enemies, lose lives, see game over, restart.

---

### Milestone 3 — Polish & Progression ✅

**Goal:** Five distinct wave formations, charged power-up, audio, high score, start screen.

**Deliverables:**
- Start screen: title, hi-score display, blinking "PRESS SPACE TO PLAY"
- 5 progressively harder wave formations:
  1. Single row (5 enemies)
  2. Two staggered rows (7)
  3. V-shape (7)
  4. Diamond (9)
  5. Double row (10) — reused for wave 6+, speed capped at 300 px/s
- Enemy fire rate increases each wave
- Power-up pickups: 28 % drop chance → cyan spark sprite drifts down
- Collecting a pickup grants 3 charged shots (`CHARGE x3` HUD indicator)
- Charged shot: larger sprite, 10 % faster, hits-2 FX on impact
- Screen shake (220 ms) on every player hit
- Sound effects: shoot, hit, explosion, player death, pickup collect
- Background music loop (persists across scene transitions)
- High score saved to `localStorage`; shown on start screen and game over screen
- "★ NEW RECORD ★" animation when score beats previous best

**Definition of playable:** Complete, presentable game — start screen, 5 wave types, high score, all FX and audio.

---

## Out of Scope (v1.0)

- Boss enemies
- Multiple player ships / unlockables
- Mobile touch controls
- Online leaderboard
- Procedural level generation
