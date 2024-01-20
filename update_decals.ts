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
            break
        }
        case 'Dining Area': {
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
            break
        }
        case 'Squid Reef': {
            break
        }
        default: {
            break
        }
    }
}
