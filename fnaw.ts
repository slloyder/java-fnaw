class Fnaw {
    scene: string = 'menu'
    office_left_handler: EventHandler
    office_right_handler: EventHandler
    office_back_handler: EventHandler
    monitor_handler: EventHandler
    win_handler: EventHandler
    menu_handler: EventHandler
    customize_night_handler: EventHandler
    newspaper_handler: EventHandler
    night_display_handler: EventHandler
    setup_handler: EventHandler
    jumpscare_handler: EventHandler

    constructor() {
        // office left
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

        // office right
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
        
        //office back
        this.office_back_handler = new EventHandler
        this.office_back_handler.B = function () {
            game_state.back_door_closed = false
            if (game_state.side == 'left') { mygame.set_scene('office_left') }
            if (game_state.side == 'right') { mygame.set_scene('office_right') }
        }
        this.office_back_handler.up = function () {
            game_state.back_door_closed = false
            music.footstep.play(150)
            mygame.set_scene('monitor')
        }

        // monitor
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
                mygame.set_scene('jumpscare')
                return
            }
        }
        this.monitor_handler.B = function () {
            music.footstep.play(150)
            if (game_state.side == 'left') { mygame.set_scene('office_left') }
            if (game_state.side == 'right') { mygame.set_scene('office_right') }
        }
        
        // menu
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
                    //changeme (temp for debug stuffis)
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
            if (menu_pos == 2 && blockSettings.readNumber('everything') == 0) { menu_pos += 1 }
            if (menu_pos == 3 && blockSettings.readNumber('everything') == 0) { menu_pos += 1 }
            if (menu_pos > 3) { menu_pos = 3 }
        }
        this.customize_night_handler = new EventHandler
        this.customize_night_handler.A = function () {
            music.buzzer.play(20)
            music.bigCrash.play(55)
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
            }
        }
        this.customize_night_handler.left = function () {
            ani_AI[ani_keys[menu_pos]][6] -= 1
            if (ani_AI[ani_keys[menu_pos]][6] < 0) { ani_AI[ani_keys[menu_pos]][6] = 0}
        }
        this.customize_night_handler.right = function () {
            ani_AI[ani_keys[menu_pos]][6] += 1
            if (ani_AI[ani_keys[menu_pos]][6] > 20) { ani_AI[ani_keys[menu_pos]][6] = 20 }
        }
        this.customize_night_handler.up = function () {
            menu_pos -= 1
            if (menu_pos < 0) { menu_pos = 10 }
        }
        this.customize_night_handler.down = function () {
            menu_pos += 1
            if (menu_pos > 10) { menu_pos = 0 }
        }

        // blank handlers
        this.newspaper_handler = new EventHandler
        this.night_display_handler = new EventHandler
        this.win_handler = new EventHandler
        this.setup_handler = new EventHandler
        this.jumpscare_handler = new EventHandler
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
                }
                break
            }
            case 'monitor': {
                install_handler(this.monitor_handler)
                game_state.fake_squidical_level = ani['squid'].danger
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
                }
                break
            }
            case 'win': {
                install_handler(this.win_handler)
                pause_all()
                load_scene('win')
                
                let animator = make_lerp(six_am_slide.top, six_am_slide.top + six_am_slide.height / 2)
                let win_seq = new Sequence([
                    0.5, function (a: number) {
                    },
                    3, function (a: number) {
                        six_am_slide.top = animator(a)
                    },
                    0.5, function (a: number) { },
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
                break
            }
            case 'menu': {
                install_handler(this.menu_handler)
                menu_pos = 0
                load_scene('menu')
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
                the_update_handler = function () {
                    menu_selector.top = 22 + (menu_pos % 8) * 12
                    menu_selector.right = menu_pos < 8 ? 13 : 100
                    for (let i = 0; i < ani_keys.length; i++) {
                        customize_night_numbers[i].setText(ani_AI[ani_keys[i]][6].toString())
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
            default: {
                break
            }
        }
    }
}