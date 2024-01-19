/*

TODO:
 - cleanup code further (wait for Papa's stuff)
 - add fake squidical level
 - add Golden Winston
 - add custom night
 - add Sam chilling in office before jumpscare
 - add winston music
 - add power out scene
*/



//temp
blockSettings.writeNumber('everything', 1)

let power_usage_sprites: Sprite[] = null
let power_text: TextSprite = null
let time_text: TextSprite = null
let night_text: TextSprite = null
//office
let office_backgrounds: string[] = [
    'officeLeft',
    'officeRight'
]
let back_door_sprite: Sprite = null
let door_sprites: Sprite[] = [null, null]
let door_light_sprites: Sprite[] = [null, null]
let window_light_sprites: Sprite[] = [null, null]
let left_door_ani_sprites: { [key: string]: Sprite } = {
    'hopps': null,
    'hal': null
}
let right_door_ani_sprites: { [key: string]: Sprite } = {
    'ohnoes':  null,
    'hal': null
}
//monitor
let monitor_room_text: TextSprite = null
let monitor_map_sprite: Sprite = null
let monitor_anim: Image[] = [
    assets.image`monitorRecordIndicator`, image.create(13, 13)   
]
let cam_select: Sprite = null
let monitor_anim_sprite: Sprite = null
//let kitchen_texts = [
//    textsprite.create('Cam Disabled'),
//    textsprite.create('Audio Only')
//]
let kitchen_text: Sprite = null
let monitor_label_sprite: Sprite = null
//transitions
let six_am_slit: Sprite = null
let six_am_slide: Sprite = null
let twelve_am_text: TextSprite = null
//menu
let menu_winston: Sprite = null
let menu_selector: Sprite = null
let menu_title: TextSprite[] = null
let menu_option_texts: TextSprite[] = null
//jumpscare
let jumpscare_sprite: Sprite = null
let jumpscare_timer: Timer = null
let static_anim: Image[] = null
let static_anim_sprite: Sprite = null
//other random stuffis
let hal_sounds: SoundBuffer[]

scene.setBackgroundColor(15)

class Animatronic {
    level: number = 0
    start_room: string
    room: string
    wait: number
    leave_time: number
    enter_time: number
    move_timer: Timer = new Timer
    mode_timer: Timer = new Timer
    mode_limit: number
    mode: number
    leave_timer: Timer = new Timer
    move_table: { [key: string]: { [key: string]: () => number } }
    paused: boolean
    surprise: boolean = false
    monitor_images: { [key: string]: string } = null
    monitor_sprite: Sprite
    constructor(start_room: string) {
        this.start_room = start_room
    }

    reset() {
        this.room = this.start_room
    }
    move() { }
    update() { }
    pause() { }
    play() { }
    load() {
        if (this.monitor_images != null) {
            this.monitor_sprite = sprites.create(createImage(this.monitor_images['generic']), SpriteKind.inram)
        }
    }
    display(room: string) { }
}

function jumpscare_sound() {
    music.setVolume(255)
    music.bigCrash.play()
    music.smallCrash.play()
    music.knock.play()
}

//Globals
let game_state = new Game
game_state.reset()
let time = 0
let night = 1
let game_timer = new Timer
let menu_pos = 0
let cams: { [key: string]: string[] } = {
    //              Left            Right           Down        Up
    'Show Stage': ['Backstage', 'East Hall 1', 'Dining Area', 'Show Stage'],
    'Backstage': ['Backstage', 'Dining Area', 'Supply Closet', 'Show Stage'],
    'Dining Area': ['Backstage', 'Spare Room', 'Supply Closet', 'Show Stage'],
    'Supply Closet': ['Dining Area', 'Spare Room', 'North Hall', 'Dining Area'],
    'North Hall': ['West Hall', 'Kitchen', 'Furnace Room', 'Supply Closet'],
    'West Hall': ['West Hall', 'Furnace Room', 'West Hall', 'North Hall'],
    'Furnace Room': ['West Hall', 'Kitchen', 'South Hall', 'North Hall'],
    'South Hall': ['South Hall', 'Kitchen Tools', 'Arcade', 'Furnace Room'],
    'Kitchen': ['Furnace Room', 'East Hall 2', 'Kitchen Tools', 'Spare Room'],
    'Kitchen Tools': ['South Hall', 'Laser Tag Prep', 'East Hall 3', 'Kitchen'],
    'Arcade': ['Arcade', 'Bathrooms', 'Arcade', 'South Hall'],
    'Spare Room': ['Dining Area', 'Changing Rooms', 'Kitchen', 'East Hall 1'],
    'Bathrooms': ['Arcade', 'DIE', 'Bathrooms', 'East Hall 3'],
    'East Hall 1': ['Show Stage', 'Changing Rooms', 'Spare Room', 'East Hall 1'],
    'East Hall 2': ['Kitchen', 'Changing Rooms', 'Kitchen Tools', 'Spare Room'],
    'East Hall 3': ['Kitchen Tools', 'Laser Tag Prep', 'Bathrooms', 'East Hall 2'],
    'Laser Tag Prep': ['Kitchen Tools', 'Laser Tag Prep', 'East Hall 3', 'East Hall 2'],
    'Changing Rooms': ['East Hall 2', 'Squid Reef', 'Laser Tag Prep', 'Changing Rooms'],
    'Squid Reef': ['Changing Rooms', 'Squid Reef', 'Squid Reef', 'Squid Reef'],
    'DIE': ['Bathrooms', 'DIE', 'DIE', 'DIE']
}
let cam_positions: { [key: string]: number[] } = {
    'Show Stage': [45, 11],
    'Backstage': [28, 27],
    'Dining Area': [41, 31],
    'Supply Closet': [36, 41],
    'North Hall': [43, 56],
    'West Hall': [33, 64],
    'Furnace Room': [48, 63],
    'South Hall': [57, 73],
    'Kitchen': [66, 51],
    'Kitchen Tools': [73, 71],
    'Arcade': [63, 88],
    'Spare Room': [73, 33],
    'Bathrooms': [77, 92],
    'East Hall 1': [77, 23],
    'East Hall 2': [80, 54],
    'East Hall 3': [83, 79],
    'Laser Tag Prep': [88, 72],
    'Changing Rooms': [95, 45],
    'Squid Reef': [112, 45],
    'DIE': [125, 92]
}
let ani_AI = {
    'win':    [0, 0, 3,  8,  13, 15, 0],
    'hopps':  [3, 6, 10, 12, 14, 15, 0],
    'ohnoes': [3, 6, 10, 12, 14, 15, 0],
    'squid':  [0, 6, 8,  10, 12, 15, 0],
    'hal':    [0, 1, 4,  7,  12, 15, 0],
    'pant':   [0, 0, 3,  6,  9,  15, 0],
    'sam':    [0, 0, 1,  6,  10, 15, 0],
    'fuzz':   [0, 0, 0,  1,  9,  15, 0]
}

