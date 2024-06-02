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
    switch (game_state.get_usage()) {
        case 1:
            game_state.power -= spf / 10
            break
        case 2:
            game_state.power -= spf / 6
            break
        case 3:
            game_state.power -= spf / 4
            break
        case 4:
            game_state.power -= spf / 3
            break
        default:
            break
    }
    power_text.setText(Math.ceil(game_state.power).toString() + '%')
    power_text.left = 0
    power_text.bottom = 109
}

function handle_time() {
    time = Math.floor((game_timer.get_time() / 86 + 11) % 12 + 1)
    time_text.setText(time.toString() + ' AM')
    time_text.right = 158
    time_text.top = 12
    night_text.setText('Night ' + night.toString())
    night_text.right = 158
    night_text.top = 2
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
                jumpscare_sprite.top = 0
                jumpscare_sprite.left = 0
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

