class Fnaw {
    scene: string = 'menu'
    old_scene: string = null
    office_left_handler: EventHandler
    office_right_handler: EventHandler
    office_back_handler: EventHandler
    power_out_handler: EventHandler
    golden_winston_handler: EventHandler
    monitor_handler: EventHandler
    win_handler: EventHandler
    menu_handler: EventHandler
    customize_night_handler: EventHandler
    newspaper_handler: EventHandler
    night_display_handler: EventHandler
    setup_handler: EventHandler
    jumpscare_handler: EventHandler
    paused_handler: EventHandler

    constructor() {
        
        this.office_left_handler = new EventHandler
        this.office_left_handler.A = function () {
            if (!game_state.doors_broken[0]) {
                game_state.doors[0] = !game_state.doors[0]
                music.buzzer.play(20)
            }
        }
        this.office_left_handler.B = function () {
            if (!game_state.doors_broken[0]) {
                game_state.lights[0] = !game_state.lights[0]
                music.footstep.play(150)
            }
        }
        this.office_left_handler.right = function () {
            game_state.lights[0] = false
            game_state.side = 'right'
            mygame.set_scene('office_right')
        }
        this.office_left_handler.up = function () {
            music.footstep.play(150)
            mygame.set_scene('monitor')
        }
        this.office_left_handler.down = function () {
            mygame.set_scene('office_back')
        }

        
        this.office_right_handler = new EventHandler
        this.office_right_handler.A = function () {
            if (!game_state.doors_broken[1]) {
                game_state.doors[1] = !game_state.doors[1]
                music.buzzer.play(20)
            }
        }
        this.office_right_handler.B = function () {
            if (!game_state.doors_broken[1]) {
                game_state.lights[1] = !game_state.lights[1]
                music.footstep.play(150)
            }
        }
        this.office_right_handler.left = function () {
            game_state.lights[1] = false
            game_state.side = 'left'
            mygame.set_scene('office_left')
        }
        this.office_right_handler.up = function () {
            music.footstep.play(150)
            mygame.set_scene('monitor')
        }
        this.office_right_handler.down = function () {
            mygame.set_scene('office_back')
        }
        
        
        this.office_back_handler = new EventHandler
        this.office_back_handler.B = function () {
            mygame.scene = '' //this is here bc handle golden winston needs to know if we're out of this scene without actually changing it
            handle_golden_winston()
            game_state.back_door_closed = false
            if (!game_state.golden_winston) {
                if (game_state.side == 'left') { mygame.set_scene('office_left') }
                if (game_state.side == 'right') { mygame.set_scene('office_right') }
            }
            else {
                mygame.set_scene('golden_winston')
            }
        }
        this.office_back_handler.up = function () {
            game_state.back_door_closed = false
            music.footstep.play(150)
            mygame.set_scene('monitor')
        }
        this.power_out_handler = new EventHandler
        this.power_out_handler.left = function () {
            game_state.side = 'left'
            if (game_state.power_out_mode < 2) { scene.setBackgroundImage(draw_office(game_state.side))}
        }
        this.power_out_handler.right = function () {
            game_state.side = 'right'
            if (game_state.power_out_mode < 2) { scene.setBackgroundImage(draw_office(game_state.side)) }
        }
        this.golden_winston_handler = new EventHandler
        this.golden_winston_handler.up = function () {
            if(!game_state.golden_winston_attack){
                game_state.golden_winston = false
                game_state.golden_winston_will_come = false
                music.footstep.play(150)
                mygame.set_scene('monitor')
            }
        }
        this.golden_winston_handler.menu = function () { console.log('o') }

        this.monitor_handler = new EventHandler
        this.monitor_handler.left = function () {
            game_state.selected_room = cams[game_state.selected_room][0]
        }
        this.monitor_handler.right = function () {
            game_state.selected_room = cams[game_state.selected_room][1]
        }
        this.monitor_handler.up = function () {
            game_state.selected_room = cams[game_state.selected_room][3]
        }
        this.monitor_handler.down = function () {
            game_state.selected_room = cams[game_state.selected_room][2]
        }
        this.monitor_handler.A = function () {
            if (game_state.selected_room == 'DIE') {
                game_state.ani_in = 'hopps'
                //game_state.power_out = true
                mygame.set_scene('jumpscare')
                return
            }
        }
        this.monitor_handler.B = function () {
            music.footstep.play(150)
            game_state.monitor_on = false
            game_state.viewed_room = null
            handle_golden_winston()
            if(!game_state.golden_winston){
                if (game_state.side == 'left') { mygame.set_scene('office_left') }
                if (game_state.side == 'right') { mygame.set_scene('office_right') }
            }
            else {
                mygame.set_scene('golden_winston')
            }
        }
        
        
        this.menu_handler = new EventHandler
        this.menu_handler.A = function () {
            music.stopAllSounds()
            if(menu_pos != 3){
                music.buzzer.play(20)
                music.bigCrash.play(55)
            }
            switch (menu_pos) {
                case 0: {
                    night = 1
                    
                    if (controller.up.isPressed()) { night = 2 }
                    if (controller.right.isPressed()) { night = 3 }
                    if (controller.left.isPressed()) { night = 4 }
                    if (controller.B.isPressed()) { night = 5 }
                    mygame.set_scene('setup')
                    break
                }
                case 1: {
                    night = blockSettings.readNumber('night')
                    mygame.set_scene('setup')
                    break
                }
                case 2: {
                    night = 6
                    mygame.set_scene('setup')
                    break
                }
                case 3: {
                    mygame.set_scene('customize_night')
                }
            }
        }
        this.menu_handler.up = function () {
            menu_pos -= 1
            if (menu_pos == 3 && blockSettings.readNumber('everything') == 0) { menu_pos -= 1 }
            if (menu_pos == 2 && blockSettings.readNumber('everything') == 0) { menu_pos -= 1 }
            if (menu_pos == 1 && !blockSettings.exists('night')) { menu_pos -= 1 }
            if (menu_pos < 0) { menu_pos = 0 }
        }
        this.menu_handler.down = function () {
            menu_pos += 1
            if (menu_pos == 1 && !blockSettings.exists('night')) { menu_pos += 1 }
            if (menu_pos == 2 && !blockSettings.readNumber('everything')) { menu_pos += 1 }
            if (menu_pos == 3 && !blockSettings.readNumber('everything')) { menu_pos += 1 }
            if (menu_pos > 3) { menu_pos = 3 }
        }
        //this.menu_handler.menu = function () {
        //    mygame.set_scene('paused')
        //}
        this.customize_night_handler = new EventHandler
        this.customize_night_handler.A = function () {
            if(menu_pos == 8 || menu_pos == 10){
                music.buzzer.play(20)
                music.bigCrash.play(55)
            }
            switch (menu_pos) {
                case 8: {
                    night = 7
                    mygame.set_scene('setup')
                    break
                }
                case 9: {
                    for (let i = 0; i < ani_keys.length; i++) {
                        ani_AI[ani_keys[i]][6] = Math.randomRange(0, 20)
                    }
                    break
                }
                case 10: {
                    for (let i = 0; i < ani_keys.length; i++) {
                        ani_AI[ani_keys[i]][6] = Math.randomRange(0, 20)
                    }
                    night = 7
                    mygame.set_scene('setup')
                    break
                }
                case 12: {
                    if (blockSettings.readNumber('everything')) { unlimited_power = !unlimited_power }
                    break
                }
                case 15: {
                    mygame.set_scene('menu')
                    break
                }
            }
        }
        this.customize_night_handler.left = function () {
            if(menu_pos < 8){
                if(controller.B.isPressed()) {
                    ani_AI[ani_keys[menu_pos]][6] -= 5
                }
                else {
                    ani_AI[ani_keys[menu_pos]][6] -= 1
                }
                if (ani_AI[ani_keys[menu_pos]][6] < 0) { ani_AI[ani_keys[menu_pos]][6] = 0}
            }
        }
        this.customize_night_handler.right = function () {
            if (menu_pos < 8) {
                if (controller.B.isPressed()) {
                    ani_AI[ani_keys[menu_pos]][6] += 5
                }
                else {
                    ani_AI[ani_keys[menu_pos]][6] += 1
                }
                if (ani_AI[ani_keys[menu_pos]][6] > 20) { ani_AI[ani_keys[menu_pos]][6] = 20 }
            }
        }
        this.customize_night_handler.up = function () {
            menu_pos -= 1
            while (menu_pos == 11 || menu_pos == 13 || menu_pos == 14) {
                menu_pos--
                if (!blockSettings.readNumber('everything') && menu_pos == 12) { menu_pos-- }
            }
            if (menu_pos < 0) { menu_pos = 15 }
        }
        this.customize_night_handler.down = function () {
            menu_pos += 1
            while (menu_pos == 11 || menu_pos == 13 || menu_pos == 14) {
                menu_pos++
                if (!blockSettings.readNumber('everything') && menu_pos == 12) { menu_pos++ }
            }
            if (menu_pos > 15) { menu_pos = 0 }
        }

        //paused
        this.paused_handler = new EventHandler
        this.paused_handler.A = function () {
            if (menu_pos == 2) {
                visual_audio = !visual_audio
                if (visual_audio) {
                    light.setAll(light.rgb(155, 155, 155))
                    timer.after(150, function () {
                        light.setAll(0)
                    })
                }
            }
        }
        this.paused_handler.left = function () {
            if (menu_pos == 0) {
                if (controller.B.isPressed()) {
                    music.setVolume(volume - 50)
                }
                else {
                    music.setVolume(volume - 5)
                }
                music.knock.play()
            }
            else if (menu_pos == 1) {
                if (controller.B.isPressed()) {
                    screen.setBrightness(screen.brightness() - 20)
                }
                else {
                    screen.setBrightness(screen.brightness() - 5)
                }
            }
        }
        this.paused_handler.right = function () {
            if (menu_pos == 0) {
                if (controller.B.isPressed()) {
                    music.setVolume(volume + 50)
                }
                else {
                    music.setVolume(volume + 5)
                }
                music.knock.play()
            }
            else if (menu_pos == 1) {
                if (controller.B.isPressed()) {
                    screen.setBrightness(Math.min(99, screen.brightness() + 20))
                }
                else {
                    screen.setBrightness(Math.min(99, screen.brightness() + 5))
                }
            }
        }
        this.paused_handler.up = function () {
            menu_pos -= 1
            if (menu_pos < 0) { menu_pos = 2 }
        }
        this.paused_handler.down = function () {
            menu_pos += 1
            if (menu_pos > 2) { menu_pos = 0 }
        }
        this.paused_handler.menu = function () {
            blockSettings.writeNumber('volume', volume)
            blockSettings.writeNumber('brightness', screen.brightness())
            if (visual_audio) { blockSettings.writeNumber('visual_audio', 1) } else { blockSettings.writeNumber('visual_audio', 0) }
            unpause_game()
            mygame.set_scene(this.old_scene)
        }

        this.newspaper_handler = new EventHandler
        this.newspaper_handler.menu = function () { console.log('o') }
        this.night_display_handler = new EventHandler
        this.night_display_handler.menu = function () { console.log('o') }
        this.win_handler = new EventHandler
        this.win_handler.menu = function () { console.log('o') }
        this.setup_handler = new EventHandler
        this.setup_handler.menu = function () { console.log('o') }
        this.jumpscare_handler = new EventHandler
        this.jumpscare_handler.menu = function () { console.log('o') }
    }

