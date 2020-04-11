<template>
    <div class="studentInformation">
        <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formPage.pageNum"
            :page-size="formPage.pageSize"/>
        </div>
        <addSupplierModal v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData' />
    </div>
</template>
<script>
import {Button,Table,Page} from 'view-design'
import addSupplierModal from './modal/addSupplierModal'
export default {
    name: 'studentInformation',
    components: {Button,Table,addSupplierModal,Page},
    data(){
        return {
            showModal:false,
            formPage:{
            },
            total:1,            
            currentRowData:'',//当前行数据
            columns:[
                {
                    title: '学生姓名',
                    key: 'name'
                },
                {
                    title: '学生学号',
                    key: 'no'
                },
                 {
                    title: '班级',
                    key: 'classes'
                },
                {
                    title: '分数',
                    key: 'fraction'
                },
                {
                    title: '学分',
                    key: 'credit'
                },
                {
                    title: '学年',
                    key: 'school_year'
                },
                {
                    title: '学期',
                    key: 'term'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                props: {},
                                style: {
                                    marginRight: '5px',
                                    display:'inline-block',
                                    width:'70px',
                                    height:'30px',
                                    background:'#2d8cf0',
                                    color:'#fff',
                                    lineHeight:'30px',
                                    borderRadius:'4px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.addSupplier(params.row)
                                    }
                                }
                            }, '修改信息'),
                        ]);
                    }
                }
            ],
            supplierData:[
                {
                    name:'1',
                    no:'1',
                    fraction:'1',
                    credit:'1',
                    school_year:'1',
                    term:'1',
                }
            ]
        }
    },
    created(){
        // this.list();
    },
    methods: {
        show(val){
            console.log(val)
            this.showModal = true;
            this.currentRowData = val.row;
        },
        addSupplier(item){
            this.showModal = true;
            this.currentRowData = item
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
                url:'/dcf/supplier/selectAllSupplier',
                method:'get',
                params:this.formPage
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.supplierData = res.data.list
                    this.total = res.data.total
                }
            })
        }
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
    .studentInformation{
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