let ani: { [key: string]: Animatronic }

let the_update_handler: () => void = null
let last_game_runtime: number = 0
let spf: number
let stats = null//textsprite.create("")
//stats.x = 0
//stats.y = 10

let mygame = new Fnaw
mygame.set_scene('menu')
/*
GOLDEN WINSTON

GWT: new Timer(),
        startGame: function() {
            this.GWTT = false; // Golden Winston Toggle Thing
            this.GW = false; // Golden Winston
            this.GWwC = random(5) < 1; // Golden Winston will Come
            this.GWCT = random(516); // Golden Winston Come Time
            this.GWD = random(10, 20); // Golden Winston Death
            this.GWDe = false; // Golden Winston Dead
            this.GWT.stop();
            this.GWT.start();
-----------------------<update>----------------------------------
var ttttt = true;
            for(var i in ani) {
                if(ani.room === "office") {
                    ttttt = false;
                }
            }
if(this.GWT.getTime() > this.GWCT && this.GWwC && !this.GWTT && this.camRot === 0 && !powerOut) {
                this.GWTT = true;
            }                                
            if(this.GWTT && this.camRot > 0 && !this.GW && this.GWwC && this.aniIn === "" && ttttt && !powerOut) {
                this.GWTT = false;                              
                this.GW = true;
                this.GWT.reset();
            }
            if(this.GW && this.camRot === 0) {
                this.GW = false;
                this.GWwC = false;
            }
            if(this.GW && this.camRot > 0 && this.GWT.getTime() > this.GWD) {
                this.GWDe = true;
            }

--------------<Other Uses>-----------------------------
if(this.runPos >= 100 && scenes.game.aniIn === "" && !scenes.game.GW) {
                scenes.game.aniIn = "pant";
            } else {

if(this.runPos >= 200 && !scenes.game.GW) {
                if(scenes.game.rightWall.door === false || scenes.game.rightWall.doorY < 300 && !powerOut) {
                    if(scenes.game.aniIn === "" || scenes.game.aniIn === "squid") {
                        scenes.game.squidJumpscare = true;
                    }

if(!this.GW) {
                    this.backButton.update();
                    BACK = this.backButton.choice;
                } else {
                    this.backButton.choice = false;
                    BACK = false;
if(this.GWDe) {
                        goldenWinston(300, 300, 800);
                        throw{message: "Golden Winston crashed this program!"};
                    }
                    if(this.GW) {
                        goldenWinston(300, 400, 400);
                    }
                } else {
*/



/*
switch () {
    case 'Show Stage': {
        break
    }
    case 'Backstage': {
        break
    }
    case 'Dining Area': {
        break
    }
    case 'Supply Closet': {
        break
    }
    case 'North Hall': {
        break
    }
    case 'West Hall': {
        break
    }
    case 'Furnace Room': {
        break
    }
    case 'South Hall': {
        break
    }
    case 'Kitchen': {
        break
    }
    case 'Kitchen Tools': {
        break
    }
    case 'Arcade': {
        break
    }
    case 'Spare Room': {
        break
    }
    case 'Bathrooms': {
        break
    }
    case 'East Hall 1': {
        break
    }
    case 'East Hall 2': {
        break
    }
    case 'East Hall 3': {
        break
    }
    case 'Laser Tag Prep': {
        break
    }
    case 'Changing Rooms': {
        break
    }
    case 'Squid Reef': {
        break
    }
    default: {
        break
    }
}
*/