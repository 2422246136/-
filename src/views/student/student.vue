<template>
    <div class="student">
        <div class="article">
             <Table border :columns="columns" :data="supplierOrerData"></Table>
        </div>
        <students :showDeliverGoodsModal='showDeliverGoodsModal' v-if="showDeliverGoodsModal" @deliverModalState='deliverModalState' :currentRowData='currentRowData'/>
    </div>
</template>

<script>
import {Input,DatePicker,Button,Table,Page, Message} from 'view-design'
import students from './modal/student'
import store from '@/store/store'
import moment from 'moment'
export default {
    name: 'student',
    components: {Input,DatePicker,Button,Table,students,Page},
    data(){
        return {
            // 发货模态框显示与隐藏
            showDeliverGoodsModal:false,
            // 发货详情模态框显示与隐藏
            total:1,
            currentRowData:'',//当前行数据
            name:store.state.userName,
            no:store.state.no,
            formItem:{
                classes:'',
                name:'',
                no:'',
                pageNum:1,
                pageSize:10,
            },
            columns: [
                // {
                //     title: 'id',
                //     key: 'id',
                // },
                {
                    title: '姓名',
                    key: 'name',
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
                    title: '政治面貌',
                    key: 'politics'
                },
                {
                    title: '民族',
                    key: 'nation'
                },
                {
                    title: '联系电话',
                    key: 'phone'
                },
                {
                    title: '密码',
                    key: 'password'
                },
                {
                    title: '籍贯',
                    key: 'local'
                },
                {
                    title: '班级',
                    key: 'classes',
                },
                {
                    title: '学号',
                    key: 'no'
                },
                {
                    title: '专业',
                    key: 'major'
                },
                {
                    title: '课程',
                    key: 'course'
                },
                {
                    title: '入学时间',
                    key: 'entrance_time'
                },
                {
                    title: '备注',
                    key: 'content'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 240,
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
                                        this.deliverGoods(params.row)
                                    }
                                }
                            }, '修改信息'),
                        ]);
                    }
                }
            ],
            supplierOrerData: []
        }
    },
    created() { 
        console.log(this.no.no);
       this.selectstudent();
    },
    mounted() {},
    methods: {
        selectstudent(){
                     this.axios({
          
                url:'/colleges_management/colleges_management/student/all?no='+this.no.no,
                method:'get',
                // data:JSON.stringify()
            }).then(res =>{
                if(res.code === 200){
                    this.supplierOrerData.push(res.data);
                    console.log(res.data)
                    Message.success(this.name.userName+'同学你好');

                     store.commit('id',{id:res.data.id});
                     console.log(res.data.id);
                }else if(res.message){
                    Message.error(res.message);
                }
            })
        },


        // 点击发货按钮
        deliverGoods (item) {
            this.showDeliverGoodsModal = true;
            this.currentRowData = item;
        },
        deliverModalState(val){
            this.showDeliverGoodsModal = val;
        },
        //分页
        onChange (val) {
            this.formItem.pageNum = val;
            this.query();
        },
        //分页大小
        onPageSizeChange (val) {
            this.formItem.pageSize = val;
            this.query();
        },
        //查询按钮
        query(a){
            if(a === 1){
                this.formItem.pageNum = 1;
            }
            this.formItem.startTime = this.formItem.startTime?moment(this.formItem.startTime).format("YYYY-MM-DD HH:mm:ss"):''
            this.formItem.endTime = this.formItem.endTime?moment(this.formItem.endTime).format("YYYY-MM-DD HH:mm:ss"):''
            if(this.formItem.startTime!=''&&this.formItem.endTime!=''&&moment(this.formItem.startTime).valueOf()>=moment(this.formItem.endTime).valueOf()){
                this.$Message.warning('开始截止时间不能等于或在结束截止时间之后');
            }else{
                // this.axios({
                //     url:'/dcf/student/select',
                //     method:'post',
                //     data:JSON.stringify(this.formItem)
                // }).then((res)=>{
                //     if(res.code === 200){
                //         this.total = res.data.total
                //         this.supplierOrerData = res.data.list
                //     }
                // })
            }

        }

    },
    computed: {

    },
    watch: {}
}
</script>

<style lang="scss" scoped>
    .student{
        .paging{
            width: 100%;
            text-align:center;
            margin-top: 10px;
        }
    }
</style>
