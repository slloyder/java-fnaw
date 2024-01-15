class Squidical extends Animatronic {
    anger: number = 0
    danger: number = 0
    power_drain: number = 0
    run: boolean = false
    run_pos: number = 0
    careful: number = 0
    knock_seq: Sequence
    constructor() {
        super('Squid Reef')
        super.reset()
        this.reset()
        this.knock_seq = new Sequence([
            0, function (a: number) {
                music.setVolume(200)
                music.knock.play()
            },
            0.5, function (a: number) { },
            0, function (a: number) {
                music.setVolume(200)
                music.knock.play()
            },
            0.5, function (a: number) { },
            0, function (a: number) {
                music.setVolume(200)
                music.knock.play()
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
    }
    reset() {
        this.normal_reset()
        this.power_drain = 0
        this.level = ani_AI['squid'][night - 1]
    }
    update() {
        if (!this.run) {
            this.careful -= spf * Math.map(this.level, 0, 20, 0.07, 0.5)
            if (viewed_room == 'Squid Reef') {
                this.careful += spf * Math.map(this.level, 0, 20, 0.07, 0.5) * 5
            }
            if (Math.abs(this.careful) > 4) {
                this.anger += spf * Math.map(this.level, 0, 20, 0.017, 0.1)
            }
            this.careful = Math.constrain(this.careful, -4, 4)
            this.danger = Math.floor(this.anger)
            if (this.danger >= 4) {
                this.run = true
                if (viewed_room == 'Squid Reef') {
                    game_state.disable_cams()
                }
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
            }
            else {
                this.room = 'running'
            }
            //changeme
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
    display(room: string) {
        if (this.room == room && room != 'Kitchen' && room != game_state.hal_meddled_room && !game_state.cams_broken) {
            if (this.room == 'Squid Reef') {
                if (!this.run) {
                    switch (this.danger) {
                        case 0: {
                            this.monitor_sprite.top = 105
                            this.monitor_sprite.left = 58
                            break
                        }
                        case 1: {
                            this.monitor_sprite.top = 86
                            this.monitor_sprite.left = 58
                            break
                        }
                        case 2: {
                            this.monitor_sprite.top = 59
                            this.monitor_sprite.right = 120
                            break
                        }
                        case 3: {
                            this.monitor_sprite.top = 72
                            this.monitor_sprite.left = 138
                        }
                    }
                }
            }
            else if (this.room == 'East Hall 2') {
                this.monitor_sprite.top = 59
                this.monitor_sprite.right = 120
            }
        }
        else {
            hide_sprite(this.monitor_sprite)
        }
    }
}
