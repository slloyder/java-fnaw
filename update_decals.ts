function update_decals(room: string) {        
    switch(room) {    
        case 'Show Stage': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                show_stage_decal.top = 36
                show_stage_decal.left = 0
            }
            else {
                hide_sprite(show_stage_decal)
            }
            break
        }
        case 'Backstage': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                winston_backstage_decals[0].top = 36
                winston_backstage_decals[0].left = 66
                winston_backstage_decals[1].top = 48
                winston_backstage_decals[1].left = 54
                winston_backstage_decals[2].top = 51
                winston_backstage_decals[2].left = 69
                oh_noes_backstage_decal.top = 13
                oh_noes_backstage_decal.left = 17
                squidical_backstage_decal.top = 74
                squidical_backstage_decal.left = 93
                hopper_backstage_decal.top = 3
                hopper_backstage_decal.left = 93
            }
            else {
                hide_sprite_array(winston_backstage_decals)
                hide_sprite(oh_noes_backstage_decal)
                hide_sprite(squidical_backstage_decal)
                hide_sprite(hopper_backstage_decal)
            }
            
            break
        }
        case 'Dining Area': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                dining_area_chair_decal1.top = 79
                dining_area_chair_decal1.left = 13
                dining_area_chair_decal2.top = 56
                dining_area_chair_decal2.left = 21
            }
            else {
                hide_sprite(dining_area_chair_decal1)
                hide_sprite(dining_area_chair_decal2)
            }
            break
        }
        case 'Supply Closet': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                supply_closet_background_decal.top = 0
                supply_closet_background_decal.left = 0
                supply_closet_decal.bottom = 120
                supply_closet_decal.left = 0
            }
            else {
                hide_sprite(supply_closet_background_decal)
                hide_sprite(supply_closet_decal)
            }
            break
        }
        case 'North Hall': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                door_decal1.top = 17
                door_decal1.right = 39
            }
            else {
                hide_sprite(door_decal1)
            }
            break
        }
        case 'West Hall': {
            break
        }
        case 'Furnace Room': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                left_furnace_room_decal.top = 0
                left_furnace_room_decal.left = 0
                right_furnace_room_decal.top = 0
                right_furnace_room_decal.left = 107
            }
            else {
                hide_sprite(left_furnace_room_decal)
                hide_sprite(right_furnace_room_decal)
            }
            break
        }
        case 'South Hall': {
            break
        }
        case 'Kitchen': {
            break
        }
        case 'Kitchen Tools': {
            if(ani['fuzz'].room != 'Lab') {    
                if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                    door_decal1.top = -3
                    door_decal1.right = 117
                }
                else {
                    hide_sprite(door_decal1)
                }
            } 
            break
        }
        case 'Arcade': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                arcade_decal1.bottom = 111
                arcade_decal1.right = 42
                arcade_decal2.bottom = 111
                arcade_decal2.left = 50
            }
            else {
                hide_sprite(arcade_decal1)
                hide_sprite(arcade_decal2)
            }
            break
        }
        case 'Spare Room': {
            break
        }
        case 'Bathrooms': {
            break
        }
        case 'East Hall 1': {
            break
        }
        case 'East Hall 2': {
            break
        }
        case 'East Hall 3': {
            break
        }
        case 'Laser Tag Prep': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                door_decal1.top = -3
                door_decal1.right = 42
                door_decal2.top = -3
                door_decal2.left = 119
            }
            else {
                hide_sprite(door_decal1)
                hide_sprite(door_decal2)
            }
            break
        }
        case 'Changing Rooms': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                door_decal1.top = 9
                door_decal1.left = 10
                door_decal2.top = 9
                door_decal2.left = 117
            }
            else {
                hide_sprite(door_decal1)
                hide_sprite(door_decal2)
            }
            break
        }
        case 'Squid Reef': {
            if (!game_state.cams_broken && game_state.hal_meddled_room != room) {
                if (game_state.fake_squidical_level == 4) {
                    squid_reef_door_decal.top = 10
                    squid_reef_door_decal.left = 53
                }
                else {
                    squid_reef_door_decal.top = 26
                    squid_reef_door_decal.left = 65
                }
                squid_reef_door_frame_decal.top = 18
                squid_reef_door_frame_decal.left = 58
            }
            else {
                hide_sprite(squid_reef_door_frame_decal)
                hide_sprite(squid_reef_door_decal)
            }
            break
        }
        default: {
            break
        }
    }
}
