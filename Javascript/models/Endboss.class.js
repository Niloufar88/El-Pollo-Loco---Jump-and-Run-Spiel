/**
 * @class Endboss
 * represents the final boss in the game, a giant chicken.
 * @extends MovableObject
 * @property {number} health - The health of the endboss.
 * @property {number} damage - the damage which reduces endboss health when hit by the bottles.
 * @property {boolean} isAttacking - Sets true if the endboss is currently attacking and false when not.
 * @property {boolean} isHurt - Sets true if the endboss is currently hurt and false when not.
 * @property {boolean} isPlayingDeadSound - Sets true if the death sound is currently playing and false when not.
 * @property {boolean} isPlayingGrwolSound - Sets true if the growl sound is currently playing and false when not.
 * @property {boolean} pepeWon - Sets true if the player has won against the endboss and false when not.
 */

class Endboss extends MovableObject {
  constructor(imagePath) {
    super();

    //Position
    this.x = 3200;
    this.y = 40;
    this.width = 400;
    this.height = 400;

    //offset size
    this.collisionWidth = 320;
    this.collisionHeight = 320;
    this.offsetX = (this.width - this.collisionWidth) / 2;
    this.offsetY = (this.height - this.collisionHeight) / 2;

    //Animation Speed
    this.alertSpeed = 250;
    this.walkSpeed = 100;
    this.attackSpeed = 150;
    this.hurtSpeed = 150;
    this.deadSpeed = 150;

    //speed
    this.speedX = 1;

    //state
    this.isAttacking = false;
    this.isHurt = false;
    this.isPlayingDeadSound = false;
    this.isPlayingGrwolSound = false;
    this.pepeWon = false;

    //health and damage
    this.health = 100;
    this.damage = 10;

    //Image Arrays
    this.BOSS_ALERT = [
      "assets/img/enemies/boss chicken/2_alert/G5.png",
      "assets/img/enemies/boss chicken/2_alert/G6.png",
      "assets/img/enemies/boss chicken/2_alert/G7.png",
      "assets/img/enemies/boss chicken/2_alert/G8.png",
      "assets/img/enemies/boss chicken/2_alert/G9.png",
      "assets/img/enemies/boss chicken/2_alert/G10.png",
      "assets/img/enemies/boss chicken/2_alert/G11.png",
      "assets/img/enemies/boss chicken/2_alert/G12.png",
    ];

    this.BOSS_ATTACK = [
      "assets/img/enemies/boss chicken/3_attack/G13.png",
      "assets/img/enemies/boss chicken/3_attack/G14.png",
      "assets/img/enemies/boss chicken/3_attack/G15.png",
      "assets/img/enemies/boss chicken/3_attack/G16.png",
      "assets/img/enemies/boss chicken/3_attack/G17.png",
      "assets/img/enemies/boss chicken/3_attack/G18.png",
      "assets/img/enemies/boss chicken/3_attack/G19.png",
      "assets/img/enemies/boss chicken/3_attack/G20.png",
    ];

    this.BOSS_HURT = [
      "assets/img/enemies/boss chicken/4_hurt/G21.png",
      "assets/img/enemies/boss chicken/4_hurt/G22.png",
      "assets/img/enemies/boss chicken/4_hurt/G23.png",
    ];

    this.BOSS_DEAD = [
      "assets/img/enemies/boss chicken/5_dead/G24.png",
      "assets/img/enemies/boss chicken/5_dead/G25.png",
      "assets/img/enemies/boss chicken/5_dead/G26.png",
    ];

    this.loadImage(this.BOSS_ALERT[0]);
    this.loadImages(this.BOSS_ALERT);
    this.loadImages(this.BOSS_ATTACK);
    this.loadImages(this.BOSS_HURT);
    this.loadImages(this.BOSS_DEAD);
  }

  /**
   * @method update - updates endboss state to execute accordingly animations and movements.
   * @param {Object} character - The main character in the game, used to determine endboss actions.
   */
  update(character) {
    if (this.isDead) {
      this.playAnimation(this.BOSS_DEAD, this.deadSpeed, true);
      return;
    }
    let distance = Math.abs(this.x - character.x);
    if (distance <= 300) {
      this.isAttacking = true;
      this.isPlayingGrwolSound = true;
    } else {
      this.isAttacking = false;
      this.isPlayingGrwolSound = false;
    }
    if (this.isHurt) this.playAnimation(this.BOSS_HURT, this.hurtSpeed);
    else if (this.isAttacking) {
      this.playAnimation(this.BOSS_ATTACK, this.attackSpeed);
      this.moveTowardsPlayer(character);
    } else if (distance <= 500)
      this.playAnimation(this.BOSS_ALERT, this.alertSpeed);
  }

  /**
   * @method moveTowardsPlayer - moves the endboss towards the player when attacking.
   * @param {Object} player - The main character in the game, used to determine endboss movements.
   */
  moveTowardsPlayer(player) {
    if (player.x < this.x) this.x -= this.speedX;
  }

  /**
 * @method hurt - by hiting with bottles will the health of endboss reduces.
 * @param {Number} damage 
 
 */
  hurt(damage) {
    if (this.isDead) return;
    this.health -= damage;
    this.isHurt = true;

    if (this.health <= 0) this.die();
    else
      setTimeout(() => {
        this.isHurt = false;
      }, 500);
  }

  /**
   * @method reset - reset all the properties to the initial state.
   */
  reset() {
    this.x = 3200;
    this.y = 40;

    this.health = 100;
    this.isDead = false;
    this.isAttacking = false;
    this.pepeWon = false;
    this.isPlayingDeadSound = false;
  }
}
