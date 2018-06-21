

// 将自己写的事件监听文件导入
import EventListener from './EventListener'

window.Global = {

    // 创建一个事件监听实例, 用来实现跨节点监听事件
    GameEvent: EventListener({}),

    GameMode: {
        Invaild: -1,
        Living: 1,
        Pause: 2,
        Over: 3
    }
};
