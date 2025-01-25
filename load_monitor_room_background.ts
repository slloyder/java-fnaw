function load_monitor_room_background(room: string) {
    let im: Image = null
    switch (room) {
        case 'Show Stage': {
            im = image.create(160, 120)
            im.fill(14)
            im.fillRect(87, 0, 120, 160, 11)
            im.fillTriangle(55, 0, 86, 9, 140, 0, 12)
            im.fillTriangle(49, 120, 87, 97, 152, 120, 10)
            scene.setBackgroundImage(im)
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
        case 'North Hall': {
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(0)
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
            im.fill(8)
            im.drawLine(46, 0, 46, 120, 4)
            im.drawLine(116, 0, 116, 120, 4)
            im.fillRect(47, 0, 69, 120, 6)
            scene.setBackgroundImage(im)
            break
        }
        case 'Arcade': {
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(0)
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
            scene.setBackgroundImage(null)
            scene.setBackgroundColor(0)
            break
        }
        case 'East Hall 1': {
            im = image.create(160, 120)
            im.fill(14)
            im.fillRect(87, 0, 120, 160, 11)
            im.fillTriangle(55, 0, 86, 9, 140, 0, 12)
            im.fillTriangle(49, 120, 87, 97, 152, 120, 10)
            im.flipX()
            scene.setBackgroundImage(im)
            break
        }
        case 'East Hall 2': {
            im = image.create(160, 120)
            im.fill(11)
            im.fillPolygon4(63, 46, 60, 0, 126, 0, 120, 52, 15)
            im.fillPolygon4(126, 0, 159, 0, 159, 149, 120, 52, 3)
            im.fillPolygon4(60, 0, 0, 0, 0, 174, 63, 46, 3)
            im.flipX()
            scene.setBackgroundImage(im)
            break
        }
        case 'East Hall 3': {
            im = image.create(160, 120)
            im.fill(11)
            im.fillPolygon4(63, 46, 60, 0, 126, 0, 120, 52, 15)
            im.fillPolygon4(55, 0, 60, 0, 63, 46, 58, 51, 10)
            im.fillPolygon4(126, 0, 159, 0, 159, 149, 120, 52, 3)
            im.fillPolygon4(55, 0, 0, 0, 0, 45, 58, 51, 3)
            scene.setBackgroundImage(im)
            break
        }
        case 'Laser Tag Prep': {
            im = image.create(160, 120)
            im.fill(3)
            im.fillRect(65, 0, 30, 120, 10)
            scene.setBackgroundImage(im)
            break
        }
        case 'Squid Reef': {
            im = image.create(160, 120)
            im.fill(3)
            im.fillPolygon4(0, 93, 160, 77, 0, 120, 160, 120, 14)
            scene.setBackgroundImage(im)
            
            break
        }
        default: {
            break
        }
    }
    im = null
}