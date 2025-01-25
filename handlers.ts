function handle_lights() {
    // left side
    if (game_state.side == 'left' && game_state.lights[0]) {
        window_light_sprites[0].top = 22
        window_light_sprites[0].left = 48
        door_light_sprites[0].top = 13
        door_light_sprites[0].left = 9
        // ani
        for (let l = 0; l < ani_keys.length; l++) {
            if (ani_keys[l] == 'hopps') {
                if (ani['hopps'].room == 'Left Door') {
                    left_door_ani_sprites['hopps'].top = 12
                    left_door_ani_sprites['hopps'].right = 69
                }
                else { hide_sprite(left_door_ani_sprites['hopps']) }
            }
            if (ani_keys[l] == 'hal') {
                if (ani['hal'].room == 'Left Door') {
                    left_door_ani_sprites['hal'].top = 22
                    left_door_ani_sprites['hal'].left = 49
                }
                else { hide_sprite(left_door_ani_sprites['hal']) }
            }
            // surprise
            if (ani[ani_keys[l]].surprise == true && ani[ani_keys[l]].room == 'Left Door') {
                music.smallCrash.play(150)
                if(visual_audio){
                    light.setAll(light.rgb(255, 255, 255))
                    timer.after(150, function() {
                        light.setAll(0)
                    })
                }
                ani[ani_keys[l]].surprise = false
            }
        }
    }
    // hide
    else if (game_state.side == 'left' && !game_state.lights[0]) {
        hide_sprite(window_light_sprites[0])
        hide_sprite(door_light_sprites[0])
        hide_dict(left_door_ani_sprites)
    }

    // right side
    else if (game_state.side == 'right' && game_state.lights[1]) {
        window_light_sprites[1].top = 22
        window_light_sprites[1].left = 89
        door_light_sprites[1].top = 13
        door_light_sprites[1].left = 119
        // ani
        for (let l = 0; l < ani_keys.length; l++) {
            if (ani_keys[l] == 'ohnoes') {
                if (ani['ohnoes'].room == 'Right Door') {
                    right_door_ani_sprites['ohnoes'].top = 23
                    right_door_ani_sprites['ohnoes'].left = 90
                }
                else { hide_sprite(right_door_ani_sprites['ohnoes']) }
            }
            if (ani_keys[l] == 'hal') {
                if (ani['hal'].room == 'Right Door') {
                    right_door_ani_sprites['hal'].top = 14
                    right_door_ani_sprites['hal'].left = 91
                }
                else { hide_sprite(right_door_ani_sprites['hal']) }
            }
            // surprise
            if (ani[ani_keys[l]].surprise == true && ani[ani_keys[l]].room == 'Right Door') {
                music.smallCrash.play(150)
                if (visual_audio) {
                    light.setAll(light.rgb(255, 255, 255))
                    timer.after(150, function () {
                        light.setAll(0)
                    })
                }
                ani[ani_keys[l]].surprise = false
            }
        }
    }
    // hide
    else if (game_state.side == 'right' && !game_state.lights[1]) {
        hide_sprite(window_light_sprites[1])
        hide_sprite(door_light_sprites[1])
        hide_dict(right_door_ani_sprites)
    }
    
}

function handle_doors() {
    if (game_state.side == 'left') {
        if (game_state.doors[0]) {
            door_sprites[0].top = 13
            door_sprites[0].left = 9
        }
        else { hide_sprite(door_sprites[0]) }
    }
    else if (game_state.side == 'right') {
        if (game_state.doors[1]) {
            door_sprites[1].top = 13
            door_sprites[1].left = 119
        }
        else { hide_sprite(door_sprites[1]) }
    }
}
//changeme

function handle_power() {
    for (let i = 0; i <= 3; i++) {
        power_usage_sprites[i].bottom = 119
        power_usage_sprites[i].left = 1 + i * 7
        if (i < game_state.get_usage()) { show_sprite(power_usage_sprites[i]) }
        else { hide_sprite(power_usage_sprites[i]) }
    }
    if (night == 7 && unlimited_power == true) {
        switch (game_state.get_usage()) {
            case 1:
                game_state.power += spf / 9.5
                break
            case 2:
                game_state.power += spf / 5.5
                break
            case 3:
                game_state.power += spf / 4
                break
            case 4:
                game_state.power += spf / 2.5
                break
            default:
                break
        }
    }
    else {
        switch (game_state.get_usage()) {
            case 1:
                game_state.power -=  spf / 9.5
                break
            case 2:
                game_state.power -= spf / 5.5
                break
            case 3:
                game_state.power -= spf / 4
                break
            case 4:
                game_state.power -= spf / 2.5
                break
            default:
                break
        }
    }
    if(night == 7 && unlimited_power == true) {
        power_text.setText(Math.floor(game_state.power).toString() + '%')
    }
    else {
        power_text.setText(Math.ceil(game_state.power).toString() + '%')
    }
    power_text.left = 0
    power_text.bottom = 109
    if (game_state.power <= 0) {
        game_state.power_out = true
        mygame.set_scene('power_out')
    }
}

