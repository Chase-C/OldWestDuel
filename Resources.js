var Resources = function(callback)
{
    this.bgDesert = new Image();
    this.bgFinalD = new Image();
    this.bgGrotto = new Image();
    this.bgFetus  = new Image();

    this.bgDesert.src = './images/bg_desert.png';
    this.bgFinalD.src = './images/finald.png';
    this.bgGrotto.src = './images/bg_grotto.png';
    this.bgFetus.src = './images/fetus of god.png';

    this.p1Select    = new Image();
    this.p2Select    = new Image();
    this.bgStage     = new Image();
    this.bgCharacter = new Image();
    this.selectStage = new Image();

    this.p1Select.src    = './images/p1select.png';
    this.p2Select.src    = './images/p2select.png';
    this.bgStage.src     = './images/stageselect.png';
    this.bgCharacter.src = './images/roster.png';
    this.selectStage.src = './images/stage_selection_ring.png';

    this.sprFord   = new AnimSprite('./images/ford.png');
    this.sprBecky  = new AnimSprite('./images/becky.png');
    this.sprBently = new AnimSprite('./images/bently.png');
    this.sprClyde  = new AnimSprite('./images/clyde.png');
    this.sprGrape  = new AnimSprite('./images/grape.png');
    this.sprFido   = new AnimSprite('./images/fido.png');

    this.sprFordGun   = new AnimSprite('./images/gun_green.png');
    this.sprBeckyGun  = new AnimSprite('./images/gun_blue.png');
    this.sprBentlyGun = new AnimSprite('./images/gun_yellow.png');
    this.sprClydeGun  = new AnimSprite('./images/gun_orange.png');
    this.sprGrapeGun  = new AnimSprite('./images/gun_pink.png');
    this.sprFidoGun   = new AnimSprite('./images/gun_brown.png');

    this.sprBlood = new AnimSprite('./images/blood.png');
    this.sprBlood.addAnim(3, 0, 0, 8, 8, 100, false);

    this.chars = [this.sprFord, this.sprGrape, this.sprBecky, this.sprClyde, this.sprBently, this.sprFido];
    for (var i = 0; i < this.chars.length; i++) {
        this.chars[i].addAnim(3, 0,   0, 35, 31, 100, true);
        this.chars[i].addAnim(2, 35,  0, 35, 31, 100, true);
        this.chars[i].addAnim(1, 70,  0, 35, 31, 100, true);
        this.chars[i].addAnim(2, 105, 0, 35, 31, 200, false);
    }

    this.guns = [this.sprFordGun, this.sprGrapeGun, this.sprBeckyGun, this.sprClydeGun, this.sprBentlyGun, this.sprFidoGun];
    for (var i = 0; i < this.guns.length; i++) {
        this.guns[i].addAnim(3, 0, 0, 20, 8, 60, false);
    }

    this.selectStage.onload = callback;
}

Resources.prototype =
{
}
