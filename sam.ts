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
            if (this.pos == 0) {
                this.monitor_sprite.bottom = 104
                this.monitor_sprite.left = 85
            }
            else if (this.pos == 1) {
                this.monitor_sprite.bottom = 117
                this.monitor_sprite.left = 25
            }
        }
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}