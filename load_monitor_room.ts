//load decals here
//set custom palette here
function load_monitor_room(room: string) {
    switch (room) {
        case 'Show Stage': {
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