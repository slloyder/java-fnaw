class Panteater extends Animatronic {
    run_pos: number = -400
    run: boolean = false
    timer: Timer = new Timer
    limit: number = 0
    constructor() {
        super('Bowling Alley')
        super.reset()
        this.reset()
    }
    set_limit() {
        return (Math.map(Math.pow(1-this.level/20, 3), 1, 0, 200, 15) + Math.pow(1-this.level/20, 10)*350)+Math.randomRange(0.0, 200/this.level)
    }
    reset() {
        this.level = ani_AI['pant'][night - 1]
        this.run_pos = -400
        this.run = false
        this.timer.stop()
        this.timer.start()
        this.limit = this.set_limit()
    }
    update() {
        if(this.run) {
            this.run_pos += spf * 100
            if (this.run_pos >= 50) {
                if (game_state.back_door_closed) {
                    music.setVolume(200)
                    music.knock.play()
                    music.thump.play()
                    this.reset()
                }
                //changeme bc of no door anim, in real pant enters at runpos >= 100
                else {
                    console.log('entered jumpscare call')
                    game_state.ani_in = 'pant'
                    mygame.set_scene('jumpscare')    
                }
            }
            else {
                if (this.timer.get_time() > 0.1) {
                    this.timer.reset()
                    music.setVolume(80)
                    music.footstep.play()
                }
            }
        }
        else {
            if(this.timer.get_time() > this.limit) {
                this.limit = this.set_limit()
                this.run = true
            }
        }
    }
}
/*
    update: function() {
        if(!this.run) {
            if(this.timer.getTime() > this.limit) {
                this.limit = this.setLimit();
                this.run = true;
            }
        } else {
            this.runPos += spf*100;
            if(this.runPos >= 50) {
                if(rooms.office.doorRot !== 0) {
                    rooms.office.doorRot += 0.6;
                    rooms.office.doorRot = constrain(rooms.office.doorRot, 0, 1.5);
                } else {
                    addSound("retro/hit2", {time: 0, start: 0.05, PBR: 0.5});
                    addSound("retro/hit1", {time: 200, start: 0.05});
                    this.reset();
                }
            }
            if(this.runPos >= 100 && scenes.game.aniIn === "" && !scenes.game.GW) {
                scenes.game.aniIn = "pant";
            } else {
                if(this.timer.getTime() > 0.1) {
                    this.timer.reset();
                    addSound("rpg/step-heavy", {time: 0, start: 0.35, stop: 0.45, volume: normVol(0.5)});
                }
            }
        }
    },
};
*/