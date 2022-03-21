class EventHandler {
    A: () => void
    B: () => void
    up: () => void
    down: () => void
    left: () => void
    right: () => void
}

function install_handler(handler: EventHandler) {
    controller.A.onEvent(ControllerButtonEvent.Pressed, handler.A ? handler.A : function () { })
    controller.B.onEvent(ControllerButtonEvent.Pressed, handler.B ? handler.B : function () { })
    controller.up.onEvent(ControllerButtonEvent.Pressed, handler.up ? handler.up : function () { })
    controller.down.onEvent(ControllerButtonEvent.Pressed, handler.down ? handler.down : function () { })
    controller.left.onEvent(ControllerButtonEvent.Pressed, handler.left ? handler.left : function () { })
    controller.right.onEvent(ControllerButtonEvent.Pressed, handler.right ? handler.right : function () { })
}
let jumpscare_animations: { [key: string]: Image[] } = {
    'hopps': assets.animation`HopperJumpscare`,
    'ohnoes': assets.animation`OhnoesJumpscare`,
    'squid': assets.animation`squidicalJumpscare`
}
let jump_sprite = sprites.create(assets.image`blank160x120`, SpriteKind.Player)
let static_anim = assets.animation`StaticAnim`
let static_sprite = sprites.create(assets.image`blank160x120`)
let kitchen_anim = assets.animation`redThingAnim`
let kitchen_anim_sprite = sprites.create(assets.image`redThingSprite`, SpriteKind.Player)

let menu_winston = sprites.create(assets.image`menuWinston`, SpriteKind.Player)
let menu_title = [
    textsprite.create('Five Nights'),
    textsprite.create("at Winston's"),
    textsprite.create('2')
]
let menu_texts = [
    textsprite.create('Play'),
    textsprite.create('Hardest Night')
]
let menu_selector = sprites.create(assets.image`menuSelector`, SpriteKind.Player)

let office_backgrounds = [
    assets.image`OfficeLeft`,
    assets.image`OfficeRight`,
    assets.image`OfficeMid`
]
let black_background = assets.image`blackBackground`
let window_lights = [
    sprites.create(assets.image`LLight`, SpriteKind.Player),
    sprites.create(assets.image`RLight`, SpriteKind.Player)
]
let door_lights = [
    sprites.create(assets.image`LDoorLight`, SpriteKind.Player),
    sprites.create(assets.image`RDoorLight`, SpriteKind.Player)
]

let l_door_ani_images: { [key: string]: Sprite } = {
    'hopps': sprites.create(assets.image`hopperDoor`, SpriteKind.Player)
}
let r_door_ani_images: { [key: string]: Sprite } = {
    'ohnoes': sprites.create(assets.image`ohnoesDoor`, SpriteKind.Player)
}

let door_images = [
    sprites.create(assets.image`LDoor`, SpriteKind.Player),
    sprites.create(assets.image`RDoor`, SpriteKind.Player)
]


let power_usage_images = [
    sprites.create(assets.image`Power1`, SpriteKind.Player),
    sprites.create(assets.image`Power2`, SpriteKind.Player),
    sprites.create(assets.image`Power3`, SpriteKind.Player),
    sprites.create(assets.image`Power4`, SpriteKind.Player)
]

let power_text = textsprite.create('')
let time_text = textsprite.create('')
let time_disp_text = textsprite.create('12:00 AM')
let night_disp_text = textsprite.create('')

let win_slide = sprites.create(assets.image`6AMSlide`, SpriteKind.Player)
let win_background = sprites.create(assets.image`6AMBackground`, SpriteKind.Player)

let monitor_select_background = assets.image`monitorSelectBackground`
let cam_select = sprites.create(assets.image`camSelect`)
let monitor_select_text = sprites.create(assets.image`monitorSelectTexts`, SpriteKind.Player)
let kitchen_texts = [
    textsprite.create('Cam Disabled'),
    textsprite.create('Audio Only')
]
let room_disp_text = textsprite.create('')
let room_backgrounds = {
    'generic': assets.image`genericRoom`
}


class Fnaw {
    mode: string
    office_handler: EventHandler
    monitor_select_handler: EventHandler
    monitor_view_handler: EventHandler
    win_handler: EventHandler
    menu_handler: EventHandler
    night_display_handler: EventHandler
    setup_handler: EventHandler
    jumpscare_handler: EventHandler

    constructor() {
        this.office_handler = new EventHandler
        this.office_handler.A = function () {
            game_state.doors[game_state.side] = game_state.doors_broken[game_state.side] == true ? false : !game_state.doors[game_state.side]
            if (!game_state.doors_broken[game_state.side]) {
                music.setVolume(20)
                music.buzzer.play()
            }
        }
        this.office_handler.B = function () {
            game_state.lights[game_state.side] = game_state.doors_broken[game_state.side] == true ? false : !game_state.lights[game_state.side]
            if (!game_state.doors_broken[game_state.side]) {
                music.setVolume(150)
                music.footstep.play()
            }
        }
        this.office_handler.left = function () {
            game_state.lights[1] = false
            game_state.side = 0
        }
        this.office_handler.right = function () {
            game_state.lights[0] = false
            game_state.side = 1
        }
        this.office_handler.up = function () {
            music.setVolume(150)
            music.footstep.play()
            mygame.set_mode('monitor_select')
        }

        this.monitor_select_handler = new EventHandler
        this.monitor_select_handler.A = function () {
            viewed_room = selected_room
            mygame.set_mode('monitor_view')
        }
        this.monitor_select_handler.B = function () {
            music.setVolume(150)
            music.footstep.play()
            mygame.set_mode('office')
        }
        this.monitor_select_handler.left = function () {
            selected_room = cams[selected_room][0]
        }
        this.monitor_select_handler.right = function () {
            selected_room = cams[selected_room][1]
        }
        this.monitor_select_handler.up = function () {
            selected_room = cams[selected_room][3]
        }
        this.monitor_select_handler.down = function () {
            selected_room = cams[selected_room][2]
        }

        this.monitor_view_handler = new EventHandler
        this.monitor_view_handler.A = function () {
            animation.stopAnimation(animation.AnimationTypes.All, kitchen_anim_sprite)
            mygame.set_mode('monitor_select')
        }
        this.monitor_view_handler.B = function () {
            animation.stopAnimation(animation.AnimationTypes.All, kitchen_anim_sprite)
            music.setVolume(150)
            music.footstep.play()
            mygame.set_mode('office')
        }

        this.win_handler = new EventHandler

        this.menu_handler = new EventHandler
        this.menu_handler.A = function () {
            switch (menu_pos) {
                case 0: {
                    night = 1
                    mygame.set_mode('setup')
                    break
                }
                case 1: {
                    night = 7
                    mygame.set_mode('setup')
                    break
                }
            }
        }
        this.menu_handler.up = function () {
            menu_pos -= 1
            if (menu_pos < 1) { menu_pos = 0 }
        }
        this.menu_handler.down = function () {
            menu_pos += 1
            if (menu_pos > 1) { menu_pos = 0 }
        }

        this.night_display_handler = new EventHandler

        this.setup_handler = new EventHandler

        this.jumpscare_handler = new EventHandler

    }

