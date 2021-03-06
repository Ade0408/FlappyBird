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

        moveSpeed: 0,

        resetX: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    update (dt) {

        var x = this.node.x;
        x += this.moveSpeed * dt;

        if (x <= this.resetX - 288) {
            x = this.resetX;
        }
        this.node.x = x;
    },
});
