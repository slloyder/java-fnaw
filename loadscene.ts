function load_scene(specified_scene: string) {
    sprites.destroyAllSpritesOfKind(SpriteKind.inram)
    control.gc()
    hide_all()
    switch (specified_scene) {
        case 'office_left': {
            init_palette('office')
            scene.setBackgroundImage(createImage('officeLeft'))
            door_light_sprites[0] = sprites.create(createImage('leftDoorLight'), SpriteKind.inram)
            window_light_sprites[0] = sprites.create(createImage('leftLight'), SpriteKind.inram)
            left_door_ani_sprites['hopps'] = sprites.create(createImage('hopperDoor'), SpriteKind.inram)
            left_door_ani_sprites['hal'] = sprites.create(createImage('halLeftDoor'), SpriteKind.inram)
            door_sprites[0] = sprites.create(createImage('leftDoor'), SpriteKind.inram)
            power_text.destroy()
            power_text = textsprite.create('')
            for (let i = 0; i < power_usage_sprites.length; i++) { power_usage_sprites[i].destroy() }
            power_usage_sprites = [
                sprites.create(assets.image`powerBarGreen`),
                sprites.create(assets.image`powerBarGreen`),
                sprites.create(assets.image`powerBarYellow`),
                sprites.create(assets.image`powerBarRed`)
            ]
            break
        }
        case 'office_right': {
            init_palette('office')
            scene.setBackgroundImage(createImage('officeRight'))
            door_light_sprites[1] = sprites.create(createImage('rightDoorLight'), SpriteKind.inram)
            window_light_sprites[1] = sprites.create(createImage('rightLight'), SpriteKind.inram)
            right_door_ani_sprites['ohnoes'] = sprites.create(createImage('ohnoesDoor'), SpriteKind.inram)
            right_door_ani_sprites['hal'] = sprites.create(createImage('halRightDoor'), SpriteKind.inram)
            door_sprites[1] = sprites.create(createImage('rightDoor'), SpriteKind.inram)
            time_text.destroy()
            time_text = textsprite.create('')
            break
        }
        case 'office_back': {
            init_palette('office_back')
            scene.setBackgroundImage(createImage('officeBack'))
            back_door_sprite = sprites.create(createImage('backDoorOpen'), SpriteKind.inram)
            back_door_sprite.left = 56
            back_door_sprite.top = 26
            break
        }
        case 'monitor' : {
            init_palette('monitor')
            let keys = Object.keys(ani)
            for (let i = 0; i < keys.length; i++) {
                if (ani[keys[i]].monitor_images != null)
                    ani[keys[i]].monitor_sprite = sprites.create(createImage(ani[keys[i]].monitor_images['generic']), SpriteKind.inram)
            }
            monitor_map_sprite = sprites.create(createImage('monitorMap'), SpriteKind.inram)
            monitor_map_sprite.top = 0
            monitor_map_sprite.left = 0
            monitor_anim_sprite = sprites.create(image.create(13, 13), SpriteKind.inram)
            monitor_anim_sprite.top = 12
            monitor_anim_sprite.left = 2
            monitor_room_text.top = 1
            monitor_room_text.left = 1
            animation.runImageAnimation(monitor_anim_sprite, monitor_anim, 1000, true)
            cam_select.destroy()
            cam_select = sprites.create(assets.image`camSelect`)
            monitor_label_sprite = sprites.create(createImage('monitorSelectNumbers'), SpriteKind.inram)
            monitor_label_sprite.top = 11
            monitor_label_sprite.left = 30
            kitchen_text = sprites.create(createImage(`kitchenText`), SpriteKind.inram)
            power_text.destroy()
            power_text = textsprite.create('')
            for (let i = 0; i < power_usage_sprites.length; i++) {
                power_usage_sprites[i].destroy()
            }
            power_usage_sprites = [
                sprites.create(assets.image`powerBarGreen`),
                sprites.create(assets.image`powerBarGreen`),
                sprites.create(assets.image`powerBarYellow`),
                sprites.create(assets.image`powerBarRed`)
            ]
            break
        }
        case 'win': {
            //hardcoded fix, change line below
            init_palette('')
            scene.setBackgroundImage(null)
            monitor_room_text.text = ''
            six_am_slide = sprites.create(createImage('6AMSlide'), SpriteKind.inram)
            six_am_slide.bottom = 66
            six_am_slide.left = 52
            six_am_slit = sprites.create(createImage('6AMBackground'), SpriteKind.inram)
            six_am_slit.top = 27
            six_am_slit.left = 52
            break
        }
        case 'menu': {
            init_palette('menu')
            scene.setBackgroundImage(null)
            menu_winston = sprites.create(createImage('menuWinston'), SpriteKind.inram)
            menu_winston.bottom = 110
            menu_winston.right = 150
            menu_selector.right = 13
            menu_title[0].scale = 2
            menu_title[0].top = 1
            menu_title[0].left = 1
            menu_title[1].scale = 2
            menu_title[1].left = 1
            menu_title[1].top = 20
            menu_title[2].destroy()
            menu_title[2] = textsprite.create('2')
            menu_title[2].scale = 3
            menu_title[2].top = 40
            menu_title[2].right = 150
            for (let i = 0; i < menu_option_texts.length; i++) {
                menu_option_texts[i].left = 17
                menu_option_texts[i].top = 50 + i * 12
            }
            break            
        }
        case 'night_display': {
            init_palette('')
            scene.setBackgroundImage(null)
            twelve_am_text.setPosition(80, 55)
            night_text.setText('Night ' + night.toString())
            night_text.setPosition(80, 65)
            break
        }
        case 'jumpscare': {
            init_palette(game_state.ani_in)
            switch (game_state.ani_in) {
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
            break
        }
        case 'static': {
            init_palette('static')
            scene.setBackgroundImage(createImage('staticPic1'))
            break
        }
    }
}
