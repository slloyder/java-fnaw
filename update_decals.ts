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
            break
        }
        case 'North Hall': {
            break
        }
        case 'West Hall': {
            break
        }
        case 'Furnace Room': {
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
