class EventHandler {
    A: () => void
    B: () => void
    up: () => void
    down: () => void
    left: () => void
    right: () => void
}
function install_handler(handler: EventHandler) {
    controller.A.onEvent(ControllerButtonEvent.Pressed, handler.A ? handler.A : function () { })
    controller.B.onEvent(ControllerButtonEvent.Pressed, handler.B ? handler.B : function () { })
    controller.up.onEvent(ControllerButtonEvent.Pressed, handler.up ? handler.up : function () { })
    controller.down.onEvent(ControllerButtonEvent.Pressed, handler.down ? handler.down : function () { })
    controller.left.onEvent(ControllerButtonEvent.Pressed, handler.left ? handler.left : function () { })
    controller.right.onEvent(ControllerButtonEvent.Pressed, handler.right ? handler.right : function () { })
}
namespace SpriteKind {
    export const inram = SpriteKind.create()
}
class Sequence {
    i: number // current entry
    t: number // current time
    ti0: number // time when current entry starts
    ti1: number // time when current entry ends
    table: any[]
    constructor(table: any[]) {
        this.table = table
        this.i = 0
        this.t = 0
        this.ti0 = 0
        this.ti1 = this.ti0 + this.table[2 * this.i + 0]
    }
    run_once(dt: number) {
        let tn = this.t + dt
        while (tn >= this.ti1) {
            if (2 * this.i >= this.table.length)
                return false

            // last call on this entry
            if (2 * this.i + 1 >= this.table.length)
                console.log("walked off end of table")
            let func = this.table[2 * this.i + 1]
            if (typeof func !== "function") {
                console.log("not a function")
                console.log(func)
            }
            this.table[2 * this.i + 1](1)

            // start next entry
            this.i += 1
            this.ti0 = this.ti1
            if (2 * this.i < this.table.length)
                this.ti1 += this.table[2 * this.i + 0]
        }
        if (tn < this.ti1)
            this.table[2 * this.i + 1]((tn - this.ti0) / (this.ti1 - this.ti0))
        this.t = tn
        return true
    }
    loop(dt: number) {
        let tn = this.t + dt
        while (tn >= this.ti1) {
            if (2 * this.i >= this.table.length) {
                this.reset()
                return false
            }

            // last call on this entry
            this.table[2 * this.i + 1](1)

            // start next entry
            this.i += 1
            this.ti0 = this.ti1
            if (2 * this.i < this.table.length)
                this.ti1 += this.table[2 * this.i + 0]
        }
        if (tn < this.ti1)
            this.table[2 * this.i + 1]((tn - this.ti0) / (this.ti1 - this.ti0))
        this.t = tn
        return true
    }
    reset() {
        this.i = 0
        this.t = 0
        this.ti0 = 0
        this.ti1 = this.ti0 + this.table[2 * this.i + 0]
    }
}

class Timer {
    paused: boolean
    current_time: number
    stored_time: number
    start_time: number
    constructor() {
        this.reset()
    }
    reset() {
        this.paused = false
        this.current_time = 0
        this.stored_time = 0
        this.start_time = game_state.time
    }
    pause() {
        this.paused = true
        this.stored_time = this.current_time
    }
    play() {
        this.start()
    }
    start() {
        this.paused = false
        this.start_time = game_state.time
    }
    stop() {
        this.pause()
        this.reset()
    }
    get_time() {
        if (!this.paused) {
            this.current_time = game_state.time - this.start_time + this.stored_time
        }
        return this.current_time / 1000
    }
}
class JumpscareReady {
    timer: Timer = new Timer
    pulse_limit: number
    pulse_on: boolean = false
    seq: Sequence
    constructor() {
        this.pulse_limit = Math.randomRange(0.5, 2)
        this.seq = new Sequence([
            0, function (a: number) {
                music.buzzer.play(10)
                if (volume == 0) { light.setAll(light.rgb(100, 100, 100)) }
                timer.after(300, function() {
                    light.setAll(0)
                })
            }
        ])
    }
    stop() {
        this.timer.stop()
    }
    run() {
        if (this.timer.paused) {
            this.timer.play()
        }
        if (this.timer.get_time() > this.pulse_limit) {
            this.pulse_on = !this.pulse_on
            this.pulse_limit = Math.randomRange(0.25, 1)
            this.timer.reset()
            this.seq.reset()
        }
        if (this.pulse_on) {
            this.seq.run_once(spf)
        }
    }
}

function proj_lerp(x0: number, x1: number, s1: number, a: number) {
    let s0 = 1
    let x = x0 + (x1/s1 - x0) * a
    let s = 1 + (1/s1 - 1) * a
    return x / s
}

