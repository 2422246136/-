<template>
    <div class="supplierManagement">
        <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formPage.pageNum"
            :page-size="formPage.pageSize"/>
        </div>
        <addSupplierModal v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData' :IdentiFication='IdentiFication'/>
    </div>
</template>
<script>
import {Button,Table,Page} from 'view-design'
import addSupplierModal from './modal/addSupplierModal'
import store from '@/store/store'
export default {
    name: 'supplierManagement',
    components: {Button,Table,addSupplierModal,Page},
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
                    title: '学号',
                    key: 'no'
                },
                {
                    title: '课程',
                    key: 'course'
                },
                {
                    title: '教师姓名',
                    key: 'teacher'
                },
                {
                    title: '系',
                    key: 'college'
                },
            ],
            supplierData:[]
        }
    },
    created(){
        this.list();
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
                url:'/colleges_management/colleges_management/student/course?id='+this.id.id,
                method:'get',
                // params:this.formPage
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.supplierData.push({no:res.data.no,course:res.data.course,teacher:res.data.teacher[0].name,college:res.data.teacher[0].college});
                }
            })
        }
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
    .supplierManagement{
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