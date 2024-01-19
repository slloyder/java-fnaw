class OhNoes extends Animatronic {
    sound_timer: Timer = new Timer
    stl: number
    constructor() {
        super('Show Stage')
        //super('Kitchen')
        //super('Right Door')
        super.reset()
        this.reset()
        this.stl = Math.randomRange(1.0, 5) //SoundTimerLimit
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
            'generic': 'ohnoes'
        }
    }
    reset() {
        super.reset()
        this.level = ani_AI['ohnoes'][night - 1]
        this.wait = Math.map(Math.pow(this.level / 20, 0.25) * 20, 0, 20, Math.randomRange(90.0, 160), 1) + Math.randomRange(-(20 - this.level) + 5, (10 / ((this.level + 1) / 5)))
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.leave_time = (this.wait * 2.5 + Math.randomRange(0.0, 20 - this.level / 2.5)) / (2.5 - this.level / 50)
        this.leave_timer.stop()
        this.sound_timer.stop()
        this.sound_timer.start()
    }
    move() {
        this.move_timer.reset()
        this.wait = Math.map(this.level, 0, 20, 30, 7) + Math.randomRange(-5, 10 / (this.level + 1))
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.viewed_room != 'Kitchen') {
            game_state.disable_cams()
        }
        if (game_state.viewed_room == 'Arcade' && !game_state.cams_broken && Math.floor(this.mode) == 2 && this.room == 'East Hall 3') {
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
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.viewed_room != 'Kitchen') {
            game_state.disable_cams()
        }
        if (game_state.viewed_room == 'Arcade' && !game_state.cams_broken && Math.floor(this.mode) == 2 && this.room == 'East Hall 3') {
            game_state.disable_cams()
        }
    }
    update() {
        if (this.sound_timer.get_time() > this.stl && this.room == 'Kitchen') {
            if (game_state.viewed_room == 'Kitchen') {
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
        if (this.mode_timer.get_time() > 25 && (game_state.viewed_room != this.room || game_state.cams_broken)) {
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
                    game_state.disable_doors(night, 1, 'ohnoes')
                }
                else {
                    this.room = 'office'
                    game_state.ani_in = 'ohnoes'
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
    display(room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            switch (room) {
                case 'Show Stage': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'Dining Area': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'South Hall': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'Spare Room': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'Bathrooms': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'East Hall 1': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'East Hall 2': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'East Hall 3': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'Laser Tag Prep': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                case 'Changing Rooms': {
                    this.monitor_sprite.bottom = 114
                    this.monitor_sprite.left = 50
                    break
                }
                default: {
                    break
                }
            }
        }
        else {
            if (room == 'Dining Area' || room == 'Show Stage' || room == 'Spare Room'
            || room == 'South Hall' || room == 'Bathrooms' || room == 'East Hall 1'|| room == 'East Hall 2'
            || room == 'East Hall 3' || room == 'Laser Tag Prep' || room == 'Changing Rooms') {
                hide_sprite(this.monitor_sprite)
            }
        }
    }
}
