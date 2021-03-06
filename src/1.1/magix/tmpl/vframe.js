var D = document;
var B = D.body;
var VframeIdCounter = 1 << 16;

var SafeExec = Magix.safeExec;
var EmptyArr = [];
var Slice = EmptyArr.slice;


var Mix = Magix.mix;

var TagName = Magix.config('tagName');
var RootId = Magix.config('rootId');
var TagNameChanged = Magix.config('!tnc');
var Has = Magix.has;

var MxBuild = TagNameChanged ? 'mx-vframe' : 'mx-defer';
var SupportContains = B.contains;

var UseQSA = TagNameChanged && B.querySelectorAll;
var Selector = ' ' + TagName + '[mx-vframe]';

var Alter = 'alter';
var Created = 'created';
var RootVframe;
var GlobalAlter;

var $ = function(id) {
    return typeof id == 'object' ? id : D.getElementById(id);
};
var $$ = function(id, node, arr) {
    node = $(id);
    if (node) {
        arr = UseQSA ? D.querySelectorAll('#' + node.id + Selector) : node.getElementsByTagName(TagName);
    }
    return arr || EmptyArr;
};

var IdIt = function(dom) {
    return dom.id || (dom.id = 'magix_vf_' + (VframeIdCounter--));
};


var NodeIn = function(a, b, r) {
    a = $(a);
    b = $(b);
    if (a && b) {
        if (a !== b) {
            try {
                r = SupportContains ? b.contains(a) : b.compareDocumentPosition(a) & 16;
            } catch (e) {
                r = 0;
            }
        } else {
            r = 1;
        }
    }
    return r;
};
//var ScriptsReg = /<script[^>]*>[\s\S]*?<\/script>/ig;
var RefLoc, RefChged, RefVOM;
/**
 * Vframe类
 * @name Vframe
 * @class
 * @constructor
 * @borrows Event.on as #on
 * @borrows Event.fire as #fire
 * @borrows Event.off as #off
 * @borrows Event.once as #once
 * @param {String} id vframe id
 * @property {String} id vframe id
 * @property {View} view view对象
 * @property {VOM} owner VOM对象
 * @property {Boolean} viewInited view是否完成初始化，即view的inited事件有没有派发
 * @property {String} pId 父vframe的id，如果是根节点则为undefined
 */
var Vframe = function(id) {
    var me = this;
    me.id = id;
    //me.vId=id+'_v';
    me.cM = {};
    me.cC = 0;
    me.rC = 0;
    me.sign = 1 << 30;
    me.rM = {};
    me.owner = RefVOM;
};

Mix(Vframe, {
    /**
     * @lends Vframe
     */
    /**
     * 获取根vframe
     * @param {VOM} vom vom对象
     * @param {Object} refLoc 引用的Router解析出来的location对象
     * @param {Object} refChged 引用的URL变化对象
     * @return {Vframe}
     * @private
     */
    root: function(owner, refLoc, refChged) {
        if (!RootVframe) {
            RefLoc = refLoc;
            RefChged = refChged;
            RefVOM = owner;
            var e = $(RootId);
            if (!e) {
                e = D.createElement(TagName);
                e.id = RootId;
                B.insertBefore(e, B.firstChild);
            }
            RootVframe = new Vframe(RootId);
            owner.add(RootVframe);
        }
        return RootVframe;
    }
});
/*
    修正IE下标签问题
    @2012.11.23
    暂时先不修正，如果页面上有vframe标签先create一下好了，用这么多代码代替一个document.createElement('vframe')太不值得
 */
/*(function(){
    var badVframes=$$(D,'/'+Vframe.tagName);
    var temp=[];
    for(var i=0,j=badVframes.length;i<j;i++){
        temp.push(badVframes[i]);
    }
    badVframes=temp;
    for(var i=0,j=badVframes.length;i<j;i++){
        var bVf=badVframes[i];
        var pv=bVf.previousSibling;
        var rVf=$C(Vframe.tagName);
        var pNode=pv.parentNode;
        var anchorNode=bVf.nextSibling;
        var vframeId;
        var vframeViewName;
        pNode.removeChild(bVf);
        temp=[];
        while(pv){
            if(pv.tagName&&pv.tagName.toLowerCase()==Vframe.tagName){
                vframeId=pv.id;
                vframeViewName=pv.getAttribute('mx-view');
                pNode.removeChild(pv);
                break;
            }else{
                temp.push(pv);
                pv=pv.previousSibling;
            }
        }
        while(temp.length){
            rVf.appendChild(temp.pop());
        }
        pNode.insertBefore(rVf,anchorNode);
        if(vframeId){
            rVf.id=vframeId;
        }
        if(vframeViewName){
            rVf.setAttribute('mx-view',vframeViewName);
        }
    }
}());*/
//