function handle_time() {
    time = Math.floor((game_timer.get_time() / 86 + 11) % 12 + 1)
    if (!game_state.power_out) {
        time_text.setText(time.toString() + ' AM')
        time_text.right = 158
        time_text.top = 12
        night_text.setText('Night ' + night.toString())
        night_text.right = 158
        night_text.top = 2
    }
    if (time == 6) {
        game_timer.stop()
        mygame.set_scene('win')
    }
}

function handle_jumpscare() {
    if (jumpscare_timer != null){
        if(game_state.ani_in == 'sam'){
            let ran = Math.randomRange(3.0, 5.0)
            if (jumpscare_timer.get_time() <= ran + 1.5 && jumpscare_timer.get_time() >= ran) {
                hide_sprite(ani['sam'].monitor_sprite)
                jumpscare_sprite.top = 5
                jumpscare_sprite.left = 5
                jumpscare_background_sprite.top = 5
                jumpscare_background_sprite.left = 5
                jumpscare_sound()
                scene.cameraShake(10, 2000)
            }
            if(jumpscare_timer.get_time() > ran + 1.5){
                mygame.set_scene('static')
                jumpscare_timer = null
            }
        }
        else {
            if (jumpscare_timer.get_time() <= 1.5) {
                jumpscare_sound()
            }
            else {
                mygame.set_scene('static')
                jumpscare_timer = null
            }
        }
    }
}
function handle_power_out() {
    if (game_state.power_out_mode_timer.paused) { game_state.power_out_mode_timer.play() }
    if (game_state.power_out_mode_timer.get_time() > game_state.power_out_mode_timer_limit) {
        game_state.power_out_mode_timer.reset()
        game_state.power_out_mode++
        switch (game_state.power_out_mode) {
            case 1: {
                game_state.power_out_mode_timer_limit = Math.randomRange(10.0, 40)
                break
            }
            case 2: {
                game_state.power_out_mode_timer_limit = Math.randomRange(10.0, 30)
                break
            }
            case 3: {
                mygame.set_scene('jumpscare')
                return
            }
        }
    }
    if (game_state.winston_flicker_timer.paused) {
        game_state.winston_flicker_on = true
        if (Math.randomRange(0.0, 100) < 5) {
            game_state.winston_flicker_timer.play()
            game_state.winston_flicker_timer_limit = Math.randomRange(0.05, 0.2)
        }
    }
    else {
        game_state.winston_flicker_on = false
        if (game_state.winston_flicker_timer.get_time() > game_state.winston_flicker_timer_limit) {
            game_state.winston_flicker_timer.stop()
        }
    }
    if (game_state.power_out_mode >= 2) {
        scene.setBackgroundImage(null)
        scene.setBackgroundColor(0)
        //light.setAll(0)
    }
    if (game_state.power_out_mode == 1) {
        power_out_winston_music.play(90)
    }
    if (game_state.winston_flicker_on && game_state.power_out_mode == 1 && game_state.side == 'left') {
        power_out_winston_sprite.top = 24
        power_out_winston_sprite.left = 48
    }
    else {
        hide_sprite(power_out_winston_sprite)
    }
}
function handle_golden_winston() {
    if(game_state.golden_winston_timer.get_time() > game_state.golden_winston_come_time && game_state.golden_winston_will_come
    && !game_state.golden_winston_toggle && (game_state.monitor_on || mygame.scene == 'office_back') && !game_state.power_out){
        game_state.golden_winston_toggle = true
    }
    if (game_state.golden_winston_toggle && !game_state.monitor_on && mygame.scene != 'office_back' && !game_state.golden_winston
    && game_state.golden_winston_will_come && game_state.ani_in == '' && !game_state.power_out){
        let animatronic_in_office = false
        for (let i = 0; i < ani_keys.length; i++) {
            if (ani[ani_keys[i]].room == 'office') {
                animatronic_in_office = true
            }
        }
        if(!animatronic_in_office){
            game_state.golden_winston_toggle = false
            game_state.golden_winston = true
            game_state.golden_winston_timer.reset()
        }
    }    
    if (game_state.golden_winston && !game_state.monitor_on && mygame.scene != 'office_back'
    && game_state.golden_winston_timer.get_time() > game_state.golden_winston_attack_time) {
        game_state.golden_winston_attack = true
    }
}