function choose(prob_map: { [key: string]: () => number }) {
    let keys = Object.keys(prob_map)
    let cdf: number[] = [0]
    for (let i = 0; i < keys.length; i++)
        cdf.push(cdf[i] + prob_map[keys[i]]())

    let v = Math.randomRange(0.0, cdf[cdf.length - 1])
    for (let i = 0; i < keys.length; i++) {
        if (v <= cdf[i + 1]) {
            return keys[i]
        }
    }
    return keys[keys.length - 1]
}
function make_lerp(v0: number, v1: number) {
    return function (alpha: number) {
        return v0 + (v1 - v0) * alpha
    }
}
function hide_sprite(s: Sprite) {
    if (s.left < 500) {
        s.left += 500
    }
}
function show_sprite(s: Sprite) {
    if (s.left >= 500) {
        s.left -= 500
    }
}
function hide_all() {
    hide_sprite_array(power_usage_sprites)
    hide_sprite(power_text)
    hide_sprite(time_text)
    hide_sprite(night_text)
    hide_sprite(cam_select)
    hide_sprite(monitor_room_text)
    hide_sprite_array(menu_title)
    hide_sprite_array(menu_option_texts)
    hide_sprite(menu_selector)
    hide_sprite(twelve_am_text)
}
function hide_sprite_array(a: Sprite[]) {
    for (let i = 0; i <= a.length - 1; i++) {
        hide_sprite(a[i])
    }
}
function hide_dict(d: { [key: string]: Sprite }) {
    let keys = Object.keys(d)
    for (let i = 0; i < keys.length; i++) {
        hide_sprite(d[keys[i]])
    }
}
function null_sprites() {
    power_usage_sprites = null
    power_text = null
    time_text = null
    night_text = null
    back_door_sprite = null
    door_sprites = [null, null]
    door_light_sprites = [null, null]
    window_light_sprites = [null, null]
    left_door_ani_sprites = {
        'hopps': null,
        'hal': null
    }
    right_door_ani_sprites = {
        'ohnoes': null,
        'hal': null
    }
    monitor_room_text = null
    monitor_map_sprite = null
    cam_select = null
    monitor_anim_sprite = null
    kitchen_text = null
    monitor_label_sprite = null
    six_am_slit = null
    six_am_slide = null
    twelve_am_text = null
    menu_winston = null
    menu_selector = null
    menu_title = null
    menu_option_texts = null
    customize_night_numbers = null
    jumpscare_sprite = null
    jumpscare_timer = null
    static_anim_sprite = null
    if (ani != null) {
        for (let i = 0; i < ani_keys.length; i++) {
            ani[ani_keys[i]].monitor_sprite = null
        }
    }
    //decals
    show_stage_decal = null
    left_furnace_room_decal = null
    right_furnace_room_decal = null
    door_decal1 = null
    door_decal2 = null
    supply_closet_background_decal = null
    supply_closet_decal = null
    arcade_decal1 = null
    arcade_decal2 = null
    winston_backstage_decals = [null, null, null]
    oh_noes_backstage_decal = null
    squidical_backstage_decal = null
    hopper_backstage_decal = null
    squid_reef_door_frame_decal = null
    squid_reef_door_decal = null
    dining_area_chair_decal1 = null
    dining_area_chair_decal2 = null
}
function pause_all() {
    let keys: any[]
    if (!game_timer.paused)
        game_timer.pause()
    if (!game_state.cams_broken_timer.paused)
        game_state.cams_broken_timer.pause()
    keys = Object.keys(ani)
    for (let i = 0; i < keys.length; i++) {
        if (!ani[keys[i]].paused)
            ani[keys[i]].pause()
    }
}

function play_all() {
    let keys: any[]
    if (game_timer.paused)
        game_timer.play()
    if (game_state.cams_broken_timer.paused)
        game_state.cams_broken_timer.play()
    keys = Object.keys(ani)
    for (let i = 0; i < keys.length; i++) {
        if (ani[keys[i]].paused)
            ani[keys[i]].play()
    }
}
function toString(gcs: control.GCStats) {
    if (gcs == null)
        return "(null)"

    return `#GC:${gcs.numGC}\n`
        + `#bl:${gcs.numBlocks}\n`
        + `TB: ${gcs.totalBytes}\n`
        + `LFB:${gcs.lastFreeBytes}\n`
        + `LMB:${gcs.lastMaxBlockBytes}\n`
        + `MFB:${gcs.minFreeBytes}`;
}