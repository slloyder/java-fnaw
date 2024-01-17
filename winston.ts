class Winston extends Animatronic {
    enter_timer: Timer = new Timer
    old_room: string
    will_move: boolean
    constructor() {
        super('Show Stage')
        super.reset()
        this.reset()
        this.move_table = {
            'Show Stage': {
                'Dining Area': () => 1
            },
            'Dining Area': {
                'East Hall 1': () => 50 - this.level * 2,
                'Kitchen': () => 50 + this.level * 2
            },
            'East Hall 1': {
                'Dining Area': () => 25 - this.level,
                'East Hall 2': () => 75 + this.level * 3
            },
            'East Hall 2': {
                'East Hall 1': () => 25 - this.level,
                'East Hall 3': () => 75 + this.level * 3
            },
            'East Hall 3': {
                'South Hall': () => 75 + this.level * 3,
                'East Hall 2': () => 25 - this.level
            },
            'South Hall': {
                'Kitchen': () => 50,
                'East Hall 3': () => 50
            },
            'Kitchen': {
                'South Hall': () => 75 + this.level * 3,
                'Dining Area': () => 25 - this.level
            }
        }
        this.monitor_images = {
            'generic': 'winston'
        }
    }
    reset () {
        super.reset()
        this.room = this.start_room
        this.level = ani_AI['win'][night - 1]
        this.wait = Math.map(Math.pow(this.level / 20, 0.25) * 20, 0, 20, Math.randomRange(90.0, 160.0), 1) + Math.randomRange(-(20 - this.level) + 5, (10 / ((this.level + 1) / 5))) + Math.pow(1 - this.level / 20, 10) * 500
        this.move_timer.start()
        this.mode_timer.start()
        this.mode_limit = Math.randomRange(20.0, 35)
        this.mode = Math.randomRange(0.0, 3)
        this.enter_timer.stop()
        this.enter_timer.start()
    }
    move () {
        this.wait = Math.map(20 - Math.pow(1 - this.level / 20, 3) * 20, 0, 20, 100, 5) + Math.randomRange(0.0, 10 / (this.level + 1))
        this.will_move = true
        this.old_room = this.room
        this.room = choose(this.move_table[this.room])
        if (game_state.viewed_room == this.room && game_state.monitor_on) {
            this.room = this.old_room
            this.will_move = false
        }
        else {
            this.move_timer.reset()
        }
        if (this.room == 'South Hall') {
            this.enter_time = this.wait * (1 - (this.level - 5) / 15)
        }
        if (this.will_move) {
            this.move_noise()
        }
    }
    update () {
        if (this.room == 'office') {
            return
        }
        if (this.mode_timer.get_time() > 25 && (game_state.viewed_room != this.room || game_state.cams_broken || !game_state.monitor_on)) {
            this.mode = Math.randomRange(0.0, 3.0)
            this.mode_timer.reset()
            this.mode_limit = Math.randomRange(20.0, 35) //possibly unused, consider changing/removing           
        }
        if (this.move_timer.get_time() > this.wait && (game_state.viewed_room != this.room || !game_state.monitor_on)) {
            if (this.room != 'Show Stage' || (ani['hopps'].room != 'Show Stage' && ani['ohnoes'].room != 'Show Stage')) {
                this.move()
            }
        }
        if (this.room == 'South Hall' && (game_state.monitor_on || mygame.scene == 'office_back') && !game_state.doors[1]) {
            if (this.enter_timer.get_time() > this.enter_time && game_state.ani_in == '') {
                this.room = 'office'
                this.move_noise()
            }
        }
        else {
            this.enter_timer.reset()
        }
    }
    move_noise () {
        music.setVolume(3)
        //music.pewPew.play()
        music.play(music.createSoundEffect(
            WaveShape.Noise, 239, 675, 255, 230, 170, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve
            ), music.PlaybackMode.InBackground)
        timer.after(170, function () {
            music.play(music.createSoundEffect(
                WaveShape.Noise,
                675,
                500,
                230,
                108,
                100,
                SoundExpressionEffect.Tremolo,
                InterpolationCurve.Logarithmic
            ), music.PlaybackMode.InBackground)
        })
        timer.after(500, function () {
            music.setVolume(3)
            music.play(music.createSoundEffect(
                WaveShape.Noise, 239, 675, 255, 230, 170, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve
            ), music.PlaybackMode.InBackground)
            timer.after(170, function () {
                music.play(music.createSoundEffect(
                    WaveShape.Noise,
                    675,
                    500,
                    230,
                    108,
                    100,
                    SoundExpressionEffect.Tremolo,
                    InterpolationCurve.Logarithmic
                ), music.PlaybackMode.InBackground)
            })
            //music.pewPew.play()
        })
    }
    display(room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            this.monitor_sprite.bottom = 118 
            this.monitor_sprite.left = 126 
        }
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}

class WinstonMusic {
    volume: number
    constructor() {

    }
    
}