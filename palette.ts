function init_palette(palette: string) {
    color.setPalette(color.originalPalette)
    switch (palette) {
        case 'office': {
            color.setColor(3, color.rgb(120, 120, 120)) //main wall
            color.setColor(4, color.rgb(90, 90, 90)) //secondary wall, lights
            color.setColor(6, color.rgb(40, 40, 40)) //roof
            color.setColor(8, color.rgb(87, 50, 27)) //floor
            color.setColor(9, color.rgb(140, 92, 77)) //door
            color.setColor(10, color.rgb(181, 181, 74)) //door stripes
            color.setColor(11, color.rgb(245, 194, 66)) //hopper body
            color.setColor(12, color.rgb(61, 191, 135)) //ohnoes
            color.setColor(13, color.rgb(59, 59, 64))
            break
        }
        case 'monitor': {
            color.setColor(3, color.rgb(120, 120, 120)) //monitor background, room wall 1
            color.setColor(4, color.rgb(90, 90, 90)) //room wall 2
            color.setColor(6, color.rgb(40, 40, 40)) //roof
            color.setColor(8, color.rgb(87, 50, 27)) //floor
            color.setColor(9, color.rgb(255, 214, 90)) //hopper
            color.setColor(10, color.rgb(61, 191, 135)) //ohnoes
            color.setColor(11, color.rgb(235, 153, 21)) //squidical
            color.setColor(12, color.rgb(59, 59, 64)) // hal
            break
        }
        case 'static': {
            color.setColor(2, color.rgb(222, 222, 222))
            color.setColor(3, color.rgb(122, 122, 122))
            color.setColor(4, color.rgb(90, 90, 90))
            color.setColor(15, color.rgb(100, 100, 100))
            break
        }
        case 'menu': {
            color.setColor(2, color.rgb(201, 201, 0))//y1
            color.setColor(3, color.rgb(184, 184, 0))//y2
            color.setColor(4, color.rgb(150, 150, 0))//y3
            color.setColor(5, color.rgb(107, 107, 0))//y4
            color.setColor(6, color.rgb(209, 209, 209))//eye1
            color.setColor(7, color.rgb(161, 161, 161))//eye2
            color.setColor(8, color.rgb(174, 174, 0))//outline1
            color.setColor(9, color.rgb(140, 140, 0))//outline2
            color.setColor(10, color.rgb(180, 180, 0))//midline1
            color.setColor(11, color.rgb(145, 145, 0))//midline2
            color.setColor(12, color.rgb(219, 0, 51))//mid1
            color.setColor(13, color.rgb(171, 0, 40))//mid2
            break
        }
        case 'hopps': {
            color.setColor(2, color.rgb(120, 120, 120)) //main wall
            color.setColor(3, color.rgb(90, 90, 90)) //secondary rightWall          
            color.setColor(4, color.rgb(40, 40, 40)) //roof
            color.setColor(5, color.rgb(87, 50, 27)) //floor
            color.setColor(6, color.rgb(245, 194, 66)) // body
            color.setColor(7, color.rgb(200, 0, 0)) // mouth
            break
        }
        case 'ohnoes': {
            color.setColor(2, color.rgb(120, 120, 120)) //main wall
            color.setColor(3, color.rgb(90, 90, 90)) //secondary rightWall          
            color.setColor(4, color.rgb(40, 40, 40)) //roof
            color.setColor(5, color.rgb(87, 50, 27)) //floor
            color.setColor(6, color.rgb(61, 191, 135)) // body
            color.setColor(7, color.rgb(50, 156, 110)) //semicolon
            color.setColor(8, color.rgb(200, 0, 0)) //mouth
            break
        }
        case 'squid': {
            color.setColor(3, color.rgb(120, 120, 120)) //main wall
            color.setColor(4, color.rgb(90, 90, 90)) //secondary wall, lights
            color.setColor(6, color.rgb(40, 40, 40)) //roof
            color.setColor(8, color.rgb(87, 50, 27)) //floor
            color.setColor(7, color.rgb(235, 153, 21)) // body
            break
        }
        default:
            color.setPalette(color.originalPalette)
            break
    }
}
