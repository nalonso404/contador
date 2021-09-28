import 'phaser-ce';
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TEXT_FONT = "65px Arial";
const TEXT_COLOR = "#ff0044";
const TEXT_ALIGNMENT = "center";


let counter = 0;
let result;
let sumSquare
let substractSquare


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

}

function create() {
   //rectangulo resultado
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

function createEvent () {
    if (counter === 0) {
        sumSquare.inputEnabled = true;
        sumSquare.input.useHandCursor = true;
        sumSquare.events.onInputDown.add(sumHandler, this);

        substractSquare.inputEnabled = false;

    } else if (counter === 10){
        sumSquare.inputEnabled = false;
        
        substractSquare.inputEnabled = true;
        substractSquare.input.useHandCursor = true;
        substractSquare.events.onInputDown.add(substractHandler, this);
    }
    else {
        sumSquare.inputEnabled = true;
        sumSquare.input.useHandCursor = true;
        sumSquare.events.onInputDown.add(sumHandler, this);

        substractSquare.inputEnabled = true;
        substractSquare.input.useHandCursor = true;
        substractSquare.events.onInputDown.add(substractHandler, this);
    }
    
}

function sumHandler() {
    counter ++
    result.text = counter;
    createEvent()

}
function substractHandler () {
    counter --
    result.text=counter;
    createEvent()

}
function update() {

}