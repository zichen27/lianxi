<template>
    <div>
        <tree-select :tree="tree" :option="option" :defaultExpand="false">
            <template v-slot="{ item, index }">
                <div>{{ item.name }}</div>
            </template>
        </tree-select>
        <!-- <div v-for="(item,index) in aaa" :key="item.id">
            <p @click="fun(item,index)">{{item.name}}</p>
        </div>
        <div v-for="(item,index) in bbb" :key="index" @click="fun(item,index)">
            {{item.name}}
        </div> -->
    </div>
</template>
<script>
    import treeSelect from '@/components/treeSelect/index.vue'
    export default{
        name:'tree',
        components:{ treeSelect },
        data(){
            return{
                tree:[
                    {
                        name:'测试1',
                        id:'1',
                        children:[
                            {
                                name:'测试1.1',
                                id:'1.1',
                                children:[
                                    {
                                        name:'测试1.1.1',
                                        id:'1.1.1',
                                    },
                                    {
                                        name:'测试1.1.2',
                                        id:'1.1.2',
                                    },
                                ]
                            },
                            {
                                name:'测试1.2',
                                id:'1.2',
                            }
                        ]
                    },
                    {
                        name:'测试2',
                        id:'2',
                        children:[
                            {
                                name:'测试2.1',
                                id:'2.1',
                                children:[
                                    {
                                        name:'测试2.1.1',
                                        id:'2.1.1',
                                    },
                                ]
                            },
                            {
                                name:'测试2.2',
                                id:'2.2',
                            }
                        ]
                    },
                    {
                        name:'测试3',
                        id:'3',
                        children:[
                            {
                                name:'测试3.1',
                                id:'3.1',
                                children:[
                                    {
                                        name:'测试3.1.1',
                                        id:'3.1.1',
                                    },
                                ]
                            },
                            {
                                name:'测试3.2',
                                id:'3.2',
                            }
                        ]
                    }
                ],
                option:{
                    height: 100, //滚动容器的高度
                    itemHeight: 25 // 单个item的高度
                },
                aaa:[
                    {name:'111',id:'1'},
                    {name:'222',id:'2'},
                    {name:'333',id:'3'},
                ],
                bbb:{
                    a1:{
                        name:'111',id:'1'
                    },
                    a2:{
                        name:'222',id:'2'
                    }
                }
            }
        },
        methods:{
            fun(item,index){
                item.name = '5555'
                console.log(this.aaa)
                console.log(this.bbb)
            }
        }
    }
</script>
<style scoped>

</style>