function load_scene(specified_scene: string) {
    sprites.destroyAllSpritesOfKind(SpriteKind.inram)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    null_sprites()
    control.gc()
    switch (specified_scene) {
        case 'office_left': {
            init_palette('office')
            let im = image.create(160, 120)
            im.fillRect(0, 0, 76, 120, 3)
            im.fillRect(76, 0, 84, 120, 4)
            im.fillPolygon4(9, 13, 40, 20, 40, 104, 9, 115, 15)
            im.fillPolygon4(48, 22, 70, 27, 70, 54, 48, 58, 15)
            im.fillTriangle(-1, 119, 76, 92, 160, 119, 8)
            im.fillTriangle(-1, 0, 75, 19, 160, 0, 6)
            scene.setBackgroundImage(im)
            door_light_sprites[0] = sprites.create(createImage('leftDoorLight'), SpriteKind.inram)
            window_light_sprites[0] = sprites.create(createImage('leftLight'), SpriteKind.inram)
            left_door_ani_sprites['hopps'] = sprites.create(createImage('hopperDoor'), SpriteKind.inram)
            left_door_ani_sprites['hal'] = sprites.create(createImage('halLeftDoor'), SpriteKind.inram)
            door_sprites[0] = sprites.create(createImage('leftDoor'), SpriteKind.inram)
            night_text = textsprite.create('')
            power_text = textsprite.create('')
            time_text = textsprite.create('')
            power_usage_sprites = [
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarYellow`, SpriteKind.inram),
                sprites.create(assets.image`powerBarRed`, SpriteKind.inram)
            ]
            break
        }
        case 'office_right': {
            init_palette('office')
            let im = image.create(160, 120)
            im.fillRect(0, 0, 76, 120, 3)
            im.fillRect(76, 0, 84, 120, 4)
            im.fillPolygon4(9, 13, 40, 20, 40, 104, 9, 115, 15)
            im.fillPolygon4(48, 22, 70, 27, 70, 54, 48, 58, 15)
            im.fillTriangle(-1, 119, 76, 92, 160, 119, 8)
            im.fillTriangle(-1, 0, 75, 19, 160, 0, 6)
            im.flipX()
            scene.setBackgroundImage(im)
            door_light_sprites[1] = sprites.create(createImage('rightDoorLight'), SpriteKind.inram)
            window_light_sprites[1] = sprites.create(createImage('rightLight'), SpriteKind.inram)
            right_door_ani_sprites['ohnoes'] = sprites.create(createImage('ohnoesDoor'), SpriteKind.inram)
            right_door_ani_sprites['hal'] = sprites.create(createImage('halRightDoor'), SpriteKind.inram)
            door_sprites[1] = sprites.create(createImage('rightDoor'), SpriteKind.inram)
            night_text = textsprite.create('')
            power_text = textsprite.create('')
            time_text = textsprite.create('')
            power_usage_sprites = [
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarYellow`, SpriteKind.inram),
                sprites.create(assets.image`powerBarRed`, SpriteKind.inram)
            ]
            break
        }
        case 'office_back': {
            init_palette('office_back')
            scene.setBackgroundImage(createImage('officeMid'))
            back_door_sprite = sprites.create(createImage('backDoorOpen'), SpriteKind.inram)
            back_door_sprite.left = 56
            back_door_sprite.top = 26
            night_text = textsprite.create('')
            power_text = textsprite.create('')
            time_text = textsprite.create('')
            power_usage_sprites = [
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarYellow`, SpriteKind.inram),
                sprites.create(assets.image`powerBarRed`, SpriteKind.inram)
            ]
            break
        }
        case 'monitor' : {
            init_palette('monitor')
            load_monitor_room_background(game_state.viewed_room)
            load_monitor_room(game_state.viewed_room)
            monitor_map_sprite = sprites.create(createImage('monitorMap'), SpriteKind.inram)
            monitor_map_sprite.top = 10
            monitor_map_sprite.left = 26
            monitor_anim_sprite = sprites.create(assets.image`monitorRecordIndicator`, SpriteKind.inram)
            monitor_room_text = textsprite.create('')
            monitor_room_text.top = 1
            monitor_room_text.left = 1
            cam_select = sprites.create(assets.image`camSelect`, SpriteKind.inram)
            monitor_label_sprite = sprites.create(createImage('monitorSelectNumbers'), SpriteKind.inram)
            monitor_label_sprite.top = 11
            monitor_label_sprite.left = 30
            kitchen_text = sprites.create(createImage(`kitchenText`), SpriteKind.inram)
            night_text = textsprite.create('')
            power_text = textsprite.create('')
            time_text = textsprite.create('')
            power_usage_sprites = [
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarGreen`, SpriteKind.inram),
                sprites.create(assets.image`powerBarYellow`, SpriteKind.inram),
                sprites.create(assets.image`powerBarRed`, SpriteKind.inram)
            ]
            break
        }
        case 'win': {
            init_palette('')
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(15)
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
            scene.setBackgroundColor(15)
            let im: Image = image.create(61, 61)
            im.fillCircle(30, 30, 30, 6)
            im.fillCircle(30, 41, 11, 13)
            im.fillRect(18, 15, 7, 5, 15)
            im.fillRect(37, 15, 7, 5, 15)
            im.fillRect(19, 14, 5, 7, 15)
            im.fillRect(38, 14, 5, 7, 15)
            //menu_winston = sprites.create(createImage('menuWinston'), SpriteKind.inram)
            menu_winston = sprites.create(im, SpriteKind.inram)
            menu_winston.bottom = 110
            menu_winston.right = 150
            menu_title = [
                textsprite.create('Five Nights'),
                textsprite.create("at Winston's"),
                textsprite.create('2')
            ]
            menu_option_texts = [
                textsprite.create('Play'),
                textsprite.create('Continue'),
                textsprite.create('6th Night')
            ]
            menu_selector = sprites.create(assets.image`menuSelector`, SpriteKind.inram)
            menu_selector.right = 13
            menu_title[0].scale = 2
            menu_title[0].top = 1
            menu_title[0].left = 1
            menu_title[1].scale = 2
            menu_title[1].left = 1
            menu_title[1].top = 20
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
            scene.setBackgroundColor(15)
            twelve_am_text = textsprite.create('12:00 AM')
            twelve_am_text.setPosition(80, 55)
            night_text = textsprite.create('')
            night_text.setText('Night ' + night.toString())
            night_text.setPosition(80, 65)
            break
        }
        case 'jumpscare': {
            init_palette(game_state.ani_in)
            switch (game_state.ani_in) {
                case 'win': {
                    scene.setBackgroundImage(createImage('officeMid'))
                    let im = image.create(160, 120)
                    im.fillCircle(81, 55, 84, 2)
                    im.fillCircle(51, 20, 11, 15)
                    im.fillCircle(110, 29, 11, 15)
                    im.blit(34, 41, 85, 79, createImage('winstonJumpscarePic'), 0, 0, 85, 79, true, false)
                    jumpscare_sprite = sprites.create(im, SpriteKind.inram)
                    im = null
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
                    scene.setBackgroundImage(createImage('officeMid'))
                    jumpscare_sprite = sprites.create(createImage('panteaterJumpscarePic'), SpriteKind.inram)
                    break
                }
                case 'sam': {
                    scene.setBackgroundImage(createImage('officeMid'))
                    jumpscare_sprite = sprites.create(createImage('samJumpscarePic'), SpriteKind.inram)
                    break
                }
                case 'fuzz': {
                    scene.setBackgroundImage(createImage('officeMid'))
                    jumpscare_sprite = sprites.create(createImage('fuzzyJumpscarePic'), SpriteKind.inram)
                    break
                }
            }
            break
        }
        case 'static': {
            init_palette('static')
            scene.setBackgroundColor(15)
            scene.setBackgroundImage(null)//createImage('staticPic1'))
            break
        }
    }
}
