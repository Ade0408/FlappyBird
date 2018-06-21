// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Module = require('Module');

cc.Class({
    extends: cc.Component,

    properties: {

        // 最大高度
        maxHeight: 0,

        // 地面的高度
        minHeight: 0,

        // 跳跃的高度
        jumpHeight: 0,

        // 重力
        gravity: 2,


        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },

        deadAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var animation = this.getComponent(cc.Animation);
        animation.play('fly');

        // var canvas = cc.find('Canvas');

        Module.game.on("touchstart", (event)=>{

            if (Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Invaild) {
                Global.GameEvent.fire("game_start");
                return;
            } else if (Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Living) {
                this.node.stopAllActions();

                if (this.node.y < this.maxHeight) {
                    var spawnAction = cc.spawn(cc.moveBy(0.2, cc.p(0, this.jumpHeight)), cc.rotateTo(0.15, -30));
                    var action = cc.sequence(spawnAction, cc.rotateTo(0.25, 30));
                    this.node.runAction(action);

                    cc.audioEngine.play(this.jumpAudio);
                }
            }

        }, this.node);

    },

    start () {

    },

    update (dt) {

        if (this.node.y > this.minHeight && Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Living) {
            this.node.y -= this.gravity;
        }
        else if (this.node.y > this.minHeight && Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Over) {
            this.node.y -= this.gravity;
        }
    },

    // 当碰撞产生的时候调用
    onCollisionEnter: function (other, self) {

        if (Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Living) {
            Global.GameEvent.fire("game_over");
            cc.audioEngine.play(this.deadAudio);
        }
    },

    /**
     * 当碰撞结束后调用
     */
    onCollisionExit: function (other, self) {
        
    }
});
