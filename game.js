// ─── Constants ───────────────────────────────────────────────────────────────

const GAME_WIDTH  = 480 * 1.5;   // 720
const GAME_HEIGHT = 640 * 1.5;   // 960

const SHIP_SPEED         = 300;
const BULLET_SPEED       = 600;
const ENEMY_BULLET_SPEED = 250;
const FIRE_RATE          = 200;

const SHIP_SCALE      = 1;
const BOLT_SCALE      = 1;
const ENEMY_SCALE     = 1;
const EXPLOSION_SCALE = 1;

const POINTS_PER_KILL    = 100;
const CHARGED_AMMO       = 3;     // shots granted per pickup
const PICKUP_DROP_CHANCE = 0.28;  // 28 % chance per killed enemy

// ─── Asset Paths ─────────────────────────────────────────────────────────────

const ASSETS = {
  bgFar:  'Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-back.png',
  bgNear: 'Legacy Collection/Assets/Environments/space_background_pack/Blue Version/layered/blue-stars.png',

  ship:      (n) => `Legacy Collection/Assets/Misc/spaceship-unit/Sprites/ShipandThrust/frame${n}.png`,
  bolt:      (n) => `Legacy Collection/Assets/Misc/Warped shooting fx/Bolt/Sprites/bolt${n}.png`,
  charged:   (n) => `Legacy Collection/Assets/Misc/Warped shooting fx/charged/Sprites/charged${n}.png`,
  alien:     (n) => `Legacy Collection/Assets/Characters/alien-flying-enemy/sprites/alien-enemy-flying${n}.png`,
  explosion: (n) => `Legacy Collection/Assets/Misc/Explosion/sprites/explosion-animation${n}.png`,
  hit:       (n) => `Legacy Collection/Assets/Misc/Warped shooting fx/hits/hits-1/Sprites/hits-1-${n}.png`,
  hit2:      (n) => `Legacy Collection/Assets/Misc/Warped shooting fx/hits/Hits-2/Sprites/hits-2-${n}.png`,
  spark:     (n) => `Legacy Collection/Assets/Misc/Warped shooting fx/spark/Sprites/spark-preview${n}.png`,
  crossed:   (n) => `Legacy Collection/Assets/Misc/Warped shooting fx/crossed/Sprites/crossed${n}.png`,

  sfxShoot:       `Legacy Collection/Assets/Packs/SpaceShooter/Space Shooter files/Sound FX/shot 1.wav`,
  sfxHit:         `Legacy Collection/Assets/Packs/SpaceShooter/Space Shooter files/Sound FX/hit.wav`,
  sfxExplosion:   `Legacy Collection/Assets/Packs/SpaceShooter/Space Shooter files/Sound FX/explosion.wav`,
  sfxPlayerDeath: `Legacy Collection/Assets/Packs/Sewers pack files/Sounds/player-death.wav`,
  sfxPickup:      `Legacy Collection/Assets/Packs/grotto_escape_pack/Base pack/sounds/pickup.wav`,
  music:          `Legacy Collection/Assets/Packs/Meta data assets files/sounds/music/Sun Tribe.ogg`,
};

// ─── Wave Formations ─────────────────────────────────────────────────────────
// Positions are fractions of GAME_WIDTH / GAME_HEIGHT.
// Negative y → enemy starts above the visible screen.

