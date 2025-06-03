/*  TODO
 - add 3D office
 - add sam glitch
 - Size optimizations
    - point to slimmed down device library in github
    - use byte arrays for setting palette in load_monitor_room and elsewhere
    - use const MY_KEY = 1234 instead of "myKey" (strings cost 2B per character). Maybe use enum
    - use palette library instead of color fading
    - use /?compiler=size#editor to get the size stuff
*/
// If you expirence a 989 crash on the hardware that you don't expirence on the simulator,
// it's probably something stupid with light.setAll(0)


blockSettings.writeNumber('everything', 1)
//blockSettings.remove('night')

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
let power_out_winston_sprite: Sprite = null
let golden_winston_sprite: Sprite = null
//monitor
let background_sprite: Sprite = null
let monitor_room_text: TextSprite = null
let monitor_map_sprite: Sprite = null
let monitor_anim_timer: Timer = null
let cam_select: Sprite = null
let monitor_anim_sprite: Sprite = null
let kitchen_text: Sprite = null
let monitor_label_sprite: Sprite = null
//decals
let show_stage_decal: Sprite = null
let left_furnace_room_decal: Sprite = null
let right_furnace_room_decal: Sprite = null
let door_decal1: Sprite = null
let door_decal2: Sprite = null
let supply_closet_decal: Sprite = null
let arcade_decal1: Sprite = null
let arcade_decal2: Sprite = null
let winston_backstage_decals: Sprite[] = [null, null, null]
let oh_noes_backstage_decal: Sprite = null
let squidical_backstage_decal: Sprite = null
let hopper_backstage_decal: Sprite = null
let squid_reef_door_frame_decal: Sprite = null
let squid_reef_door_decal: Sprite = null
let dining_area_chair_decal1: Sprite = null
let dining_area_chair_decal2: Sprite = null
//transitions
let texts: TextSprite[] = null
let six_am_still: TextSprite = null
let six_am_slide_top: TextSprite = null
let six_am_slide_bottom: TextSprite = null
let six_am_slit: Sprite = null
let twelve_am_text: TextSprite = null
//menu
let menu_winston: Sprite = null
let menu_selector: Sprite = null
let menu_title: TextSprite[] = null
let menu_option_texts: TextSprite[] = null
let customize_night_numbers: TextSprite[] = null
//jumpscare
let jumpscare_sprite: Sprite = null
let jumpscare_background_sprite: Sprite = null
let jumpscare_timer: Timer = null
//other random stuffis
let hal_sounds: SoundBuffer[]
const win_sound_a = new music.Melody("@10,0,255,170 ~2 !450,170^365")
const win_sound_b = new music.Melody("@10,0,255,150 ~2 !800,150^680")
let power_out_winston_music = new WinstonMusic
const static_sound = new music.Melody("@10,0,100,10 ~5 !500,5000")
const static_sound_menu = new music.Melody("@10,0,100,10 ~5 !500,4100")


class Animatronic {
    level: number = 0
    run: boolean
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
    danger: number = 0 //squidical only
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
    load(mode: number) { }
    display(room: string) { }
}

function jumpscare_sound() {
    music.bigCrash.play(255)
    music.smallCrash.play(255)
    music.knock.play(255)
    if(visual_audio){
        light.setAll(light.hsv(Math.randomRange(0, 255), 255, 255))
    }

}


//Globals
let game_state = new Game
game_state.reset()
let time = 0
let night = 1
let volume: number = null
let visual_audio: boolean = false
let unlimited_power: boolean = false
let game_timer = new Timer
let menu_pos: number = null
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
let ani_AI: { [key: string]: number[] } = {
    'win':    [0, 0, 3,  8,  13, 15, 10],
    'hopps':  [3, 6, 10, 12, 14, 15, 10],
    'ohnoes': [3, 6, 10, 12, 14, 15, 10],
    'squid':  [0, 6, 8,  10, 12, 15, 10],
    'hal':    [0, 1, 4,  7,  12, 15, 10],
    'pant':   [0, 0, 3,  6,  9,  15, 10],
    'sam':    [0, 0, 1,  6,  10, 15, 10],
    'fuzz':   [0, 0, 0,  1,  9,  15, 10]
}

let ani: { [key: string]: Animatronic } = null
let ani_keys = Object.keys(ani_AI)

let the_update_handler: () => void = null
let last_game_runtime: number = 0
let spf: number

music.setVolume(blockSettings.readNumber('volume'))
screen.setBrightness(blockSettings.readNumber('brightness'))
if (blockSettings.readNumber('visual_audio')) { visual_audio = true } else { visual_audio = false }

let mygame = new Fnaw
mygame.set_scene('menu')
//    vvvv         this must be here or it will crash ＼（〇_ｏ）／
light.setAll(0)
