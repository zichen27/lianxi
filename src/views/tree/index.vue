<template>
    <div>
        <tree-select :tree="tree" :option="option" :defaultExpand="false">
            <template v-slot="{ item, index }">
                <div>{{ item.name }}</div>
            </template>
        </tree-select>
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
                    }
                ],
                option:{
                    height: 500, //滚动容器的高度
                    itemHeight: 25 // 单个item的高度
                }
            }
        }
    }
</script>
<style scoped>

</style>