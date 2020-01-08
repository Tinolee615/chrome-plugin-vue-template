<template>
    <div id="vueApp">
        <layOut v-if="tableShow"></layOut>
    </div>
</template>

<script>
import layOut from './components/layOut'
export default {
    components:{
        layOut
    },
    data(){
        return{
            tableShow:true
        }
    },
    computed:{
        
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                console.log(val);
            },
            // 深度观察监听
            deep: true
        }
    },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>

<style lang="scss">
#vueApp{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 99999;
    background: #fff;
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}
    ::-webkit-scrollbar{
        width: 12px;
        height: 12px;
        background-color: #333;
    }
    /*定义滚动条的轨道，内阴影及圆角*/
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 2px;
        background-color: #f5f5f5;
    }
    /*定义滑块，内阴影及圆角*/
    ::-webkit-scrollbar-thumb{
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #b8b8b8;
    }
    /*滚动条整体部分,必须要设置*/
    ::-webkit-scrollbar{
        width: 12px;
        height: 12px;
        border-radius: 6px;
        background-color: #c5c5c5;
    }
    /*滚动条的轨道*/
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px rgba(0,0,0,.3);
        background-color: #fff;
    }
    /*滚动条的滑块按钮*/
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #c5c5c5;
        // box-shadow: inset 0 0 5px #000;
        z-index: 9;
    }
    /*滚动条的上下两端的按钮*/
    ::-webkit-scrollbar-button{
        display: none;
        /* height: 10px; */
        /* background-color: #B0AEDA; */
        /*}
        .ieScroll{
        /*三角箭头的颜色*/
        scrollbar-arrow-color: #e5e5e5;
        /*滚动条滑块按钮的颜色*/
        scrollbar-face-color: #c5c5c5;
        /*滚动条整体颜色*/
        scrollbar-highlight-color: #c5c5c5;
        /*滚动条阴影*/
        scrollbar-shadow-color: #ccc;
        /*滚动条轨道颜色*/
        scrollbar-track-color: #b5b5b5;
    }
    .el-table--scrollable-x{
        .el-table__fixed-right{
            height: calc(100% - 13px)!important;
        }
        .el-table__fixed{
            height: calc(100% - 13px)!important;
        }
    }
}
</style>
