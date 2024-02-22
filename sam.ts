class Sam extends Animatronic {
    pos: number
    constructor () {
        super('Lab')
        super.reset()
        this.reset()
        this.monitor_images = {
            'generic': 'sam'
        }
    }
    reset () {
        this.level = ani_AI['sam'][night - 1]
        this.room = this.start_room
        this.wait = (Math.map(Math.pow(this.level / 20, 0.25) * 20, 0, 20, Math.randomRange(500.0, 600), 10) + Math.randomRange(-(20 - this.level) + 5, (10 / ((this.level + 1) / 5)))) / (Math.min(this.level, 1))
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.pos = 0
    }
    move () {
        this.move_timer.reset()
        this.wait = Math.map(this.level, 0, 20, 60, 10) + Math.randomRange(0.0, 20 / (this.level + 1))
        if (game_state.viewed_room == this.room && game_state.monitor_on && !game_state.cams_broken) {
            game_state.disable_cams()
        }
        if (this.room == 'Lab') {
            this.room = 'North Hall'
        }
        else if (this.room == 'North Hall') {
            this.pos++
            if (this.pos >= 2) {
                this.room = 'West Hall'
                this.pos = 0
            }
        }
        else if (this.room == 'West Hall') {
            if (!game_state.doors[0] && game_state.monitor_on) {
                this.room = 'office'
            }
            else {
                this.room = 'North Hall'
            }
        }
        if (game_state.viewed_room == this.room && game_state.monitor_on && !game_state.cams_broken) {
            game_state.disable_cams()
        }
    }
    update () {
        if(this.room == 'office') {
            if (!game_state.monitor_on && game_state.ani_in == '') { game_state.ani_in = 'sam' }
            return
        }
        if (this.mode_timer.get_time() > 25 && (game_state.viewed_room != this.room || game_state.cams_broken)) {
            this.mode = Math.randomRange(0.0, 3)
            this.mode_timer.reset()
            this.mode_limit = Math.randomRange(20.0, 35)
        }
        if (this.move_timer.get_time() > this.wait) {
            this.move()
        }
    }
    pause() {
        this.paused = true
        this.mode_timer.pause()
        this.move_timer.pause()
    }
    play() {
        this.paused = false
        this.mode_timer.play()
        this.move_timer.play()
    }
    display(room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            switch (room) {
                case 'North Hall': {
                    if (this.pos == 0) {
                        this.monitor_sprite.top = 32
                        this.monitor_sprite.left = 127
                        color.setColor(8, color.rgb(5, 5, 5)) //glasses
                        color.setColor(13, color.rgb(0, 16, 22)) //body
                        color.setColor(10, color.rgb(0, 0, 15)) //hair
                    }
                    else if (this.pos == 1) {
                        this.monitor_sprite.bottom = 114
                        this.monitor_sprite.left = 44
                        color.setColor(8, color.rgb(27, 27, 27)) //glasses
                        color.setColor(13, color.rgb(0, 66, 96)) //body
                        color.setColor(10, color.rgb(0, 16, 23)) //hair
                    }
                    break
                }
                case 'West Hall': {
                    if (ani['hopps'].room != room && ani['hal'].room != room) {
                        this.monitor_sprite.top = -26
                        this.monitor_sprite.left = -38
                    }
                    else {
                        this.monitor_sprite.top = 57
                        this.monitor_sprite.left = -13
                    }
                    break
                }
                default: {
                    break
                }
            }
        }
        else {
            if (room == 'North Hall' || room == 'West Hall') {
                hide_sprite(this.monitor_sprite)
            } 
        }
    }
    load(mode: number) {
        let im = image.create(53, 61)
        let temp_eyes = createImage('samEyes1')
        if(this.room == 'North Hall'){
            im.fillCircle(26, 34, 27, 13)
        }
        else if (mygame.scene == 'jumpscare'){
            temp_eyes.replace(8, 5)
            im.fillCircle(26, 34, 27, 2)
        }
        else{
            im.fillCircle(26, 34, 27, 12)
        }
        im.blit(10, 0, 32, 21, createImage('samHair'), 0, 0, 32, 21, true, false)
        im.blit(10, 27, 33, 13, temp_eyes, 0, 0, 33, 13, true, false) //temp
        this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        temp_eyes = null
    }
}