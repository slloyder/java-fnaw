function init_palette(palette: string) {
    color.setPalette(color.originalPalette)
    switch (palette) {
        case 'office': {
            color.setColor(3, color.rgb(72, 72, 72)) //door wall
            color.setColor(4, color.rgb(48, 48, 48)) //main wall, lights
            color.setColor(6, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(9, color.rgb(74, 60, 60)) //door
            color.setColor(10, color.rgb(112, 112, 41)) //door stripes
            color.setColor(11, color.rgb(211, 177, 74)) //hopper body
            color.setColor(12, color.rgb(115, 141, 108)) //ohnoes
            color.setColor(13, color.rgb(59, 59, 64))
            break
        }
        case 'office_back': {
            color.setColor(3, color.rgb(72, 72, 72)) //main wall
            color.setColor(6, color.rgb(48, 48, 48)) //side wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(9, color.rgb(100, 70, 26)) //door
            color.setColor(10, color.rgb(20, 20, 20)) //doorknob
            color.setColor(13, color.rgb(48, 48, 48)) //side wall
            color.setColor(14, color.rgb(0, 0, 0))
            break
        }
        case 'power_out': {
            color.setColor(3, color.rgb(40, 40, 40)) //door wall
            color.setColor(4, color.rgb(27, 27, 27)) //main wall, lights
            color.setColor(6, color.rgb(11, 11, 11)) //roof
            color.setColor(8, color.rgb(36, 25, 11)) //floor
            color.setColor(2, color.rgb(117, 110, 0)) //winston yellow
            color.setColor(5, color.rgb(100, 92, 5)) // winston mouth ring
            color.setColor(7, color.rgb(108, 6, 12)) //dark red
            color.setColor(13, color.rgb(59, 59, 64))
            break
        }
        case 'monitor': {
            color.setColor(6, color.rgb(146, 133, 0)) //hal yellow, winston yellow
            color.setColor(8, color.rgb(59, 59, 64)) // hal
            color.setColor(9, color.rgb(74, 78, 95)) //hal light
            color.setColor(13, color.rgb(125, 6, 15)) //dark red
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
            //color.setColor(6, color.rgb(209, 209, 209))//eye1
            color.setColor(6, color.rgb(150, 150, 0))//TEMP BODY
            color.setColor(7, color.rgb(161, 161, 161))//eye2
            color.setColor(8, color.rgb(174, 174, 0))//outline1
            color.setColor(9, color.rgb(140, 140, 0))//outline2
            color.setColor(10, color.rgb(180, 180, 0))//midline1
            color.setColor(11, color.rgb(145, 145, 0))//midline2
            color.setColor(12, color.rgb(219, 0, 51))//mid1
            color.setColor(13, color.rgb(171, 0, 40))//mid2
            break
        }
        case 'newspaper': {
            color.setColor(2, color.rgb(65, 65, 65)) //winston mouth
            color.setColor(4, color.rgb(190, 190, 190)) //winston mouth outline
            color.setColor(5, color.rgb(215, 215, 215)) //winston body
            color.setColor(6, color.rgb(80, 80, 80)) //winston background top
            color.setColor(8, color.rgb(115, 115, 115)) //winston background bottom
            break
        }
        case 'win': {
            color.setColor(6, color.rgb(72, 72, 72)) //side wall
            color.setColor(3, color.rgb(72, 63, 48)) //winston teeth        
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(2, color.rgb(127, 127, 0)) //body
            color.setColor(7, color.rgb(122, 0, 0)) // mouth
            color.setColor(5, color.rgb(118, 118, 6)) // mouth outline
            color.setColor(13, color.rgb(0, 0, 0))
            break
        } 
        case 'hopps': {
            color.setColor(6, color.rgb(72, 72, 72)) //side wall
            color.setColor(3, color.rgb(48, 48, 48)) //main wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(2, color.rgb(211, 177, 74)) // body
            color.setColor(7, color.rgb(97, 13, 15)) // mouth
            color.setColor(5, color.rgb(207, 207, 207)) // teeth
            color.setColor(9, color.rgb(205, 169, 71)) // jaw, lower arm
            color.setColor(10, color.rgb(166, 166, 166)) // connectors
            color.setColor(13, color.rgb(0, 0, 0))
            break
        }
        case 'ohnoes': {
            color.setColor(6, color.rgb(72, 72, 72)) //side wall
            color.setColor(3, color.rgb(48, 48, 48)) //main wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(2, color.rgb(141, 173, 132)) // body
            color.setColor(7, color.rgb(102, 125, 95)) //semicolon
            color.setColor(5, color.rgb(96, 22, 18)) //mouth
            color.setColor(9, color.rgb(118, 150, 110)) //eyebrows, mouth outline
            color.setColor(10, color.rgb(190, 190, 190)) //teeth, eye glint
            color.setColor(13, color.rgb(0, 0, 0))
            break
        }
        case 'squid': {
            color.setColor(3, color.rgb(72, 72, 72)) //door wall
            color.setColor(4, color.rgb(48, 48, 48)) //main wall
            color.setColor(6, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(7, color.rgb(235, 153, 21)) // body
            break
        }
        case 'pant': {
            color.setColor(2, color.rgb(205, 55, 80)) //mouth
            color.setColor(3, color.rgb(72, 72, 72)) //main wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(5, color.rgb(65, 185, 160)) //body
            color.setColor(6, color.rgb(48, 48, 48)) //side wall
            color.setColor(7, color.rgb(30, 60, 50)) //armholes, mouth
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(9, color.rgb(62, 170, 150)) //arms
            color.setColor(13, color.rgb(48, 48, 48)) //side wall
            break
        }
        case 'sam': {
            color.setColor(6, color.rgb(72, 72, 72)) //side wall
            color.setColor(3, color.rgb(48, 48, 48)) //main wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(2, color.rgb(0, 146, 213)) // body
            color.setColor(7, color.rgb(0, 50, 74)) //hair
            color.setColor(10, color.rgb(0, 50, 74)) //hair, eyebrows
            color.setColor(5, color.rgb(50, 50, 50)) //glasses
            color.setColor(9, color.rgb(255, 50, 0)) //eyes
            color.setColor(11, color.rgb(200, 0, 25)) //mouth
            color.setColor(13, color.rgb(0, 0, 0))
            break
        }
        case 'fuzz': {
            color.setColor(6, color.rgb(72, 72, 72)) //side wall
            color.setColor(3, color.rgb(48, 48, 48)) //main wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(2, color.rgb(209, 63, 37)) // face
            color.setColor(7, color.rgb(100, 100, 100)) //spikes
            color.setColor(5, color.rgb(185, 24, 26)) //eye rings
            color.setColor(13, color.rgb(0, 0, 0))
            break
        }
        case 'golden_winston': {
            color.setColor(6, color.rgb(72, 72, 72)) //side wall
            color.setColor(3, color.rgb(48, 48, 48)) //main wall
            color.setColor(4, color.rgb(20, 20, 20)) //roof
            color.setColor(8, color.rgb(65, 45, 20)) //floor
            color.setColor(9, color.rgb(227, 179, 21)) //body
            color.setColor(10, color.rgb(168, 120, 5)) //mouth ring
            color.setColor(11, color.rgb(122, 96, 27)) //teeth
            color.setColor(12, color.rgb(24, 85, 255)) //blue wire
            color.setColor(13, color.rgb(0, 0, 0))
            break
        }
        case 'power_out_winston': {
            color.setColor(3, color.rgb(87, 76, 59)) //winston teeth        
            color.setColor(2, color.rgb(167, 167, 0)) //body
            color.setColor(7, color.rgb(157, 0, 0)) // mouth
            color.setColor(5, color.rgb(152, 152, 8)) // mouth outline
            break
        }
        default:
            color.setPalette(color.originalPalette)
            break
    }
}