Mix(Mix(Vframe.prototype, Event), {
    /**
     * @lends Vframe#
     */
    /**
     * 是否启用场景转场动画，相关的动画并未在该类中实现，如需动画，需要mxext/vfanim扩展来实现，设计为方法而不是属性可方便针对某些vframe使用动画
     * @return {Boolean}
     * @default false
     * @function
     */
    //useAnimUpdate:Magix.noop,
    /**
     * 转场动画时或当view启用刷新动画时，旧的view销毁时调用
     * @function
     */
    //oldViewDestroy:Magix.noop,
    /**
     * 转场动画时或当view启用刷新动画时，为新view准备好填充的容器
     * @function
     */
    //prepareNextView:Magix.noop,
    /**
     * 转场动画时或当view启用刷新动画时，新的view创建完成时调用
     * @function
     */
    //newViewCreated:Magix.noop,
    /**
     * 加载对应的view
     * @param {String} viewPath 形如:app/views/home?type=1&page=2 这样的view路径
     * @param {Object|Null} viewInitParams 调用view的init方法时传递的参数
     * @param {Function} callback view在触发inited事件后的回调
     */
    mountView: function(viewPath, viewInitParams, callback) {
        var me = this;
        var node = $(me.id);
        if (!node._bak) {
            node._bak = 1;
            node._tmpl = node.innerHTML; //.replace(ScriptsReg, '');
        } else {
            node._chgd = 1;
        }
        //var useTurnaround=me.viewInited&&me.useAnimUpdate();
        me.unmountView();
        if (viewPath) {
            var path = Magix.pathToObject(viewPath);
            var vn = path.pathname;
            var sign = --me.sign;
            Magix.libRequire(vn, function(View) {
                if (sign == me.sign) { //有可能在view载入后，vframe已经卸载了

                    BaseView.prepare(View);

                    var view = new View({
                        owner: me,
                        id: me.id,
                        $: $,
                        path: vn,
                        vom: RefVOM,
                        location: RefLoc
                    });
                    me.view = view;
                    view.on('interact', function(e) { //view准备好后触发
                        if (!e.tmpl) {

                            if (node._chgd) {
                                node.innerHTML = node._tmpl;
                            }

                            me.mountZoneVframes();
                        }
                        view.on('rendered', function() { //再绑定rendered
                            //console.log('xxxxxxxxxxx',view.path);
                            me.mountZoneVframes();
                        });
                        view.on('prerender', function() {
                            if (!me.unmountZoneVframes(0, 1)) {
                                me.cAlter();
                            }
                        });

                        view.on('inited', function() {
                            me.viewInited = 1;
                            me.fire('viewInited', {
                                view: view
                            });
                            if (callback) {
                                SafeExec(callback, view, me);
                            }
                        });
                    }, 0);
                    viewInitParams = viewInitParams || {};
                    view.load(Mix(viewInitParams, path.params, viewInitParams), RefChged);
                }
            });
        }
    },
    /**
     * 销毁对应的view
     */
    unmountView: function() {
        var me = this;
        if (me.view) {
            if (!GlobalAlter) {
                GlobalAlter = {};
            }
            me.unmountZoneVframes(0, 1);
            me.cAlter(GlobalAlter);
            me.view.oust();
            var node = $(me.id);
            if (node && node._bak) {
                node.innerHTML = node._tmpl;
            }
            delete me.view;
            delete me.viewInited;
            GlobalAlter = 0;
            me.fire('viewUnmounted');
        }
        me.sign--;
    },
    /**
     * 加载vframe
     * @param  {String} id             节点id
     * @param  {String} viewPath       view路径
     * @param  {Object} viewInitParams 传递给view init方法的参数
     * @param {Function} callback view在触发inited事件后的回调
     * @return {Vframe} vframe对象
     * @example
     * //html
     * &lt;div id="magix_vf_defer"&gt;&lt;/div&gt;
     *
     *
     * //js
     * view.owner.mountVframe('magix_vf_defer','app/views/list',{page:2})
     * //注意：动态向某个节点渲染view时，该节点无须是vframe标签
     */
    mountVframe: function(id, viewPath, viewInitParams, callback) {
        var me = this;
        if (me.fcc) me.cAlter(); //如果在就绪的vframe上渲染新的vframe，则通知有变化
        //var vom = me.owner;
        var vf = RefVOM.get(id);
        if (!vf) {
            vf = new Vframe(id);

            vf.pId = me.id;

            if (!Has(me.cM, id)) {
                me.cC++;
            }
            me.cM[id] = 1;
            RefVOM.add(vf);
        }
        vf.mountView(viewPath, viewInitParams, callback);
        return vf;
    },
    /**
     * 加载当前view下面的子view，因为view的持有对象是vframe，所以是加载vframes
     * @param {HTMLElement|String} zoneId 节点对象或id
     * @param {Object} viewInitParams 传递给view init方法的参数
     * @param {Function} callback view在触发inited事件后的回调
     */
    mountZoneVframes: function(zoneId, viewInitParams, callback) {
        var me = this;

        var node = zoneId || me.id;
        me.unmountZoneVframes(node, 1);

        var vframes = $$(node);
        var count = vframes.length;
        var subs = {};

        if (count) {
            for (var i = 0, vframe, key, mxView, mxBuild; i < count; i++) {
                vframe = vframes[i];

                key = IdIt(vframe);
                if (!Has(subs, key)) {
                    mxView = vframe.getAttribute('mx-view');
                    mxBuild = !vframe.getAttribute(MxBuild);
                    mxBuild = mxBuild != TagNameChanged;

                    if (mxBuild || mxView) {
                        me.mountVframe(key, mxView, viewInitParams, callback);
                        var svs = $$(vframe);
                        for (var j = 0, c = svs.length, temp; j < c; j++) {
                            temp = svs[j];
                            subs[IdIt(temp)] = 1;
                        }
                    }
                }
            }
        }
        //if (me.cC == me.rC) { //有可能在渲染某个vframe时，里面有n个vframes，但立即调用了mountZoneVframes，这个下面没有vframes，所以要等待
        me.cCreated();
        //}
    },
    /**
     * 销毁vframe
     * @param  {String} [id]      节点id
     * @param {Boolean} [inner] 内部调用时传递
     */
    unmountVframe: function(id, inner) { //inner 标识是否是由内部调用，外部不应该传递该参数
        var me = this;
        id = id || me.id;
        //var vom = me.owner;
        var vf = RefVOM.get(id);
        if (vf) {
            var fcc = vf.fcc;
            vf.unmountView();
            RefVOM.remove(id, fcc);
            var p = RefVOM.get(vf.pId);
            if (p && Has(p.cM, id)) {
                delete p.cM[id];
                p.cC--;
                if (!inner) {
                    p.cCreated();
                }
            }
        }
    },
    /**
     * 销毁某个区域下面的所有子vframes
     * @param {HTMLElement|String} [zoneId]节点对象或id
     * @param {Boolean} [inner] 内部调用时传递
     */
    unmountZoneVframes: function(zoneId, inner) {
        var me = this;
        var hasVframe;
        var p;
        var cm = me.cM;
        for (p in cm) {
            if (zoneId) {
                if (NodeIn(p, zoneId)) {
                    me.unmountVframe(p, hasVframe = 1);
                }
            } else {
                me.unmountVframe(p, hasVframe = 1);
            }
        }
        if (!inner) {
            me.cCreated();
        }
        return hasVframe;
    },
    /**
     * 调用view中的方法
     * @param  {String} methodName 方法名
     * @param {Object} [args1,args2] 向方法传递的参数
     * @return {Object}
     */
    invokeView: function(methodName) {
        var me = this;
        var view = me.view;
        var fn = me.viewInited && view[methodName];
        var args = Slice.call(arguments, 1);
        var r;
        if (fn) {
            r = SafeExec(fn, args, view);
        }
        return r;
    },
    /**
     * 通知所有的子view创建完成
     * @private
     *
     */
    cCreated: function(e) {
        var me = this;
        if (me.cC == me.rC) {
            var view = me.view;
            if (view && !me.fcc) {
                me.fcc = 1;
                delete me.fca;
                view.fire(Created, e);
                me.fire(Created, e);
            }
            //var vom = me.owner;
            RefVOM.vfCreated();

            var mId = me.id;
            var p = RefVOM.get(me.pId);
            if (p && !Has(p.rM, mId)) {

                p.rM[mId] = p.cM[mId];
                p.rC++;
                p.cCreated(e);

            }
        }
    },
    /**
     * 通知子vframe有变化
     * @private
     */
    cAlter: function(e) {
        var me = this;
        if (!e) e = {};
        var fcc = me.fcc;
        delete me.fcc;
        if (!me.fca && fcc) { //当前vframe触发过created才可以触发alter事件
            var view = me.view;
            var mId = me.id;
            if (view) {
                me.fca = 1;
                view.fire(Alter, e);
                me.fire(Alter, e);
            }
            //var vom = me.owner;
            var p = RefVOM.get(me.pId);

            if (p && Has(p.rM, mId)) {
                p.rC--;
                delete p.rM[mId];
                p.cAlter(e);
            }
        }
    },
    /**
     * 通知当前vframe，地址栏发生变化
     * @private
     */
    locChged: function() {
        var me = this;
        var view = me.view;
        if (me.viewInited && view.sign > 0) { //存在view时才进行广播，对于加载中的可在加载完成后通过调用view.location拿到对应的window.location.href对象，对于销毁的也不需要广播

            var isChanged = view.olChanged(RefChged);
            /**
             * 事件对象
             * @type {Object}
             * @ignore
             */
            var args = {
                location: RefLoc,
                changed: RefChged,
                /**
                 * 阻止向所有的子view传递
                 * @ignore
                 */
                prevent: function() {
                    this.cs = EmptyArr;
                },
                /**
                 * 向特定的子view传递
                 * @param  {Array} c 子view数组
                 * @ignore
                 */
                to: function(c) {
                    c = c || EmptyArr;
                    if (Magix.isString(c)) {
                        c = c.split(',');
                    }
                    this.cs = c;
                }
            };
            if (isChanged) { //检测view所关注的相应的参数是否发生了变化
                //safeExec(view.render,[],view);//如果关注的参数有变化，默认调用render方法
                //否定了这个想法，有时关注的参数有变化，不一定需要调用render方法
                SafeExec(view.locationChange, args, view);
            }
            var cs = args.cs || Magix.keys(me.cM);
            //console.log(me.id,cs);
            for (var i = 0, j = cs.length, vf; i < j; i++) {
                vf = RefVOM.get(cs[i]);
                if (vf) {
                    vf.locChged();
                }
            }
        }
    }
    /**
     * view初始化完成后触发，由于vframe可以渲染不同的view，也就是可以通过mountView来渲染其它view，所以viewInited可能触发多次
     * @name Vframe#viewInited
     * @event
     * @param {Object} e
     */

    /**
     * view卸载时触发，由于vframe可以渲染不同的view，因此该事件可能被触发多次
     * @name Vframe#viewUnmounted
     * @event
     * @param {Object} e
     */

    /**
     * 子孙view修改时触发
     * @name Vframe#alter
     * @event
     * @param {Object} e
     */

    /**
     * 子孙view创建完成时触发
     * @name Vframe#created
     * @event
     * @param {Object} e
     */

    /**
     * vframe销毁时触发
     * @name Vframe#destroy
     * @event
     * @param {Object} e
     */
});

/**
 * Vframe 中的2条线
 * 一：
 *     渲染
 *     每个Vframe有cC(childrenCount)属性和cM(childrenItems)属性
 *
 * 二：
 *     修改与创建完成
 *     每个Vframe有rC(readyCount)属性和rM(readyMap)属性
 *
 *      fca firstChildrenAlter  fcc firstChildrenCreated
 */