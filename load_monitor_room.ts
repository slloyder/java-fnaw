//load decals here
//set custom palette here
function load_monitor_room(room: string) {
    switch (room) {
        case 'Show Stage': {
            color.setColor(6, color.rgb(57, 70, 81)) //left wall
            color.setColor(8, color.rgb(105, 105, 105)) //checkerboard right
            color.setColor(10, color.rgb(65, 45, 20)) //floor
            color.setColor(11, color.rgb(38, 46, 52)) //right wall
            color.setColor(12, color.rgb(29, 35, 40)) //roof
            color.setColor(14, color.rgb(125, 125, 125)) //checkerboard left
            show_stage_decal = sprites.create(createImage('showStageDecal'), SpriteKind.inram)
            ani['hopps'].load()
            ani['ohnoes'].load()
            ani['win'].load()
            break
        }
        case 'Backstage': {
            ani['hopps'].load()
            break
        }
        case 'Dining Area': {
            ani['hopps'].load()
            ani['ohnoes'].load()
            ani['win'].load()
            ani['hal'].load()
            break
        }
        case 'Supply Closet': {
            ani['hopps'].load()
            break
        }
        case 'North Hall': {
            ani['hopps'].load()
            ani['hal'].load()
            ani['sam'].load()
            break
        }
        case 'West Hall': {
            ani['hopps'].load()
            ani['hal'].load()
            ani['sam'].load()
            break
        }
        case 'Furnace Room': {
            ani['hopps'].load()
            ani['hal'].load()
            break
        }
        case 'South Hall': {
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
            break
        }
        case 'Arcade': {
            ani['hal'].load()
            break
        }
        case 'Spare Room': {
            ani['hopps'].load()
            ani['ohnoes'].load()
            break
        }
        case 'Bathrooms': {
            ani['ohnoes'].load()
            ani['hal'].load()
            break
        }
        case 'East Hall 1': {
            color.setColor(6, color.rgb(120, 120, 120)) //right wall
            color.setColor(10, color.rgb(26, 26, 26)) //floor
            color.setColor(11, color.rgb(60, 60, 60)) //left wall
            color.setColor(12, color.rgb(40, 40, 40)) //roof
            ani['ohnoes'].load()
            ani['hal'].load()
            ani['win'].load()
            break
        }
        case 'East Hall 2': {
            ani['ohnoes'].load()
            ani['squid'].load()
            ani['hal'].load()
            ani['win'].load()
            break
        }
        case 'East Hall 3': {
            ani['ohnoes'].load()
            ani['hal'].load()
            ani['win'].load()
            break
        }
        case 'Laser Tag Prep': {
            ani['ohnoes'].load()
            ani['hal'].load()
            break
        }
        case 'Changing Rooms': {
            ani['ohnoes'].load()
            ani['hal'].load()
            break
        }
        case 'Squid Reef': {
            ani['squid'].load()
            break
        }
        default: {
            break
        }
    }
}