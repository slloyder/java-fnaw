function load_monitor_room_background(room: string) {
    let im: Image = null
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
            scene.setBackgroundImage(createImage('cornerHall'))
            break
        }
        case 'West Hall': {
            scene.setBackgroundImage(createImage('genericRoom'))
            break
        }
        case 'Furnace Room': {
            im = image.create(160, 120)
            im.fill(4)
            im.fillRect(0, 90, 160, 30, 6)
            scene.setBackgroundImage(im)
            scene.setBackgroundImage(im)
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
            scene.setBackgroundImage(createImage('cornerHall'))
            break
        }
        case 'Spare Room': {
            im = image.create(160, 120)
            im.fill(6)
            im.fillRect(0, 103, 160, 17, 8)
            scene.setBackgroundImage(im)
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
            scene.setBackgroundImage(createImage('eastHall2'))
            break
        }
        case 'East Hall 3': {
            scene.setBackgroundImage(createImage('eastHall3'))
            break
        }
        case 'Laser Tag Prep': {
            im = image.create(160, 120)
            im.fill(3)
            im.fillRect(65, 0, 30, 120, 6)
            scene.setBackgroundImage(im)
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
    im = null
}