function handle_lights() {
    // left side
    if (game_state.side == 'left' && game_state.lights[0]) {
        window_light_sprites[0].top = 22
        window_light_sprites[0].left = 48
        if (!game_state.doors[0]) {
            door_light_sprites[0].top = 13
            door_light_sprites[0].left = 9
        }
        else { hide_sprite(door_light_sprites[0]) }
        // ani
        let keys = Object.keys(ani)
        for (let l = 0; l < keys.length; l++) {
            if (keys[l] == 'hopps') {
                if (ani['hopps'].room == 'Left Door') {
                    left_door_ani_sprites['hopps'].top = 12
                    left_door_ani_sprites['hopps'].right = 69
                }
                else { hide_sprite(left_door_ani_sprites['hopps']) }
            }
            if (keys[l] == 'hal') {
                if (ani['hal'].room == 'Left Door') {
                    left_door_ani_sprites['hal'].top = 22
                    left_door_ani_sprites['hal'].left = 49
                }
                else { hide_sprite(left_door_ani_sprites['hal']) }
            }
            // surprise
            if (ani[keys[l]].surprise == true && ani[keys[l]].room == 'Left Door') {
                music.setVolume(150)
                music.smallCrash.play()
                ani[keys[l]].surprise = false
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
        if (!game_state.doors[1]) {
            door_light_sprites[1].top = 13
            door_light_sprites[1].left = 119
        }
        else { hide_sprite(door_light_sprites[1]) }
        // ani
        let keys = Object.keys(ani)
        for (let l = 0; l < keys.length; l++) {
            if (keys[l] == 'ohnoes') {
                if (ani['ohnoes'].room == 'Right Door') {
                    right_door_ani_sprites['ohnoes'].top = 23
                    right_door_ani_sprites['ohnoes'].left = 90
                }
                else { hide_sprite(right_door_ani_sprites['ohnoes']) }
            }
            if (keys[l] == 'hal') {
                if (ani['hal'].room == 'Right Door') {
                    right_door_ani_sprites['hal'].top = 14
                    right_door_ani_sprites['hal'].left = 91
                }
                else { hide_sprite(right_door_ani_sprites['hal']) }
            }
            // surprise
            if (ani[keys[l]].surprise == true && ani[keys[l]].room == 'Right Door') {
                music.setVolume(150)
                music.smallCrash.play()
                ani[keys[l]].surprise = false
            }
        }
    }
    // hide
    else if (game_state.side == 'right' && !game_state.lights[1]) {
        hide_sprite(window_light_sprites[1])
        hide_sprite(door_light_sprites[1])
        hide_dict(right_door_ani_sprites)
    }
    /*
    if (game_state.lights[game_state.side]) {
        window_light_sprites[game_state.side].top = 22
        if (game_state.side == 0)
            window_light_sprites[game_state.side].left = 48
        else if (game_state.side == 1)
            window_light_sprites[game_state.side].left = 89
        if (game_state.doors[game_state.side]) {
            hide_sprite(door_light_sprites[game_state.side])
        }
        else {
            door_light_sprites[game_state.side].top = 13
            if (game_state.side == 0)
                door_light_sprites[game_state.side].left = 9
            else if (game_state.side == 1)
                door_light_sprites[game_state.side].left = 119
        }
        if (game_state.side == 0) {
            let keys = Object.keys(ani)
            for (let l = 0; l < keys.length; l++) {
                if (keys[l] == 'hopps') {
                    if (ani['hopps'].room == 'Left Door') {
                        left_door_ani_sprites['hopps'].top = 12
                        left_door_ani_sprites['hopps'].right = 69
                    }
                    else {
                        hide_sprite(left_door_ani_sprites['hopps'])
                    }
                }
                if (keys[l] == 'hal') {
                    if (ani['hal'].room == 'Left Door') {
                        left_door_ani_sprites['hal'].top = 22
                        left_door_ani_sprites['hal'].left = 49
                    }
                    else {
                        hide_sprite(left_door_ani_sprites['hal'])
                    }
                }
                if (ani[keys[l]].surprise == true && ani[keys[l]].room == 'Left Door') {
                    music.setVolume(150)
                    music.smallCrash.play()
                    ani[keys[l]].surprise = false
                }
            }
        }
        else if (game_state.side == 1) {
            let keys = Object.keys(ani)
            for (let l = 0; l < keys.length; l++) {
                if (keys[l] == 'ohnoes') {
                    if (ani['ohnoes'].room == 'Right Door') {
                        right_door_ani_sprites['ohnoes'].top = 23
                        right_door_ani_sprites['ohnoes'].left = 90
                    }
                    else {
                        hide_sprite(right_door_ani_sprites['ohnoes'])
                    }
                }
                if (keys[l] == 'hal') {
                    if (ani['hal'].room == 'Right Door') {
                        right_door_ani_sprites['hal'].top = 14
                        right_door_ani_sprites['hal'].left = 91
                    }
                    else {
                        hide_sprite(right_door_ani_sprites['hal'])
                    }
                }
                if (ani[keys[l]].surprise == true && ani[keys[l]].room == 'Right Door') {
                    music.setVolume(150)
                    music.smallCrash.play()
                    ani[keys[l]].surprise = false
                }
            }
        }
        
    }
    else if (!game_state.lights[game_state.side]) {
        hide_sprite(window_light_sprites[game_state.side])
        hide_sprite(door_light_sprites[game_state.side])
        if (game_state.side == 0) {
            let keys = Object.keys(left_door_ani_sprites)
            for (let l = 0; l < keys.length; l++) {
                hide_sprite(left_door_ani_sprites[keys[l]])
            }
        }
        else if (game_state.side == 1) {
            let keys = Object.keys(right_door_ani_sprites)
            for (let l = 0; l < keys.length; l++) {
                hide_sprite(right_door_ani_sprites[keys[l]])
            }
        }
    }
    */
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

function init_jumpscare (animatronic: string) {

    init_palette(animatronic)
    switch (animatronic) {
        case 'win': {
            scene.setBackgroundImage(createImage('officeMid'))
            jumpscare_sprite = sprites.create(createImage('winstonJumpscarePic'), SpriteKind.inram)
            break
        }
        case 'hopps': {
            scene.setBackgroundImage(createImage('officeMid'))
            jumpscare_sprite = sprites.create(createImage('hopperJumpscarePic1'), SpriteKind.inram)
            break
        }
        case 'ohnoes': {
            scene.setBackgroundImage(createImage('officeMid'))
            jumpscare_sprite = sprites.create(createImage('ohnoesJumpscarePic1'), SpriteKind.inram)
            break
        }
        case 'squid': {
            jumpscare_sprite = sprites.create(createImage('squidJumpPic'), SpriteKind.inram)
            scene.setBackgroundImage(createImage('officeRight'))
            jumpscare_sprite.right = 151
            jumpscare_sprite.bottom = 100
            break
        }
        case 'pant': {
            scene.setBackgroundImage(createImage('officeBack'))
            jumpscare_sprite = sprites.create(createImage('panteaterJumpscarePic'), SpriteKind.inram)
            break
        }
    }

}

function handle_jumpscare() {
    if (jumpscare_timer.get_time() < 1.5) {
        jumpscare_sound()
    }
    else {
        jumpscare_timer = null
        mygame.set_scene('static')
    }
}

