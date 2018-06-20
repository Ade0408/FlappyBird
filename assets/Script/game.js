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
        playerNode: {
            default: null,
            type: cc.Node
        },

        pipePrefabs: {
            default: [],
            type: cc.Prefab
        },

        pipesNode: {
            default: null,
            type: cc.Node
        },


        pipeDistance: 0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.pipes = [];
        this.addPipePrefab();

        // 定时器
        this.schedule(this.addPipePrefab, 1.5);
        this.schedule(this.check, 1.5);
    },

    addPipePrefab: function() {

        // 0 是down, 1 是up
        var downPipePrefab = cc.instantiate(this.pipePrefabs[0]);
        this.pipesNode.addChild(downPipePrefab);

        var upPipePrefab = cc.instantiate(this.pipePrefabs[1]);
        this.pipesNode.addChild(upPipePrefab);

        this.pipes.push(downPipePrefab);
        this.pipes.push(upPipePrefab);

        var randomY = Math.random() * 200;
        upPipePrefab.setPosition(cc.p(150, 10 + randomY));
        downPipePrefab.setPosition(cc.p(150, 10 + randomY - this.pipeDistance));

        upPipePrefab.runAction(cc.moveBy(2, cc.p(-330, 0)));
        downPipePrefab.runAction(cc.moveBy(2, cc.p(-330, 0)));
    },

    check: function() {

        for (var i = 0; i < this.pipes.length; i+=2) {

            let tempNode = this.pipes[i];

            // 已经通过, 加一分
            if (tempNode.x <= -60) {

            }

            // 已经超出屏幕了, 直接从内存中移除
            if (tempNode.x <= -100) {
                this.pipes.splice(i, 2);
            }
        }
    },

    addScore: function() {

    },

    start () {

    },

    // update (dt) {},
});
