//load decals here
//set custom palette here
function load_monitor_room(room: string) {
    let im: Image = null
    switch (room) {
        case 'Show Stage': {
            color.setColor(3, color.rgb(117, 97, 37)) //hopper
            color.setColor(4, color.rgb(91, 112, 85)) //ohnoes
            color.setColor(14, color.rgb(57, 70, 81)) //left wall
            color.setColor(8, color.rgb(114, 114, 120)) //checkerboard left
            color.setColor(10, color.rgb(65, 45, 20)) //floor
            color.setColor(11, color.rgb(38, 46, 52)) //right wall
            color.setColor(12, color.rgb(29, 35, 40)) //roof
            color.setColor(9, color.rgb(90, 90, 90)) //checkerboard right, hopper joints
            show_stage_decal = sprites.create(createImage('showStageDecal'), SpriteKind.inram)
            ani['ohnoes'].load(1)
            ani['hopps'].load(1)
            ani['win'].load(0)
            break
        }
        case 'Backstage': {
            color.setColor(3, color.rgb(51, 42, 18)) //hopper
            color.setColor(9, color.rgb(55, 55, 55)) //hopper joints
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
            ani['hopps'].load(2)
            break
        }
        case 'Dining Area': {
            color.setColor(3, color.rgb(15, 11, 0)) //hopper
            color.setColor(4, color.rgb(7, 11, 5)) //ohnoes
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
            ani['win'].load(2)
            ani['hal'].load(3)
            dining_area_chair_decal1 = sprites.create(im, SpriteKind.inram)
            ani['ohnoes'].load(2)
            ani['hopps'].load(3)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 80, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            scaling.scaleToPercent(ani['hopps'].monitor_sprite, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Supply Closet': {
            color.setColor(3, color.rgb(40, 34, 14)) //hopper
            color.setColor(4, color.rgb(43, 43, 43)) //dark tiles1
            color.setColor(6, color.rgb(120, 120, 120)) //light tiles1
            color.setColor(8, color.rgb(95, 95, 95)) //light tiles2
            color.setColor(9, color.rgb(40, 40, 40)) //hopper joints
            color.setColor(10, color.rgb(50, 50, 50)) //light tiles3
            color.setColor(11, color.rgb(20, 20, 20)) //light tiles4
            color.setColor(12, color.rgb(25, 25, 25)) //dark tiles2
            color.setColor(14, color.rgb(255, 236, 193)) //light
            supply_closet_background_decal = sprites.create(assets.image`supplyClosetBackground`, SpriteKind.inram)
            scaling.scaleToPixels(supply_closet_background_decal, 161, ScaleDirection.Horizontally, ScaleAnchor.Middle, true)
            ani['hopps'].load(0)
            im = ani['hopps'].monitor_sprite.image.rotated(180)
            ani['hopps'].monitor_sprite.setImage(im)
            scaling.scaleToPercent(ani['hopps'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            supply_closet_decal = sprites.create(createImage('supplyClosetDecal'), SpriteKind.inram)
            break
        }
        case 'North Hall': {
            color.setColor(3, color.rgb(117, 97, 37)) //hopper
            color.setColor(4, color.rgb(90, 90, 90)) //wall
            //color.setColor(6, color.rgb(105, 105, 105)) //light tiles1
            color.setColor(8, color.rgb(59, 59, 64)) // sam glasses
            color.setColor(11, color.rgb(35, 35, 35)) //light tiles2
            color.setColor(12, color.rgb(70, 70, 70)) //door outline
            color.setColor(14, color.rgb(102, 90, 62)) //door
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            scaling.scaleToPixels(door_decal1, 82, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['hopps'].load(0)
            ani['hal'].load(4)
            ani['sam'].load(0)
            break
        }
        case 'West Hall': {
            color.setColor(3, color.rgb(51, 42, 18)) //hopper
            color.setColor(6, color.rgb(116, 100, 0)) //hal yellow
            color.setColor(9, color.rgb(68, 70, 71)) //hal light
            color.setColor(8, color.rgb(27, 27, 27)) //sam glasses
            color.setColor(12, color.rgb(0, 66, 96)) //sam body
            color.setColor(10, color.rgb(0, 16, 23)) //sam hair
            color.setColor(13, color.rgb(94, 6, 8)) //dark red
            color.setColor(14, color.rgb(85, 85, 85)) //wall
            ani['hal'].load(1)
            if (ani['hopps'].room != room && ani['sam'].room != room) {
                color.setColor(8, color.rgb(46, 40, 40)) // hal dark
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 700, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            else {
                color.setColor(8, color.rgb(40, 40, 40)) // hal dark
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            ani['hopps'].load(0)
            scaling.scaleToPercent(ani['hopps'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['sam'].load(0)
            scaling.scaleToPercent(ani['sam'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Furnace Room': {
            color.setColor(3, color.rgb(45, 30, 17)) //hopper
            color.setColor(6, color.rgb(40, 25, 0)) //hal yellow, winston yellow
            color.setColor(8, color.rgb(30, 30, 30)) // hal dark
            color.setColor(9, color.rgb(39, 34, 40)) //hal light, hopper joints
            color.setColor(13, color.rgb(34, 4, 10)) //dark red
            color.setColor(4, color.rgb(70, 40, 35)) //wall
            //color.setColor(9, color.rgb(74, 60, 60)) //hopper joints
            color.setColor(10, color.rgb(66, 17, 17)) //furnace body
            color.setColor(11, color.rgb(200, 81, 20)) //bright fire
            color.setColor(12, color.rgb(145, 59, 15)) //dimmer fire
            color.setColor(14, color.rgb(40, 35, 32)) //floor
            left_furnace_room_decal = sprites.create(createImage('leftFurnaceRoomDecal'), SpriteKind.inram)
            right_furnace_room_decal = sprites.create(createImage('rightFurnaceRoomDecal'), SpriteKind.inram)
            ani['hal'].load(1)
            ani['hopps'].load(0)
            break
        }
        case 'South Hall': {
            color.setColor(3, color.rgb(112, 33, 19)) //fuzzy body
            color.setColor(6, color.rgb(126, 108, 0)) //hal yellow
            color.setColor(9, color.rgb(89, 95, 99)) //hal light
            color.setColor(10, color.rgb(60, 60, 60)) //fuzzy spikes
            color.setColor(11, color.rgb(255, 255, 255)) //fuzzy eyes
            color.setColor(12, color.rgb(105, 86, 0)) //winston
            color.setColor(13, color.rgb(114, 6, 8)) //dark red
            color.setColor(4, color.rgb(64, 79, 60)) //ohnoes
            color.setColor(14, color.rgb(85, 85, 85)) //wall
            ani['hal'].load(1)
            if (ani['win'].room != room && ani['ohnoes'].room != room && ani['fuzz'].room != room) {
                color.setColor(8, color.rgb(46, 40, 40)) // hal dark
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 700, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            else {
                color.setColor(8, color.rgb(40, 40, 40)) // hal dark
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            ani['win'].load(1)
            ani['ohnoes'].load(0)
            ani['fuzz'].load(0)
            scaling.scaleToPercent(ani['fuzz'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            scaling.scaleToPercent(ani['ohnoes'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            scaling.scaleToPercent(ani['win'].monitor_sprite, 220, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Kitchen': {
            break
        }
        case 'Kitchen Tools': {
            ani['fuzz'].load(0)
            scaling.scaleToPercent(ani['fuzz'].monitor_sprite, 150, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            if (ani['fuzz'].room != 'Lab'){
                color.setColor(8, color.rgb(40, 40, 40)) //outer wall
                color.setColor(4, color.rgb(10, 10, 10)) //wall edges
                color.setColor(6, color.rgb(80, 80, 80)) //light
                color.setColor(3, color.rgb(0, 0, 0)) //fuzzy inside
                color.setColor(10, color.rgb(0, 0, 0)) //fuzzy outside
                color.setColor(11, color.rgb(0, 0, 0)) //fuzzy eyes
                color.setColor(13, color.rgb(0, 0, 0)) //fuzzy eye rings
                color.setColor(12, color.rgb(84, 74, 51)) //door
                color.setColor(14, color.rgb(84, 74, 51)) //door
                door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
                scaling.scaleToPixels(door_decal1, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, false)
                scaling.scaleToPixels(door_decal1, 57, ScaleDirection.Horizontally, ScaleAnchor.Middle, false)
            }
            else {
                color.setColor(8, color.rgb(15, 15, 15)) // outer wall
                color.setColor(4, color.rgb(90, 90, 90)) // cracks of light
                color.setColor(6, color.rgb(0, 0, 0)) //closed door
            }
            break
        }
        case 'Arcade': {
            color.setColor(3, color.rgb(70, 70, 70)) //arcade machine dark
            color.setColor(4, color.rgb(90, 90, 90)) //wall
            color.setColor(6, color.rgb(136, 120, 0)) //hal yellow, winston yellow
            color.setColor(8, color.rgb(52, 52, 61)) // hal dark
            color.setColor(9, color.rgb(89, 95, 99)) //hal light
            color.setColor(13, color.rgb(125, 6, 25)) //dark red
            color.setColor(10, color.rgb(105, 105, 105)) //light tiles1, arcade machine light
            //color.setColor(10, color.rgb(220, 20, 20)) // red button #13
            color.setColor(11, color.rgb(35, 35, 35)) //light tiles3
            color.setColor(12, color.rgb(70, 70, 70)) //light tiles2
            color.setColor(14, color.rgb(41, 56, 158)) //blue button
            arcade_decal1 = sprites.create(createImage('arcadeDecal'), SpriteKind.inram)
            arcade_decal2 = sprites.create(createImage('arcadeDecal'), SpriteKind.inram)
            ani['hal'].load(5)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 130, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Spare Room': {
            color.setColor(3, color.rgb(140, 117, 47)) //hopper
            color.setColor(4, color.rgb(91, 112, 85)) //ohnoes
            color.setColor(6, color.rgb(83, 83, 83)) //wall
            color.setColor(8, color.rgb(102, 74, 33)) //floor
            color.setColor(9, color.rgb(100, 100, 100)) //hopper joints
            ani['hopps'].load(0)
            ani['ohnoes'].load(0)
            break
        }
        case 'Bathrooms': {
            color.setColor(3, color.rgb(90, 90, 90)) //wall
            color.setColor(4, color.rgb(64, 79, 60)) //ohnoes
            //color.setColor(6, color.rgb(105, 105, 105)) //light tiles1
            color.setColor(11, color.rgb(35, 35, 35)) //light tiles3
            color.setColor(12, color.rgb(70, 70, 70)) //light tiles2
            ani['hal'].load(4)
            ani['ohnoes'].load(5)
            break
        }
        case 'East Hall 1': {
            color.setColor(3, color.rgb(10, 10, 0)) //winston
            color.setColor(6, color.rgb(126, 108, 0)) //hal yellow
            color.setColor(8, color.rgb(42, 42, 51)) // hal dark
            color.setColor(9, color.rgb(89, 95, 99)) //hal light
            color.setColor(13, color.rgb(114, 6, 8)) //dark red
            color.setColor(4, color.rgb(91, 112, 85)) //ohnoes
            color.setColor(14, color.rgb(120, 120, 120)) //right wall
            color.setColor(10, color.rgb(26, 26, 26)) //floor
            color.setColor(11, color.rgb(60, 60, 60)) //left wall
            color.setColor(12, color.rgb(40, 40, 40)) //roof
            ani['ohnoes'].load(0)
            ani['hal'].load(0)
            im = ani['hal'].monitor_sprite.image.rotated(180)
            ani['hal'].monitor_sprite.setImage(im)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['win'].load(3)
            break
        }
        case 'East Hall 2': {
            color.setColor(3, color.rgb(35, 35, 35)) //wall
            color.setColor(6, color.rgb(106, 89, 0)) //hal yellow
            color.setColor(8, color.rgb(42, 42, 48)) // hal dark
            color.setColor(9, color.rgb(79, 89, 89)) //hal light
            color.setColor(13, color.rgb(114, 6, 8)) //dark red
            color.setColor(4, color.rgb(43, 53, 41)) //ohnoes
            color.setColor(10, color.rgb(35, 35, 35)) //wall
            color.setColor(11, color.rgb(60, 60, 60)) //light tiles
            color.setColor(12, color.rgb(35, 35, 35)) //wall
            color.setColor(14, color.rgb(35, 35, 35)) //wall
            ani['hal'].load(0)
            ani['ohnoes'].load(0)
            scaling.scaleToPixels(ani['ohnoes'].monitor_sprite, 33, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['squid'].load(2)
            ani['win'].load(2)
            break
        }
        case 'East Hall 3': {
            color.setColor(3, color.rgb(35, 35, 35)) //wall
            color.setColor(6, color.rgb(106, 89, 0)) //hal yellow
            color.setColor(8, color.rgb(42, 42, 48)) // hal dark
            color.setColor(9, color.rgb(70, 80, 80)) //hal light
            color.setColor(13, color.rgb(104, 3, 5)) //dark red
            color.setColor(4, color.rgb(91, 112, 85)) //ohnoes
            color.setColor(10, color.rgb(25, 25, 25)) //dark wall
            color.setColor(11, color.rgb(60, 60, 60)) //light tiles
            color.setColor(12, color.rgb(0, 0, 0)) //dark tiles
            color.setColor(14, color.rgb(60, 60, 60)) //light tiles
            ani['hal'].load(1)
            ani['ohnoes'].load(3)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 80, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['win'].load(2)
            break
        }
        case 'Laser Tag Prep': {
            color.setColor(3, color.rgb(95, 95, 95)) //wall
            color.setColor(6, color.rgb(106, 89, 0)) //hal yellow
            color.setColor(8, color.rgb(42, 42, 48)) // hal dark
            color.setColor(9, color.rgb(70, 80, 80)) //hal light
            color.setColor(13, color.rgb(114, 6, 8)) //dark red
            color.setColor(4, color.rgb(91, 112, 85)) //ohnoes
            color.setColor(10, color.rgb(65, 65, 65)) //darker wall
            color.setColor(12, color.rgb(80, 80, 80)) //door outline
            color.setColor(14, color.rgb(109, 97, 67)) //door
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            door_decal2 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            scaling.scaleToPixels(door_decal1, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            scaling.scaleToPixels(door_decal2, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['hal'].load(0)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['ohnoes'].load(4)
            scaling.scaleToPercent(ani['ohnoes'].monitor_sprite, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Changing Rooms': {
            color.setColor(3, color.rgb(90, 90, 90)) //wall
            color.setColor(4, color.rgb(58, 71, 54)) //ohnoes
            color.setColor(6, color.rgb(106, 89, 0)) //hal yellow
            color.setColor(8, color.rgb(42, 42, 48)) // hal dark
            color.setColor(9, color.rgb(70, 80, 80)) //hal light
            color.setColor(13, color.rgb(114, 6, 8)) //dark red
            //color.setColor(6, color.rgb(105, 105, 105)) //light tiles1
            color.setColor(12, color.rgb(70, 70, 70)) //door outline
            color.setColor(14, color.rgb(102, 90, 62)) //door
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            door_decal2 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            ani['hal'].load(2)
            ani['ohnoes'].load(0)
            break
        }
        case 'Squid Reef': {
            color.setColor(3, color.rgb(97, 93, 84)) //wall
            color.setColor(4, color.rgb(87, 65, 11)) //squidical eye outline
            color.setColor(6, color.rgb(112, 67, 15)) //squidical main
            color.setColor(8, color.rgb(89, 45, 16)) //squidical dark
            color.setColor(9, color.rgb(70, 70, 70)) //squidical joints
            color.setColor(12, color.rgb(20, 20, 20)) //door frame inside
            color.setColor(11, color.rgb(81, 78, 78)) //door frame outside
            color.setColor(10, color.rgb(54, 54, 54)) //door
            color.setColor(14, color.rgb(35, 35, 45)) //floor
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
                ani['squid'].load(0)
                squid_reef_door_decal = sprites.create(im, SpriteKind.inram)
            }
            else {
                squid_reef_door_decal = sprites.create(im, SpriteKind.inram)
                if (game_state.fake_squidical_level == 0 || game_state.fake_squidical_level == 1){
                    ani['squid'].load(3)
                    scaling.scaleToPercent(ani['squid'].monitor_sprite, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
                }
                if (game_state.fake_squidical_level == 2) {
                    ani['squid'].load(1)
                }
                if (game_state.fake_squidical_level == 4) {
                    ani['squid'].load(2)
                }
            }
            break
        }
        default: {
            break
        }
    }
    im = null
}