    set_mode(mode: string) {
        this.mode = mode
        hide_all()
        switch (mode) {
            case 'office': {
                install_handler(this.office_handler)
                init_palette('office')
                game_state.monitor_on = false
                viewed_room = null
                play_all()
                the_update_handler = function () {
                    handle_lights()
                    handle_doors()
                    handle_power()
                    handle_time()
                    scene.setBackgroundImage(office_backgrounds[game_state.side])
                }
                break
            }
            case 'monitor_select': {
                install_handler(this.monitor_select_handler)
                init_palette('monitor')
                pause_all()
                game_state.lights[0] = false
                game_state.lights[1] = false
                game_state.monitor_on = true
                viewed_room = null
                scene.setBackgroundImage(monitor_select_background)
                show_sprite(monitor_select_text)
                monitor_select_text.top = 11
                monitor_select_text.left = 30
                show_sprite(power_text)
                for (let i = 0; i <= 3; i++) {
                    if (i < game_state.get_usage()) {
                        show_sprite(power_usage_images[i])
                    } else {
                        hide_sprite(power_usage_images[i])
                    }
                }
                power_text.setText(Math.ceil(o_power).toString() + '%')
                power_text.left = 0
                power_text.bottom = 109
                time_text.right = 158
                time_text.top = 12
                time_text.setText(time.toString() + ' AM')
                night_disp_text.setText('Night ' + night.toString())
                night_disp_text.right = 158
                night_disp_text.top = 2
                game_timer.pause()
                let keys = Object.keys(ani)
                for (let i = 0; i < keys.length; i++) {
                    ani[keys[i]].pause()
                }
                the_update_handler = function () {
                    show_sprite(cam_select)
                    cam_select.left = cam_positions[selected_room][0]
                    cam_select.top = cam_positions[selected_room][1]
                    show_sprite(room_disp_text)
                    room_disp_text.top = 1
                    room_disp_text.left = 1
                    room_disp_text.setText(selected_room)
                }
                break
            }
            case 'monitor_view': {
                install_handler(this.monitor_view_handler)
                init_palette('monitor')
                play_all() 
                if (viewed_room == 'Kitchen') {
                    kitchen_anim_sprite.top = 12
                    kitchen_anim_sprite.left = 2
                    animation.runImageAnimation(kitchen_anim_sprite, kitchen_anim, 1000, true)
                    kitchen_texts[0].top = 10
                    kitchen_texts[0].left = 19
                    kitchen_texts[1].top = 20
                    kitchen_texts[1].left = 20
                }
                else {
                    hide_array(kitchen_texts)
                }
                the_update_handler = function () {
                    game_state.monitor_on = true
                    if (viewed_room == 'DIE') {
                        game_state.ani_in = 'hopps'
                        mygame.set_mode('jumpscare')
                        return
                    }
                    if (game_state.cams_broken || viewed_room == 'Kitchen') {
                        scene.setBackgroundImage(black_background)
                    }
                    else {
                        scene.setBackgroundImage(room_backgrounds['generic'])
                    }
                    let keys = Object.keys(ani)
                    for (let i = 0; i < keys.length; i++) {
                        ani[keys[i]].display(viewed_room)
                    }
                    
                    handle_power()
                    handle_time()
                    room_disp_text.top = 1
                    room_disp_text.left = 1
                    room_disp_text.setText(viewed_room)
                }
                break
            }
            case 'win': {
                install_handler(this.win_handler)
                pause_all()
                scene.setBackgroundImage(black_background)
                show_sprite(win_background)
                win_background.top = 27
                win_background.left = 52
                show_sprite(win_slide)
                win_slide.bottom = 66
                win_slide.left = 52
                let animator = make_lerp(win_slide.top, win_slide.top + win_slide.height / 2)

                let win_seq = make_seq([
                    0.5, function (a: number) {
                        scene.setBackgroundImage(black_background)
                    },
                    3, function (a: number) {
                        win_slide.top = animator(a)
                    },
                    0.5, function (a: number) { },
                    0, function (a: number) {
                        if (night < 5) {
                            night += 1
                        }
                        else {
                            night = 1
                            everything = true
                            mygame.set_mode('menu')
                        }
                        mygame.set_mode('setup')
                    }
                ])
                let keys = Object.keys(ani)
                for (let i = 0; i < keys.length; i++) {
                    ani[keys[i]].reset()
                }
                the_update_handler = function () {
                    win_seq(spf)
                }
                break
            }
            case 'menu': {
                install_handler(this.menu_handler)
                init_palette('menu')
                scene.setBackgroundImage(black_background)
                show_sprite(menu_selector)
                menu_title[0].scale = 2
                menu_title[0].top = 1
                menu_title[0].left = 1
                menu_title[1].scale = 2
                menu_title[1].left = 1
                menu_title[1].top = 20
                menu_title[2].scale = 3
                menu_title[2].top = 40
                menu_title[2].right = 150
                menu_winston.bottom = 110
                menu_winston.right = 150
                for (let i = 0; i < menu_texts.length; i++) {
                    show_sprite(menu_texts[i])
                    menu_texts[i].left = 17
                    menu_texts[i].top = 50 + i * 12
                }
                the_update_handler = function () {
                    menu_selector.right = 13
                    menu_selector.top = 52 + menu_pos * 12    
                }
                break
            }
            case 'night_display': {
                install_handler(this.night_display_handler)
                time_disp_text.setPosition(80, 55)
                night_disp_text.setText('Night ' + night.toString())
                night_disp_text.setPosition(80, 65)
                let night_seq = make_seq([
                    3, function (a: number) {
                        scene.setBackgroundImage(black_background)
                        show_sprite(time_disp_text)
                    },
                    0, function (a: number) {
                        game_timer.start()
                        ani = {
                            'hopps': new Hopper,
                            'ohnoes': new OhNoes,
                            'squid': new Squidical
                        }
                        mygame.set_mode('office')
                    }
                ])
                the_update_handler = function () {
                    night_seq(spf)
                }
                break
            }
            case 'setup': {
                game_state.reset()
                game_timer.reset()
                game_timer.start()           
                o_power = 100
                init_palette('')
                selected_room = 'Show Stage'
                mygame.set_mode('night_display')
                break
            }
            case 'jumpscare': {
                install_handler(this.jumpscare_handler)
                init_palette('office')
                pause_all()
                show_sprite(jump_sprite)
                let keys = Object.keys(ani)
                for (let i = 0; i < keys.length; i++) {
                    ani[keys[i]].reset()
                }
                if (game_state.ani_in == 'squid') {
                    scene.setBackgroundImage(office_backgrounds[1])
                    animation.runImageAnimation(jump_sprite, jumpscare_animations[game_state.ani_in], 166, false)
                }
                else {
                    scene.setBackgroundImage(office_backgrounds[2])
                    animation.runImageAnimation(jump_sprite, jumpscare_animations[game_state.ani_in], 300, true)
                }
                the_update_handler = function () {
                    init_palette(game_state.ani_in)
                    ani[game_state.ani_in].jumpscare()
                }
                break
            }
            case 'static': {
                install_handler(this.jumpscare_handler)
                init_palette('static')
                scene.setBackgroundImage(black_background)
                show_sprite(static_sprite)
                animation.runImageAnimation(static_sprite, static_anim, 77, true)
                let static_seq = make_seq([
                    5, function (a: number) { },
                    0, function (a: number) {
                        animation.stopAnimation(animation.AnimationTypes.All, static_sprite)
                        mygame.set_mode('menu')
                    }
                ])
                the_update_handler = function () {
                    static_seq(spf)
                }
                break
            }
            default: {
                break
            }
        }
    }
}
// side, light, lDoor, rDoor, monitorOn, camsDisabled, lDoor disabled, RDoor disabled
class Game {
    side: number
    lights: boolean[]
    doors: boolean[]
    monitor_on: boolean
    cams_broken: boolean
    cams_broken_timer: Timer = new Timer
    cams_broken_limit: number
    doors_broken: boolean[]
    ani_in: string = ''
    constructor() {
        this.reset()
    }

