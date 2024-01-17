/*
TODO:
cleanup code further (wait for Papa's stuff)
add fake squidical level
*/



//temp
blockSettings.writeNumber('everything', 1)

let power_usage_sprites: Sprite[] = [
    sprites.create(assets.image`powerBarGreen`),
    sprites.create(assets.image`powerBarGreen`),
    sprites.create(assets.image`powerBarYellow`),
    sprites.create(assets.image`powerBarRed`)
]
let power_text = textsprite.create('')
let time_text = textsprite.create('')
let night_text = textsprite.create('')
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
let monitor_room_text = textsprite.create('')
let monitor_map_sprite: Sprite = null
let monitor_anim: Image[] = [
    assets.image`monitorRecordIndicator`, image.create(13, 13)   
]
let cam_select = sprites.create(assets.image`camSelect`)
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
let twelve_am_text = textsprite.create('12:00 AM')
//menu
let menu_winston: Sprite = null
let menu_selector = sprites.create(assets.image`menuSelector`)
let menu_title = [
    textsprite.create('Five Nights'),
    textsprite.create("at Winston's"),
    textsprite.create('2')
]
let menu_option_texts = [
    textsprite.create('Play'),
    textsprite.create('Continue'),
    textsprite.create('6th Night')
]
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



// Winston
'Show Stage': {
    'Dining Area': () => 1
},
'Dining Area': {
    'East Hall 1': () => 50-this.level*2,
    'Kitchen': () => 50+this.level*2
},
'East Hall 1': {
    'Dining Area': () => 25-this.level,
    'East Hall 2': () => 75+this.level*3
},
'East Hall 2': {
    'East Hall 1': () => 25-this.level,
    'East Hall 3': () => 75+this.level*3
},
'East Hall 3': {
    'South Hall': () => 75+this.level*3,
    'East Hall 2': () => 25-this.level
},
'South Hall': {
    'Kitchen': () => 50,
    'East Hall 3': () => 50
},
'Kitchen': {
    'South Hall': () => 75+this.level*3,
    'Dining Area': () => 25-this.level
},
}

// HAL RIGHT
'Arcade': {
    'East Hall 3': () => 20+this.level/2,
    'Bathrooms': () => 20-this.level,
    'Laser Tag Prep': () => 20-this.level,
    'South Hall': () => 20+this.level,
    'East Hall 2': () => 20-this.level
},
'Bathrooms': {
    'Arcade': () => 40-this.level*1.75,
    'East Hall 3': () => 30+this.level*0.25,
    'South Hall': () => 30+this.level*2
},
'East Hall 3': {
    'Arcade': () => 25-this.level,
    'Kitchen': () => 25-this.level,
    'Laser Tag Prep': () => 25-this.level,
    'East Hall 2': () => 25-this.level,
    'Changing Rooms': () => 25-this.level,
    'South Hall': () => 25+this.level*5,
    'Right Door': () => 25+this.level*10
},
'Right Door': {
    'South Hall': () => 50,
    'Kitchen': () => 25+this.level,
    'East Hall 3': () => 25-this.level
},
'Kitchen': {
    'South Hall': () => 20+this.level,
    'Dining Area': () => 20-this.level
},
'Laser Tag Prep': {
    'South Hall': () => 50+this.level,
    'East Hall 3': () => 50+this.level*0.5,
    'Arcade': () => 50-this.level
},
'South Hall': {
    'Arcade': () => 25-this.level,
    'Kitchen': () => 50-this.level,
    'East Hall 3': () => 25-this.level,
    'East Hall 2': () => 25-this.level,
    'Right Door': () => 50+this.level*3.5,
    'Laser Tag Prep': () => 25-this.level
},
'East Hall 2': {
    'Arcade': () => 25-this.level,
    'East Hall 3': () => 25+this.level,
    'Changing Rooms': () => 20-this.level,
    'East Hall 1': () => 20-this.level,
    'South Hall': () => 25+this.level*2
},
'Dining Area': {
    'Kitchen': () => 25+this.level*2,
    'South Hall': () => 25+this.level*3
},
'North Hall': {
    'Kitchen': () => 60+this.level*5,
    'Dining Area': () => 60
},
'Furnace Room': {
    'North Hall': () => 25+this.level,
    'Dining Area': () => 25+this.level*3
},
'Left Door': {
    'North Hall': () => 100+this.level*5,
    'West Hall': () => 100+this.level,
    'Furnace Room': () => 100-this.level*5
},
'West Hall': {
    'North Hall': () => 50+this.level,
    'Furnace Room': () => 50-this.level*2,
    'Dining Area': () => 50+this.level*4
},
'East Hall 1': {
    'Dining Area': () => 50+this.level,
    'East Hall 2': () => 50
},
'Changing Rooms': {
    'East Hall 2': () => 50,
    'East Hall 1': () => 50-this.level*2,
    'East Hall 3': () => 50+this.level*2
},
}

