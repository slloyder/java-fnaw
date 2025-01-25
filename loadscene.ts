function load_scene(specified_scene: string) {
    sprites.destroyAllSpritesOfKind(SpriteKind.inram)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    null_sprites()
    control.gc()
    switch (specified_scene) {
        case 'office_left': {
            init_palette('office')
            scene.setBackgroundImage(draw_office('left'))
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
            scene.setBackgroundImage(draw_office('right'))
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
            scene.setBackgroundImage(draw_office('back'))
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
        case 'power_out' : {
            init_palette('power_out')
            scene.setBackgroundImage(draw_office(game_state.side))
            power_out_winston_sprite = sprites.create(image.create(1, 1), SpriteKind.inram)
            power_out_winston_sprite.setPosition(-500, 0)
            power_out_winston_sprite.setImage(createImage('winstonDoor'))
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
            six_am_slide_top = textsprite.create('6')
            six_am_slide_bottom = textsprite.create('5')
            six_am_slide_top.scale = 3
            six_am_slide_top.top = 25
            six_am_slide_top.left = 54
            six_am_slide_bottom.scale = 3
            six_am_slide_bottom.top = 47
            six_am_slide_bottom.left = 54
            six_am_still = textsprite.create('AM')
            six_am_still.scale = 3
            six_am_still.top = 47
            six_am_still.left = 74
            let im = image.create(12, 62)
            im.fillRect(0, 0, 12, 22, 15)
            im.fillRect(0, 40, 12, 22, 15)
            six_am_slit = sprites.create(im, SpriteKind.inram)
            six_am_slit.top = 29
            six_am_slit.left = 58
            break
        }
        case 'menu': {
            init_palette('menu')
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(15)
            let im = image.create(61, 61)
            im.fillCircle(30, 30, 30, 6)
            im.fillCircle(30, 41, 11, 13)
            im.fillRect(18, 15, 7, 5, 15)
            im.fillRect(37, 15, 7, 5, 15)
            im.fillRect(19, 14, 5, 7, 15)
            im.fillRect(38, 14, 5, 7, 15)
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
                textsprite.create('6th Night'),
                textsprite.create('Custom Night')
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
        case 'customize_night': {
            init_palette('menu')
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(15)
            menu_title = [
                textsprite.create('Custom Night')
            ]
            menu_option_texts = [
                textsprite.create('Winston:'),
                textsprite.create('Hopper:'),
                textsprite.create('Oh Noes:'),
                textsprite.create('Squidical:'),
                textsprite.create('Hal:'),
                textsprite.create('Mr. Pant:'),
                textsprite.create('Sam:'),
                textsprite.create('Fuzzy:'),
                textsprite.create('START'),
                textsprite.create('Randomize'),
                textsprite.create('Rnd start'),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create('  BACK')
            ]
            if (blockSettings.readNumber('everything')) { menu_option_texts[12].setText('Power:') }
            customize_night_numbers = [
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create('')
            ]
            menu_selector = sprites.create(assets.image`menuSelector`, SpriteKind.inram)
            menu_selector.right = 13
            menu_title[0].scale = 2
            menu_title[0].top = 1
            menu_title[0].left = 8
            for (let i = 0; i < menu_option_texts.length; i++) {
                menu_option_texts[i].left = i < 8 ? 16 : 103
                menu_option_texts[i].top = 20 + (i % 8) * 12
            }
            for (let i = 0; i < customize_night_numbers.length; i++) {
                customize_night_numbers[i].left = 77
                customize_night_numbers[i].top = 20 + i * 12
            }
            customize_night_numbers[8].left = 141
            customize_night_numbers[8].top = 68
            break
        }
        case 'newspaper': {
            init_palette('newspaper')
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
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(0)
            let im = draw_office('front')
            if (!game_state.power_out) {
                switch (game_state.ani_in) {
                    case 'win': {
                        jumpscare_background_sprite = sprites.create(im, SpriteKind.inram)
                        im = image.create(160, 120)
                        im.fillCircle(81, 55, 84, 2)
                        im.fillCircle(51, 20, 11, 15)
                        im.fillCircle(110, 29, 11, 15)
                        im.blit(34, 41, 85, 79, createImage('winstonJumpscarePic'), 0, 0, 85, 79, true, false)
                        jumpscare_sprite = sprites.create(im, SpriteKind.inram)
                        break
                    }
                    case 'hopps': {
                        jumpscare_background_sprite = sprites.create(im, SpriteKind.inram)
                        jumpscare_sprite = sprites.create(createImage('hopperJumpscarePic1'), SpriteKind.inram)
                        break
                    }
                    case 'ohnoes': {
                        jumpscare_background_sprite = sprites.create(im, SpriteKind.inram)
                        jumpscare_sprite = sprites.create(createImage('ohnoesJumpscarePic1'), SpriteKind.inram)
                        break
                    }
                    case 'squid': {
                        jumpscare_sprite = sprites.create(createImage('squidJumpPic'), SpriteKind.inram)
                        scene.setBackgroundImage(draw_office('right'))
                        jumpscare_sprite.right = 151
                        jumpscare_sprite.bottom = 100
                        break
                    }
                    case 'pant': {
                        jumpscare_background_sprite = sprites.create(im, SpriteKind.inram)
                        jumpscare_sprite = sprites.create(createImage('panteaterJumpscarePic'), SpriteKind.inram)
                        break
                    }
                    case 'sam': {
                        jumpscare_background_sprite = sprites.create(im, SpriteKind.inram)
                        ani['sam'].load(0)
                        scaling.scaleToPercent(ani['sam'].monitor_sprite, 150)
                        ani['sam'].monitor_sprite.top = 30
                        ani['sam'].monitor_sprite.left = 40
                        jumpscare_sprite = sprites.create(createImage('samJumpscarePic'), SpriteKind.inram)
                        hide_sprite(jumpscare_sprite)
                        break
                    }
                    case 'fuzz': {
                        jumpscare_background_sprite = sprites.create(im, SpriteKind.inram)
                        im = image.create(160, 120)
                        im.blit(8, 0, 71, 120, createImage('fuzzyJumpscarePic'), 0, 0, 71, 120, true, false)
                        im.blit(78, 0, 71, 120, createImage('fuzzyJumpscarePicFlipped'), 0, 0, 71, 120, true, false)
                        im.blit(47, 49, 29, 29, createImage('fuzzyJumpscareEye'), 0, 0, 29, 29, false, false)
                        im.blit(82, 41, 29, 29, createImage('fuzzyJumpscareEye'), 0, 0, 29, 29, false, false)
                        jumpscare_sprite = sprites.create(im, SpriteKind.inram)
                        break
                    }
                }
                if(game_state.ani_in != 'sam' && game_state.ani_in != 'squid'){
                    jumpscare_background_sprite.top = 5
                    jumpscare_background_sprite.left = 5
                    jumpscare_sprite.left = 5
                    jumpscare_sprite.top = 5
                }
            }
            else {
                init_palette('power_out_winston')
                im = image.create(180, 140)
                im.fillCircle(91, 65, 84, 2)
                im.fillCircle(61, 30, 11, 15)
                im.fillCircle(120, 39, 11, 15)
                im.blit(44, 51, 85, 79, createImage('winstonJumpscarePic'), 0, 0, 85, 79, true, false)
                im.flipX()
                jumpscare_sprite = sprites.create(im, SpriteKind.inram)
                jumpscare_sprite.setPosition(85, 65)
            }
            break
            im = null
        }
        case 'golden_winston': {
            init_palette('golden_winston')
            scene.setBackgroundImage(draw_office('front'))
            let im = image.create(85, 85)
            im.fillCircle(42, 42, 43, 9)
            im.blit(19, 19, 46, 60, createImage('goldenWinston'), 0, 0, 46 ,60, false, false)
            golden_winston_sprite = sprites.create(im, SpriteKind.inram)
            golden_winston_sprite.bottom = 118
            golden_winston_sprite.left = 37
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
        case 'static': {
            init_palette('static')
            scene.setBackgroundColor(15)
            scene.setBackgroundImage(null)
            break
        }
        case 'paused': {
            init_palette('menu')
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(15)
            menu_title = [
                textsprite.create('PAUSED')
            ]
            menu_option_texts = [
                textsprite.create('Volume:'),
                textsprite.create('Brightness:'),
                textsprite.create('Visual Sound:')
            ]
            customize_night_numbers = [
                textsprite.create(''),
                textsprite.create(''),
                textsprite.create('')
            ]
            menu_selector = sprites.create(assets.image`menuSelector`, SpriteKind.inram)
            menu_selector.right = 13
            menu_title[0].scale = 2
            menu_title[0].top = 1
            menu_title[0].left = 45
            for (let i = 0; i < menu_option_texts.length; i++) {
                menu_option_texts[i].left = i < 8 ? 16 : 103
                menu_option_texts[i].top = 20 + (i % 8) * 12
            }
            for (let i = 0; i < customize_night_numbers.length; i++) {
                customize_night_numbers[i].left = 100
                customize_night_numbers[i].top = 20 + i * 12
            }
            break
        }
    }
}

function draw_office(side: string) {
    if (side == 'back') {
        let im = image.create(160, 120)
        im.fill(3)
        im.fillRect(65, 35, 31, 66, 15)
        im.fillRect(0, 0, 15, 120, 6)
        im.fillRect(144, 0, 16, 120, 6)
        im.fillPolygon4(-23, 0, 181, 0, 143, 15, 15, 15, 4)
        im.fillPolygon4(15, 101, 143, 101, 177, 119, -17, 119, 8)
        return im
    }
    else if (side == 'front') {
        let im = image.create(160, 120)
        im.fill(3)
        im.fillRect(0, 0, 15, 120, 6)
        im.fillRect(144, 0, 16, 120, 6)
        im.fillPolygon4(0, 24, 9, 27, 9, 57, 0, 60, 13)
        im.fillPolygon4(150, 27, 159, 24, 159, 60, 150, 57, 13)
        im.fillPolygon4(-23, 0, 181, 0, 143, 15, 15, 15, 4)
        im.fillPolygon4(15, 101, 143, 101, 177, 119, -17, 119, 8)
        return im
    }
    else if (side == 'left' || side == 'right') {
        let im = image.create(160, 120)
        im.fillRect(0, 0, 76, 120, 3)
        im.fillRect(76, 0, 84, 120, 4)
        im.fillPolygon4(9, 13, 40, 20, 40, 104, 9, 115, 15)
        im.fillPolygon4(48, 22, 70, 27, 70, 54, 48, 58, 15)
        im.fillTriangle(-1, 119, 76, 92, 160, 119, 8)
        im.fillTriangle(-1, 0, 75, 19, 160, 0, 6)
        if (side == 'right') { im.flipX() }
        return im
    }
    else {
        console.log('valid side must be passed')
        return null
    }
}
