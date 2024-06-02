class Winston extends Animatronic {
    enter_timer: Timer = new Timer
    old_room: string
    will_move: boolean
    song: WinstonMusic = new WinstonMusic
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
        if (this.room == 'Kitchen' && visual_audio) { light.setAll(0) }
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
        if (this.room == 'Kitchen') {
            this.song.reset()
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
            this.mode_limit = Math.randomRange(20.0, 35) 
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
        if (this.room == 'Kitchen') {
            if (game_state.viewed_room == 'Kitchen' && game_state.monitor_on) {
                this.song.play(90)
            }
            else {
                this.song.play(30)
            }
        }
    }
    move_noise () {
        music.play(music.createSoundEffect(
            WaveShape.Noise,
            1750,
            1800,
            50,
            200,
            60,
            SoundExpressionEffect.None,
            InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
        if (visual_audio) { light.setAll(light.rgb(255, 215, 0)) }
        timer.after(50, function () {
            music.play(music.createSoundEffect(
                    WaveShape.Noise,
                    1900,
                    1500,
                    255,
                    115,
                    90,
                    SoundExpressionEffect.Vibrato,
                    InterpolationCurve.Curve
            ), music.PlaybackMode.InBackground)
            if (visual_audio) { light.setAll(light.rgb(255, 0, 0)) }
        })
        timer.after(500, function () {
            music.play(music.createSoundEffect(
                WaveShape.Noise,
                1750,
                1800,
                50,
                200,
                60,
                SoundExpressionEffect.None,
                InterpolationCurve.Logarithmic
            ), music.PlaybackMode.InBackground)
            if (visual_audio) { light.setAll(light.rgb(255, 215, 0)) }
            timer.after(50, function () {
                music.play(music.createSoundEffect(
                        WaveShape.Noise,
                        1900,
                        1500,
                        255,
                        115,
                        90,
                        SoundExpressionEffect.Vibrato,
                        InterpolationCurve.Curve
                ), music.PlaybackMode.InBackground)
                if (visual_audio) { light.setAll(light.rgb(255, 0, 0)) }
                timer.after(80, function () {
                    music.play(music.createSoundEffect(
                            WaveShape.Noise,
                            1500,
                            1500,
                            115,
                            90,
                            50,
                            SoundExpressionEffect.Vibrato,
                            InterpolationCurve.Curve
                    ), music.PlaybackMode.InBackground)
                    light.setAll(0)
                })
            })
        })              
        
    }
    display(room: string) {
        if (!game_state.cams_broken && room == this.room && room != 'Kitchen' && room != game_state.hal_meddled_room) {
            switch (room) {
                case 'Show Stage': {
                    this.monitor_sprite.top = 70
                    this.monitor_sprite.left = 107
                    break
                }
                case 'Dining Area': {
                    this.monitor_sprite.top = 44
                    this.monitor_sprite.left = 123
                    break
                }
                case 'South Hall': {
                    if(ani['ohnoes'].room == 'South Hall') {
                        this.monitor_sprite.top = 73
                        this.monitor_sprite.left = 49
                    }
                    else {
                        this.monitor_sprite.top = -20
                        this.monitor_sprite.left = -35
                    }
                    break
                }
                case 'East Hall 1': {
                    this.monitor_sprite.top = 49
                    this.monitor_sprite.left = 44
                    break
                }
                case 'East Hall 2': {
                    this.monitor_sprite.top = 23
                    this.monitor_sprite.left = 46
                    break
                }
                case 'East Hall 3': {
                    this.monitor_sprite.top = 32
                    this.monitor_sprite.left = 103
                    break
                }    
                default: {
                    break
                }
            }
        }
        else {
            if (room == 'Dining Area' || room == 'East Hall 1' || room == 'East Hall 2' || room == 'East Hall 3'
                || room == 'Show Stage' || room == 'South Hall') {
                hide_sprite(this.monitor_sprite)
            }
        }
    }
    load(mode: number) {
        let im: Image = null
        if(mode == 0){
            im = image.create(61, 61)
            im.fillCircle(30, 30, 30, 6)
            im.fillCircle(35, 41, 11, 13)
            im.fillRect(23, 15, 7, 5, 15)
            im.fillRect(40, 15, 7, 5, 15)
            im.fillRect(24, 14, 5, 7, 15)
            im.fillRect(41, 14, 5, 7, 15)
        }
        if (mode == 1) {
            im = image.create(71, 71)
            im.fillCircle(35, 35, 35, 12)
            im.fillCircle(35, 49, 10, 13)
            im.fillRect(18, 18, 9, 7, 15)
            im.fillRect(44, 18, 9, 7, 15)
            im.fillRect(19, 17, 7, 9, 15)
            im.fillRect(45, 17, 7, 9, 15)
            im.setPixel(22, 21, 1)
            im.setPixel(48, 21, 1)
        }
        if (mode == 2) {
            im = image.create(7, 1)
            im.setPixel(0, 0, 1)
            im.setPixel(6, 0, 1)
        }
        if (mode == 3) {
            im = image.create(61, 61)
            im.fillCircle(30, 30, 30, 3)
        }
        this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        im = null
    }
    pause () {
        this.paused = true
        this.move_timer.pause()
        this.mode_timer.pause()
        this.enter_timer.pause()
    }
    play() {
        this.paused = false
        this.move_timer.play()
        this.mode_timer.play()
        this.enter_timer.play()
    }
}

class WinstonMusic {
    volume: number
    sounds: music.Melody[]
    sound_seq: Sequence
    constructor() {
        this.sound_seq = new Sequence([
            0.75, function (a: number) { },
            0, function (a: number) {
                win_sound_a.play(this.volume)
                if(visual_audio){light.setAll(light.rgb(255, 215, 0))}
            },
            0.75, function (a: number) { },
            0, function (a: number) {
                win_sound_b.play(this.volume)
                light.setAll(0)
            },
            0.75, function (a: number) { },
            0, function (a: number) {
                win_sound_a.play(this.volume)
                if (visual_audio) { light.setAll(light.rgb(255, 215, 0)) }
            },
            0.55, function (a: number) { },
            0, function (a: number) {
                win_sound_b.play(this.volume)
            },
            0.23, function (a: number) { },
            0, function (a: number) {
                win_sound_b.play(this.volume)
                light.setAll(0)
            }
        ])
    }
    
    play(volume: number) { 
        this.volume = volume
        this.sound_seq.loop(spf)
    }
    reset() {
        this.sound_seq.reset()
    }
}