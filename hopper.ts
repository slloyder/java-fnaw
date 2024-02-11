class Hopper extends Animatronic {
    constructor() {
        super('Show Stage')
        //super('Left Door')
        super.reset()
        this.reset()
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
        this.enter_time = (this.wait * 1.5 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.leave_time = this.leave_time = (this.wait * 2 + Math.randomRange(0.0, 20 - this.level / 5)) / (2.5 - this.level / 50)
        this.leave_timer.stop()
    }

    move() {
        this.move_timer.reset()
        this.wait = Math.map(this.level, 0, 20, 30, 5) + Math.randomRange(0.0, 10 / (this.level + 1))
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.monitor_on) {
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
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.monitor_on) {
            game_state.disable_cams()
        }
    }

    update() {
        if (this.room == 'office') {
            return
        }
        if (this.mode_timer.get_time() > 25 && (game_state.viewed_room != this.room || game_state.cams_broken)) {
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
    display(room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            let im: Image = null
            switch (room) {
                case 'Show Stage': {
                    this.monitor_sprite.top = 32
                    this.monitor_sprite.left = 3
                    break
                }
                case 'Backstage': {               
                    this.monitor_sprite.top = 24
                    this.monitor_sprite.left = 96
                    break
                }
                case 'Dining Area': {
                    this.monitor_sprite.top = -20
                    this.monitor_sprite.left = -20
                    break
                }
                case 'Supply Closet': {
                    this.monitor_sprite.bottom = 59
                    this.monitor_sprite.right = 118
                    break
                }
                case 'North Hall': {
                    this.monitor_sprite.top = 20
                    this.monitor_sprite.left = 99
                    break
                }
                case 'West Hall': {
                    this.monitor_sprite.top = 12
                    this.monitor_sprite.left = 22
                    break
                }
                case 'Spare Room': {
                    this.monitor_sprite.top = 17
                    this.monitor_sprite.left = -5
                    break
                }
                case 'Furnace Room': {
                    this.monitor_sprite.top = 17
                    this.monitor_sprite.left = 87
                    break
                }
                default: {
                    break
                }
            }
            im = null
        }
        else {
            if (room == 'Dining Area' || room == 'North Hall' || room == 'West Hall' || room == 'Furnace Room'
                || room == 'Backstage' || room == 'Show Stage' || room == 'Supply Closet' || room == 'Spare Room') {
                hide_sprite(this.monitor_sprite)
            }
        }
    }
    load(mode: number) {
        let im: Image = null
        if(mode == 0){
            this.monitor_sprite = sprites.create(createImage(this.monitor_images['generic']), SpriteKind.inram)
        }
        if (mode == 1 || mode == 3) {
            im = createImage('hopper')
            im.fillRect(20, 11, 3, 2, 15) // make eyes black
            im.fillRect(29, 11, 3, 2, 15)
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if (mode == 2) {
            im = createImage('hopper')
            im.fillRect(20, 11, 3, 1, 15) //make eyelids partially closed
            im.fillRect(29, 11, 3, 1, 15)
            im.setPixel(21, 12, 15)
            im.setPixel(30, 12, 15)
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if(mode == 3){
            im.replace(9, 15)
        }
        im = null
    }
}