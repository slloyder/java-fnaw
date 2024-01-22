//load decals here
//set custom palette here
function load_monitor_room(room: string) {
    let im: Image = null
    switch (room) {
        case 'Show Stage': {
            color.setColor(14, color.rgb(57, 70, 81)) //left wall
            color.setColor(8, color.rgb(105, 105, 105)) //checkerboard right
            color.setColor(10, color.rgb(65, 45, 20)) //floor
            color.setColor(11, color.rgb(38, 46, 52)) //right wall
            color.setColor(12, color.rgb(29, 35, 40)) //roof
            color.setColor(9, color.rgb(125, 125, 125)) //checkerboard left
            show_stage_decal = sprites.create(createImage('showStageDecal'), SpriteKind.inram)
            ani['hopps'].load()
            ani['ohnoes'].load()
            ani['win'].load()
            break
        }
        case 'Backstage': {
            color.setColor(4, color.rgb(40, 40, 40)) //wall
            color.setColor(6, color.rgb(84, 81, 1)) //winstons body
            //winstons mouth #13
            color.setColor(8, color.rgb(61, 90, 61)) //ohnoes outline
            color.setColor(10, color.rgb(39, 9, 9)) //ohnoes mouth
            color.setColor(11, color.rgb(75, 75, 75))//ohnoes teeth
            color.setColor(12, color.rgb(86, 51, 16)) //squidical
            color.setColor(14, color.rgb(75, 62, 27)) //hopper head
            winston_backstage_decals = [
                sprites.create(createImage('winstonBackstageDecal1'), SpriteKind.inram),
                sprites.create(createImage('winstonBackstageDecal2'), SpriteKind.inram),
                sprites.create(createImage('winstonBackstageDecal3'), SpriteKind.inram)
            ]
            oh_noes_backstage_decal = sprites.create(createImage('ohNoesBackstageDecal'), SpriteKind.inram)
            squidical_backstage_decal = sprites.create(createImage('squidicalBackstageDecal'), SpriteKind.inram)
            hopper_backstage_decal = sprites.create(createImage('hopperBackstageDecal'), SpriteKind.inram)
            ani['hopps'].load()
            break
        }
        case 'Dining Area': {
            color.setColor(10, color.rgb(125, 125, 125)) //tables
            color.setColor(11, color.rgb(73, 31, 33)) //red tiles
            color.setColor(12, color.rgb(35, 35, 73)) //blue tiles
            color.setColor(14, color.rgb(82, 82, 82)) //chairs
            im = image.create(134, 24)
            for (let i = 0; i < 6; i++) {
                if (i >= 3) {
                    im.blit((i * 21) + 8, 0, 21, 24, createImage('diningAreaChairDecal'), 0, 0, 21, 24, false, false)
                }
                else {
                    im.blit(i * 21, 0, 21, 24, createImage('diningAreaChairDecal'), 0, 0, 21, 24, false, false)
                }
            }
            dining_area_chair_decal2 = sprites.create(im, SpriteKind.inram)
            scaling.scaleToPixels(dining_area_chair_decal2, 118, ScaleDirection.Horizontally, ScaleAnchor.Middle, true)
            ani['hopps'].load()
            ani['ohnoes'].load()
            ani['win'].load()
            ani['hal'].load()
            dining_area_chair_decal1 = sprites.create(im, SpriteKind.inram)
            break
        }
        case 'Supply Closet': {
            color.setColor(4, color.rgb(43, 43, 43)) //dark tiles1
            color.setColor(6, color.rgb(120, 120, 120)) //light tiles1
            color.setColor(8, color.rgb(95, 95, 95)) //light tiles2
            color.setColor(10, color.rgb(50, 50, 50)) //light tiles3
            color.setColor(11, color.rgb(20, 20, 20)) //light tiles4
            color.setColor(12, color.rgb(25, 25, 25)) //dark tiles2
            color.setColor(14, color.rgb(255, 236, 193)) //light
            supply_closet_background_decal = sprites.create(assets.image`supplyClosetBackground`, SpriteKind.inram)
            scaling.scaleToPixels(supply_closet_background_decal, 161, ScaleDirection.Horizontally, ScaleAnchor.Middle, true)
            supply_closet_decal = sprites.create(createImage('supplyClosetDecal'), SpriteKind.inram)
            ani['hopps'].load()
            break
        }
        case 'North Hall': {
            color.setColor(4, color.rgb(90, 90, 90)) //wall
            //color.setColor(6, color.rgb(105, 105, 105)) //light tiles1
            color.setColor(11, color.rgb(35, 35, 35)) //light tiles2
            color.setColor(12, color.rgb(70, 70, 70)) //door outline
            color.setColor(14, color.rgb(102, 90, 62)) //door
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            scaling.scaleToPixels(door_decal1, 82, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['hopps'].load()
            ani['hal'].load()
            ani['sam'].load()
            break
        }
        case 'West Hall': {
            color.setColor(14, color.rgb(85, 85, 85)) //wall
            ani['hopps'].load()
            ani['hal'].load()
            ani['sam'].load()
            break
        }
        case 'Furnace Room': {
            color.setColor(4, color.rgb(70, 40, 35)) //wall
            color.setColor(10, color.rgb(66, 17, 17)) //furnace body
            color.setColor(11, color.rgb(200, 81, 20)) //bright fire
            color.setColor(12, color.rgb(145, 59, 15)) //dimmer fire
            color.setColor(14, color.rgb(40, 35, 32)) //floor
            left_furnace_room_decal = sprites.create(createImage('leftFurnaceRoomDecal'), SpriteKind.inram)
            right_furnace_room_decal = sprites.create(createImage('rightFurnaceRoomDecal'), SpriteKind.inram)
            ani['hopps'].load()
            ani['hal'].load()
            break
        }
        case 'South Hall': {
            color.setColor(14, color.rgb(85, 85, 85)) //wall
            ani['ohnoes'].load()
            ani['hal'].load()
            ani['win'].load()
            ani['fuzz'].load()
            break
        }
        case 'Kitchen': {
            break
        }
        case 'Kitchen Tools': {
            ani['fuzz'].load()
            if (ani['fuzz'].room != 'Lab'){
                color.setColor(3, color.rgb(40, 40, 40)) // outer wall
                color.setColor(4, color.rgb(10, 10, 10)) // wall edges
                color.setColor(6, color.rgb(80, 80, 80)) //light
                color.setColor(12, color.rgb(84, 74, 51)) //door
                color.setColor(14, color.rgb(84, 74, 51)) //door
                door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
                scaling.scaleToPixels(door_decal1, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, false)
                scaling.scaleToPixels(door_decal1, 57, ScaleDirection.Horizontally, ScaleAnchor.Middle, false)
            }
            else {
                color.setColor(3, color.rgb(15, 15, 15)) // outer wall
                color.setColor(4, color.rgb(90, 90, 90)) // cracks of light
                color.setColor(6, color.rgb(0, 0, 0)) //closed door
            }
            break
        }
        case 'Arcade': {
            color.setColor(3, color.rgb(80, 80, 80)) //arcade machine dark
            color.setColor(4, color.rgb(90, 90, 90)) //wall
            color.setColor(10, color.rgb(105, 105, 105)) //light tiles1, arcade machine light
            //color.setColor(10, color.rgb(220, 20, 20)) // red button #13
            color.setColor(11, color.rgb(35, 35, 35)) //light tiles3
            color.setColor(12, color.rgb(70, 70, 70)) //light tiles2
            color.setColor(14, color.rgb(41, 56, 158)) //blue button
            arcade_decal1 = sprites.create(createImage('arcadeDecal'), SpriteKind.inram)
            arcade_decal2 = sprites.create(createImage('arcadeDecal'), SpriteKind.inram)
            ani['hal'].load()
            break
        }
        case 'Spare Room': {
            color.setColor(6, color.rgb(83, 83, 83)) //wall
            color.setColor(8, color.rgb(102, 74, 33)) //floor
            ani['hopps'].load()
            ani['ohnoes'].load()
            break
        }
        case 'Bathrooms': {
            color.setColor(3, color.rgb(90, 90, 90)) //wall
            //color.setColor(6, color.rgb(105, 105, 105)) //light tiles1
            color.setColor(11, color.rgb(35, 35, 35)) //light tiles3
            color.setColor(12, color.rgb(70, 70, 70)) //light tiles2
            ani['ohnoes'].load()
            ani['hal'].load()
            break
        }
        case 'East Hall 1': {
            color.setColor(14, color.rgb(120, 120, 120)) //right wall
            color.setColor(10, color.rgb(26, 26, 26)) //floor
            color.setColor(11, color.rgb(60, 60, 60)) //left wall
            color.setColor(12, color.rgb(40, 40, 40)) //roof
            ani['ohnoes'].load()
            ani['hal'].load()
            ani['win'].load()
            break
        }
        case 'East Hall 2': {
            color.setColor(3, color.rgb(35, 35, 35)) //wall
            color.setColor(10, color.rgb(35, 35, 35)) //wall
            color.setColor(11, color.rgb(60, 60, 60)) //light tiles
            color.setColor(12, color.rgb(35, 35, 35)) //wall
            color.setColor(14, color.rgb(35, 35, 35)) //wall
            ani['ohnoes'].load()
            ani['squid'].load()
            ani['hal'].load()
            ani['win'].load()
            break
        }
        case 'East Hall 3': {
            color.setColor(3, color.rgb(35, 35, 35)) //wall
            color.setColor(10, color.rgb(25, 25, 25)) //dark wall
            color.setColor(11, color.rgb(60, 60, 60)) //light tiles
            color.setColor(12, color.rgb(0, 0, 0)) //dark tiles
            color.setColor(14, color.rgb(60, 60, 60)) //light tiles
            ani['ohnoes'].load()
            ani['hal'].load()
            ani['win'].load()
            break
        }
        case 'Laser Tag Prep': {
            color.setColor(3, color.rgb(95, 95, 95)) //wall
            color.setColor(10, color.rgb(65, 65, 65)) //darker wall
            color.setColor(12, color.rgb(80, 80, 80)) //door outline
            color.setColor(14, color.rgb(109, 97, 67)) //door
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            door_decal2 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            scaling.scaleToPixels(door_decal1, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            scaling.scaleToPixels(door_decal2, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['ohnoes'].load()
            ani['hal'].load()
            break
        }
        case 'Changing Rooms': {
            color.setColor(3, color.rgb(90, 90, 90)) //wall
            //color.setColor(6, color.rgb(105, 105, 105)) //light tiles1
            color.setColor(12, color.rgb(70, 70, 70)) //door outline
            color.setColor(14, color.rgb(102, 90, 62)) //door
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            door_decal2 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            ani['ohnoes'].load()
            ani['hal'].load()
            break
        }
        case 'Squid Reef': {
            color.setColor(3, color.rgb(97, 93, 84)) //wall
            color.setColor(4, color.rgb(35, 35, 45)) //floor
            color.setColor(8, color.rgb(20, 20, 20)) //door frame inside
            color.setColor(9, color.rgb(79, 76, 74)) //door frame outside
            color.setColor(10, color.rgb(62, 62, 62)) //door
            if (game_state.fake_squidical_level == 3) {
                im = image.create(31, 60)
                im.fill(10)
            }
            else if (game_state.fake_squidical_level == 4) {
                im = image.create(13, 91)
                im.fillPolygon4(0, 0, 13, 17, 0, 91, 13, 74, 10)
            }
            else {
                im = image.create(31, 60)
                im.fillPolygon4(0, 0, 31, 4, 0, 60, 31, 57, 10)
            }
            squid_reef_door_frame_decal = sprites.create(createImage('squidReefDoorFrameDecal'), SpriteKind.inram)
            if(game_state.fake_squidical_level == 3) {
                ani['squid'].load()
                squid_reef_door_decal = sprites.create(im, SpriteKind.inram)
            }
            else {
                squid_reef_door_decal = sprites.create(im, SpriteKind.inram)
                ani['squid'].load()
            }
            break
        }
        default: {
            break
        }
    }
    im = null
}