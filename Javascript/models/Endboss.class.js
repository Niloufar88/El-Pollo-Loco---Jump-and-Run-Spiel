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

  update(character) {
    if (this.isDead) {
      this.playAnimation(this.BOSS_DEAD, this.deadSpeed, true);
      return;
    }

    let distance = Math.abs(this.x - character.x);

    if (distance <= 300) this.isAttacking = true;
    else this.isAttacking = false;

    if (this.isHurt) this.playAnimation(this.BOSS_HURT, this.hurtSpeed);
    else if (this.isAttacking) {
      this.playAnimation(this.BOSS_ATTACK, this.attackSpeed);
      this.moveTowardsPlayer(character);
    } else if (distance <= 500)
      this.playAnimation(this.BOSS_ALERT, this.alertSpeed);
  }

  moveTowardsPlayer(player) {
    if (player.x < this.x) this.x -= this.speedX;
  }

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
}
