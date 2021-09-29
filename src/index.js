import 'phaser-ce';
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TEXT_FONT = "65px Arial";
const TEXT_COLOR = "#000";
const TEXT_ALIGNMENT = "center";
const DISABLED_SQUARE= 0x9b9b9b;
const ENABLED_SQUARE = 0xffffff;

const redStyle = {
    font: TEXT_FONT,
    fill:"#ff0044", 
    align:TEXT_ALIGNMENT
}
const regularStyle = {
    font: TEXT_FONT,
    fill: TEXT_COLOR,
    align: TEXT_ALIGNMENT
}
const game = new Phaser.Game(
    GAME_WIDTH,
    GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
        preload: preload,
        create: create,
        update: update
    });

let counter = 0;
let result;
let sumSquare;
let substractSquare;
let ufo;

function preload() {
    game.load.image('ufo', 'src/assets/ufo.png')
}

function create() {

    game.stage.backgroundColor = '#e3e4e5';

    const rectangle = game.add.graphics();
    rectangle.lineStyle(2, 0x000, 1);
    rectangle.beginFill(0xffffff);
    rectangle.drawRect(250, 150, 300,100);
    rectangle.endFill();

    result = game.add.text(
        game.world.centerX,
        game.world.centerY,
        counter,
        regularStyle
        );

    result.anchor.setTo(0.5, 1.85);

    sumSquare = game.add.graphics();
    sumSquare.lineStyle(2, 0x000, 1);
    sumSquare.beginFill(0xffffff);
    sumSquare.drawRect(250, 300, 100,100);
    sumSquare.endFill();

    const sumOperator = game.add.text(
        250,
        300,
        "+",
        regularStyle
    );
    
    sumOperator.anchor.setTo(-0.75, -0.15);

    substractSquare = game.add.graphics();
    substractSquare.lineStyle(2, 0x000, 1);
    substractSquare.beginFill(0xffffff);
    substractSquare.drawRect(450, 300, 100,100);
    substractSquare.endFill();

    const substractOperator = game.add.text(
        470,
        270,
        "-",
        regularStyle
    );
    
    substractOperator.anchor.setTo(-0.75, -0.5);
    createEvent()
    
}

function sumEvent() {
    sumSquare.inputEnabled = true;
    sumSquare.input.useHandCursor = true;
    sumSquare.events.onInputDown.add(sumHandler, this);

}

function substractEvent() {
    substractSquare.inputEnabled = true;
    substractSquare.input.useHandCursor = true;
    substractSquare.events.onInputDown.add(substractHandler, this);

}

function createEvent() {
    if (counter === 0) {
        sumEvent()
        substractSquare.inputEnabled = false;
        substractSquare.tint = DISABLED_SQUARE;

    } else if (counter === 10){
        sumSquare.inputEnabled = false;
        substractEvent()
        result.setStyle(redStyle);
        sumSquare.tint = DISABLED_SQUARE;
    }
    else {
        sumEvent()
        substractEvent()
        result.setStyle(regularStyle);
        sumSquare.tint = ENABLED_SQUARE;
        substractSquare.tint = ENABLED_SQUARE;
    }
    
}

function sumHandler() {
    counter ++
    result.text = counter;
    createEvent()
    ufoAppears()

}
function substractHandler() {
    counter --
    result.text = counter;
    createEvent()
    ufoAppears()
}

function createSprite() {
    ufo = game.add.sprite(game.world.centerX,-200,'ufo');
    ufo.anchor.set(0.5,0.5);
}

function randomNumber(min,max) {
    const randomNumber = Math.floor(Math.random()* (max-min+1)+min);
    return randomNumber;
}

function ufoAppears() {
    createSprite()
    game.add.tween(ufo).to(
        {
            x:randomNumber(0,800),
            y:randomNumber(0,600)
        }, 
        4000, 
        Phaser.Easing.Bounce.Out,
        true
    );
    
}

function update() {

    
}