// HAL LEFT
'Arcade': {
    'East Hall 3': () => 20+this.level/2,
    'Bathrooms': () => 20-this.level,
    'Laser Tag Prep': () => 20-this.level,
    'South Hall': () => 20-this.level,
    'East Hall 2': () => 20+this.level*2
},
'Bathrooms': {
    'Arcade': () => 40-this.level*1.75,
    'East Hall 3': () => 30+this.level*2,
    'South Hall': () => 30-this.level
},
'East Hall 3': {
    'Arcade': () => 25-this.level,
    'Kitchen': () => 25-this.level,
    'Laser Tag Prep': () => 25-this.level,
    'East Hall 2': () => 25+this.level*5,
    'Changing Rooms': () => 25+this.level,
    'South Hall': () => 25-this.level
},
'Right Door': {
    'South Hall': () => 50-this.level*2,
    'Kitchen': () => 25+this.level*5,
    'East Hall 3': () => 25+this.level*5
},
'Kitchen': {
    'South Hall': () => 20-this.level,
    'Dining Area': () => 20+this.level*3
},
'Laser Tag Prep': {
    'South Hall': () => 50-this.level*2,
    'East Hall 3': () => 50+this.level*2,
    'East Hall 2': () => 50+this.level*3,
    'Arcade': () => 50-this.level*2
},
'South Hall': {
    'Arcade': () => 25-this.level,
    'Kitchen': () => 50+this.level*2,
    'East Hall 3': () => 25-this.level,
    'East Hall 2': () => 25-this.level,
    'Laser Tag Prep': () => 25-this.level
},
'East Hall 2': {
    'Arcade': () => 25-this.level,
    'East Hall 3': () => 25-this.level,
    'Changing Rooms': () => 20-this.level,
    'East Hall 1': () => 20+this.level*3,
    'South Hall': () => 25-this.level
},
'Dining Area': {
    'North Hall': () => 30+this.level*2,
    'West Hall': () => 25+this.level*3,
    'Furnace Room': () => 20+this.level
},
'North Hall': {
    'West Hall': () => 60+this.level*3,
    'Furnace Room': () => 60-this.level*2,
    'Left Door': () => 60+this.level*5
},
'Furnace Room': {
    'North Hall': () => 25+this.level,
    'West Hall': () => 25+this.level*2,
    'Dining Area': () => 25-this.level
},
'Left Door': {
    'North Hall': () => 100+this.level,
    'West Hall': () => 50+this.level*3,
    'Furnace Room': () => 100-this.level
},
'West Hall': {
    'North Hall': () => 50-this.level*2,
    'Furnace Room': () => 50-this.level*2,
    'Dining Area': () => 20-this.level,
    'Left Door': () => 60+this.level*4
},
'East Hall 1': {
    'Dining Area': () => 50+this.level*2,
    'East Hall 2': () => 50-this.level*2
},
'Changing Rooms': {
    'East Hall 2': () => 50-this.level*2,
    'East Hall 1': () => 50+this.level*2,
    'Dining Area': () => 30+this.level*5
},
}

// Fuzzy
'Lab': {
    'Kitchen Tools': () => 1
},
'Kitchen Tools': {
    'Kitchen': () => 1
},
'Kitchen': {
    'South Hall': () => 1
},
'South Hall': {
    if(!scenes.game.rightWall.door && scenes.game.camRot === 0: {
        'office': () => 1
},
    } else {
        'Kitchen': () => 1
},
        this.dir = false;
    }}


'South Hall': {
    'Kitchen': () => 1
},
'Kitchen': {
    'Kitchen Tools': () => 1
},
'Kitchen Tools': {
    'Kitchen': () => 1
},
    this.dir = true;
}
*/