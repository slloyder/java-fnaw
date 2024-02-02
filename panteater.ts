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
                    music.knock.play(220)
                    music.thump.play(220)
                    this.reset()
                }
                //changeme bc of no door anim, in real pant enters at runpos >= 100
                else {
                    game_state.ani_in = 'pant'
                    mygame.set_scene('jumpscare')    
                }
            }
            else {
                if (this.timer.get_time() > 0.1) {
                    this.timer.reset()
                    music.footstep.play(150)
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
