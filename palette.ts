function set_palette(buf:Buffer) {
    for (let i = 0; i < buf.length; i += 4)
        color.setColor(buf[i], color.rgb(buf[i+1], buf[i+2], buf[i+3]))
}

function init_palette(palette: string) {
    color.setPalette(color.originalPalette)
    switch (palette) {
        case 'office': {
            //color.setColor(3, color.rgb(72, 72, 72)) //door wall
            //color.setColor(4, color.rgb(48, 48, 48)) //main wall, lights
            //color.setColor(6, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(9, color.rgb(74, 60, 60)) //door
            //color.setColor(10, color.rgb(112, 112, 41)) //door stripes
            //color.setColor(11, color.rgb(211, 177, 74)) //hopper body
            //color.setColor(12, color.rgb(115, 141, 108)) //ohnoes
            //color.setColor(13, color.rgb(59, 59, 64))
            set_palette(hex`03484848043030300614141408412d14094a3c3c0a7070290bd3b14a0c738d6c0d3b3b40`)
            break
        }
        case 'office_back': {
            //color.setColor(3, color.rgb(72, 72, 72)) //main wall
            //color.setColor(6, color.rgb(48, 48, 48)) //side wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(9, color.rgb(100, 70, 26)) //door
            //color.setColor(10, color.rgb(20, 20, 20)) //doorknob
            //color.setColor(13, color.rgb(48, 48, 48)) //side wall
            //color.setColor(14, color.rgb(0, 0, 0))
            set_palette(hex`03484848063030300414141408412d140964461a0a1414140d3030300e000000`)
            break
        }
        case 'power_out': {
            //color.setColor(3, color.rgb(40, 40, 40)) //door wall
            //color.setColor(4, color.rgb(27, 27, 27)) //main wall, lights
            //color.setColor(6, color.rgb(11, 11, 11)) //roof
            //color.setColor(8, color.rgb(36, 25, 11)) //floor
            //color.setColor(2, color.rgb(117, 110, 0)) //winston yellow
            //color.setColor(5, color.rgb(100, 92, 5)) // winston mouth ring
            //color.setColor(7, color.rgb(108, 6, 12)) //dark red
            //color.setColor(13, color.rgb(59, 59, 64))
            set_palette(hex`03282828041b1b1b060b0b0b0824190b02756e0005645c05076c060c0d3b3b40`)
            break
        }
        case 'monitor': {
            //color.setColor(6, color.rgb(146, 133, 0)) //hal yellow, winston yellow
            //color.setColor(8, color.rgb(59, 59, 64)) // hal
            //color.setColor(9, color.rgb(74, 78, 95)) //hal light
            //color.setColor(13, color.rgb(125, 6, 15)) //dark red
            set_palette(hex`06928500083b3b40094a4e5f0d7d060f`)
            break
        }
        case 'static': {
            //color.setColor(2, color.rgb(222, 222, 222))
            //color.setColor(3, color.rgb(122, 122, 122))
            //color.setColor(4, color.rgb(90, 90, 90))
            //color.setColor(15, color.rgb(100, 100, 100))
            set_palette(hex`02dedede037a7a7a045a5a5a0f646464`)
            break
        }
        case 'menu': {
            //color.setColor(6, color.rgb(150, 150, 0))//body
            //color.setColor(13, color.rgb(171, 0, 40))//mouth
            set_palette(hex`069696000dab0028`)
            break
        }
        case 'newspaper': {
            //color.setColor(2, color.rgb(65, 65, 65)) //winston mouth
            //color.setColor(4, color.rgb(190, 190, 190)) //winston mouth outline
            //color.setColor(5, color.rgb(215, 215, 215)) //winston body
            //color.setColor(6, color.rgb(80, 80, 80)) //winston background top
            //color.setColor(8, color.rgb(115, 115, 115)) //winston background bottom
            set_palette(hex`0241414104bebebe05d7d7d70650505008737373`)
            break
        }
        case 'win': {
            //color.setColor(6, color.rgb(72, 72, 72)) //side wall
            //color.setColor(3, color.rgb(72, 63, 48)) //winston teeth        
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(2, color.rgb(127, 127, 0)) //body
            //color.setColor(7, color.rgb(122, 0, 0)) // mouth
            //color.setColor(5, color.rgb(118, 118, 6)) // mouth outline
            //color.setColor(13, color.rgb(0, 0, 0))
            set_palette(hex`0648484803483f300414141408412d14027f7f00077a0000057676060d000000`)
            break
        }
        case 'hopps': {
            //color.setColor(6, color.rgb(72, 72, 72)) //side wall
            //color.setColor(3, color.rgb(48, 48, 48)) //main wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(2, color.rgb(211, 177, 74)) // body
            //color.setColor(7, color.rgb(97, 13, 15)) // mouth
            //color.setColor(5, color.rgb(207, 207, 207)) // teeth
            //color.setColor(9, color.rgb(205, 169, 71)) // jaw, lower arm
            //color.setColor(10, color.rgb(166, 166, 166)) // connectors
            //color.setColor(13, color.rgb(0, 0, 0))
            set_palette(hex`06484848033030300414141408412d1402d3b14a07610d0f05cfcfcf09cda9470aa6a6a60d000000`)
            break
        }
        case 'ohnoes': {
            //color.setColor(6, color.rgb(72, 72, 72)) //side wall
            //color.setColor(3, color.rgb(48, 48, 48)) //main wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(2, color.rgb(141, 173, 132)) // body
            //color.setColor(7, color.rgb(102, 125, 95)) //semicolon
            //color.setColor(5, color.rgb(96, 22, 18)) //mouth
            //color.setColor(9, color.rgb(118, 150, 110)) //eyebrows, mouth outline
            //color.setColor(10, color.rgb(190, 190, 190)) //teeth, eye glint
            //color.setColor(13, color.rgb(0, 0, 0))
            set_palette(hex`06484848033030300414141408412d14028dad8407667d5f056016120976966e0abebebe0d000000`)
            break
        }
        case 'squid': {
            //color.setColor(3, color.rgb(72, 72, 72)) //door wall
            //color.setColor(4, color.rgb(48, 48, 48)) //main wall
            //color.setColor(6, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(7, color.rgb(235, 153, 21)) // body
            set_palette(hex`03484848043030300614141408412d1407eb9915`)
            break
        }
        case 'pant': {
            //color.setColor(2, color.rgb(205, 55, 80)) //mouth
            //color.setColor(3, color.rgb(72, 72, 72)) //main wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(5, color.rgb(65, 185, 160)) //body
            //color.setColor(6, color.rgb(48, 48, 48)) //side wall
            //color.setColor(7, color.rgb(30, 60, 50)) //armholes, mouth
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(9, color.rgb(62, 170, 150)) //arms
            //color.setColor(13, color.rgb(48, 48, 48)) //side wall
            set_palette(hex`02cd375003484848041414140541b9a006303030071e3c3208412d14093eaa960d303030`)
            break
        }
        case 'sam': {
            //color.setColor(6, color.rgb(72, 72, 72)) //side wall
            //color.setColor(3, color.rgb(48, 48, 48)) //main wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(2, color.rgb(0, 146, 213)) // body
            //color.setColor(7, color.rgb(0, 50, 74)) //hair
            //color.setColor(10, color.rgb(0, 50, 74)) //hair, eyebrows
            //color.setColor(5, color.rgb(50, 50, 50)) //glasses
            //color.setColor(9, color.rgb(255, 50, 0)) //eyes
            //color.setColor(11, color.rgb(200, 0, 25)) //mouth
            //color.setColor(13, color.rgb(0, 0, 0))
            set_palette(hex`06484848033030300414141408412d14020092d50700324a0a00324a0532323209ff32000bc800190d000000`)
            break
        }
        case 'fuzz': {
            //color.setColor(6, color.rgb(72, 72, 72)) //side wall
            //color.setColor(3, color.rgb(48, 48, 48)) //main wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(2, color.rgb(209, 63, 37)) // face
            //color.setColor(7, color.rgb(100, 100, 100)) //spikes
            //color.setColor(5, color.rgb(185, 24, 26)) //eye rings
            //color.setColor(13, color.rgb(0, 0, 0))
            set_palette(hex`06484848033030300414141408412d1402d13f250764646405b9181a0d000000`)
            break
        }
        case 'golden_winston': {
            //color.setColor(6, color.rgb(72, 72, 72)) //side wall
            //color.setColor(3, color.rgb(48, 48, 48)) //main wall
            //color.setColor(4, color.rgb(20, 20, 20)) //roof
            //color.setColor(8, color.rgb(65, 45, 20)) //floor
            //color.setColor(9, color.rgb(227, 179, 21)) //body
            //color.setColor(10, color.rgb(168, 120, 5)) //mouth ring
            //color.setColor(11, color.rgb(122, 96, 27)) //teeth
            //color.setColor(12, color.rgb(24, 85, 255)) //blue wire
            //color.setColor(13, color.rgb(0, 0, 0))
            set_palette(hex`06484848033030300414141408412d1409e3b3150aa878050b7a601b0c1855ff0d000000`)
            break
        }
        case 'power_out_winston': {
            //color.setColor(3, color.rgb(87, 76, 59)) //winston teeth        
            //color.setColor(2, color.rgb(167, 167, 0)) //body
            //color.setColor(7, color.rgb(157, 0, 0)) // mouth
            //color.setColor(5, color.rgb(152, 152, 8)) // mouth outline
            set_palette(hex`03574c3b02a7a700079d000005989808`)
            break
        }
        default:
            color.setPalette(color.originalPalette)
            break
    }
}
