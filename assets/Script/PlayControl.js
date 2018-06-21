// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

        this.gameMode = Global.GameMode.Invaild;

        Global.GameEvent.on("game_playControl", this, this.gamePlayControl.bind(this));
        Global.GameEvent.on("game_start", this, this.gameStart.bind(this));
        Global.GameEvent.on("game_over", this, this.gameOver.bind(this));
        Global.GameEvent.on("game_restart", this, this.gameRestart.bind(this));
    },

    onDestroy() {

        Global.GameEvent.off("game_playControl", this, this.gamePlayControl.bind(this));
        Global.GameEvent.off("game_start", this, this.gameStart.bind(this));
        Global.GameEvent.off("game_over", this, this.gameOver.bind(this));
        Global.GameEvent.off("game_restart", this, this.gameRestart.bind(this));
    },

    gamePlayControl: function(playControl){
        this.gameMode = Global.GameMode.Pause;
        if (playControl === 0) {
            this.gameMode = Global.GameMode.Pause;
        } else {
            this.gameMode = Global.GameMode.Living;
        }
    },

    gameStart: function(){
        this.gameMode = Global.GameMode.Living;
    },

    gameOver: function(){
        this.gameMode = Global.GameMode.Over;
    },

    gameRestart: function(){
        this.gameMode = Global.GameMode.Invaild;
    },

    getMode: function () {

        return this.gameMode;
    },


});
