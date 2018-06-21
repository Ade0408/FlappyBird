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

        scorePanel: {
            default: null,
            type: cc.Node
        },

        addAudio: {
            default: null,
            url: cc.AudioClip
        },

        currentScoreLabel: {
            default: null,
            type: cc.Label
        },

        bestScoreLabel: {
            default: null,
            type: cc.Label
        },


        pipeDistance: 0,

        scoreLabel: cc.Label,

        tutorialNode: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        Module.game = this.node;

        // 获取碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.initializeData();

        this.addPipePrefab();

        this.setEvent();
    },

    initializeData: function() {

        this.pipes = [];
        this.score = 0;

        this.scoreLabel.string = "0";

        this.playerNode.setPosition(cc.p(-105, 6));
    },

    setEvent: function() {

        Global.GameEvent.on("game_start", this, ()=>{
            this.tutorialNode.active = false;
            // 定时器
            this.schedule(this.addPipePrefab, 1.5);
            this.schedule(this.check, 1.5);

        });

        Global.GameEvent.on("game_over", this, ()=>{
            this.node.stopAllActions();

            // 取消定时器
            this.unscheduleAllCallbacks();

            this.currentScoreLabel.string = this.score.toString();

            var bestScore = cc.sys.localStorage.getItem("kBestScoreKey");

            if (this.score > bestScore) {
                bestScore = this.score;
            }

            this.bestScoreLabel.string = bestScore.toString();
            cc.sys.localStorage.setItem("kBestScoreKey", bestScore);

            let moveAction = cc.moveTo(0.35, cc.p(-1.8, 97));
            this.scorePanel.runAction(moveAction);
        });
    },

    onDestroy: function() {

        Global.GameEvent.off("game_start", this);
        Global.GameEvent.off("game_over", this);
    },

    addPipePrefab: function() {

        if (Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Living) {

            // 0 是down, 1 是up
            var downPipePrefab = cc.instantiate(this.pipePrefabs[0]);
            this.pipesNode.addChild(downPipePrefab);

            var upPipePrefab = cc.instantiate(this.pipePrefabs[1]);
            this.pipesNode.addChild(upPipePrefab);

            this.pipes.push(downPipePrefab);
            this.pipes.push(upPipePrefab);

            // 设置水管的固定位置
            var randomY = Math.random() * 200;
            upPipePrefab.setPosition(cc.p(150, 10 + randomY));
            downPipePrefab.setPosition(cc.p(150, 10 + randomY - this.pipeDistance));

            // 移动水管, 制造整个场景移动的假象
            upPipePrefab.runAction(cc.moveBy(2, cc.p(-330, 0)));
            downPipePrefab.runAction(cc.moveBy(2, cc.p(-330, 0)));
        }

    },

    check: function() {

        for (var i = 0; i < this.pipes.length; i+=2) {

            let tempNode = this.pipes[i];

            // 已经通过并且游戏进行中, 加一分
            if (tempNode.x <= -60 && Module.game.getComponent('PlayControl').getMode() === Global.GameMode.Living) {
                this.addScore();
            }

            // 已经超出屏幕了, 直接从内存中移除
            if (tempNode.x <= -100) {
                this.pipes.splice(i, 2);
            }
        }
    },

    addScore: function() {
        this.score += 1;
        this.scoreLabel.string = this.score.toString();

        cc.audioEngine.play(this.addAudio);
    },


    reStart: function() {

        let moveAction = cc.moveTo(0.35, cc.p(-1.8, 422));
        this.scorePanel.runAction(moveAction);

        this.initializeData();

        Global.GameEvent.fire("game_restart");

        setTimeout(()=>{
            Global.GameEvent.fire("game_start");
        }, 1000);

    },
    // update (dt) {},
});
