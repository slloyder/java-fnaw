class Game {
    time: number = 0
    side: number
    lights: boolean[]
    doors: boolean[]
    back_door_closed: boolean
    monitor_on: boolean
    power: number
    cams_broken: boolean
    cams_broken_timer: Timer
    cams_broken_limit: number
    cams_broken_sound_seq: Sequence
    hal_meddled_room: string
    doors_broken: boolean[]
    doors_broken_timers: Timer[]
    doors_broken_limits: number[]
    ani_in: string = ''
    jumpscare_wait_timer: Timer
    jumpscare_wait_limit: number
    jumpscare_ready: JumpscareReady
    constructor() { }

    reset() {
        this.time = 0
        this.side = 0
        this.lights = [false, false]
        this.doors = [false, false]
        this.back_door_closed = false
        this.monitor_on = false
        this.power = 100
        this.cams_broken = false
        this.cams_broken_limit = Math.randomRange(3.0, 5)
        this.cams_broken_timer = new Timer
        this.cams_broken_sound_seq = new Sequence([
            0, function (a: number) {
                music.setVolume(64)
                music.thump.play()
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                music.setVolume(64)
                music.thump.play()
            },
            0.2, function (a: number) { },
            0, function (a: number) {
                music.setVolume(64)
                music.thump.play()
            },
            0.2, function (a: number) {
             }

        ])
        this.doors_broken = [false, false]
        this.doors_broken_limits = [0, 0]
        this.doors_broken_timers = [new Timer, new Timer]
        this.ani_in = ''
        this.jumpscare_wait_limit = Math.randomRange(5.0, 10)
        this.jumpscare_wait_timer = new Timer
        this.jumpscare_ready = new JumpscareReady
    }

    get_usage() {
        let p = 1
        if (this.lights[0] || this.lights[1])
            p++
        if (this.doors[0])
            p++
        if (this.doors[1])
            p++
        if (this.monitor_on)
            p++
        return p
    }
    disable_cams() {
        this.cams_broken = true
        this.cams_broken_timer.reset()
        this.cams_broken_timer.start()
        this.cams_broken_limit = Math.randomRange(3.0, 5)
        //this.cams_broken_sound_seq.reset()
        music.setVolume(64)
        music.thump.play()
        timer.after(200, function () {
            music.setVolume(64)
            music.thump.play()
            timer.after(200, function () {
                music.setVolume(64)
                music.thump.play()
            })
        })
    }
    disable_doors(d_night: number, d_side: number, d_ani: string) {
        this.doors_broken[d_side] = true
        this.doors[d_side] = false
        this.lights[d_side] = false
        this.doors_broken_timers[d_side].reset()
        this.doors_broken_timers[d_side].start()
        if (d_night != 5 && d_night != 6) {
            if (d_night == 7) {
                switch (d_ani) {
                    case 'hopps': {
                        if (ani['hopps'].level >= 14) {
                            this.doors_broken_timers[d_side].pause()
                        }
                        break
                    }
                    case 'ohnoes': {
                        if (ani['ohnoes'].level >= 14) {
                            this.doors_broken_timers[d_side].stop()
                        }
                        break
                    }
                    case 'hal': {
                        if (ani['hal'].level >= 12) {
                            this.doors_broken_timers[d_side].stop()
                        }
                        break
                    }
                    default: {
                        break
                    }
                }
            }

        }
        else {
            this.doors_broken_timers[d_side].stop()
        }
        this.doors_broken_limits[d_side] = d_night * 10
    }
}
