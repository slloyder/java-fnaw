class Hopper extends Animatronic {
    constructor() {
        super('Show Stage')
        //super('Left Door')
        super.reset()
        this.reset()
        this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.leave_time = this.leave_time = (this.wait * 2 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.jump_seq = new Sequence([
            1.5, function (a: number) {
                jumpscare_sound()
            },
            0, function (a: number) {
                //animation.stopAnimation(animation.AnimationTypes.All, jumpscare_sprite)
                mygame.set_scene('static')
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
            'generic': 'hopper'
        }
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
                    game_state.disable_doors(night, 0, 'hopps')
                }
                else {
                    this.room = 'office'
                    game_state.ani_in = 'hopps'
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
        this.jump_seq.loop(spf)
    }
    display(room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            this.monitor_sprite.bottom = 118 //111
            this.monitor_sprite.left = 5 //33
        }
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}