const FORMATIONS = [
  // Wave 1 — single row (5)
  [
    { x: 0.17, y: -0.05 }, { x: 0.33, y: -0.05 }, { x: 0.50, y: -0.05 },
    { x: 0.67, y: -0.05 }, { x: 0.83, y: -0.05 },
  ],
  // Wave 2 — two staggered rows (7)
  [
    { x: 0.20, y: -0.05 }, { x: 0.40, y: -0.05 }, { x: 0.60, y: -0.05 }, { x: 0.80, y: -0.05 },
    { x: 0.30, y: -0.13 }, { x: 0.50, y: -0.13 }, { x: 0.70, y: -0.13 },
  ],
  // Wave 3 — V-shape (7)
  [
    { x: 0.50, y: -0.03 },
    { x: 0.35, y: -0.09 }, { x: 0.65, y: -0.09 },
    { x: 0.20, y: -0.16 }, { x: 0.80, y: -0.16 },
    { x: 0.10, y: -0.23 }, { x: 0.90, y: -0.23 },
  ],
  // Wave 4 — diamond (9)
  [
    { x: 0.50, y: -0.03 },
    { x: 0.33, y: -0.09 }, { x: 0.67, y: -0.09 },
    { x: 0.17, y: -0.16 }, { x: 0.50, y: -0.16 }, { x: 0.83, y: -0.16 },
    { x: 0.33, y: -0.23 }, { x: 0.50, y: -0.23 }, { x: 0.67, y: -0.23 },
  ],
  // Wave 5 — double row (10)
  [
    { x: 0.10, y: -0.04 }, { x: 0.28, y: -0.04 }, { x: 0.46, y: -0.04 }, { x: 0.64, y: -0.04 }, { x: 0.82, y: -0.04 },
    { x: 0.19, y: -0.13 }, { x: 0.37, y: -0.13 }, { x: 0.55, y: -0.13 }, { x: 0.73, y: -0.13 }, { x: 0.91, y: -0.13 },
  ],
];

function getFormation(wave) {
  return FORMATIONS[Math.min(wave - 1, FORMATIONS.length - 1)];
}

// Tracks whether background music has been started (persists across scene switches).
let musicPlaying = false;

// ─── StartScene ───────────────────────────────────────────────────────────────

class StartScene extends Phaser.Scene {
  constructor() { super({ key: 'StartScene' }); }

  preload() {
    // Load everything here so GameScene's preload is instant.
    this.load.image('bg-far',  ASSETS.bgFar);
    this.load.image('bg-near', ASSETS.bgNear);

    for (let i = 1; i <= 8; i++) this.load.image(`ship-${i}`,      ASSETS.ship(i));
    for (let i = 1; i <= 4; i++) this.load.image(`bolt-${i}`,      ASSETS.bolt(i));
    for (let i = 1; i <= 6; i++) this.load.image(`charged-${i}`,   ASSETS.charged(i));
    for (let i = 1; i <= 8; i++) this.load.image(`alien-${i}`,     ASSETS.alien(i));
    for (let i = 1; i <= 9; i++) this.load.image(`explosion-${i}`, ASSETS.explosion(i));
    for (let i = 1; i <= 5; i++) this.load.image(`hit-${i}`,       ASSETS.hit(i));
    for (let i = 1; i <= 7; i++) this.load.image(`hit2-${i}`,      ASSETS.hit2(i));
    for (let i = 1; i <= 5; i++) this.load.image(`spark-${i}`,     ASSETS.spark(i));
    for (let i = 1; i <= 6; i++) this.load.image(`crossed-${i}`,   ASSETS.crossed(i));

    this.load.audio('sfx-shoot',        ASSETS.sfxShoot);
    this.load.audio('sfx-hit',          ASSETS.sfxHit);
    this.load.audio('sfx-explosion',    ASSETS.sfxExplosion);
    this.load.audio('sfx-player-death', ASSETS.sfxPlayerDeath);
    this.load.audio('sfx-pickup',       ASSETS.sfxPickup);
    this.load.audio('music',            ASSETS.music);
  }

  create() {
    this.bgFar  = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg-far').setOrigin(0, 0);
    this.bgNear = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg-near').setOrigin(0, 0);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.28, 'RETRO', {
      fontSize: '52px', fill: '#ffffff', fontFamily: 'monospace',
      stroke: '#003388', strokeThickness: 8,
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.38, 'SPACE SHOOTER', {
      fontSize: '30px', fill: '#aaddff', fontFamily: 'monospace',
      stroke: '#001144', strokeThickness: 6,
    }).setOrigin(0.5);

