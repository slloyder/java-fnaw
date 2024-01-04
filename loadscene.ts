function load_scene(scene: string) {
    sprites.destroyAllSpritesOfKind(SpriteKind.inram)
    switch (scene) {
        case 'office_left': {
            door_light_sprites[0] = sprites.create(createImage('leftDoorLight'), SpriteKind.inram)
            window_light_sprites[0] = sprites.create(createImage('leftLight'), SpriteKind.inram)
            left_door_ani_sprites['hopps'] = sprites.create(createImage('hopperDoor'), SpriteKind.inram)
            left_door_ani_sprites['hal'] = sprites.create(createImage('halLeftDoor'), SpriteKind.inram)
            door_sprites[0] = sprites.create(createImage('leftDoor'), SpriteKind.inram)
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
        case 'office_right': {
            door_light_sprites[1] = sprites.create(createImage('rightDoorLight'), SpriteKind.inram)
            window_light_sprites[1] = sprites.create(createImage('rightLight'), SpriteKind.inram)
            right_door_ani_sprites['ohnoes'] = sprites.create(createImage('ohnoesDoor'), SpriteKind.inram)
            right_door_ani_sprites['hal'] = sprites.create(createImage('halRightDoor'), SpriteKind.inram)
            door_sprites[1] = sprites.create(createImage('rightDoor'), SpriteKind.inram)
            time_text.destroy()
            time_text = textsprite.create('')
            break
        }
        case 'monitor_select': {
            monitor_select_numbers_sprite = sprites.create(createImage('monitorSelectNumbers'), SpriteKind.inram)
            break
        }
        case 'monitor_view': {
            kitchen_anim_sprite = sprites.create(image.create(13, 13), SpriteKind.inram)
            let keys = Object.keys(ani)
            for (let i = 0; i < keys.length; i++) {
                ani[keys[i]].monitor_sprite = sprites.create(createImage(ani[keys[i]].monitor_images['generic']), SpriteKind.inram)
            }
            break
        }
        case 'win': {
            //hardcoded fix, change line below
            hide_sprite(selected_room_text)
            six_am_slide = sprites.create(createImage('6AMSlide'), SpriteKind.inram)
            six_am_slit = sprites.create(createImage('6AMBackground'), SpriteKind.inram)
            break
        }
        case 'menu': {
            menu_winston = sprites.create(createImage('menuWinston'), SpriteKind.inram)
            menu_title[2] = textsprite.create('2')
            break
        }
        case 'jumpscare': {
            //jumpscare_sprite = sprites.create
            break
        }
        case 'static': {
            static_anim_sprite = sprites.create(image.create(160, 120), SpriteKind.inram)
            break
        }
    }
}
