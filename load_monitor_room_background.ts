function load_monitor_room_background(room: string) {
    let im: Image = null
    switch (room) {
        case 'Show Stage': {
            scene.setBackgroundImage(createImage('cornerRoom'))
            break
        }
        case 'Backstage': {
            im = image.create(160, 120)
            im.fill(4)
            im.fillRect(0, 105, 160, 15, 15)
            scene.setBackgroundImage(im)
            break
        }
        case 'Dining Area': {
            im = image.create(160, 120)
            im.fill(15)
            im.blit(0, 61, 80, 60, createImage('diningArea'), 0, 0, 80, 61, false, false)
            im.blit(80, 61, 80, 60, createImage('diningAreaFlipped'), 0, 0, 80, 61, false, false)
            scene.setBackgroundImage(im)
            break
        }
        case 'Supply Closet': {
            break
        }
        case 'North Hall': {
            scene.setBackgroundImage(createImage('cornerHall'))
            break
        }
        case 'West Hall': {
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(14)
            break
        }
        case 'Furnace Room': {
            im = image.create(160, 120)
            im.fill(4)
            im.fillRect(0, 90, 160, 30, 14)
            scene.setBackgroundImage(im)
            scene.setBackgroundImage(im)
            break
        }
        case 'South Hall': {
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(14)
            break
        }
        case 'Kitchen': {
            scene.setBackgroundColor(15)
            break
        }
        case 'Kitchen Tools': {
            im = image.create(160, 120)
            im.fill(3)
            im.drawLine(46, 0, 46, 120, 4)
            im.drawLine(116, 0, 116, 120, 4)
            im.fillRect(47, 0, 69, 120, 6)
            scene.setBackgroundImage(im)
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
            let im2 = createImage('cornerHall')
            im = createImage('cornerHall')
            im.fillRect(0, 0, 108, 98, 3)
            im.fillRect(107, 0, 53, 13, 3)
            im.fillRect(40, 97, 38, 16, 3)
            im.blit(78, 13, 152, 107, im2, 108, 13, 152, 107, false, false)
            im.blit(-12, 13, 152, 107, im2, 108, 13, 152, 107, false, false)
            scene.setBackgroundImage(im)
            im2 = null
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
            im.fillRect(65, 0, 30, 120, 10)
            scene.setBackgroundImage(im)
            break
        }
        case 'Changing Rooms': {
            im = createImage('cornerHall')
            im.fillRect(0, 0, 160, 103, 3)
            scene.setBackgroundImage(im)
            break
        }
        case 'Squid Reef': {
            im = image.create(160, 120)
            im.fill(3)
            im.fillPolygon4(0, 93, 160, 77, 0, 120, 160, 120, 4)
            scene.setBackgroundImage(im)
            
            break
        }
        default: {
            break
        }
    }
    im = null
}