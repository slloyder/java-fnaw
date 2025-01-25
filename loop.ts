game.onUpdate(function () {
    volume = music.volume()
    if(mygame.scene == 'jumpscare'){
        light.setBrightness(255)
    }
    else{
        light.setBrightness(15)
    }
    spf = (game.runtime() - last_game_runtime) / 1000
    last_game_runtime = game.runtime()
    game_state.time += Math.constrain(spf * 1000, 0, 200)
    if (mygame.old_scene != mygame.scene && mygame.scene != 'paused') { mygame.old_scene = mygame.scene }
    if (!game_timer.paused && ani != null && !game_state.power_out) {
        for (let i = 0; i < ani_keys.length; i++) {
            ani[ani_keys[i]].update()
        }
        if (game_state.cams_broken) {
            if (game_state.cams_broken_timer.get_time() >= game_state.cams_broken_limit) {
                game_state.cams_broken = false
                if (game_state.monitor_on){
                    load_monitor_room_background(game_state.viewed_room) 
                    if(ani['sam'].room == 'North Hall') {
                        load_scene('monitor')
                    }
                }
            }
        }
        for (let i = 0; i < game_state.doors.length; i++) {
            if (game_state.doors_broken[i]) {
                if (game_state.doors_broken_timers[i].get_time() > game_state.doors_broken_limits[i]) {
                    game_state.doors_broken[i] = false
                    game_state.doors_broken_timers[i].reset()
                }
            }
        }
        if (game_state.monitor_on || mygame.scene == 'office_back') {
            if (game_state.ani_in == 'hopps' || game_state.ani_in == 'ohnoes' || game_state.ani_in == 'win') {
                game_state.jumpscare_ready.run()
                if (game_state.jumpscare_wait_timer.paused) {
                    game_state.jumpscare_wait_timer.start()
                }
                if (game_state.jumpscare_wait_timer.get_time() > game_state.jumpscare_wait_limit) {
                    mygame.set_scene('jumpscare')
                }
            }
            else {
                game_state.jumpscare_ready.stop()
                game_state.jumpscare_wait_timer.stop()
            }
            
            let cond = (ani != null && (game_state.ani_in == '' || game_state.ani_in == 'sam') && !game_state.paused)
            if (cond) {
                if (ani['hopps'].room == 'Left Door' && game_state.doors_broken[0]) {
                    ani['hopps'].room = 'office'
                    game_state.ani_in = 'hopps'
                }
                else if (ani['ohnoes'].room == 'Right Door' && game_state.doors_broken[1]) {
                    ani['ohnoes'].room = 'office'
                    game_state.ani_in = 'ohnoes'
                }
                else if (ani['win'].room == 'office') {
                    game_state.ani_in = 'win'
                }
            }
        }
        else {
            if (game_state.ani_in == 'hopps' ||
                game_state.ani_in == 'ohnoes' ||
                game_state.ani_in == 'squid' ||
                game_state.ani_in == 'win' ||
                game_state.ani_in == 'sam' ||
                game_state.ani_in == 'fuzz') {
                mygame.set_scene('jumpscare')
            }
        }
    }
    if (the_update_handler != null)
        the_update_handler()
})
