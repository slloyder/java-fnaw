

function load_monitor_room(room: string) {
    let im: Image = null
    switch (room) {
        case 'Show Stage': {
            color.setColor(3, color.rgb(117, 97, 37)) 
            color.setColor(4, color.rgb(91, 112, 85)) 
            color.setColor(14, color.rgb(57, 70, 81)) 
            color.setColor(8, color.rgb(114, 114, 120)) 
            color.setColor(10, color.rgb(65, 45, 20)) 
            color.setColor(11, color.rgb(38, 46, 52)) 
            color.setColor(12, color.rgb(29, 35, 40)) 
            color.setColor(9, color.rgb(90, 90, 90)) 
            show_stage_decal = sprites.create(createImage('showStageDecal'), SpriteKind.inram)
            ani['ohnoes'].load(1)
            ani['hopps'].load(1)
            ani['win'].load(0)
            break
        }
        case 'Backstage': {
            color.setColor(3, color.rgb(51, 42, 18)) 
            color.setColor(9, color.rgb(55, 55, 55)) 
            color.setColor(4, color.rgb(40, 40, 40)) 
            color.setColor(6, color.rgb(84, 81, 1)) 
            color.setColor(8, color.rgb(61, 90, 61)) 
            color.setColor(10, color.rgb(39, 9, 9)) 
            color.setColor(11, color.rgb(75, 75, 75))
            color.setColor(12, color.rgb(86, 51, 16)) 
            color.setColor(14, color.rgb(75, 62, 27)) 
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
            color.setColor(3, color.rgb(15, 11, 0)) 
            color.setColor(4, color.rgb(7, 11, 5)) 
            color.setColor(10, color.rgb(125, 125, 125)) 
            color.setColor(11, color.rgb(73, 31, 33)) 
            color.setColor(12, color.rgb(35, 35, 73)) 
            color.setColor(14, color.rgb(82, 82, 82)) 
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
            color.setColor(3, color.rgb(40, 34, 14)) 
            color.setColor(4, color.rgb(43, 43, 43)) 
            color.setColor(6, color.rgb(120, 120, 120)) 
            color.setColor(8, color.rgb(95, 95, 95)) 
            color.setColor(9, color.rgb(40, 40, 40)) 
            color.setColor(10, color.rgb(50, 50, 50)) 
            color.setColor(11, color.rgb(20, 20, 20)) 
            color.setColor(12, color.rgb(25, 25, 25)) 
            color.setColor(14, color.rgb(255, 236, 193)) 
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
            color.setColor(3, color.rgb(117, 97, 37)) 
            color.setColor(4, color.rgb(90, 90, 90)) 
            
            color.setColor(8, color.rgb(59, 59, 64)) 
            color.setColor(11, color.rgb(35, 35, 35)) 
            color.setColor(12, color.rgb(70, 70, 70)) 
            color.setColor(14, color.rgb(102, 90, 62)) 
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            scaling.scaleToPixels(door_decal1, 82, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['hal'].load(4)
            ani['sam'].load(0)
            ani['hopps'].load(0)
            break
        }
        case 'West Hall': {
            color.setColor(3, color.rgb(51, 42, 18)) 
            color.setColor(6, color.rgb(116, 100, 0)) 
            color.setColor(9, color.rgb(68, 70, 71)) 
            color.setColor(8, color.rgb(27, 27, 27)) 
            color.setColor(12, color.rgb(0, 66, 96)) 
            color.setColor(10, color.rgb(0, 16, 23)) 
            color.setColor(13, color.rgb(94, 6, 8)) 
            color.setColor(14, color.rgb(85, 85, 85)) 
            ani['hal'].load(1)
            if (ani['hopps'].room != room && ani['sam'].room != room) {
                color.setColor(8, color.rgb(46, 40, 40)) 
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 700, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            else {
                color.setColor(8, color.rgb(40, 40, 40)) 
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            ani['hopps'].load(0)
            scaling.scaleToPercent(ani['hopps'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['sam'].load(0)
            scaling.scaleToPercent(ani['sam'].monitor_sprite, 300, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Furnace Room': {
            color.setColor(3, color.rgb(45, 30, 17)) 
            color.setColor(6, color.rgb(40, 25, 0)) 
            color.setColor(8, color.rgb(30, 30, 30)) 
            color.setColor(9, color.rgb(39, 34, 40)) 
            color.setColor(13, color.rgb(34, 4, 10)) 
            color.setColor(4, color.rgb(70, 40, 35)) 
            
            color.setColor(10, color.rgb(66, 17, 17)) 
            color.setColor(11, color.rgb(200, 81, 20)) 
            color.setColor(12, color.rgb(145, 59, 15)) 
            color.setColor(14, color.rgb(40, 35, 32)) 
            left_furnace_room_decal = sprites.create(createImage('leftFurnaceRoomDecal'), SpriteKind.inram)
            right_furnace_room_decal = sprites.create(createImage('rightFurnaceRoomDecal'), SpriteKind.inram)
            ani['hal'].load(1)
            ani['hopps'].load(0)
            break
        }
        case 'South Hall': {
            color.setColor(3, color.rgb(112, 33, 19)) 
            color.setColor(6, color.rgb(126, 108, 0)) 
            color.setColor(9, color.rgb(89, 95, 99)) 
            color.setColor(10, color.rgb(60, 60, 60)) 
            color.setColor(11, color.rgb(255, 255, 255)) 
            color.setColor(12, color.rgb(105, 86, 0)) 
            color.setColor(13, color.rgb(114, 6, 8)) 
            color.setColor(4, color.rgb(64, 79, 60)) 
            color.setColor(14, color.rgb(85, 85, 85)) 
            ani['hal'].load(1)
            if (ani['win'].room != room && ani['ohnoes'].room != room && ani['fuzz'].room != room) {
                color.setColor(8, color.rgb(46, 40, 40)) 
                scaling.scaleToPercent(ani['hal'].monitor_sprite, 700, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            }
            else {
                color.setColor(8, color.rgb(40, 40, 40)) 
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
                color.setColor(8, color.rgb(40, 40, 40)) 
                color.setColor(4, color.rgb(10, 10, 10)) 
                color.setColor(6, color.rgb(80, 80, 80)) 
                color.setColor(3, color.rgb(0, 0, 0)) 
                color.setColor(10, color.rgb(0, 0, 0)) 
                color.setColor(11, color.rgb(0, 0, 0)) 
                color.setColor(13, color.rgb(0, 0, 0)) 
                color.setColor(12, color.rgb(84, 74, 51)) 
                color.setColor(14, color.rgb(84, 74, 51)) 
                door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
                scaling.scaleToPixels(door_decal1, 126, ScaleDirection.Vertically, ScaleAnchor.Middle, false)
                scaling.scaleToPixels(door_decal1, 57, ScaleDirection.Horizontally, ScaleAnchor.Middle, false)
            }
            else {
                color.setColor(8, color.rgb(15, 15, 15)) 
                color.setColor(4, color.rgb(90, 90, 90)) 
                color.setColor(6, color.rgb(0, 0, 0)) 
            }
            break
        }
        case 'Arcade': {
            color.setColor(3, color.rgb(70, 70, 70)) 
            color.setColor(4, color.rgb(90, 90, 90)) 
            color.setColor(6, color.rgb(136, 120, 0)) 
            color.setColor(8, color.rgb(52, 52, 61)) 
            color.setColor(9, color.rgb(89, 95, 99)) 
            color.setColor(13, color.rgb(125, 6, 25)) 
            color.setColor(10, color.rgb(105, 105, 105)) 
            
            color.setColor(11, color.rgb(35, 35, 35)) 
            color.setColor(12, color.rgb(70, 70, 70)) 
            color.setColor(14, color.rgb(41, 56, 158)) 
            arcade_decal1 = sprites.create(createImage('arcadeDecal'), SpriteKind.inram)
            arcade_decal2 = sprites.create(createImage('arcadeDecal'), SpriteKind.inram)
            ani['hal'].load(5)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 130, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            break
        }
        case 'Spare Room': {
            color.setColor(3, color.rgb(140, 117, 47)) 
            color.setColor(4, color.rgb(91, 112, 85)) 
            color.setColor(6, color.rgb(83, 83, 83)) 
            color.setColor(8, color.rgb(102, 74, 33)) 
            color.setColor(9, color.rgb(100, 100, 100)) 
            ani['hopps'].load(0)
            ani['ohnoes'].load(0)
            break
        }
        case 'Bathrooms': {
            color.setColor(3, color.rgb(90, 90, 90)) 
            color.setColor(4, color.rgb(64, 79, 60)) 
            
            color.setColor(11, color.rgb(35, 35, 35)) 
            color.setColor(12, color.rgb(70, 70, 70)) 
            ani['hal'].load(4)
            ani['ohnoes'].load(5)
            break
        }
        case 'East Hall 1': {
            color.setColor(3, color.rgb(10, 10, 0)) 
            color.setColor(6, color.rgb(126, 108, 0)) 
            color.setColor(8, color.rgb(42, 42, 51)) 
            color.setColor(9, color.rgb(89, 95, 99)) 
            color.setColor(13, color.rgb(114, 6, 8)) 
            color.setColor(4, color.rgb(91, 112, 85)) 
            color.setColor(14, color.rgb(120, 120, 120)) 
            color.setColor(10, color.rgb(26, 26, 26)) 
            color.setColor(11, color.rgb(60, 60, 60)) 
            color.setColor(12, color.rgb(40, 40, 40)) 
            ani['ohnoes'].load(0)
            ani['hal'].load(0)
            im = ani['hal'].monitor_sprite.image.rotated(180)
            ani['hal'].monitor_sprite.setImage(im)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['win'].load(3)
            break
        }
        case 'East Hall 2': {
            color.setColor(3, color.rgb(35, 35, 35)) 
            color.setColor(6, color.rgb(106, 89, 0)) 
            color.setColor(8, color.rgb(42, 42, 48)) 
            color.setColor(9, color.rgb(79, 89, 89)) 
            color.setColor(13, color.rgb(114, 6, 8)) 
            color.setColor(4, color.rgb(43, 53, 41)) 
            color.setColor(10, color.rgb(35, 35, 35)) 
            color.setColor(11, color.rgb(60, 60, 60)) 
            color.setColor(12, color.rgb(35, 35, 35)) 
            color.setColor(14, color.rgb(35, 35, 35)) 
            ani['hal'].load(0)
            ani['ohnoes'].load(0)
            scaling.scaleToPixels(ani['ohnoes'].monitor_sprite, 33, ScaleDirection.Vertically, ScaleAnchor.Middle, true)
            ani['squid'].load(2)
            ani['win'].load(2)
            break
        }
        case 'East Hall 3': {
            color.setColor(3, color.rgb(35, 35, 35)) 
            color.setColor(6, color.rgb(106, 89, 0)) 
            color.setColor(8, color.rgb(42, 42, 48)) 
            color.setColor(9, color.rgb(70, 80, 80)) 
            color.setColor(13, color.rgb(104, 3, 5)) 
            color.setColor(4, color.rgb(91, 112, 85)) 
            color.setColor(10, color.rgb(25, 25, 25)) 
            color.setColor(11, color.rgb(60, 60, 60)) 
            color.setColor(12, color.rgb(0, 0, 0)) 
            color.setColor(14, color.rgb(60, 60, 60)) 
            ani['hal'].load(1)
            ani['ohnoes'].load(3)
            scaling.scaleToPercent(ani['hal'].monitor_sprite, 80, ScaleDirection.Uniformly, ScaleAnchor.Middle)
            ani['win'].load(2)
            break
        }
        case 'Laser Tag Prep': {
            color.setColor(3, color.rgb(95, 95, 95)) 
            color.setColor(6, color.rgb(106, 89, 0)) 
            color.setColor(8, color.rgb(42, 42, 48)) 
            color.setColor(9, color.rgb(70, 80, 80)) 
            color.setColor(13, color.rgb(114, 6, 8)) 
            color.setColor(4, color.rgb(91, 112, 85)) 
            color.setColor(10, color.rgb(65, 65, 65)) 
            color.setColor(12, color.rgb(80, 80, 80)) 
            color.setColor(14, color.rgb(109, 97, 67)) 
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
            color.setColor(3, color.rgb(90, 90, 90)) 
            color.setColor(4, color.rgb(58, 71, 54)) 
            color.setColor(6, color.rgb(106, 89, 0)) 
            color.setColor(8, color.rgb(42, 42, 48)) 
            color.setColor(9, color.rgb(70, 80, 80)) 
            color.setColor(13, color.rgb(114, 6, 8)) 
            
            color.setColor(12, color.rgb(70, 70, 70)) 
            color.setColor(14, color.rgb(102, 90, 62)) 
            door_decal1 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            door_decal2 = sprites.create(createImage('doorDecal'), SpriteKind.inram)
            ani['hal'].load(2)
            ani['ohnoes'].load(0)
            break
        }
        case 'Squid Reef': {
            color.setColor(3, color.rgb(97, 93, 84)) 
            color.setColor(4, color.rgb(87, 65, 11)) 
            color.setColor(6, color.rgb(112, 67, 15)) 
            color.setColor(8, color.rgb(89, 45, 16)) 
            color.setColor(9, color.rgb(70, 70, 70)) 
            color.setColor(12, color.rgb(20, 20, 20)) 
            color.setColor(11, color.rgb(81, 78, 78)) 
            color.setColor(10, color.rgb(54, 54, 54)) 
            color.setColor(14, color.rgb(35, 35, 45)) 
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