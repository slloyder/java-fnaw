class Fuzzy extends Animatronic {
    towards_office: boolean
    constructor () {
        super('Lab')
        super.reset()
        this.reset()
        this.monitor_images = {
            'generic': 'fuzzy'
        }
    }
    reset () {
        this.level = ani_AI['fuzz'][night - 1]
        this.room = this.start_room
        this.wait = 400 / this.level
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.towards_office = true
    }
    move () {
        this.move_timer.reset()
        this.wait = 100 / this.level
        if (game_state.viewed_room == this.room && game_state.monitor_on && !game_state.cams_broken && game_state.viewed_room != 'Kitchen') {
            game_state.disable_cams()
        }
        if (this.towards_office) {
            if (this.room == 'Lab') { this.room = 'Kitchen Tools' }
            else if (this.room == 'Kitchen Tools') { this.room = 'Kitchen' }
            else if (this.room == 'Kitchen') { this.room = 'South Hall' }
            else if (this.room == 'South Hall') {
                if (!game_state.doors[1] && game_state.monitor_on) {
                    this.room = 'office'
                }
                else {
                    this.room = 'Kitchen'
                    this.towards_office = false
                }
            }
        }
        else {
            if (this.room == 'South Hall') { this.room = 'Kitchen' }
            else if (this.room == 'Kitchen') { this.room = 'Kitchen Tools' }
            else if (this.room == 'Kitchen Tools') {
                this.room = 'Kitchen'
                this.towards_office = true
            }
        }
        if (game_state.viewed_room == this.room && game_state.monitor_on && !game_state.cams_broken && game_state.viewed_room != 'Kitchen') {
            game_state.disable_cams()
        }
    }
    update () {
        if (this.room == 'office') {
            game_state.ani_in = 'fuzz'
            mygame.set_scene('jumpscare')
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
                case 'South Hall': {
                    if (ani['ohnoes'].room != room && ani['win'].room != room) {
                        this.monitor_sprite.bottom = 120
                        this.monitor_sprite.right = 140
                    }
                    else {
                        this.monitor_sprite.top = 74
                        this.monitor_sprite.right = 125
                    }
                    break
                }
                case 'Kitchen Tools': {
                    this.monitor_sprite.bottom = 130
                    this.monitor_sprite.left = -4
                    break
                }
                default: {
                    break
                }
            }
        }
        else {
            if (room == 'Kitchen Tools' || room == 'South Hall') {
                hide_sprite(this.monitor_sprite)
            }
        }
    }
    load(mode: number) {
        this.monitor_sprite = sprites.create(createImage(this.monitor_images['generic']), SpriteKind.inram)
    }
}