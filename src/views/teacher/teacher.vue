<template>
    <div class="teacher">
        <!-- <div class="header"> -->
        <!-- </div> -->
        <div class="tableData">
            <Table border :columns="columns" :data="materialData"></Table>
        </div>
        <!-- <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formPage.pageNum"
            :page-size="formPage.pageSize"/>
        </div> -->
        <addTeacher v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData'/>
    </div>
</template>

<script>
import {Button,Table,Page,Input, Message} from 'view-design'
import addTeacher from './modal/addTeacher'
import store from '@/store/store' 
export default {
    name: 'teacher',
    components: {Button,Table,addTeacher,Page,Input},
    data(){
        return {
            showModal:false,
            no:store.state.no,
            formItem:{

            },
            formPage:{
                pageNum:1,
                pageSize:10,
            },
            currentRowData:'',
            total:1,  
            columns:[
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '性别',
                    key: 'gender'
                },
                {
                    title: '民族',
                    key: 'nation',
                },
                {
                    title: '联系电话',
                    key: 'phone',
                },
                {
                    title: '工号',
                    key: 'no',
                },
                {
                    title: '密码',
                    key: 'password',
                },
                {
                    title: '系',
                    key: 'college',
                },
                {
                    title: '备注',
                    key: 'content',
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
                                        this.addMaterial(params.row)
                                    }
                                }
                            }, '修改信息'),
                        ]);
                    }
                }
            ],
            materialData:[
                // {
                //  name:'1',  
                //  age:'1', 
                //  gender:'1', 
                //  nation:'1', 
                //  phone:'1', 
                //  password:'1', 
                //  college:'1', 
                //  content:'1', 
                // }
            ]
        }
    },
    created() {
        //  this.list();
        this.selectTeacher();
    },
    mounted() {},
    methods: {
        addMaterial(item){
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

        selectTeacher(){
            this.axios({
                 url:'/colleges_management/colleges_management/teacher/all?no='+this.no.no,
                method:'get',
            }).then(res =>{
                if(res.code ===200){
                    this.materialData.push(res.data)
                    console.log(res.data)
                     Message.success('教师个人信息');
                     store.commit('id',{id:res.data.id});
                }
                else if(res.message){
                    Message.error(res.message);
                }
            })
        },

        //查询列表
        list(){
            this.axios({
                url:'',
                method:'post',
                data:JSON.stringify(this.formPage)
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.materialData = res.data.list
                    this.total = res.data.total
                }
            })
        }
    },
    computed: {

    },
    watch: {}
}
</script>

<style lang="scss" scoped>
    .teacher{
        .header{
            background-color: #fff;
            width: 100%;
            padding: 20px 0 20px 10px;
            margin-bottom: 50px;
            .formWidth{
                width: 70%;
            }
            .inputBorder{
                border:1px solid #C5D2E4;
                border-radius: 5px;
            }
        }
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