    const hi = parseInt(localStorage.getItem('spaceShooterHiScore') || '0');
    if (hi > 0) {
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.52, `HI-SCORE  ${hi}`, {
        fontSize: '16px', fill: '#ffdd44', fontFamily: 'monospace',
      }).setOrigin(0.5);
    }

    const prompt = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.63, 'PRESS SPACE TO PLAY', {
      fontSize: '20px', fill: '#ffff00', fontFamily: 'monospace',
    }).setOrigin(0.5);
    this.tweens.add({ targets: prompt, alpha: 0, duration: 550, yoyo: true, repeat: -1 });

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.75, 'ARROW KEYS / WASD to move\nSPACE to shoot', {
      fontSize: '13px', fill: '#666688', fontFamily: 'monospace', align: 'center',
    }).setOrigin(0.5);

    if (!musicPlaying && this.cache.audio.exists('music')) {
      this.sound.play('music', { loop: true, volume: 0.35 });
      musicPlaying = true;
    }

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));
  }

  update() {
    this.bgFar.tilePositionY  += 1.0;
    this.bgNear.tilePositionY += 2.5;
  }
}

// ─── GameScene ───────────────────────────────────────────────────────────────

class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  init() {
    this.score           = 0;
    this.lives           = 3;
    this.wave            = 0;
    this.lastFired       = 0;
    this.chargedShots    = 0;    // remaining charged-shot ammo
    this.invincible      = false;
    this.invincibleUntil = 0;
    this.dead            = false;
    this.deathTime       = -1;
    this.transitioning   = false;
    this.nextWavePending = false;
  }

  preload() {
    // All assets were pre-loaded by StartScene; Phaser cache skips re-fetching.
    // Listed here so GameScene works even if started directly (e.g. dev reload).
    this.load.image('bg-far',  ASSETS.bgFar);
    this.load.image('bg-near', ASSETS.bgNear);

    for (let i = 1; i <= 8; i++) this.load.image(`ship-${i}`,      ASSETS.ship(i));
    for (let i = 1; i <= 4; i++) this.load.image(`bolt-${i}`,      ASSETS.bolt(i));
    for (let i = 1; i <= 6; i++) this.load.image(`charged-${i}`,   ASSETS.charged(i));
    for (let i = 1; i <= 8; i++) this.load.image(`alien-${i}`,     ASSETS.alien(i));
    for (let i = 1; i <= 9; i++) this.load.image(`explosion-${i}`, ASSETS.explosion(i));
    for (let i = 1; i <= 5; i++) this.load.image(`hit-${i}`,       ASSETS.hit(i));
    for (let i = 1; i <= 7; i++) this.load.image(`hit2-${i}`,      ASSETS.hit2(i));
    for (let i = 1; i <= 5; i++) this.load.image(`spark-${i}`,     ASSETS.spark(i));
    for (let i = 1; i <= 6; i++) this.load.image(`crossed-${i}`,   ASSETS.crossed(i));

    this.load.audio('sfx-shoot',        ASSETS.sfxShoot);
    this.load.audio('sfx-hit',          ASSETS.sfxHit);
    this.load.audio('sfx-explosion',    ASSETS.sfxExplosion);
    this.load.audio('sfx-player-death', ASSETS.sfxPlayerDeath);
    this.load.audio('sfx-pickup',       ASSETS.sfxPickup);
    this.load.audio('music',            ASSETS.music);
  }

  create() {
    this._createBackground();
    this._createAnimations();
    this._createGroups();
    this._createPlayer();
    this._createInput();
    this._createHud();
    this._spawnWave();

    // Ensure music is running if the scene was launched directly (dev mode)
    if (!musicPlaying && this.cache.audio.exists('music')) {
      this.sound.play('music', { loop: true, volume: 0.35 });
      musicPlaying = true;
    }
  }

  update(time) {
    if (this.dead) {
      this._scrollBackground();
      if (this.deathTime < 0) this.deathTime = time;
      if (time - this.deathTime > 1200 && !this.transitioning) {
        this.transitioning = true;
        this._saveHiScore();
        this.scene.start('GameOverScene', { score: this.score, wave: this.wave });
      }
      return;
    }

    this._scrollBackground();
    this._movePlayer();
    this._handleFire(time);
    this._updateEnemies(time);
    this._cleanupOffscreen();
    this._tickInvincibility();
    this._checkBulletHits();
    this._checkPlayerCollisions();
    this._checkPickupCollection();
  }

  // ─── Private: Setup ───────────────────────────────────────────────────────

  _createBackground() {
    this.bgFar  = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg-far').setOrigin(0, 0);
    this.bgNear = this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'bg-near').setOrigin(0, 0);
  }

  _createAnimations() {
    // Guard: AnimationManager is global; don't recreate on scene restart.
    const mk = (key, frames, frameRate, repeat = -1) => {
      if (!this.anims.exists(key)) this.anims.create({ key, frames, frameRate, repeat });
    };
    mk('thrust',      Array.from({ length: 8 }, (_, i) => ({ key: `ship-${i + 1}` })),      12);
    mk('bolt-fly',    Array.from({ length: 4 }, (_, i) => ({ key: `bolt-${i + 1}` })),      16);
    mk('charged-fly', Array.from({ length: 6 }, (_, i) => ({ key: `charged-${i + 1}` })),   18);
    mk('alien-fly',   Array.from({ length: 8 }, (_, i) => ({ key: `alien-${i + 1}` })),     10);
    mk('explode',     Array.from({ length: 9 }, (_, i) => ({ key: `explosion-${i + 1}` })), 18, 0);
    mk('hit-fx',      Array.from({ length: 5 }, (_, i) => ({ key: `hit-${i + 1}` })),       20, 0);
    mk('hit2-fx',     Array.from({ length: 7 }, (_, i) => ({ key: `hit2-${i + 1}` })),      20, 0);
    mk('spark-loop',  Array.from({ length: 5 }, (_, i) => ({ key: `spark-${i + 1}` })),     12);
    mk('crossed-fx',  Array.from({ length: 6 }, (_, i) => ({ key: `crossed-${i + 1}` })),  18, 0);
  }

  _createGroups() {
    this.bullets      = this.physics.add.group();
    this.enemies      = this.physics.add.group();
    this.enemyBullets = this.physics.add.group();
    this.pickups      = this.physics.add.group();
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 90, 'ship-1');
    this.player.setScale(SHIP_SCALE);
    this.player.setCollideWorldBounds(true);
    this.player.play('thrust');
  }

  _createInput() {
    this.cursors  = this.input.keyboard.createCursorKeys();
    this.wasd     = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  _createHud() {
    this.scoreText = this.add.text(GAME_WIDTH - 12, 12, 'SCORE  0', {
      fontSize: '14px', fill: '#ffffff', fontFamily: 'monospace',
    }).setOrigin(1, 0).setDepth(10);

    // Charge ammo indicator (hidden when 0)
    this.chargeText = this.add.text(GAME_WIDTH - 12, 32, '', {
      fontSize: '13px', fill: '#00ffff', fontFamily: 'monospace',
    }).setOrigin(1, 0).setDepth(10);

    this.waveText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, '', {
      fontSize: '28px', fill: '#ffffff', fontFamily: 'monospace',
      stroke: '#000000', strokeThickness: 4,
    }).setOrigin(0.5).setAlpha(0).setDepth(10);

    this.lifeIcons = [];
    for (let i = 0; i < 3; i++) {
      this.lifeIcons.push(
        this.add.image(14 + i * 36, 14, 'ship-1').setScale(1).setOrigin(0, 0).setDepth(10)
      );
    }
  }

  // ─── Wave Spawning ────────────────────────────────────────────────────────

  _spawnWave() {
    if (this.dead) return;
    this.wave++;
    this.nextWavePending = false;

    this.waveText.setText(`WAVE  ${this.wave}`).setAlpha(1);
    this.tweens.add({ targets: this.waveText, alpha: 0, delay: 1200, duration: 600 });

    // Speed and fire rate scale with wave number
    const baseSpeed   = Math.min(80 + this.wave * 15, 300);
    const minFireMs   = Math.max(900,  2500 - this.wave * 150);
    const maxFireMs   = Math.max(2200, 5000 - this.wave * 300);

    getFormation(this.wave).forEach((pos) => {
      const enemy = this.enemies.create(pos.x * GAME_WIDTH, pos.y * GAME_HEIGHT, 'alien-1');
      enemy.setScale(ENEMY_SCALE);
      enemy.play('alien-fly');
      enemy.setVelocityY(baseSpeed);
      enemy.spawnTime  = this.time.now;
      enemy.nextFireAt = this.time.now + Phaser.Math.Between(minFireMs, maxFireMs);
    });
  }

  // ─── Enemy Logic ──────────────────────────────────────────────────────────

  _updateEnemies(time) {
    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy.active) return;
      const t  = (time - enemy.spawnTime) / 1000;
      const vx = 60 * Math.cos(1.5 * t);
      enemy.setVelocityX(vx);
      if (time > enemy.nextFireAt) {
        this._fireEnemyBolt(enemy);
        enemy.nextFireAt = time + Phaser.Math.Between(
          Math.max(900, 2500 - this.wave * 150),
          Math.max(2200, 5000 - this.wave * 300)
        );
      }
    });
  }

  _fireEnemyBolt(enemy) {
    const bolt = this.enemyBullets.create(
      enemy.x, enemy.y + enemy.displayHeight / 2 + 4, 'bolt-1'
    );
    bolt.setScale(BOLT_SCALE);
    bolt.setTint(0xff4400);
    bolt.setVelocityY(ENEMY_BULLET_SPEED);
    bolt.play('bolt-fly');
  }

  // ─── Manual Collision Checks (called from update) ─────────────────────────

  _checkBulletHits() {
    this.bullets.getChildren().forEach((bullet) => {
      if (!bullet.active) return;
      const bb       = bullet.getBounds();
      const charged  = bullet.getData('charged') === true;
      this.enemies.getChildren().forEach((enemy) => {
        if (!enemy.active) return;
        if (Phaser.Geom.Intersects.RectangleToRectangle(bb, enemy.getBounds())) {
          this._spawnHitFx(bullet.x, bullet.y, charged);
          bullet.destroy();
          this._killEnemy(enemy);
          this.score += POINTS_PER_KILL;
          this.scoreText.setText(`SCORE  ${this.score}`);
        }
      });
    });
  }

  _checkPlayerCollisions() {
    if (this.invincible || this.dead) return;
    const pb = this.player.getBounds();

    this.enemyBullets.getChildren().forEach((bullet) => {
      if (!bullet.active || this.invincible || this.dead) return;
      if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), pb)) {
        bullet.destroy();
        this._hitPlayer();
      }
    });

    this.enemies.getChildren().forEach((enemy) => {
      if (!enemy.active || this.invincible || this.dead) return;
      if (Phaser.Geom.Intersects.RectangleToRectangle(enemy.getBounds(), pb)) {
        this._killEnemy(enemy);
        this._hitPlayer();
      }
    });
  }

  _checkPickupCollection() {
    if (this.dead) return;
    const pb = this.player.getBounds();
    this.pickups.getChildren().forEach((pickup) => {
      if (!pickup.active) return;
      if (Phaser.Geom.Intersects.RectangleToRectangle(pickup.getBounds(), pb)) {
        pickup.destroy();
        this.chargedShots += CHARGED_AMMO;
        this._updateChargeHud();
        this._spawnCrossedFx(this.player.x, this.player.y);
        this._playSound('sfx-pickup');
      }
    });
  }

  // ─── Effects & State ──────────────────────────────────────────────────────

  _killEnemy(enemy) {
    const ex = enemy.x, ey = enemy.y;
    this._spawnExplosion(ex, ey, EXPLOSION_SCALE);
    this._playSound('sfx-explosion');
    enemy.destroy();
    if (Math.random() < PICKUP_DROP_CHANCE) this._spawnPickup(ex, ey);
    this._checkWaveComplete();
  }

  _hitPlayer() {
    if (this.invincible || this.dead) return;
    this.lives--;
    this._updateLivesHud();
    this._spawnExplosion(this.player.x, this.player.y, EXPLOSION_SCALE * 1.5);
    this.cameras.main.shake(220, 0.012);

    if (this.lives <= 0) {
      this._playSound('sfx-player-death');
      this._triggerGameOver();
      return;
    }
    this._playSound('sfx-hit');
    this.invincible      = true;
    this.invincibleUntil = this.time.now + 1600;
    this.player.setAlpha(1);
  }

  _triggerGameOver() {
    this.dead = true;
    this.deathTime = -1;
    this.player.body.enable = false;
    this.player.setVisible(false);
  }

  _spawnExplosion(x, y, scale) {
    const fx = this.add.sprite(x, y, 'explosion-1').setScale(scale);
    fx.play('explode');
    fx.once('animationcomplete', () => fx.destroy());
  }

  _spawnHitFx(x, y, charged = false) {
    if (charged) {
      const fx = this.add.sprite(x, y, 'hit2-1').setScale(BOLT_SCALE * 1.6);
      fx.play('hit2-fx');
      fx.once('animationcomplete', () => fx.destroy());
    } else {
      const fx = this.add.sprite(x, y, 'hit-1').setScale(BOLT_SCALE);
      fx.play('hit-fx');
      fx.once('animationcomplete', () => fx.destroy());
    }
  }

  _spawnCrossedFx(x, y) {
    const fx = this.add.sprite(x, y, 'crossed-1').setScale(1.3);
    fx.play('crossed-fx');
    fx.once('animationcomplete', () => fx.destroy());
  }

  _spawnPickup(x, y) {
    const p = this.pickups.create(x, y, 'spark-1');
    p.setScale(1.2);
    p.play('spark-loop');
    p.setVelocityY(75);
    p.setTint(0x00ffff);
  }

  _updateLivesHud() {
    this.lifeIcons.forEach((icon, i) => icon.setAlpha(i < this.lives ? 1 : 0.15));
  }

  _updateChargeHud() {
    this.chargeText.setText(this.chargedShots > 0 ? `CHARGE x${this.chargedShots}` : '');
  }

  _tickInvincibility() {
    if (!this.invincible) return;
    if (this.time.now >= this.invincibleUntil) {
      this.invincible = false;
      this.player.setAlpha(1);
    } else {
      this.player.setAlpha(Math.floor(this.time.now / 100) % 2 === 0 ? 1 : 0.15);
    }
  }

  _checkWaveComplete() {
    if (this.nextWavePending) return;
    if (this.enemies.countActive(true) === 0) {
      this.nextWavePending = true;
      this.time.delayedCall(1500, this._spawnWave, [], this);
    }
  }

  _saveHiScore() {
    const best = parseInt(localStorage.getItem('spaceShooterHiScore') || '0');
    if (this.score > best) localStorage.setItem('spaceShooterHiScore', String(this.score));
  }

  _playSound(key) {
    this.sound.play(key, { volume: 0.65 });
  }

  // ─── Per-Frame Helpers ────────────────────────────────────────────────────

  _scrollBackground() {
    this.bgFar.tilePositionY  += 1.0;
    this.bgNear.tilePositionY += 2.5;
  }

  _movePlayer() {
    const left  = this.cursors.left.isDown  || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up    = this.cursors.up.isDown    || this.wasd.up.isDown;
    const down  = this.cursors.down.isDown  || this.wasd.down.isDown;
    this.player.setVelocity(
      ((right ? 1 : 0) - (left ? 1 : 0)) * SHIP_SPEED,
      ((down  ? 1 : 0) - (up   ? 1 : 0)) * SHIP_SPEED
    );
  }

  _handleFire(time) {
    if (!this.spaceKey.isDown || time - this.lastFired <= FIRE_RATE) return;
    this.lastFired = time;

    if (this.chargedShots > 0) {
      const bolt = this.bullets.create(
        this.player.x, this.player.y - this.player.displayHeight / 2 - 4, 'charged-1'
      );
      bolt.setScale(BOLT_SCALE * 1.5);
      bolt.setVelocityY(-BULLET_SPEED * 1.1);
      bolt.play('charged-fly');
      bolt.setData('charged', true);
      this.chargedShots--;
      this._updateChargeHud();
    } else {
      const bolt = this.bullets.create(
        this.player.x, this.player.y - this.player.displayHeight / 2 - 4, 'bolt-1'
      );
      bolt.setScale(BOLT_SCALE);
      bolt.setVelocityY(-BULLET_SPEED);
      bolt.play('bolt-fly');
    }
    this._playSound('sfx-shoot');
  }

  _cleanupOffscreen() {
    this.bullets.getChildren().forEach((b) => {
      if (b.active && b.y < -b.displayHeight) b.destroy();
    });
    this.enemyBullets.getChildren().forEach((b) => {
      if (b.active && b.y > GAME_HEIGHT + b.displayHeight) b.destroy();
    });
    this.enemies.getChildren().forEach((e) => {
      if (e.active && e.y > GAME_HEIGHT + e.displayHeight) {
        e.destroy();
        this._checkWaveComplete();
      }
    });
    this.pickups.getChildren().forEach((p) => {
      if (p.active && p.y > GAME_HEIGHT + p.displayHeight) p.destroy();
    });
  }
}

