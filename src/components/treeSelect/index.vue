<template>
    <div class="b-tree" @scroll="handleScroll">
        <div class="b-tree__phantom" :style="{ height: contentHeight }"></div>
        <div
            class="b-tree__content"
            :style="{ transform: `translateY(${offset}px)` }"
        >
            <div
                v-for="(item) in visibleData"
                :key="item.id"
                class="b-tree__list-view"
                :style="{paddingLeft: 18 * (item.level - 1) + 'px'}"
            >
                <i :class="item.expand ? 'b-tree__expand' : 'b-tree__close' " v-if="item.children && item.children.length" />{{item.name}}
                <!-- <slot :item="item" :index="index"></slot> -->
            </div>
        </div>
  </div>
</template>
<script>
    export default{
        name:'treeSelect',
        props: {
            tree: {
                type: Array,
                required: true,
                default: []
            },
            defaultExpand: {
                type: Boolean,
                required: false,
                default: false
            },
            option: {
                // 配置对象
                type: Object,
                required: true,
                default: {}
            }
        },
        data(){
            return{
                offset: 0, // translateY偏移量
                visibleData: []
            }
        },
        computed: {
            contentHeight() {
                return (
                    (this.flattenTree || []).filter(item => item.visible).length * this.option.itemHeight + "px");
            },
            flattenTree() {
                const flatten = function(
                    list,
                    childKey = "children",
                    level = 1,
                    parent = null,
                    defaultExpand = true
                ) {
                    let arr = [];
                    list.forEach(item => {
                        item.level = level;
                        if (item.expand === undefined) {
                            item.expand = defaultExpand;
                        }
                        if (item.visible === undefined) {
                            item.visible = true;
                        }
                        if (!parent.visible || !parent.expand) {
                            item.visible = false;
                        }
                        item.parent = parent;
                        arr.push(item);
                        if (item[childKey]) {
                            arr.push(...flatten(item[childKey],childKey,level + 1,item,defaultExpand));
                        }
                    });
                    return arr;
                };
                return flatten(this.tree, "children", 1, {
                    level: 0,
                    visible: true,
                    expand: true,
                    children: this.tree
                });
            }
        },
        methods: {
            handleScroll(e) {
                const scrollTop = e.target.scrollTop
                this.updateVisibleData(scrollTop)
            },
            updateVisibleData(scrollTop = 0) {
                const start = Math.floor(scrollTop / this.option.itemHeight);
                const end = start + this.option.visibleCount;
                const allVisibleData = (this.flattenTree || []).filter(item => item.visible);
                this.visibleData = allVisibleData.slice(start, end);
                console.log(this.visibleData)
                this.offset = start * this.option.itemHeight;
            },
            //展开节点
            expand(item) {
                item.expand = true;
                this.recursionVisible(item.children, true);
            },
            //折叠节点
            collapse(item) {
                item.expand = false;
                this.recursionVisible(item.children, false);
            },
            //递归节点
            recursionVisible(children, status) {
                children.forEach(node => {
                    node.visible = status;
                    if (node.children) {
                        this.recursionVisible(node.children, status);
                    }
                })
            }
        },
        mounted() {
            this.updateVisibleData();
        },
    }
</script>
<style scoped>
.b-tree {
    position: relative;
    height: 500px;
    overflow-y: scroll;
}
.b-tree__phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}
.b-tree__content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    min-height: 100px;
}
.b-tree__list-view{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.b-tree__content__item {
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    cursor: pointer;
}
.b-tree__content__item:hover,
.b-tree__content__item__selected {
    background-color: #d7d7d7;
}
.b-tree__content__item__icon {
    position: absolute;
    left: 0;
    color: #c0c4cc;
    z-index: 10;
}
.b-tree__close{
    display:inline-block;
    width:0;
    height:0;
    overflow:hidden;
    font-size:0;
    margin-right: 5px;
    border-width:5px;
    border-color:transparent transparent transparent #C0C4CC;
    border-style:dashed dashed dashed solid
}
.b-tree__expand{
    display:inline-block;
    width:0;
    height:0;
    overflow:hidden;
    font-size:0;
    margin-right: 5px;
    border-width:5px;
    border-color:#C0C4CC transparent transparent transparent;
    border-style:solid dashed dashed dashed
}
</style>