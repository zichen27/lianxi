<template>
    <div>
        <div id="parent-div">
            <img src="../../assets/lazyload/1.png" :data-src="aaaSrc" width="300" height="400"/>
            <img src="../../assets/lazyload/1.png" :data-src="bbbSrc" width="300" height="400"/>
            <img src="../../assets/lazyload/1.png" :data-src="cccSrc" width="300" height="400"/>
            <img src="../../assets/lazyload/1.png" :data-src="dddSrc" width="300" height="400"/>
            <img src="../../assets/lazyload/1.png" :data-src="eeeSrc" width="300" height="400"/>
            <img src="../../assets/lazyload/1.png" :data-src="fffSrc" width="300" height="400"/>
        </div>
    </div>
</template>
<script>
    import aaa from '@/assets/lazyload/1.png'
    import bbb from '@/assets/lazyload/2.png'
    import ccc from '@/assets/lazyload/3.png'
    import ddd from '@/assets/lazyload/4.png'
    import eee from '@/assets/lazyload/5.png'
    import fff from '@/assets/lazyload/6.png'
    export default{
        name:'lazyload',
        data(){
            return{
                aaaSrc:aaa,
                bbbSrc:bbb,
                cccSrc:ccc,
                dddSrc:ddd,
                eeeSrc:eee,
                fffSrc:fff,
                begin:0
            }
        },
        methods:{
            lazyload(){
                const parentDiv = document.getElementById("parent-div")
                const imgs = parentDiv.querySelectorAll('img');
                let {begin} = this
                for(let index = begin; index < imgs.length; index++){
                    const img = imgs[index];
                    console.log(parentDiv.offsetTop)
                    if(img.offsetTop < parentDiv.offsetHeight + parentDiv.scrollTop){
                        console.log("scroll"+index+"到了")
                        this.begin = index; //不去遍历已经加载了得图片
                        img.src = img.getAttribute("data-src")
                    }
                }
            },
            throttle(lazyTime, Fuc){
                let lastTime = null //记录上次时间
                return function(){
                    let currentTime = new Date().getTime();
                    if(!lastTime){ //初始化时间
                        lastTime = currentTime;
                    }
                    if(lastTime + lazyTime < currentTime){
                        Fuc();
                        lastTime = currentTime;
                    }
                }
            }
        },
        mounted(){
            this.lazyload() //渲染首屏，先执行一次
            const parentDiv = document.getElementById("parent-div")
            parentDiv.onscroll = this.throttle(50, this.lazyload)
        }
    }
</script>
<style scoped>
#parent-div{
    height:500px;
    width:400px;
    border:1px solid black;
    overflow-y: auto;
    position:absolute;
}
</style>