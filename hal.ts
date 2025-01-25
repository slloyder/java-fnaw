class Hal extends Animatronic {
    change_to: Timer = new Timer
    meddle_power_timer: Timer = new Timer
    meddled_room_timer: Timer = new Timer
    song_timer: Timer = new Timer
    change_to_time: number
    to: string
    meddle_power: boolean
    meddle_power_timer_limit: number
    meddled_room: string
    meddled_room_timer_limit: number
    activated: boolean
    sound_seq: Sequence
    move_tables: { [key: string]: { [key: string]: { [key: string]: () => number } } }
    constructor() {
        super('Arcade')
        super.reset()
        this.reset()
        this.move_tables = {
            'right': {
                'Arcade': {
                    'East Hall 3': () => 20 + this.level / 2,
                    'Bathrooms': () => 20 - this.level,
                    'Laser Tag Prep': () => 20 - this.level,
                    'South Hall': () => 20 + this.level,
                    'East Hall 2': () => 20 - this.level
                },
                'Bathrooms': {
                    'Arcade': () => 40 - this.level * 1.75,
                    'East Hall 3': () => 30 + this.level * 0.25,
                    'South Hall': () => 30 + this.level * 2
                },
                'East Hall 3': {
                    'Arcade': () => 25 - this.level,
                    'Kitchen': () => 25 - this.level,
                    'Laser Tag Prep': () => 25 - this.level,
                    'East Hall 2': () => 25 - this.level,
                    'Changing Rooms': () => 25 - this.level,
                    'South Hall': () => 25 + this.level * 5,
                    'Right Door': () => 25 + this.level * 10
                },
                'Right Door': {
                    'South Hall': () => 50,
                    'Kitchen': () => 25 + this.level,
                    'East Hall 3': () => 25 - this.level
                },
                'Kitchen': {
                    'South Hall': () => 20 + this.level,
                    'Dining Area': () => 20 - this.level
                },
                'Laser Tag Prep': {
                    'South Hall': () => 50 + this.level,
                    'East Hall 3': () => 50 + this.level * 0.5,
                    'Arcade': () => 50 - this.level
                },
                'South Hall': {
                    'Arcade': () => 25 - this.level,
                    'Kitchen': () => 50 - this.level,
                    'East Hall 3': () => 25 - this.level,
                    'East Hall 2': () => 25 - this.level,
                    'Right Door': () => 50 + this.level * 3.5,
                    'Laser Tag Prep': () => 25 - this.level
                },
                'East Hall 2': {
                    'Arcade': () => 25 - this.level,
                    'East Hall 3': () => 25 + this.level,
                    'Changing Rooms': () => 20 - this.level,
                    'East Hall 1': () => 20 - this.level,
                    'South Hall': () => 25 + this.level * 2
                },
                'Dining Area': {
                    'Kitchen': () => 25 + this.level * 2,
                    'South Hall': () => 25 + this.level * 3
                },
                'North Hall': {
                    'Kitchen': () => 60 + this.level * 5,
                    'Dining Area': () => 60
                },
                'Furnace Room': {
                    'North Hall': () => 25 + this.level,
                    'Dining Area': () => 25 + this.level * 3
                },
                'Left Door': {
                    'North Hall': () => 100 + this.level * 5,
                    'West Hall': () => 100 + this.level,
                    'Furnace Room': () => 100 - this.level * 5
                },
                'West Hall': {
                    'North Hall': () => 50 + this.level,
                    'Furnace Room': () => 50 - this.level * 2,
                    'Dining Area': () => 50 + this.level * 4
                },
                'East Hall 1': {
                    'Dining Area': () => 50 + this.level,
                    'East Hall 2': () => 50
                },
                'Changing Rooms': {
                    'East Hall 2': () => 50,
                    'East Hall 1': () => 50 - this.level * 2,
                    'East Hall 3': () => 50 + this.level * 2
                }
            },
            'left': {
                'Arcade': {
                    'East Hall 3': () => 20 + this.level / 2,
                    'Bathrooms': () => 20 - this.level,
                    'Laser Tag Prep': () => 20 - this.level,
                    'South Hall': () => 20 - this.level,
                    'East Hall 2': () => 20 + this.level * 2
                },
                'Bathrooms': {
                    'Arcade': () => 40 - this.level * 1.75,
                    'East Hall 3': () => 30 + this.level * 2,
                    'South Hall': () => 30 - this.level
                },
                'East Hall 3': {
                    'Arcade': () => 25 - this.level,
                    'Kitchen': () => 25 - this.level,
                    'Laser Tag Prep': () => 25 - this.level,
                    'East Hall 2': () => 25 + this.level * 5,
                    'Changing Rooms': () => 25 + this.level,
                    'South Hall': () => 25 - this.level
                },
                'Right Door': {
                    'South Hall': () => 50 - this.level * 2,
                    'Kitchen': () => 25 + this.level * 5,
                    'East Hall 3': () => 25 + this.level * 5
                },
                'Kitchen': {
                    'South Hall': () => 20 - this.level,
                    'Dining Area': () => 20 + this.level * 3
                },
                'Laser Tag Prep': {
                    'South Hall': () => 50 - this.level * 2,
                    'East Hall 3': () => 50 + this.level * 2,
                    'East Hall 2': () => 50 + this.level * 3,
                    'Arcade': () => 50 - this.level * 2
                },
                'South Hall': {
                    'Arcade': () => 25 - this.level,
                    'Kitchen': () => 50 + this.level * 2,
                    'East Hall 3': () => 25 - this.level,
                    'East Hall 2': () => 25 - this.level,
                    'Laser Tag Prep': () => 25 - this.level
                },
                'East Hall 2': {
                    'Arcade': () => 25 - this.level,
                    'East Hall 3': () => 25 - this.level,
                    'Changing Rooms': () => 20 - this.level,
                    'East Hall 1': () => 20 + this.level * 3,
                    'South Hall': () => 25 - this.level
                },
                'Dining Area': {
                    'North Hall': () => 30 + this.level * 2,
                    'West Hall': () => 25 + this.level * 3,
                    'Furnace Room': () => 20 + this.level
                },
                'North Hall': {
                    'West Hall': () => 60 + this.level * 3,
                    'Furnace Room': () => 60 - this.level * 2,
                    'Left Door': () => 60 + this.level * 5
                },
                'Furnace Room': {
                    'North Hall': () => 25 + this.level,
                    'West Hall': () => 25 + this.level * 2,
                    'Dining Area': () => 25 - this.level
                },
                'Left Door': {
                    'North Hall': () => 100 + this.level,
                    'West Hall': () => 50 + this.level * 3,
                    'Furnace Room': () => 100 - this.level
                },
                'West Hall': {
                    'North Hall': () => 50 - this.level * 2,
                    'Furnace Room': () => 50 - this.level * 2,
                    'Dining Area': () => 20 - this.level,
                    'Left Door': () => 60 + this.level * 4
                },
                'East Hall 1': {
                    'Dining Area': () => 50 + this.level * 2,
                    'East Hall 2': () => 50 - this.level * 2
                },
                'Changing Rooms': {
                    'East Hall 2': () => 50 - this.level * 2,
                    'East Hall 1': () => 50 + this.level * 2,
                    'Dining Area': () => 30 + this.level * 5
                }
            }
        }
        this.monitor_images = {
            'generic': 'hal'
        }
    }
    reset() {
        super.reset()
        this.level = ani_AI['hal'][night - 1]
        this.wait = (Math.map(Math.pow(this.level / 20, 0.25) * 20, 0, 20, Math.randomRange(90.0, 160), 1) + Math.randomRange(-(20 - this.level) + 5, (10 / ((this.level + 1) / 5)))) / (Math.min(this.level, 1))
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.change_to.stop()
        this.change_to.start()
        this.change_to_time = Math.randomRange(100.0, 200)
        this.to = this.level > 5 ? 'right' : 'left'
        this.meddle_power = this.level > 10
        this.meddle_power_timer.stop()
        this.meddle_power_timer_limit = 30 / this.level + Math.randomRange(-5 / this.level, 5.0)
        this.leave_timer.stop()
        this.meddled_room_timer.stop()
        this.meddled_room = null
        this.meddled_room_timer_limit = Math.randomRange(20.0, 50)
        this.activated = false
        this.song_timer.stop()
        this.song_timer.start()
        let thefunc = function (a: number) {
            hal_sounds[1].play()
            light.setAll(0)
            this.song_timer.reset()
        }
        this.sound_seq = new Sequence([
            0, function (a: number) {
                hal_sounds[0].play()
                if(visual_audio) {light.setAll(light.rgb(255, 0, 110))}
            },
            0.4, function (a: number) { },
            0, function (a: number) {
                hal_sounds[1].play()
                light.setAll(0)
            },
            0.4, function (a: number) { },
            0, function (a: number) {
                hal_sounds[0].play()
                if(visual_audio) {light.setAll(light.rgb(255, 0, 110))}
            },
            0.4, function (a: number) { },
            0, function (a: number) {
                hal_sounds[1].play()
                light.setAll(0)
            },
            0.4, function (a: number) { },
            0, function (a: number) {
                hal_sounds[2].play()
                if (visual_audio) { light.setAll(light.rgb(255, 0, 110)) }
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                hal_sounds[3].play()
                light.setAll(0)
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                hal_sounds[2].play()
                if (visual_audio) { light.setAll(light.rgb(255, 0, 110)) }
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                hal_sounds[3].play()
                light.setAll(0)
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                hal_sounds[0].play()
                if (visual_audio) { light.setAll(light.rgb(255, 0, 110)) }
            },
            0.4, function (a: number) { },
            0, thefunc,
            0.123, function (a: number) {
                
            }
        ])
    }
    move() {
        if(this.room == 'Kitchen' && visual_audio){light.setAll(0)}
        this.activated = true
        this.move_timer.reset()
        this.wait = Math.map(this.level, 0, 20, 30, 5) + Math.randomRange(0.0, 10 / (this.level + 1))
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.viewed_room != 'Kitchen' && game_state.monitor_on) {
            game_state.disable_cams()
        }
        this.room = choose(this.move_tables[this.to][this.room])
        if (this.room == 'Left Door' || this.room == 'Right Door') {
            this.surprise = true
            if (this.room == 'Left Door' && game_state.lights[0]) {
                this.move()
                return
            }
            else if (this.room == 'Right Door' && game_state.lights[1]) {
                this.move()
                return
            }
            this.enter_time = (this.wait * 0.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
            this.leave_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        }
        if (this.room == 'Kitchen') {
            this.sound_seq.reset()
        }
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.viewed_room != 'Kitchen' && game_state.monitor_on) {
            game_state.disable_cams()
        }
    }
    attack() {
        game_state.disable_doors(night, 0, 'hal')
        game_state.disable_doors(night, 1, 'hal')
        game_state.power *= 0.5
        game_state.disable_cams()
        if (this.room == 'Left Door') {
            this.room = 'Right Door'
            this.move()
        }
        else if (this.room == 'Right Door') {
            this.room = 'Left Door'
            this.move()
        }
    }
    meddle() {
        this.meddled_room_timer_limit = Math.randomRange(20.0, 50)
        this.meddled_room_timer.start()
        this.meddled_room = Math.pickRandom(['East Hall 2', 'East Hall 3', 'Show Stage', 'Dining Area', 'South Hall', 'West Hall', 'Kitchen', 'North Hall', 'Furnace Room', 'Supply Closet', 'Spare Room', 'Backstage', 'East Hall 1', 'Changing Rooms', 'Laser Tag Prep', 'Bathrooms', 'Kitchen Tools', 'Arcade'])
    }
    update() {
        game_state.hal_meddled_room = this.meddled_room
        if (this.room == 'Kitchen') {
            if (this.song_timer.get_time() > 3.2 * 2) {
                if (game_state.viewed_room == 'Kitchen' && game_state.monitor_on) {
                    hal_sounds = [
                        soundEffects.createSound(1, 400, 262, 262, 255, 255),
                        soundEffects.createSound(1, 400, 523, 523, 255, 255),
                        soundEffects.createSound(1, 200, 262, 262, 255, 255),
                        soundEffects.createSound(1, 200, 523, 523, 255, 255)
                    ]
                    this.sound_seq.run_once(spf)
                }
                else {
                    hal_sounds = [
                        soundEffects.createSound(1, 400, 262, 262, 128, 128),
                        soundEffects.createSound(1, 400, 523, 523, 128, 128),
                        soundEffects.createSound(1, 200, 262, 262, 128, 128),
                        soundEffects.createSound(1, 200, 523, 523, 128, 128)
                    ]
                    this.sound_seq.run_once(spf)
                }
            }
            else {
                this.sound_seq.reset()
            }
        }
        if (!this.meddled_room_timer.paused) {
            if (this.meddled_room_timer.get_time() > this.meddled_room_timer_limit) {
                this.meddled_room = null
                this.meddled_room_timer.stop()
            }
        }
        if (this.room == 'South Hall' && this.meddle_power) {
            if (this.meddle_power_timer.paused) {
                this.meddle_power_timer.start()
            }
            if (this.meddle_power_timer.get_time() > this.meddle_power_timer_limit) {
                this.meddle()
                this.meddle_power_timer_limit = 30 / this.level + Math.randomRange(-5 / this.level, 5.0)
                this.meddle_power = false
            }
        }
        else {
            this.meddle_power_timer.stop()
        }
        if (this.to == 'left' && !this.meddle_power) {
            this.meddle_power = true
        }
        if (this.change_to.get_time() > this.change_to_time) {
            switch (this.to) {
                case 'left': {
                    this.to = 'right'
                    break
                }
                case 'right': {
                    this.to = 'left'
                    break
                }
            }
            if (this.to == 'right') {
                this.meddle_power = true
            }
            this.change_to_time = Math.randomRange(100.0, 200)
            this.change_to.reset()
        }
        if (this.mode_timer.get_time() > 25 && (game_state.viewed_room != this.room || game_state.cams_broken)) {
            this.mode = Math.randomRange(0.0, 3)
            this.mode_timer.reset()
            this.mode_limit = Math.randomRange(20.0, 35)
        }
        if (this.room != 'Left Door' && this.room != 'Right Door') {
            this.surprise = false
            if (this.move_timer.get_time() > this.wait) {
                this.move()
            }
            this.leave_timer.stop()
        }
        else {
            if (this.leave_timer.paused) {
                this.leave_timer.start()
            }
            if (this.room == 'Left Door') {
                if (this.move_timer.get_time() > this.enter_time && !game_state.doors[0]) {
                    if (!game_state.doors_broken[0]) {
                        this.move_timer.reset()
                        game_state.disable_doors(night, 0, 'hal')
                    }
                    else {
                        this.attack()
                    }
                    this.leave_timer.stop()
                    this.leave_timer.start()
                    if (game_state.monitor_on) {
                        this.attack()
                        this.meddle_power = true
                    }
                }
                if (this.leave_timer.get_time() > this.leave_time && !game_state.lights[0] && (game_state.doors[0] || game_state.doors_broken[0])) {
                    this.move()
                }
            }
            else if (this.room == 'Right Door') {
                if (this.move_timer.get_time() > this.enter_time && !game_state.doors[1]) {
                    if (!game_state.doors_broken[1]) {
                        this.move_timer.reset()
                        game_state.disable_doors(night, 1, 'hal')
                    }
                    else {
                        this.attack()
                    }
                    this.leave_timer.stop()
                    this.leave_timer.start()
                    if (game_state.monitor_on) {
                        this.attack()
                        this.meddle_power = true
                    }
                }
                if (this.leave_timer.get_time() > this.leave_time && !game_state.lights[1] && (game_state.doors[1] || game_state.doors_broken[1])) {
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
        this.song_timer.pause()
        this.change_to.pause()
        this.meddled_room_timer.pause()
        this.meddle_power_timer.pause()
    }
    play() {
        this.paused = false
        this.leave_timer.play()
        this.mode_timer.play()
        this.move_timer.play()
        this.song_timer.play()
        this.change_to.play()
        this.meddled_room_timer.play()
        this.meddle_power_timer.play()
    }
    display(room: string) {
        if (this.room == room && !game_state.cams_broken && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            switch (room) {
                case 'Dining Area': {
                    this.monitor_sprite.top = 36
                    this.monitor_sprite.left = 57
                    break
                }
                case 'North Hall': {
                    this.monitor_sprite.top = 46
                    this.monitor_sprite.left = 147
                    break
                }
                case 'West Hall': {
                    if(ani['hopps'].room != room && ani['sam'].room != room){
                        this.monitor_sprite.top = 23
                        this.monitor_sprite.left = -68
                    }
                    else {
                        this.monitor_sprite.top = 16
                        this.monitor_sprite.left = -42
                    }
                    break
                }
                case 'Furnace Room': {
                    this.monitor_sprite.top = 31
                    this.monitor_sprite.left = 30
                    break
                }
                case 'South Hall': {
                    if (ani['win'].room != room && ani['ohnoes'].room != room && ani['fuzz'].room != room) {
                        this.monitor_sprite.top = 23
                        this.monitor_sprite.right = 241
                    }
                    else {
                        this.monitor_sprite.top = 26
                        this.monitor_sprite.left = 60
                    }
                    break
                    this.monitor_sprite.setPosition(0, 0)
                }
                case 'Arcade': {
                    this.monitor_sprite.top = 68
                    this.monitor_sprite.left = -14
                    break
                }
                case 'Bathrooms': {
                    this.monitor_sprite.top = 51
                    this.monitor_sprite.left = 122
                    break
                }
                case 'East Hall 1': {
                    this.monitor_sprite.bottom = 32
                    this.monitor_sprite.left = 10
                    break
                }
                case 'East Hall 2': {
                    this.monitor_sprite.top = 18
                    this.monitor_sprite.left = 62
                    break
                }
                case 'East Hall 3': {
                    this.monitor_sprite.top = -2
                    this.monitor_sprite.left = 60
                    break
                }
                case 'Laser Tag Prep': {
                    this.monitor_sprite.top = -5
                    this.monitor_sprite.left = -8
                    break
                }
                case 'Changing Rooms': {
                    this.monitor_sprite.top = 31
                    this.monitor_sprite.left = 36
                    break
                }
                default: {
                    break
                }
            }
        }
        else {
            if (room == 'Dining Area' || room == 'North Hall' || room == 'West Hall' || room == 'Furnace Room'
            || room == 'South Hall' || room == 'Arcade' || room == 'Bathrooms' || room == 'East Hall 1'
            || room == 'East Hall 2' || room == 'East Hall 3' || room == 'Laser Tag Prep' || room == 'Changing Rooms') {
                hide_sprite(this.monitor_sprite)
            }
        }
    }
    load(mode: number) {
        let main: Image = null
        let flipped: Image = null
        let padding: Image = null

        if (mode == 0 || mode == 1) {
            main = image.create(54, 74)
            main.blit(11, 0, 16, 74, createImage('halBody'), 0, 0, 16, 74, true, false)
            main.blit(0, 17, 21, 39, createImage('halArm'), 0, 0, 21, 39, true, false)
            main.blit(12, 16, 15, 17, createImage('halChest'), 0, 0, 15, 17, true, false)
            flipped = main.clone()
            flipped.flipX()
            main.blit(0, 0, 54, 74, flipped, 0, 0, 54, 74, true, false)
        }
        if(mode == 1) {
            main.setPixel(25, 7, 1)
            main.setPixel(28, 7, 1)
        }
        if (mode == 2 || mode == 3) {
            main = image.create(94, 74)
            padding = image.create(39, 39)
            main.blit(31, 0, 16, 74, createImage('halBody'), 0, 0, 16, 74, true, false)
            padding.blit(0, 0, 21, 39, createImage('halArm'), 0, 0, 21, 39, true, false)
            padding.replace(9, 8)
            main.blit(0, 2, 39, 39, test_ext.rotated(padding, 90), 0, 0, 39, 39, true, false)
            main.blit(32, 16, 15, 17, createImage('halChest'), 0, 0, 15, 17, true, false)
            flipped = main.clone()
            flipped.flipX()
            main.blit(0, 0, 94, 74, flipped, 0, 0, 94, 74, true, false)
        }
        if (mode == 3) {
            main.setPixel(45, 7, 1)
            main.setPixel(48, 7, 1)
        }
        if (mode == 4) {
            main = image.create(4, 1)
            main.setPixel(0, 0, 1)
            main.setPixel(3, 0, 1)
        }
        if (mode == 5) {
            main = image.create(76, 43)
            padding = image.create(33, 33)
            main.blit(22, 0, 16, 41, createImage('halBody'), 0, 0, 16, 41, true, false)
            padding.blit(0, 0, 16, 33, createImage('halBody'), 0, 41, 16, 33, true, false)
            padding.replace(15, 13)
            main.blit(0, 27, 33, 33, test_ext.rotated(padding, 90), 0, 0, 33, 33, true, false)
            main.blit(23, 16, 15, 17, createImage('halChest'), 0, 0, 15, 17, true, false)
            flipped = main.clone()
            flipped.flipX()
            main.blit(0, 0, 94, 74, flipped, 0, 0, 94, 74, true, false)
        }
        this.monitor_sprite = sprites.create(main, SpriteKind.inram)
        main = null
        flipped = null
        padding = null
    }
}
