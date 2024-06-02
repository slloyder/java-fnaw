class Squidical extends Animatronic {
    anger: number = 0
    power_drain: number = 0
    run_pos: number = 0
    east_hall_color: number = 0
    careful: number = 0
    knock_seq: Sequence
    constructor() {
        super('Squid Reef')
        super.reset()
        this.reset()
        this.run = false
        this.knock_seq = new Sequence([
            0, function (a: number) {
                music.knock.play(200)
                if (visual_audio) { light.setAll(light.rgb(255, 83, 0)) }
            },
            0.3, function (a: number) { },
            0, function (a: number) {
                light.setAll(0)
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                music.knock.play(200)
                if (visual_audio) { light.setAll(light.rgb(255, 83, 0)) }
            },
            0.3, function (a: number) { },
            0, function (a: number) {
                light.setAll(0)
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                music.knock.play(200)
                if(visual_audio){light.setAll(light.rgb(255, 83, 0))}
            },
            0.3, function (a: number) { },
            0, function (a: number) {
                light.setAll(0)
                game_state.power -= this.power_drain
                this.normal_reset()
            }
        ])
        this.monitor_images = {
            'generic': 'squidical'
        }
    }
    normal_reset() {
        super.reset()
        this.run = false
        this.run_pos = 0
        this.anger = 0
        this.careful = 0
        if (this.power_drain == 0) {
            this.power_drain++
        }
        else if (this.power_drain >= 1) {
            this.power_drain += 5
        }
        if (game_state.viewed_room == 'Squid Reef' && game_state.monitor_on && !game_state.cams_broken) {
            game_state.disable_cams()
        }
    }
    reset() {
        this.normal_reset()
        this.power_drain = 0
        this.level = ani_AI['squid'][night - 1]
    }
    update() {
        if (!this.paused) {
            if (!this.run) {
                this.careful -= spf * Math.map(this.level, 0, 20, 0.07, 0.5)
                if (game_state.viewed_room == 'Squid Reef') {
                    this.careful += spf * Math.map(this.level, 0, 20, 0.07, 0.5) * 5
                }
                if (Math.abs(this.careful) > 4) {
                    this.anger += spf * Math.map(this.level, 0, 20, 0.017, 0.1)
                }
                this.careful = Math.constrain(this.careful, -4, 4)
                this.danger = Math.floor(this.anger)
                if (this.danger >= 4) {
                    if (game_state.viewed_room == 'Squid Reef' && game_state.monitor_on && !game_state.cams_broken) {
                        game_state.disable_cams()
                    }
                    this.run = true
                }
            }
            else {
                this.run_pos += spf * 15
                this.run_pos = Math.min(this.run_pos, 200)
                if (ani['ohnoes'].room == 'East Hall 2') {
                    ani['ohnoes'].move()
                }
                if (ani['hal'].room == 'East Hall 2') {
                    ani['hal'].move()
                }
                if (this.run_pos >= 100 && this.run_pos <= 175) {
                    this.room = 'East Hall 2'
                    if(this.run_pos < 130) {
                        this.east_hall_color = Math.map(this.run_pos, 100, 130, 0, 1)
                    }
                }
                else {
                    this.room = 'running'
                }
                
                if (this.run_pos >= 200 /*&& !GW*/) {
                    if (!game_state.doors[1] && game_state.power >= 0) {
                        if (game_state.ani_in == '') {
                            game_state.ani_in = 'squid'
                            mygame.set_scene('jumpscare')
                        }
                    }
                    else {
                        this.knock_seq.loop(spf)
                    }
                }
            }
        }
    }
    display(room: string) {
        if (this.room == room && room != 'Kitchen' && room != game_state.hal_meddled_room && !game_state.cams_broken) {
            switch (room) {
                case 'East Hall 2': {
                    color.setColor(4, color.rgb(87 * this.east_hall_color, 65 * this.east_hall_color, 11 * this.east_hall_color)) 
                    color.setColor(6, color.rgb(112 * this.east_hall_color, 67 * this.east_hall_color, 15 * this.east_hall_color)) 
                    color.setColor(8, color.rgb(89 * this.east_hall_color, 45 * this.east_hall_color, 16 * this.east_hall_color)) 
                    color.setColor(9, color.rgb(68 * this.east_hall_color, 68 * this.east_hall_color, 68 * this.east_hall_color)) 
                    let alpha = Math.map(this.run_pos, 100, 175, 0, 1)
                    let end_scale = 4
                    let center = proj_lerp(66, 74, end_scale, alpha)
                    let scale = proj_lerp(1, end_scale, end_scale, alpha) / 1.5
                    let w = this.monitor_sprite.image.width * scale
                    let scale_percent = 100 *scale
                    this.monitor_sprite.left = center - w / 2
                    this.monitor_sprite.top = proj_lerp(10, 120, end_scale, alpha)
                    scaling.scaleToPercent(this.monitor_sprite, scale_percent, ScaleDirection.Uniformly, ScaleAnchor.TopLeft)
                    break
                }
                case 'Squid Reef': {
                    if (!this.run) {
                        switch (game_state.fake_squidical_level) {
                            case 0: {
                                hide_sprite(this.monitor_sprite)
                                break
                            }
                            case 1: {
                                this.monitor_sprite.top = 94
                                this.monitor_sprite.left = 13
                                break
                            }
                            case 2: {
                                this.monitor_sprite.top = 39
                                this.monitor_sprite.left = 44
                                break
                            }
                            case 3: {
                                this.monitor_sprite.top = 31
                                this.monitor_sprite.left = 64
                                break
                            }
                            case 4: {
                                hide_sprite(this.monitor_sprite)
                                break
                            }
                        }
                    }
                    break
                }
                default: {
                    break
                }
            }
        }
        else {
            if (room == 'Squid Reef' || room == 'East Hall 2')
            hide_sprite(this.monitor_sprite)
        }
    }
    load(mode: number) {
        let im: Image = null
        if(mode == 0){
            im = createImage('squidical')
        }
        if(mode == 1) {
            im = createImage('squidical')
            im.blit(21, 4, 11, 15, createImage('squidicalEye1'), 0, 0, 11, 15, true, false)
        }
        if (mode == 2) {
            im = createImage('squidical')
            im.blit(23, 4, 15, 15, createImage('squidicalEye2'), 0, 0, 15, 15, true, false)
        }
        if (mode == 3) {
            im = image.create(61, 57)
            im.blit(0, 30, 61, 19, createImage('squidical'), 0, 28, 61, 19, true, false)
            im.flipY()
            im.blit(0, 0, 61, 57, createImage('squidical'), 0, 0, 61, 57, true, false)
        }
        this.monitor_sprite = sprites.create(im, SpriteKind.inram)
        im = null
    }
    pause () {
        this.paused = true
    }
    play () {
        this.paused = false
    }
}
