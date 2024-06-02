class Game {
    paused: boolean = false
    time: number = 0
    power: number
    side: string
    lights: boolean[]
    doors: boolean[]
    doors_broken: boolean[]
    doors_broken_timers: Timer[]
    doors_broken_limits: number[]
    back_door_closed: boolean
    monitor_on: boolean
    viewed_room: string
    selected_room: string
    cams_broken: boolean
    cams_broken_timer: Timer
    cams_broken_limit: number
    hal_meddled_room: string
    ani_in: string = ''
    fake_squidical_level: number
    jumpscare_timer: Timer
    jumpscare_wait_timer: Timer
    jumpscare_wait_limit: number
    jumpscare_ready: JumpscareReady
    constructor() { }

    reset() {
        this.paused = false
        this.time = 0
        this.power = 100
        this.side = 'left'
        this.lights = [false, false]
        this.doors = [false, false]
        this.doors_broken = [false, false]
        this.doors_broken_limits = [0, 0]
        this.doors_broken_timers = [new Timer, new Timer]
        this.back_door_closed = false
        this.monitor_on = false
        this.viewed_room = 'Show Stage'
        this.selected_room = 'Show Stage'
        this.cams_broken = false
        this.cams_broken_limit = Math.randomRange(3.0, 5)
        this.cams_broken_timer = new Timer
        this.hal_meddled_room = ''
        this.ani_in = ''
        this.fake_squidical_level = 0
        this.jumpscare_timer = new Timer
        this.jumpscare_wait_limit = Math.randomRange(5.0, 10)
        this.jumpscare_wait_timer = new Timer
        this.jumpscare_ready = new JumpscareReady
    }

    get_usage() {
        let p = 1
        if (this.lights[0] || this.lights[1]) { p++ }
        if (this.doors[0]) { p++ }
        if (this.doors[1]) { p++ }
        if (this.monitor_on) { p++ }
        return p
    }
    disable_cams() {
        this.cams_broken = true
        this.cams_broken_timer.reset()
        this.cams_broken_timer.start()
        this.cams_broken_limit = Math.randomRange(3.0, 5)
        this.fake_squidical_level = ani['squid'].danger
        if(mygame.scene == 'monitor'){
            load_scene('monitor')
        }
        music.thump.play(64)
        timer.after(200, function () {
            music.thump.play(64)
            timer.after(200, function () {
                music.thump.play(64)
            })
        })
    }
    disable_doors(d_night: number, d_side: number, d_ani: string) {
        this.doors_broken[d_side] = true
        this.doors[d_side] = false
        this.lights[d_side] = false
        this.doors_broken_timers[d_side].reset()
        this.doors_broken_timers[d_side].start()
        if (d_night < 5) { this.doors_broken_limits[d_side] = d_night * 10 }
        if (d_night == 5 || d_night == 6) { this.doors_broken_timers[d_side].pause() }
        if (d_night == 7) {
            switch (d_ani) {
                case 'hopps': {
                    if (ani['hopps'].level >= 14) { this.doors_broken_timers[d_side].pause() }
                    this.doors_broken_limits[d_side] = Math.max(ani['hopps'].level * 3, 3)
                    break
                }
                case 'ohnoes': {
                    if (ani['ohnoes'].level >= 14) { this.doors_broken_timers[d_side].pause() }
                    this.doors_broken_limits[d_side] = Math.max(ani['ohnoes'].level * 3, 3)
                    break
                }
                case 'hal': {
                    if (ani['hal'].level >= 12) { this.doors_broken_timers[d_side].pause() }
                    this.doors_broken_limits[d_side] = Math.max(ani['hal'].level * 6,6)
                    break
                }
            }
        }
    }
    pause () {
        this.paused = true
        this.doors_broken_timers[0].pause()
        this.doors_broken_timers[1].pause()
        this.cams_broken_timer.pause()
        this.jumpscare_wait_timer.pause()
        this.jumpscare_timer.pause()
        this.jumpscare_ready.timer.pause()
    }
    unpause() {
        this.paused = false
        this.doors_broken_timers[0].play()
        this.doors_broken_timers[1].play()
        this.cams_broken_timer.play()
        this.jumpscare_wait_timer.play()
        this.jumpscare_timer.play()
        this.jumpscare_ready.timer.play()
    }
}
