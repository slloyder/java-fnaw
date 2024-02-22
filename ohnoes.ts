class OhNoes extends Animatronic {
    sound_timer: Timer = new Timer
    stl: number
    constructor() {
        super('Show Stage')
        super.reset()
        this.reset()
        this.stl = Math.randomRange(1.0, 5) 
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
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.viewed_room != 'Kitchen' && game_state.monitor_on) {
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
        if (game_state.viewed_room == this.room && !game_state.cams_broken && game_state.viewed_room != 'Kitchen' && game_state.monitor_on) {
            game_state.disable_cams()
        }
        if (game_state.viewed_room == 'Arcade' && !game_state.cams_broken && Math.floor(this.mode) == 2 && this.room == 'East Hall 3' && game_state.monitor_on) {
            game_state.disable_cams()
        }
    }
    update() {
        if (this.sound_timer.get_time() > this.stl && this.room == 'Kitchen') {
            if (game_state.viewed_room == 'Kitchen' && game_state.monitor_on) {
                let num = Math.randomRange(0, 1)
                switch (num) {
                    case 0: {
                        music.baDing.play(200)
                        break
                    }
                    case 1: {
                        music.knock.play(200)
                    }
                }
            }
            else {
                let num = Math.randomRange(0, 1)
                switch (num) {
                    case 0: {
                        music.baDing.play(50)
                        break
                    }
                    case 1: {
                        music.knock.play(50)
                    }
                }
            }
            if(volume == 0){
                light.setAll(light.rgb(5, 185, 19))
                timer.after(500, function() {
                    light.setAll(0)
                })
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
                    this.monitor_sprite.top = 74
                    this.monitor_sprite.left = 39
                    break
                }
                case 'Dining Area': {
                    this.monitor_sprite.top = 76
                    this.monitor_sprite.left = 80
                    break
                }
                case 'South Hall': {
                    this.monitor_sprite.top = -10
                    this.monitor_sprite.left = -60
                    break
                }
                case 'Spare Room': {
                    this.monitor_sprite.top = 59
                    this.monitor_sprite.left = 42
                    break
                }
                case 'Bathrooms': {
                    this.monitor_sprite.top = 67
                    this.monitor_sprite.left = 22
                    break
                }
                case 'East Hall 1': {
                    this.monitor_sprite.top = 63
                    this.monitor_sprite.left = 14
                    break
                }
                case 'East Hall 2': {
                    this.monitor_sprite.top = 26
                    this.monitor_sprite.left = 41
                    break
                }
                case 'East Hall 3': {
                    this.monitor_sprite.top = 52
                    this.monitor_sprite.left = 7
                    break
                }
                case 'Laser Tag Prep': {
                    this.monitor_sprite.top = 30
                    this.monitor_sprite.left = 47
                    break
                }
                case 'Changing Rooms': {
                    this.monitor_sprite.top = 63
                    this.monitor_sprite.left = 14
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
    load(mode: number) {
        let im: Image = null
        if (mode == 0) {
            im = createImage('ohnoes')
            im.blit(19, 30, 25, 16, createImage('ohnoesMouth'), 0, 0, 25, 16, false, false) 
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if (mode == 1) {
            im = createImage('ohnoes')
            im.replace(1, 15) 
            im.blit(19, 30, 25, 16, createImage('ohnoesMouth'), 0, 0, 25, 16, false, false) 
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if (mode == 2) {
            im = createImage('ohnoes')
            im.blit(19, 30, 25, 16, createImage('ohnoesMouth'), 0, 0, 25, 16, false, false) 
            im.replace(1, 15) 
            im.replace(13, 15)
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if (mode == 3) {
            im = createImage('ohnoes')
            im.drawLine(15, 18, 26, 18, 15) 
            im.drawLine(35, 18, 46, 18, 15)
            im.fillRect(16, 13, 10, 7, 15)
            im.fillRect(36, 13, 10, 7, 15)
            im.blit(19, 32, 25, 16, createImage('ohnoesMouth').rotated(180), 0, 0, 25, 16, false, false) 
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if (mode == 4) {
            im = createImage('ohnoes')
            im.fillRect(19, 17, 3, 4, 1) 
            im.fillRect(39, 17, 3, 4, 1)
            im.fillRect(23, 17, 2, 4, 15) 
            im.fillRect(43, 17, 2, 4, 15)
            im.drawLine(25, 18, 25, 19, 15)
            im.drawLine(45, 18, 45, 19, 15)
            im.fillRect(16, 13, 10, 4, 15) 
            im.fillRect(36, 13, 10, 4, 15)
            im.blit(14, 31, 25, 16, createImage('ohnoesMouth').rotated(180), 0, 0, 25, 16, false, false) 
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
        if (mode == 5) {
            im = createImage('ohnoes')
            im.fillRect(16, 13, 10, 4, 15) 
            im.fillRect(36, 13, 10, 4, 15)
            im.blit(19, 29, 25, 16, createImage('ohnoesMouth'), 0, 0, 25, 16, false, false) 
            this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        }
    }
}
