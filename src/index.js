import 'phaser-ce';
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TEXT_FONT = "65px Arial";
const TEXT_COLOR = "#000";
const TEXT_ALIGNMENT = "center";


let counter = 0;
let result;
let sumSquare;
let substractSquare;
let ufo;


const style = {font: TEXT_FONT,fill:"#ff0044", align:TEXT_ALIGNMENT}

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

function preload() {
    game.load.image('ufo', 'src/assets/ufo.png')
}

function create() {

    game.stage.backgroundColor = '#e3e4e5';


    let rectangle = game.add.graphics();
    rectangle.beginFill(0xffffff);
    rectangle.drawRect(250, 150, 300,100);
    rectangle.endFill();

    result = game.add.text(
        game.world.centerX,
        game.world.centerY,
        counter,
        {
        font: TEXT_FONT,
        fill: TEXT_COLOR,
        align: TEXT_ALIGNMENT
    });
    result.anchor.setTo(0.5, 2);

    sumSquare = game.add.graphics();
    sumSquare.beginFill(0xffffff);
    sumSquare.drawRect(250, 300, 100,100);
    sumSquare.endFill();

    let sumOperator= game.add.text(
        250,
        300,
        "+",
        {
        font: TEXT_FONT,
        fill: TEXT_COLOR,
        align: TEXT_ALIGNMENT});
        sumOperator.anchor.setTo(-0.75, -0.15);

    substractSquare = game.add.graphics();
    substractSquare.beginFill(0xffffff);
    substractSquare.drawRect(450, 300, 100,100);
    substractSquare.endFill();

    let substractOperator= game.add.text(
        470,
        270,
        "-",
        {
        font: TEXT_FONT,
        fill: TEXT_COLOR,
        align: TEXT_ALIGNMENT});
        substractOperator.anchor.setTo(-0.75, -0.5);
        
        createEvent()
    
}
function sumEvent () {
    sumSquare.inputEnabled = true;
    sumSquare.input.useHandCursor = true;
    sumSquare.events.onInputDown.add(sumHandler, this);
    
}

function substractEvent () {
    substractSquare.inputEnabled = true;
    substractSquare.input.useHandCursor = true;
    substractSquare.events.onInputDown.add(substractHandler, this);
    
}

function createEvent () {
    if (counter === 0) {
        sumEvent ()
        substractSquare.inputEnabled = false;
        substractSquare.tint = 0x9b9b9b

    } else if (counter === 10){
        sumSquare.inputEnabled = false;
        substractEvent ()
        result.setStyle(style)
        sumSquare.tint = 0x9b9b9b
    }
    else {
        sumEvent ()
        substractEvent ()
        result.setStyle({font: TEXT_FONT,fill:"#000", align:TEXT_ALIGNMENT})
        sumSquare.tint = 0xffffff
        substractSquare.tint = 0xffffff
    }
    
}

function sumHandler() {
    counter ++
    result.text = counter;
    createEvent()
    ufoAppears()

}
function substractHandler () {
    counter --
    result.text=counter;
    createEvent()
    ufoFriend()

}

function createSprite () {
    ufo= game.add.sprite(game.world.centerX,-200,'ufo')
    ufo.anchor.set(0.5,0.5)
}

function ufoAppears() {
    createSprite()
    game.add.tween(ufo).to( {x:200, y: game.world.centerY}, 4000, Phaser.Easing.Bounce.Out, true);
}

function ufoFriend () {
    createSprite()
    game.add.tween(ufo).to( { x:600,y: 200 }, 4000, Phaser.Easing.Bounce.Out, true);
}

function update() {

}