// ─── GameOverScene ────────────────────────────────────────────────────────────

class GameOverScene extends Phaser.Scene {
  constructor() { super({ key: 'GameOverScene' }); }

  init(data) {
    this.finalScore = data.score || 0;
    this.finalWave  = data.wave  || 1;
    this.hiScore    = parseInt(localStorage.getItem('spaceShooterHiScore') || '0');
  }

  create() {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000011, 0.92);

    this.add.text(GAME_WIDTH / 2, 150, 'GAME OVER', {
      fontSize: '44px', fill: '#ff4444', fontFamily: 'monospace',
      stroke: '#000000', strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 250, `SCORE  ${this.finalScore}`, {
      fontSize: '24px', fill: '#ffffff', fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(GAME_WIDTH / 2, 294, `WAVE   ${this.finalWave}`, {
      fontSize: '16px', fill: '#aaaaaa', fontFamily: 'monospace',
    }).setOrigin(0.5);

    const isNewRecord = this.finalScore > 0 && this.finalScore >= this.hiScore;
    this.add.text(GAME_WIDTH / 2, 344, `HI-SCORE  ${this.hiScore}`, {
      fontSize: '18px',
      fill: isNewRecord ? '#ffff00' : '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    if (isNewRecord) {
      const nr = this.add.text(GAME_WIDTH / 2, 375, '★  NEW RECORD  ★', {
        fontSize: '14px', fill: '#ffff00', fontFamily: 'monospace',
      }).setOrigin(0.5);
      this.tweens.add({ targets: nr, alpha: 0.2, duration: 500, yoyo: true, repeat: -1 });
    }

    const btn = this.add.text(GAME_WIDTH / 2, 450, '[ PLAY AGAIN ]', {
      fontSize: '22px', fill: '#ffff00', fontFamily: 'monospace',
      stroke: '#000000', strokeThickness: 4,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover',  () => btn.setStyle({ fill: '#ffffff' }));
    btn.on('pointerout',   () => btn.setStyle({ fill: '#ffff00' }));
    btn.on('pointerdown',  () => this.scene.start('GameScene'));

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));

    this.add.text(GAME_WIDTH / 2, 492, 'SPACE to restart', {
      fontSize: '12px', fill: '#666666', fontFamily: 'monospace',
    }).setOrigin(0.5);
  }
}

// ─── Game Config ──────────────────────────────────────────────────────────────

const config = {
  type: Phaser.AUTO,
  width:  GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#05001a',
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [StartScene, GameScene, GameOverScene],
};

new Phaser.Game(config);
