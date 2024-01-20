function load_monitor_room_background(room: string) {
    switch (room) {
        case 'Show Stage': {
            scene.setBackgroundImage(createImage('cornerRoom'))
            break
        }
        case 'Backstage': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Dining Area': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Supply Closet': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'North Hall': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'West Hall': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Furnace Room': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'South Hall': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Kitchen Tools': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Arcade': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Spare Room': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Bathrooms': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'East Hall 1': {
            scene.setBackgroundImage(createImage('cornerRoomFlipped'))
            break
        }
        case 'East Hall 2': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'East Hall 3': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Laser Tag Prep': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Changing Rooms': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Squid Reef': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        default: {
            break
        }
    }
}