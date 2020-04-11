<template>
    <div class="homepage">
        <!-- <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formPage.pageNum"
            :page-size="formPage.pageSize"/>
        </div>
        <addSupplierModal v-if="showModal" :showModalState='showModal' 
        @changeState='changeState' :currentRowData='currentRowData' :IdentiFication='IdentiFication'/> -->
        <div style="text-align:center">
           
        </div>
         <Split v-model="split3">
            <div slot="left" class="demo-split-pane no-padding">
                <Split v-model="split4" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                         <img src="~/images/index/zhongbei .jpg">
                         <h3>中北大学信息商务学院</h3>
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        Bottom Pane
                    </div>
                </Split>
            </div>
            <div slot="right" class="demo-split-pane">
                Right Pane
            </div>
        </Split>
    </div>
</template>
<script>
import {Button,Table,Page} from 'view-design'
import store from '@/store/store'
export default {
    name: 'homepage',
    components: {Button,Table,Page},
    data(){
        return {
            showModal:false,
            formPage:{
                no:'',
                course:'',
                name:'',
                college:'',
            },
           id:store.state.id,
            total:1,  
            currentRowData:'',//当前行数据
            IdentiFication:'',//修改用户标识符
            columns:[
                {
                    title: '工号',
                    key: 'no'
                },
                {
                    title: '系',
                    key: 'college'
                },
                {
                    title: '课程',
                    key: 'course'
                },
                {
                    title: '学生名字',
                    key: 'student'
                },
                 {
                    title: '性别',
                    key: 'gender'
                },
                 {
                    title: '班级',
                    key: 'classes'
                },
                 {
                    title: '学生学号',
                    key: 'no'
                },
                // {
                //     title: '系',
                //     key: 'college'
                // },
            ],
            supplierData:[]
        }
    },
    created(){
        
    },
    methods: {
        show(val,B){
            console.log(val)
            this.showModal = true;
            this.currentRowData = val.row;
            this.IdentiFication = B;
        },
        addSupplier(A){
            this.showModal = true;
            this.IdentiFication = A;

        },
        changeState(val){
            this.showModal = val;
            this.list();
        },
        //分页
        onChange (val) {
            this.formPage.pageNum = val;
            this.list();
        },
        //分页大小
        onPageSizeChange (val) {
            this.formPage.pageSize = val;
            this.list();
        },
        //查询列表
        list(){
            this.axios({
               
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    // this.supplierData.push({no:res.data.no,course:res.data.course,teacher:res.data.teacher[0].name,college:res.data.teacher[0].college});
                }
            })
        }
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
    .homepage{
        .btn{
            button{
                border-radius: 15px;
            }
        }
        .tableData{
            margin-top: 20px;
        }
        .paging{
            text-align:center;
            margin-top: 10px;
        }
    }
</style>