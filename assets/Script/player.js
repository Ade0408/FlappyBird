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

        // 最大高度
        maxHeight: 0,

        // 地面的高度
        minHeight: 0,


        // 重力
        gravity: 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var animation = this.getComponent(cc.Animation);
        animation.play('fly');

    },

    start () {

    },

    update (dt) {

        if (this.node.y > this.minHeight) {
            this.node.y -= this.gravity;
        }
    },
});