    set_scene(specified_scene: string) {
        this.scene = specified_scene
        sprites.destroyAllSpritesOfKind(SpriteKind.inram)
        switch (specified_scene) {
            case 'office_left': {
                install_handler(this.office_left_handler)
                load_scene('office_left')
                game_state.monitor_on = false
                play_all()

                the_update_handler = function () {
                    handle_lights()
                    handle_doors()
                    handle_power()
                    handle_time()
                    handle_golden_winston()
                }
                break
            }
            case 'office_right': {
                install_handler(this.office_right_handler)
                load_scene('office_right')
                game_state.monitor_on = false
                play_all()

                the_update_handler = function () {
                    handle_lights()
                    handle_doors()
                    handle_power()
                    handle_time()
                    handle_golden_winston()
                }
                break
            }
            case 'office_back': {
                install_handler(this.office_back_handler)
                load_scene('office_back')
                game_state.lights = [false, false]
                the_update_handler = function () {
                    if (controller.A.isPressed() && !game_state.back_door_closed) {
                        game_state.back_door_closed = true
                        back_door_sprite.setImage(createImage('backDoorClosed'))
                        back_door_sprite.left = 66
                        back_door_sprite.top = 36
                        music.thump.play(140)
                    }
                    else if (!controller.A.isPressed() && game_state.back_door_closed){
                        game_state.back_door_closed = false
                        back_door_sprite.setImage(createImage('backDoorOpen'))
                        back_door_sprite.left = 56
                        back_door_sprite.top = 26
                        music.play(music.createSoundEffect(WaveShape.Noise, 3165, 5000, 117, 155, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
                        timer.after(200, function() {
                            music.play(music.createSoundEffect(WaveShape.Noise, 5000, 4178, 110, 9, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                        })
                        
                    }
                    
                    handle_power()
                    handle_time()
                    handle_golden_winston()
                }
                break
            }
            case 'power_out': {
                install_handler(this.power_out_handler)
                load_scene('power_out')
                game_state.lights = [false, false]
                game_state.doors = [false, false]
                game_state.monitor_on = false
                music.stopAllSounds()
                if (game_state.side == 'back') { game_state.side = 'left' }
                game_state.power_out_mode_timer.reset()
                the_update_handler = function () {
                    handle_time()
                    handle_power_out()
                }
                break
            }
            case 'monitor': {
                install_handler(this.monitor_handler)
                //game_state.fake_squidical_level = ani['squid'].danger
                game_state.lights = [false, false]
                game_state.monitor_on = true
                load_scene('monitor')
                
                if (monitor_anim_timer == null) {
                    monitor_anim_timer = new Timer
                }
                monitor_anim_timer.reset()

                the_update_handler = function () {
                    if (game_state.selected_room != 'DIE') {
                        if (game_state.viewed_room != game_state.selected_room) {
                            game_state.viewed_room = game_state.selected_room
                            game_state.fake_squidical_level = ani['squid'].danger
                            load_scene('monitor')
                        }
                    }
                    if (game_state.viewed_room != 'Kitchen') { hide_sprite(kitchen_text) }
                    else {
                        kitchen_text.top = 1
                        kitchen_text.left = 58
                    }
                    if (game_state.cams_broken || game_state.viewed_room == 'Kitchen' || game_state.viewed_room == game_state.hal_meddled_room) {
                        scene.setBackgroundImage(null)
                        scene.setBackgroundColor(15)
                    }  
                    update_decals(game_state.viewed_room)                  
                    for (let i = 0; i < ani_keys.length; i++) {
                        ani[ani_keys[i]].display(game_state.viewed_room)
                    }

                    cam_select.left = cam_positions[game_state.selected_room][0]
                    cam_select.top = cam_positions[game_state.selected_room][1]
                    monitor_room_text.setText(game_state.viewed_room)

                    if(monitor_anim_timer.get_time() <= 1.5) {
                        monitor_anim_sprite.top = 12
                        monitor_anim_sprite.left = 2
                    }
                    else if (1.5 < monitor_anim_timer.get_time() && monitor_anim_timer.get_time() <= 3.0) {
                        hide_sprite(monitor_anim_sprite)
                    }
                    else if (monitor_anim_timer.get_time() > 3) {
                        monitor_anim_timer.reset()
                    }
                    handle_power()
                    handle_time()
                    handle_golden_winston()
                }
                break
            }
            case 'golden_winston': {
                install_handler(this.golden_winston_handler)
                load_scene('golden_winston')
                game_state.lights = [false, false]
                the_update_handler = function () {
                    if(game_state.golden_winston_attack){
                        hide_sprite(time_text)
                        hide_sprite(night_text)
                        hide_sprite(power_text)
                        hide_sprite_array(power_usage_sprites)
                        scaling.scaleToPercent(golden_winston_sprite, 200)
                        golden_winston_sprite.setPosition(80, 60)
                    }
                    else{
                        handle_power()
                        handle_time()
                        handle_golden_winston()
                    }
                }
                break
            }
            case 'win': {
                install_handler(this.win_handler)
                pause_all()
                load_scene('win')
                //ani = null
                let animator = make_lerp(six_am_slide_top.top, six_am_slide_top.top + six_am_slide_top.height - 2)
                let win_seq = new Sequence([
                    0.7, function (a: number) {
                    },
                    3, function (a: number) {
                        six_am_slide_top.top = animator(a)
                        six_am_slide_bottom.top = animator(a) + 22
                    },
                    0.7, function (a: number) { },
                    0, function (a: number) {
                        if (night < 5) {
                            night += 1
                            mygame.set_scene('setup')
                        }
                        else {
                            night = 1
                            blockSettings.writeNumber('night', 1)
                            blockSettings.writeNumber('everything', 1)
                            mygame.set_scene('menu')
                        }
                    }
                ])
                for (let i = 0; i < ani_keys.length; i++) {
                    ani[ani_keys[i]].reset()
                }
                the_update_handler = function () {
                    win_seq.run_once(spf)
                }
                light.setAll(0)
                break
            }
            case 'menu': {
                install_handler(this.menu_handler)
                menu_pos = 0
                load_scene('menu')
                ani = null
                if (!blockSettings.exists('everything')) {
                    blockSettings.writeNumber('everything', 0)
                }            
                menu_option_texts[1].setText('Continue ' + blockSettings.readNumber('night').toString())
                if (!blockSettings.exists('night')) {
                    hide_sprite(menu_option_texts[1])
                    menu_option_texts[0].setText('Play')
                }
                else {
                    menu_option_texts[0].setText('New Game')
                }
                if (blockSettings.readNumber('everything') == 0) {
                    hide_sprite(menu_option_texts[2])
                    hide_sprite(menu_option_texts[3])
                }
                let menu_sound_seq = new Sequence([
                    0, function (a: number) {
                        static_sound_menu.play(10)
                        music.thump.play(110)
                    },
                    0.75, function (a: number) { },
                    0, function (a: number) {
                        music.thump.play(110)
                    },
                    0.30, function (a: number) { },
                    0, function (a: number) {
                        music.knock.play(110)
                    },
                    1.25, function (a: number) { },
                    0, function (a: number) {
                        music.thump.play(110)
                    },
                    0.5, function (a: number) { },
                    0, function (a: number) {
                        music.thump.play(110)
                    },
                    0.30, function (a: number) { },
                    0, function (a: number) {
                        music.knock.play(110)
                    },
                    1, function (a: number) { }
                ])
                the_update_handler = function () {
                    menu_selector.top = 52 + menu_pos * 12
                    menu_sound_seq.loop(spf)
                }
                break
            }
            case 'customize_night': {
                install_handler(this.customize_night_handler)
                menu_pos = 0
                load_scene('customize_night')
                music.stopAllSounds()
                the_update_handler = function () {
                    menu_selector.top = 22 + (menu_pos % 8) * 12
                    menu_selector.right = menu_pos < 8 ? 13 : 100
                    if (menu_pos == 15) { menu_selector.right = 112}
                    for (let i = 0; i < ani_keys.length; i++) {
                        customize_night_numbers[i].setText(ani_AI[ani_keys[i]][6].toString())
                    }
                    if (blockSettings.readNumber('everything')) {
                        if (unlimited_power) {
                            customize_night_numbers[8].setText('Off')
                        }
                        else {
                            customize_night_numbers[8].setText('On')
                        }
                    }
                    else {
                        customize_night_numbers[8].setText('')
                    }
                }
                break
            }
            case 'newspaper': {
                install_handler(this.newspaper_handler)
                load_scene('newspaper')
                let newspaper_seq = new Sequence([
                    0.5, function (a: number) { },
                    0, function (a: number) {
                        mygame.set_scene('night_display')
                    }
                ])
                the_update_handler = function () {
                    newspaper_seq.run_once(spf)
                }
                break
            } 
            case 'night_display': {
                install_handler(this.night_display_handler)
                load_scene('night_display')
                let night_seq = new Sequence([
                    3, function (a: number) { },
                    0, function (a: number) {
                        game_timer.start()
                        ani = {
                            'hal': new Hal,
                            'win': new Winston,
                            'hopps': new Hopper,
                            'fuzz': new Fuzzy,
                            'ohnoes': new OhNoes,
                            'squid': new Squidical,
                            'pant': new Panteater,
                            'sam': new Sam
                        }
                        mygame.set_scene('office_left')
                    }
                ])
                
                the_update_handler = function () {
                    night_seq.run_once(spf)
                }
                break
            }
            case 'setup': {
                game_state.reset()
                game_timer.reset()
                game_timer.start()
                init_palette('')
                if(menu_pos == 0) {
                    mygame.set_scene('newspaper')
                }
                else {
                    mygame.set_scene('night_display')
                }
                break
            }
            case 'jumpscare': {
                install_handler(this.jumpscare_handler)
                load_scene('jumpscare')
                pause_all()
                jumpscare_timer = new Timer
                jumpscare_timer.reset()
                if(game_state.ani_in != 'squid' && game_state.ani_in != 'sam') { 
                    scene.cameraShake(10, 2000)
                }
                blockSettings.writeNumber('night', night)
                for (let i = 0; i < ani_keys.length; i++) {
                    ani[ani_keys[i]].reset()
                }
                the_update_handler = function () {
                    handle_jumpscare()
                }
                break
            }
            case 'static': {
                install_handler(this.jumpscare_handler)
                jumpscare_sprite.destroy()
                load_scene('static')
                light.setAll(0)
                static_sound.play(10)
                game_state.reset()
                let static_seq = new Sequence([
                    5, function (a: number) { },
                    0, function (a: number) {
                        static_anim = null
                        mygame.set_scene('menu')
                    }
                ])

                the_update_handler = function () {
                    static_seq.run_once(spf)
                }
                break
            }
            case 'paused': {
                install_handler(this.paused_handler)
                menu_pos = 0
                load_scene('paused')
                pause_game()
                music.stopAllSounds()
                the_update_handler = function () {
                    menu_selector.top = 22 + (menu_pos % 8) * 12
                    menu_selector.right = menu_pos < 8 ? 13 : 100
                    customize_night_numbers[0].setText(volume.toString())
                    if (screen.brightness() == 94) { screen.setBrightness(95) }
                    if (screen.brightness() == 79) { screen.setBrightness(80) }
                    if (screen.brightness() == 99) {
                        customize_night_numbers[1].setText('MAX')
                    }
                    else {
                        customize_night_numbers[1].setText(screen.brightness().toString())
                    }
                    if (visual_audio){customize_night_numbers[2].setText('On')}
                    else {customize_night_numbers[2].setText('Off')}
                }
                light.clear()
                break
            }
            default: {
                break
            }
        }
    }
}