    reset() {
        this.side = 0
        this.lights = [false, false]
        this.doors = [false, false]
        this.monitor_on = false
        this.cams_broken = false
        this.doors_broken = [false, false]
        this.ani_in = ''
    }

    get_usage() {
        let p = 1
        if (this.lights[0] || this.lights[1])
            p++
        if (this.doors[0])
            p++
        if (this.doors[1])
            p++
        if (this.monitor_on)
            p++
        return p
    }
    disable_cams() {
        this.cams_broken = true
        this.cams_broken_timer.reset()
        this.cams_broken_timer.start()
        this.cams_broken_limit = Math.randomRange(3.0, 5)
    }
}

class Timer {
    paused: boolean
    current_time: number
    stored_time: number
    start_time: number
    constructor() {
        this.reset()
    }
    reset() {
        this.paused = false
        this.current_time = 0
        this.stored_time = 0
        this.start_time = game.runtime()
    }
    pause() {
        this.paused = true
        this.stored_time = this.current_time
    }
    play() {
        this.start()
    }
    start() {
        this.paused = false
        this.start_time = game.runtime()
    }
    stop() {
        this.pause()
        this.reset()
    }
    get_time() {
        if (!this.paused) {
            this.current_time = game.runtime() - this.start_time + this.stored_time
        }
        return this.current_time / 1000
    }
}
//anis
class Animatronic {
    level: number = 0
    start_room: string
    room: string
    move_timer: Timer = new Timer
    mode_timer: Timer = new Timer
    leave_timer: Timer = new Timer
    move_table: { [key: string]: { [key: string]: () => number } }
    paused: boolean
    jump_seq: (dt: number) => boolean
    surprise: boolean = false
    monitor_images: { [key: string]: Image }
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
    jumpscare() { }
    display(room: string) { }
}
//anis
class Hopper extends Animatronic {
    wait: number
    mode_limit: number = Math.randomRange(20.0, 35)
    mode: number = Math.randomRange(0.0, 3)
    enter_time: number
    leave_time: number
    constructor() {
        super('Show Stage')
        //super('Left Door')
        super.reset()
        this.reset()
        this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.leave_time = this.leave_time = (this.wait * 2 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.jump_seq = make_seq([
            1.5, function (a: number) {
                jumpscare_sound()
            },
            0, function (a: number) {
                animation.stopAnimation(animation.AnimationTypes.All, jump_sprite)
                mygame.set_mode('static')
            }
        ])
        this.move_table = {
            'Show Stage': {
                'Dining Area': () => 100 - this.level * 4,
                'Backstage': () => 50 - this.level * 2,
                'North Hall': () => this.level * 2
            },
            'Dining Area': {
                'Backstage': () => 25 - this.level,
                'Spare Room': () => 12.5 - this.level / 2,
                'North Hall': () => 25 + this.level / 2,
                'Supply Closet': () => 25 - this.level / 4,
                'West Hall': () => 12.5 + this.level,
                'Left Door': () => this.level * 2
            },
            'North Hall': {
                'Supply Closet': () => 25 - this.level,
                'Furnace Room': () => 25 - this.level,
                'West Hall': () => 25 + this.level,
                'Dining Area': () => 25 - this.level,
                'Left Door': () => this.level * 2
            },
            'Supply Closet': {
                'Furnace Room': () => 25 - this.level,
                'North Hall': () => 25,
                'West Hall': () => 25 + this.level,
                'Dining Area': () => 12.5 - this.level / 2,
                'Left Door': () => 12.5 + this.level * 2
            },
            'Furnace Room': {
                'Supply Closet': () => 25 - this.level,
                'North Hall': () => 25,
                'West Hall': () => 25 + this.level,
                'Dining Area': () => 12.5 - this.level / 2,
                'Left Door': () => 12.5 + this.level * 2
            },
            'West Hall': {
                'Left Door': () => 120 + this.level * 2,
                'North Hall': () => 50 - this.level * 2
            },
            'Spare Room': {
                'Dining Area': () => 50 - this.level,
                'North Hall': () => 25 + this.level * 2,
                'Backstage': () => 25 - this.level
            },
            'Backstage': {
                'Dining Area': () => 50 - this.level,
                'North Hall': () => 25 + this.level * 2,
                'Spare Room': () => 25 - this.level
            },
            'Left Door': {
                'West Hall': () => 25,
                'North Hall': () => 25,
                'Supply Closet': () => 25,
                'Furnace Room': () => 25
            },
        }
        this.monitor_images = {
            'generic': assets.image`hopper`
        }
        this.monitor_sprite = sprites.create(this.monitor_images['generic'])
    }

    reset() {
        super.reset()
        this.room = this.start_room
        this.level = ani_AI['hopps'][night - 1]
        //this.level = 20
        this.wait = Math.map(Math.pow(this.level / 20, 0.25) * 20, 0, 20, Math.randomRange(90.0, 160), 1) + Math.randomRange(-(20 - this.level) + 5.0, (10 / ((this.level + 1) / 5)))
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.leave_timer.stop()
    }

    move() {
        this.move_timer.reset()
        this.wait = Math.map(this.level, 0, 20, 30, 5) + Math.randomRange(0.0, 10 / (this.level + 1))
        if (viewed_room == this.room && !game_state.cams_broken) {
            game_state.disable_cams()
        }
        this.room = choose(this.move_table[this.room])
        if (this.room == 'Left Door') {
            this.surprise = true
            if (game_state.lights[0]) {
                this.move()
                return
            }
            this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
            this.leave_time = (this.wait * 2 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
            game_state.lights[0] = false
        }
        if (viewed_room == this.room && !game_state.cams_broken) {
            game_state.disable_cams()
        }
    }

    update() {
        if (this.room == 'office') {
            return
        }
        if (this.mode_timer.get_time() > 25 && (viewed_room != this.room || game_state.cams_broken)) {
            this.mode = Math.randomRange(0.0, 3)
            this.mode_timer.reset()
            this.mode_limit = Math.randomRange(20.0, 35)
        }
        if (this.room != 'Left Door') {
            this.surprise = false
            this.leave_timer.stop()
            if (this.move_timer.get_time() > this.wait) {
                this.move()
            }
        }
        else {
            if (this.leave_timer.paused) {
                this.leave_timer.start()
            }
            if (this.move_timer.get_time() > this.enter_time && !game_state.doors[0]) {
                if (!game_state.doors_broken[0]) {
                    this.move_timer.reset()
                    game_state.doors_broken[0] = true
                }
                else {
                    this.room = 'office'
                }
                this.leave_timer.stop()
                this.leave_timer.start()
            }
            if (this.leave_timer.get_time() > this.leave_time && (game_state.doors[0] || game_state.doors_broken[0])) {
                if (!game_state.lights[0]) {
                    this.move()
                }
            }
        }
    }
    pause() {
        this.paused = true
        this.leave_timer.pause()
        this.mode_timer.pause()
        this.move_timer.pause()
    }
    play() {
        this.paused = false
        this.leave_timer.play()
        this.mode_timer.play()
        this.move_timer.play()
    }
    jumpscare() {
        this.jump_seq(spf)
    }
    display (room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen') {
            this.monitor_sprite.bottom = 111
            this.monitor_sprite.left = 33
        }
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}
//anis
class OhNoes extends Animatronic {
    wait: number
    mode_limit: number = Math.randomRange(20.0, 35)
    mode: number = Math.randomRange(0.0, 3)
    enter_time: number
    leave_time: number
    sound_timer: Timer = new Timer
    stl: number
    constructor() {
        super('Show Stage')
        //super('Kitchen')
        //super('Right Door')
        super.reset()
        this.reset()
        this.stl = Math.randomRange(1.0, 5) //SoundTimerLimit
        this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.leave_time = (this.wait * 2.5 + Math.randomRange(0.0, 20 - this.level / 2.5)) / (2.5 - this.level / 50)
        this.jump_seq = make_seq([
            1.5, function (a: number) {
                jumpscare_sound()
            },
            0, function (a: number) {
                animation.stopAnimation(animation.AnimationTypes.All, jump_sprite)
                mygame.set_mode('static')
            }
        ])
        this.move_table = {
            'Show Stage': {
                'Dining Area': () => 1
            },
            'Dining Area': {
                'East Hall 1': () => 30 + this.level / 4,
                'Kitchen': () => 50 + this.level * 3,
                'Spare Room': () => 21 - this.level
            },
            'Spare Room': {
                'Dining Area': () => 1
            },
            'East Hall 1': {
                'Dining Area': () => 30 - this.level,
                'Changing Rooms': () => 35 - this.level,
                'East Hall 2': () => 35 + this.level * 2
            },
            'East Hall 2': {
                'East Hall 1': () => 50 - this.level * 2,
                'East Hall 3': () => 50 + this.level * 2
            },
            'Changing Rooms': {
                'East Hall 2': () => 1
            },
            'East Hall 3': {
                'East Hall 2': () => 25 - this.level * 2,
                'South Hall': () => 25 + this.level * 2,
                'Laser Tag Prep': () => 25 - this.level * 2,
                'Bathrooms': () => 25 - this.level * 2
            },
            'Bathrooms': {
                'East Hall 3': () => 1
            },
            'Laser Tag Prep': {
                'East Hall 3': () => 1
            },
            'South Hall': {
                'Right Door': () => 75 + this.level,
                'Kitchen': () => 25 - this.level / 2,
                'East Hall 3': () => 25 - this.level / 2
            },
            'Kitchen': {
                'South Hall': () => 50 + this.level * 2,
                'Dining Area': () => 50 - this.level * 2
            },
            'Right Door': {
                'South Hall': () => 1
            }
        }
        this.monitor_images = {
            'generic': assets.image`ohnoes`
        }
        this.monitor_sprite = sprites.create(this.monitor_images['generic'])
    }
    reset() {
        this.level = ani_AI['ohnoes'][night - 1]
        this.wait = Math.map(Math.pow(this.level / 20, 0.25) * 20, 0, 20, Math.randomRange(90.0, 160), 1) + Math.randomRange(-(20 - this.level) + 5, (10 / ((this.level + 1) / 5)))
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.leave_timer.stop()
        this.sound_timer.stop()
        this.sound_timer.start()
    }
    move () {
        this.move_timer.reset()
        this.wait = Math.map(this.level, 0, 20, 30, 7) + Math.randomRange(-5, 10 / (this.level + 1))
        if (viewed_room == this.room && !game_state.cams_broken && viewed_room != 'Kitchen') {
            game_state.disable_cams()
        }
        if (viewed_room == 'Arcade' && !game_state.cams_broken && Math.floor(this.mode) == 2 && this.room == 'East Hall 3') {
            game_state.disable_cams()
        }
        this.room = choose(this.move_table[this.room])
        if (this.room == 'Right Door') {
            this.surprise = true
            if (game_state.lights[1]) {
                this.move()
                return
            }
            this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
            this.leave_time = (this.wait * 2.5 + Math.randomRange(0.0, 20 - this.level / 2.5)) / (2.5 - this.level / 50)
            game_state.lights[1] = false
        }
        if (viewed_room == this.room && !game_state.cams_broken && viewed_room != 'Kitchen') {
            game_state.disable_cams()
        }
        if (viewed_room == 'Arcade' && !game_state.cams_broken && Math.floor(this.mode) == 2 && this.room == 'East Hall 3') {
            game_state.disable_cams()
        }
    }
    update() {
        if (this.sound_timer.get_time() > this.stl && this.room == 'Kitchen') {
            if (viewed_room == 'Kitchen') {
                music.setVolume(200)
            }   
            else {
                music.setVolume(50)
            }
            let num = Math.randomRange(0, 1)
            switch (num) {
                case 0: {
                    music.baDing.play()
                    break
                }
                case 1: {
                    music.knock.play()
                }
            }
            this.sound_timer.reset()
            this.stl = Math.randomRange(1.0, 5)
        }      
        if (this.room == 'office') {
            return
        }
        if (this.mode_timer.get_time() > 25 && (viewed_room != this.room || game_state.cams_broken)) {
            this.mode = Math.randomRange(0.0, 3)
            this.mode_timer.reset()
            this.mode_limit = Math.randomRange(20.0, 35)
        }
        if (this.room != 'Right Door') {
            this.surprise = false
            this.leave_timer.stop()
            if (this.move_timer.get_time() > this.wait) {
                this.move()
            }
        }
        else {
            if (this.leave_timer.paused) {
                this.leave_timer.start()
            }
            if (this.move_timer.get_time() > this.enter_time && !game_state.doors[1]) {
                if (!game_state.doors_broken[1]) {
                    this.move_timer.reset()
                    game_state.doors_broken[1] = true
                }
                else {
                    this.room = 'office'
                }
                this.leave_timer.stop()
                this.leave_timer.start()
            }
            if (this.leave_timer.get_time() > this.leave_time && (game_state.doors[1] || game_state.doors_broken[1])) {
                if (!game_state.lights[1]) {
                    this.move()
                }
            }
        }
    }
    pause() {
        this.paused = true
        this.leave_timer.pause()
        this.mode_timer.pause()
        this.move_timer.pause()
        this.sound_timer.pause()
    }
    play() {
        this.paused = false
        this.leave_timer.play()
        this.mode_timer.play()
        this.move_timer.play()
        this.sound_timer.play()
    }
    jumpscare() {
        this.jump_seq(spf)
    }
    display (room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen') {
            this.monitor_sprite.bottom = 111
            this.monitor_sprite.left = 81
        }
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}
//anis
class Squidical extends Animatronic {
    anger: number = 0
    danger: number = 0
    power_drain: number = 0
    run: boolean = false
    run_pos: number = 0
    careful: number = 0
    knock_seq: (dt: number) => boolean
    constructor () {
        super('Squid Reef')
        super.reset()
        this.reset()
        this.jump_seq = make_seq([
            1.5, function (a: number) {
                jumpscare_sound()
            },
            0, function (a: number) {
                animation.stopAnimation(animation.AnimationTypes.All, jump_sprite)
                mygame.set_mode('static')
            }
        ])
        this.knock_seq = make_seq([
            0, function(a: number) { }
        ])
        this.monitor_images = {
            'generic': assets.image`squidical`
        }
        this.monitor_sprite = sprites.create(this.monitor_images['generic'])
    }
    normal_reset () {
        this.run = false
        this.run_pos = 0
        this.anger = 0
        this.careful = 0
        this.room = 'Squid Reef'
        if (this.power_drain == 0) {
            this.power_drain++
        }
        else if (this.power_drain >= 1) {
            this.power_drain += 5
        }
    }
    reset () {
        this.normal_reset()
        this.power_drain = 0
        this.level = ani_AI['squid'][night - 1]
    }
    update () {
        this.knock_seq(spf)
        if (!this.run) {
            this.careful -= spf * Math.map(this.level, 0, 20, 0.07, 0.5)
            if (viewed_room == 'Squid Reef') {
                this.careful += spf * Math.map(this.level, 0, 20, 0.07, 0.5) * 5
            }
            if (Math.abs(this.careful) > 4) {
                this.anger += spf * Math.map(this.level, 0, 20, 0.017, 0.1)
            }
            this.careful = Math.constrain(this.careful, -4, 4)
            this.danger = Math.floor(this.anger)
            if (this.danger >= 4) {
                this.run = true
            }
        }
        else {
            this.run_pos += spf * 15
            this.run_pos = Math.min(this.run_pos, 200)
            if (ani['ohnoes'].room == 'East Hall 2') {
                ani['ohnoes'].move()
            }
            if (this.run_pos >= 100 && this.run_pos <= 175) {
                this.room = 'East Hall 2'
            }
            else {
                this.room = 'running'
            }
            //changeme
            if (this.run_pos >= 200 /*&& !GW*/) {
                if (!game_state.doors[1] && o_power >= 0) {
                    if (game_state.ani_in == '') {
                        game_state.ani_in = 'squid'
                        mygame.set_mode('jumpscare')
                    }   
                }
                else {
                    this.knock_seq = make_seq([
                        0, function (a: number) {
                            music.setVolume(200)
                            music.knock.play()
                        },
                        0.5, function (a: number) { },
                        0, function (a: number) {
                            music.setVolume(200)
                            music.knock.play()
                        },
                        0.5, function (a: number) { },
                        0, function (a: number) {
                            music.setVolume(200)
                            music.knock.play()
                        }
                    ])
                    o_power -= this.power_drain
                    this.normal_reset()
                }
            }
        }
    }
    jumpscare() {
        this.jump_seq(spf)
    }
    display (room: string) {
        if (this.room == room && room != 'Kitchen') {
            if (this.room == 'Squid Reef') {
                if (!this.run) {
                    switch (this.danger) {
                        case 0: {
                            this.monitor_sprite.top = 105
                            this.monitor_sprite.left = 58
                            break
                        }
                        case 1: {
                            this.monitor_sprite.top = 86
                            this.monitor_sprite.left = 58
                            break
                        }
                        case 2: {
                            this.monitor_sprite.top = 59
                            this.monitor_sprite.right = 120
                            break
                        }
                        case 3: {
                            this.monitor_sprite.top = 72
                            this.monitor_sprite.left = 138
                        }
                    }
                }
            }
            else if (this.room == 'East Hall 2') {
                this.monitor_sprite.top = 59
                this.monitor_sprite.right = 120
            }
        }      
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}

function init_palette(palette: string) {
    color.setPalette(color.originalPalette)
    switch (palette) {
        case 'office': {
            color.setColor(3, color.rgb(120, 120, 120)) //main wall
            color.setColor(4, color.rgb(90, 90, 90)) //secondary wall, lights
            color.setColor(6, color.rgb(40, 40, 40)) //roof
            color.setColor(8, color.rgb(87, 50, 27)) //floor
            color.setColor(9, color.rgb(140, 92, 77)) //door
            color.setColor(10, color.rgb(181, 181, 74)) //door stripes
            color.setColor(11, color.rgb(245, 194, 66)) //hopper body
            color.setColor(12, color.rgb(61, 191, 135)) //ohnoes
            break
        }
        case 'monitor': {
            color.setColor(3, color.rgb(120, 120, 120)) //monitor background, room wall 1
            color.setColor(4, color.rgb(90, 90, 90)) //room wall 2
            color.setColor(6, color.rgb(40, 40, 40)) //roof
            color.setColor(8, color.rgb(87, 50, 27)) //floor
            color.setColor(9, color.rgb(255, 214, 90)) //hopper
            color.setColor(10, color.rgb(61, 191, 135)) //ohnoes
            color.setColor(11, color.rgb(235, 153, 21)) //squidical
            break
        }
        case 'static': {
            color.setColor(2, color.rgb(222, 222, 222))
            color.setColor(3, color.rgb(122, 122, 122))
            color.setColor(4, color.rgb(90, 90, 90))
            color.setColor(15, color.rgb(100, 100, 100))
            break
        }
        case 'menu': {
            color.setColor(2, color.rgb(201, 201, 0))//y1
            color.setColor(3, color.rgb(184, 184, 0))//y2
            color.setColor(4, color.rgb(150, 150, 0))//y3
            color.setColor(5, color.rgb(107, 107, 0))//y4
            color.setColor(6, color.rgb(209, 209, 209))//eye1
            color.setColor(7, color.rgb(161, 161, 161))//eye2
            color.setColor(8, color.rgb(174, 174, 0))//outline1
            color.setColor(9, color.rgb(140, 140, 0))//outline2
            color.setColor(10, color.rgb(180, 180, 0))//midline1
            color.setColor(11, color.rgb(145, 145, 0))//midline2
            color.setColor(12, color.rgb(219, 0, 51))//mid1
            color.setColor(13, color.rgb(171, 0, 40))//mid2
            break
        }
        case 'hopps': {
            color.setColor(2, color.rgb(120, 120, 120)) //main wall
            color.setColor(3, color.rgb(90, 90, 90)) //secondary rightWall          
            color.setColor(4, color.rgb(40, 40, 40)) //roof
            color.setColor(5, color.rgb(87, 50, 27)) //floor
            color.setColor(6, color.rgb(245, 194, 66)) // body
            color.setColor(7, color.rgb(200, 0, 0)) // mouth
            break
        }
        case 'ohnoes': {
            color.setColor(2, color.rgb(120, 120, 120)) //main wall
            color.setColor(3, color.rgb(90, 90, 90)) //secondary rightWall          
            color.setColor(4, color.rgb(40, 40, 40)) //roof
            color.setColor(5, color.rgb(87, 50, 27)) //floor
            color.setColor(6, color.rgb(61, 191, 135)) // body
            color.setColor(7, color.rgb(50, 156, 110)) //semicolon
            color.setColor(8, color.rgb(200, 0, 0)) //mouth
            break
        }
        case 'squid': {
            color.setColor(3, color.rgb(120, 120, 120)) //main wall
            color.setColor(4, color.rgb(90, 90, 90)) //secondary wall, lights
            color.setColor(6, color.rgb(40, 40, 40)) //roof
            color.setColor(8, color.rgb(87, 50, 27)) //floor
            color.setColor(7, color.rgb(235, 153, 21)) // body
            break
        }
        default:
            color.setPalette(color.originalPalette)
            break
    }
}

function jumpscare_sound() {
    music.setVolume(255)
    music.bigCrash.play()
    music.smallCrash.play()
    music.knock.play()
}

function choose(prob_map: { [key: string]: () => number }) {
    let keys = Object.keys(prob_map)
    let cdf: number[] = [0]
    for (let i = 0; i < keys.length; i++)
        cdf.push(cdf[i] + prob_map[keys[i]]())

    let v = Math.randomRange(0.0, cdf[cdf.length - 1])
    for (let i = 0; i < keys.length; i++) {
        if (v <= cdf[i + 1]) {
            return keys[i]
        }
    }
    return keys[keys.length - 1]
}

function make_animator(v0: number, v1: number, duration: number) {
    let t = 0
    return function (dt: number) {
        t += dt
        return v0 + (v1 - v0) * Math.min(t / duration, 1)
    }
}

function make_lerp(v0: number, v1: number) {
    return function (alpha: number) {
        return v0 + (v1 - v0) * alpha
    }
}

function make_pause(duration: number, animator: (dt: number) => number) {
    let t = 0
    return function (dt: number) {
        t += dt
        if (t < duration)
            dt = 0
        return animator(dt)
    }
}

function make_seq(table: any[]) {
    let i: number = 0 // current entry
    let t = 0 // current time
    let ti0 = 0 // time when current entry starts    
    let ti1 = ti0 + table[2 * i + 0] // time when current entry ends
    return function (dt: number) {
        let tn = t + dt
        while (tn >= ti1) {
            if (2 * i >= table.length)
                return false

            // last call on this entry
            table[2 * i + 1](1)

            // start next entry
            i += 1
            ti0 = ti1
            if (2 * i < table.length)
                ti1 += table[2 * i + 0]
        }
        if (tn < ti1)
            table[2 * i + 1]((tn - ti0) / (ti1 - ti0))
        t = tn
        return true
    }
}

function toggle_sprite(s: Sprite) {
    if (s.left < 500) {
        s.left += 500
    } else {
        s.left -= 500
    }
}
function hide_sprite(s: Sprite) {
    if (s.left < 500) {
        s.left += 500
    }
}
function show_sprite(s: Sprite) {
    if (s.left >= 500) {
        s.left -= 500
    }
}
//hideall
function hide_all() {
    hide_array(window_lights)
    hide_array(door_lights)
    hide_array(power_usage_images)
    hide_array(door_images)
    hide_array(menu_texts)
    hide_array(menu_title)
    hide_array(kitchen_texts)

    hide_dict(l_door_ani_images)
    hide_dict(r_door_ani_images)

    let keys = Object.keys(ani)
    for (let i = 0; i < keys.length; i++) {
        hide_sprite(ani[keys[i]].monitor_sprite)
    }
    
    hide_sprite(power_text)
    hide_sprite(time_text)
    hide_sprite(win_background)
    hide_sprite(win_slide)
    hide_sprite(time_disp_text)
    hide_sprite(night_disp_text)
    hide_sprite(monitor_select_text)
    hide_sprite(cam_select)
    hide_sprite(room_disp_text)
    hide_sprite(jump_sprite)
    hide_sprite(static_sprite)
    hide_sprite(menu_selector)
    hide_sprite(menu_winston)
    hide_sprite(kitchen_anim_sprite)
}
function hide_array (a: Sprite[]) {
    for (let i = 0; i <= a.length - 1; i++) {
        hide_sprite(a[i])
    }
}
function hide_dict(d: { [key: string]: Sprite }) {
    let keys = Object.keys(d)
    for (let i = 0; i < keys.length; i++) {
        hide_sprite(d[keys[i]])
    }
}
function pause_all() {
    let keys: any[]
    if (!game_timer.paused)
        game_timer.pause()
    if (!game_state.cams_broken_timer.paused)
        game_state.cams_broken_timer.pause()
    keys = Object.keys(ani)
    for (let i = 0; i < keys.length; i++) {
        if (!ani[keys[i]].paused)
            ani[keys[i]].pause()
    }
}

function play_all() {
    let keys: any[]
    if (game_timer.paused)
        game_timer.play()
    if (game_state.cams_broken_timer.paused)
        game_state.cams_broken_timer.play()
    keys = Object.keys(ani)
    for (let i = 0; i < keys.length; i++) {
        if (ani[keys[i]].paused)
            ani[keys[i]].play()
    }
}

//Globals
let game_state = new Game
let o_power = 100
let time = 0
let night = 1
let game_timer = new Timer
let everything = false
let selected_room = 'Show Stage'
let viewed_room = ''
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
    'win': [0, 0, 3, 8, 13, 15, 0],
    'hopps': [3, 6, 10, 12, 14, 15, 20],
    'ohnoes': [3, 6, 10, 12, 14, 15, 20],
    'squid': [0, 6, 8, 10, 12, 15, 20],
    'hal': [0, 1, 4, 7, 12, 15, 0],
    'pant': [0, 0, 3, 6, 9, 15, 0],
    'sam': [0, 0, 1, 6, 10, 15, 0],
    'fuzz': [0, 0, 0, 1, 9, 15, 0]
}

let ani: { [key: string]: Animatronic }

function handle_lights() {
    for (let i = 0; i < game_state.lights.length; i++) {
        if (game_state.lights[i]) {
            show_sprite(window_lights[i])
            window_lights[i].top = 22
            if (game_state.side == 0) {
                window_lights[i].left = 48
            }
            else if (game_state.side == 1) {
                window_lights[i].left = 89
            }
            if (!game_state.doors[i]) {
                show_sprite(door_lights[i])
                door_lights[i].top = 13
                if (game_state.side == 0) {
                    door_lights[i].left = 9
                }
                else if (game_state.side == 1) {
                    door_lights[i].left = 119
                }
            }
            if (i == 0) {
                let keys = Object.keys(ani)
                for (let l = 0; l < keys.length; l++) {
                    if (ani[keys[l]].room == 'Left Door') {
                        show_sprite(l_door_ani_images[keys[l]])
                        l_door_ani_images[keys[l]].top = 12
                        l_door_ani_images[keys[l]].left = 10
                        if (ani[keys[l]].surprise == true) {
                            music.smallCrash.play()
                            ani[keys[l]].surprise = false
                        }
                    }
                }
            }
            else {
                let keys = Object.keys(ani)
                for (let l = 0; l < keys.length; l++) {
                    if (ani[keys[l]].room == 'Right Door') {
                        show_sprite(r_door_ani_images[keys[l]])
                        r_door_ani_images[keys[l]].top = 22
                        r_door_ani_images[keys[l]].left = 89
                        if (ani[keys[l]].surprise == true) {
                            music.smallCrash.play()
                            ani[keys[l]].surprise = false
                        }
                    }
                }
            }
        }
        else {
            hide_sprite(window_lights[i])
            hide_sprite(door_lights[i])
            if (i == 0) {
                let keys = Object.keys(l_door_ani_images)
                for (let l = 0; l < keys.length; l++) {
                    hide_sprite(l_door_ani_images[keys[l]])
                }
            }
            else {
                let keys = Object.keys(r_door_ani_images)
                for (let l = 0; l < keys.length; l++) {
                    hide_sprite(r_door_ani_images[keys[l]])
                }
            }
        }
    }
}

function handle_doors() {
    for (let i = 0; i < game_state.doors.length; i++) {
        if (game_state.doors[i] && game_state.side == i) {
            show_sprite(door_images[i])
            door_images[i].top = 13
            if (game_state.side == 0) {
                door_images[i].left = 9
            }
            else if (game_state.side == 1) {
                door_images[i].left = 119
            }
        }
        else {
            hide_sprite(door_images[i])
        }
    }
}
//changeme
function handle_power() {
    for (let i = 0; i <= 3; i++) {
        power_usage_images[i].bottom = 119
        power_usage_images[i].left = 1 + i * 7
        if (i < game_state.get_usage()) {
            show_sprite(power_usage_images[i])
        } else {
            hide_sprite(power_usage_images[i])
        }
    }
    switch (game_state.get_usage()) {
        case 1:
            o_power -= spf / 10
            break
        case 2:
            o_power -= spf / 6
            break
        case 3:
            o_power -= spf / 4
            break
        case 4:
            o_power -= spf / 3
            break
        default:
            break
    }
    power_text.setText(Math.ceil(o_power).toString() + '%')
    power_text.left = 0
    power_text.bottom = 109
}

function handle_time() {
    time = Math.floor((game_timer.get_time() / 86 + 11) % 12 + 1)
    time_text.right = 158
    time_text.top = 12
    time_text.setText(time.toString() + ' AM')
    night_disp_text.setText('Night ' + night.toString())
    night_disp_text.right = 158
    night_disp_text.top = 2
    if (time == 6) {
        game_timer.stop()
        mygame.set_mode('win')
    }
}

let the_update_handler: () => void = null
let last_game_runtime: number = 0
let spf: number
game.onUpdate(function () {
    spf = (game.runtime() - last_game_runtime) / 1000
    last_game_runtime = game.runtime()
    if (!game_timer.paused) {
        let keys = Object.keys(ani)
        for (let i = 0; i < keys.length; i++) {
            ani[keys[i]].update()
        }
        if (game_state.cams_broken) {
            if (game_state.cams_broken_timer.get_time() > game_state.cams_broken_limit) {
                game_state.cams_broken = false
            }
        }
        if (ani != null && (game_state.ani_in == '' || game_state.ani_in == 'sam')) {
            if (ani['hopps'].room == 'office') {
                game_state.ani_in = 'hopps'
                mygame.set_mode('jumpscare')
            }
            if (ani['ohnoes'].room == 'office') {
                game_state.ani_in = 'ohnoes'
                mygame.set_mode('jumpscare')
            }
            if (game_state.ani_in == 'squid') {
                mygame.set_mode('jumpscare')
            }
        }
    }
    if (the_update_handler != null)
        the_update_handler()
})

// Main


let mygame = new Fnaw
mygame.set_mode('menu')

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