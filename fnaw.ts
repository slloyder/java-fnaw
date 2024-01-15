class Fnaw {
    scene: string
    office_handler: EventHandler
    office_back_handler: EventHandler
    monitor_handler: EventHandler
    win_handler: EventHandler
    menu_handler: EventHandler
    night_display_handler: EventHandler
    setup_handler: EventHandler
    jumpscare_handler: EventHandler

    constructor() {
        this.office_handler = new EventHandler
        this.office_handler.A = function () {
            game_state.doors[game_state.side] = game_state.doors_broken[game_state.side] == true ? false : !game_state.doors[game_state.side]
            if (!game_state.doors_broken[game_state.side]) {
                music.setVolume(20)
                music.buzzer.play()
            }
        }
        this.office_handler.B = function () {
            game_state.lights[game_state.side] = game_state.doors_broken[game_state.side] == true ? false : !game_state.lights[game_state.side]
            if (!game_state.doors_broken[game_state.side]) {
                music.setVolume(150)
                music.footstep.play()
            }
        }
        this.office_handler.left = function () {
            if (game_state.side != 0) {
                game_state.lights[1] = false
                game_state.side = 0
                scene.setBackgroundImage(createImage(office_backgrounds[game_state.side]))
                load_scene('office_left')
            }
        }
        this.office_handler.right = function () {
            if (game_state.side != 1) {
                game_state.lights[0] = false
                game_state.side = 1
                scene.setBackgroundImage(createImage(office_backgrounds[game_state.side]))
                load_scene('office_right')
            }
        }
        this.office_handler.up = function () {
            music.setVolume(150)
            music.footstep.play()
            mygame.set_scene('monitor')
        }
        this.office_handler.down = function () {
            load_scene('office_back')
            mygame.set_scene('office_back')
        }

        this.office_back_handler = new EventHandler
        this.office_back_handler.B = function () {
            game_state.back_door_closed = false
            mygame.set_scene('office')
        }
        this.office_back_handler.up = function () {
            game_state.back_door_closed = false
            music.setVolume(150)
            music.footstep.play()
            mygame.set_scene('monitor')
        }

        this.monitor_handler = new EventHandler
        this.monitor_handler.left = function () {
            selected_room = cams[selected_room][0]
        }
        this.monitor_handler.right = function () {
            selected_room = cams[selected_room][1]
        }
        this.monitor_handler.up = function () {
            selected_room = cams[selected_room][3]
        }
        this.monitor_handler.down = function () {
            selected_room = cams[selected_room][2]
        }
        this.monitor_handler.A = function () {
            if (selected_room == 'DIE') {
                game_state.ani_in = 'hopps'
                mygame.set_scene('jumpscare')
                return
            }
        }
        this.monitor_handler.B = function () {
            music.setVolume(150)
            music.footstep.play()
            mygame.set_scene('office')
        }
        
        this.win_handler = new EventHandler

        this.menu_handler = new EventHandler
        this.menu_handler.A = function () {
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
            }
        }
        this.menu_handler.up = function () {
            menu_pos -= 1
            if (menu_pos == 1 && !blockSettings.exists('night')) { menu_pos -= 1 }
            if (menu_pos == 2 && blockSettings.readNumber('everything') == 0) { menu_pos -= 1 }
            if (menu_pos < 1) { menu_pos = 0 }
        }
        this.menu_handler.down = function () {
            menu_pos += 1
            if (menu_pos == 1 && !blockSettings.exists('night')) { menu_pos += 1 }
            if (menu_pos == 2 && blockSettings.readNumber('everything') == 0) { menu_pos += 1 }
            if (menu_pos > 2) { menu_pos = 0 }
        }

        this.night_display_handler = new EventHandler

        this.setup_handler = new EventHandler

        this.jumpscare_handler = new EventHandler

    }

    set_scene(specified_scene: string) {
        this.scene = specified_scene
        sprites.destroyAllSpritesOfKind(SpriteKind.inram)
        control.gc()
        hide_all()
        switch (specified_scene) {
            case 'office': {
                install_handler(this.office_handler)
                init_palette('office')
                game_state.monitor_on = false
                viewed_room = null
                play_all()
                if (game_state.side == 0) {
                    load_scene('office_left')
                }
                else if (game_state.side == 1) {
                    load_scene('office_right')
                }
                scene.setBackgroundImage(createImage(office_backgrounds[game_state.side]))
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
                init_palette('office_back')
                load_scene('office_back')
                scene.setBackgroundImage(createImage('officeBack'))
                game_state.lights = [false, false]
                the_update_handler = function () {
                    if (controller.A.isPressed() && !game_state.back_door_closed) {
                        game_state.back_door_closed = true
                        back_door_sprite.setImage(createImage('backDoorClosed'))
                        back_door_sprite.left = 66
                        back_door_sprite.top = 36
                        music.setVolume(140)
                        music.thump.play()
                    }
                    else if (!controller.A.isPressed() && game_state.back_door_closed){
                        game_state.back_door_closed = false
                        back_door_sprite.setImage(createImage('backDoorOpen'))
                        back_door_sprite.left = 56
                        back_door_sprite.top = 26
                        music.setVolume(60)
                        music.zapped.play()
                    }
                    
                    handle_power()
                    handle_time()
                }
                break
            }
            case 'monitor': {
                install_handler(this.monitor_handler)
                init_palette('monitor')
                load_scene('monitor')
                monitor_anim_sprite.top = 12
                monitor_anim_sprite.left = 2
                animation.runImageAnimation(monitor_anim_sprite, monitor_anim, 1000, true)
                monitor_map_sprite.top = 0
                monitor_map_sprite.left = 0
                monitor_label_sprite.top = 11
                monitor_label_sprite.left = 30
                the_update_handler = function () {
                    game_state.monitor_on = true
                    if (selected_room != 'DIE') {
                        viewed_room = selected_room
                    }
                    if (viewed_room != 'Kitchen') {
                        //hide_sprite_array(kitchen_texts)
                        hide_sprite(kitchen_text)
                    }
                    else {
                        kitchen_text.top = 1
                        kitchen_text.left = 58
                    }
                    if (game_state.cams_broken || viewed_room == 'Kitchen' || viewed_room == game_state.hal_meddled_room) {
                        scene.setBackgroundImage(null)
                    }
                    else {
                        scene.setBackgroundImage(createImage('genericRoom'))
                    }
                    let keys = Object.keys(ani)
                    for (let i = 0; i < keys.length; i++) {
                        ani[keys[i]].display(viewed_room)
                    }

                    handle_power()
                    handle_time()
                    show_sprite(cam_select)
                    cam_select.left = cam_positions[selected_room][0]
                    cam_select.top = cam_positions[selected_room][1]
                    monitor_room_text.top = 1
                    monitor_room_text.left = 1
                    monitor_room_text.setText(viewed_room)
                }
                break
            }
            case 'win': {
                install_handler(this.win_handler)
                hide_all()
                load_scene('win')
                pause_all()
                scene.setBackgroundImage(null)
                six_am_slit.top = 27
                six_am_slit.left = 52
                six_am_slide.bottom = 66
                six_am_slide.left = 52
                let animator = make_lerp(six_am_slide.top, six_am_slide.top + six_am_slide.height / 2)
                let win_seq = new Sequence([
                    0.5, function (a: number) {
                        scene.setBackgroundImage(null)
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
                let keys = Object.keys(ani)
                for (let i = 0; i < keys.length; i++) {
                    ani[keys[i]].reset()
                }
                the_update_handler = function () {
                    win_seq.run_once(spf)
                }
                break
            }
            case 'menu': {
                install_handler(this.menu_handler)
                init_palette('menu')
                load_scene('menu')
                if (!blockSettings.exists('everything')) {
                    blockSettings.writeNumber('everything', 0)
                }
                scene.setBackgroundImage(null)
                menu_title[0].scale = 2
                menu_title[0].top = 1
                menu_title[0].left = 1
                menu_title[1].scale = 2
                menu_title[1].left = 1
                menu_title[1].top = 20
                menu_title[2].scale = 3
                menu_title[2].top = 40
                menu_title[2].right = 150
                menu_winston.bottom = 110
                menu_winston.right = 150
                menu_option_texts[1].setText('Continue ' + blockSettings.readNumber('night').toString())
                for (let i = 0; i < menu_option_texts.length; i++) {
                    menu_option_texts[i].left = 17
                    menu_option_texts[i].top = 50 + i * 12
                }
                if (!blockSettings.exists('night')) {
                    hide_sprite(menu_option_texts[1])
                    menu_option_texts[0].setText('Play')
                }
                else {
                    menu_option_texts[0].setText('New Game')
                }
                if (blockSettings.readNumber('everything') == 0) {
                    hide_sprite(menu_option_texts[2])
                }
                the_update_handler = function () {
                    menu_selector.right = 13
                    menu_selector.top = 52 + menu_pos * 12
                }
                break
            }
            case 'night_display': {
                install_handler(this.night_display_handler)
                twelve_am_text.setPosition(80, 55)
                night_text.setText('Night ' + night.toString())
                night_text.setPosition(80, 65)
                let night_seq = new Sequence([
                    3, function (a: number) {
                        scene.setBackgroundImage(null)
                    },
                    0, function (a: number) {
                        game_timer.start()
                        ani = {
                            'hopps': new Hopper,
                            'ohnoes': new OhNoes,
                            'squid': new Squidical,
                            'hal': new Hal,
                            'pant': new Panteater
                        }
                        mygame.set_scene('office')
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
                selected_room = 'Show Stage'
                mygame.set_scene('night_display')
                break
            }
            case 'jumpscare': {
                install_handler(this.jumpscare_handler)
                console.log('set scene as jumpscare')
                load_scene('jumpscare')
                pause_all()
                blockSettings.writeNumber('night', night)
                let keys = Object.keys(ani)
                for (let i = 0; i < keys.length; i++) {
                    ani[keys[i]].reset()
                }
                //console.log(control.gcStats())
                init_jumpscare(game_state.ani_in)
                the_update_handler = function () {
                    handle_jumpscare()
                }
                break
            }
            case 'static': {
                install_handler(this.jumpscare_handler)
                jumpscare_sprite.destroy()
                init_palette('static')
                load_scene('static')
                scene.setBackgroundImage(null)
                //show_sprite(static_anim_sprite)
                //console.log(control.gcStats())
                //static_anim = [createImage('staticPic1')]
                //animation.runImageAnimation(static_anim_sprite, static_anim, 77, true)
                scene.setBackgroundImage(createImage('staticPic1'))
                let static_seq = new Sequence([
                    5, function (a: number) { },
                    0, function (a: number) {
                        //animation.stopAnimation(animation.AnimationTypes.All, static_anim_sprite)
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