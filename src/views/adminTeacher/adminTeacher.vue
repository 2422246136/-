<template>
    <div class="studentInformation">
        <Row class="searchItem">
            <Col span='8' class="item">
                <Col span="4" class="name">
                    所属系：
                </Col>
                <Col span="20">
                    <Select style="width:75%" v-model="school_year">
                        <Option value="2016-2017">2016-2017</Option>
                        <Option value="2017-2018">2017-2018</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    姓名：
                </Col>
                <Col span="20">
                    <Select style="width:75%" v-model="school_year">
                        <Option value="2016-2017">2016-2017</Option>
                        <Option value="2017-2018">2017-2018</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    工号：
                </Col>
                <Col span="20">
                    <Input style="width:75%"/>
                </Col>
            </Col>
            <Col span='24' class="item" style="text-align:center">
                <Button type="primary" @click="search">查询</Button>
            </Col>
        </Row>
        <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="pageNum"
            :page-size="pageSize"/>
        </div>
        <!-- 修改信息 -->
        <Drawer title="修改信息" v-model="showDrawer" class="editStudentInfo">
            <div class="item">
                <span class="name">姓名:</span>
                <Input v-model="name" />
            </div>
            <div class="item">
                <span class="name">年龄:</span>
                <Input v-model="no" />
            </div>
            <div class="item">
                <span class="name">性别:</span>
                <Input v-model="name" />
            </div>
            <div class="item">
                <span class="name">联系电话:</span>
                <Input v-model="no" />
            </div>
            <div class="item">
                <span class="name">所属系:</span>
                <Input v-model="name" />
            </div>
            <div class="item">
                <span class="name">备注:</span>
                <Input v-model="no" />
            </div>
             <div class="item">
                <span class="name">工号:</span>
                <Input v-model="name" />
            </div>
            <div class="item">
                <span class="name">民族:</span>
                <Input v-model="no" />
            </div>
            <div class="btns">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="editInfo2">确认</Button>
            </div>
        </Drawer>
        <!-- 删除 -->
        <Modal v-model="deleteShow" title="删除" @on-ok="deleteOk" @on-cancel="cancel3">
            <p>是否删除该条信息？</p>
        </Modal>
    </div>
</template>
<script>
import {Button,Table,Page,Input,Select,Option,Drawer,Modal} from 'view-design'
export default {
    name: 'adminStudent',
    components: {Button,Table,Page,Input,Select,Option,Drawer,Modal},
    data(){
        return {
            showModal:false,
            formPage:{
            },
            currentRowData:'',//当前行数据
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
                    key: 'nation'
                },
                {
                    title: '联系电话',
                    key: 'phone'
                },
                {
                    title: '工号',
                    key: 'no'
                },
                {
                    title: '系',
                    key: 'college'
                },
                {
                    title: '备注',
                    key: 'content'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:'240',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                props: {},
                                style: {
                                    marginRight: '5px',
                                    display:'inline-block',
                                    width:'60px',
                                    height:'30px',
                                    background:'#2d8cf0',
                                    color:'#fff',
                                    lineHeight:'30px',
                                    borderRadius:'4px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row)
                                    }
                                }
                            }, '修改信息'),
                            h('span', {
                                props: {},
                                style: {
                                    marginRight: '5px',
                                    display:'inline-block',
                                    width:'40px',
                                    height:'30px',
                                    background:'#2d8cf0',
                                    color:'#fff',
                                    lineHeight:'30px',
                                    borderRadius:'4px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params.row)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            supplierData:[
                {
                   
                }
            ],
            classes:"",
            no:"",
            name:'',
            school_year:'2016-2017',
            term:'第一学期',
            pageNum:1,
            pageSize:10,
            total:100,
            showDrawer:false,
            deleteShow:false
        }
    },
    created(){
        // this.list();
    },
    methods: {
        edit(val){ // 修改信息 打开弹框
            this.showDrawer = true;
        },
        editInfo2(){ // 确认修改

        },
        cancel(){ // 取消修改
            this.showDrawer = false
        },
        delete(val){ // 删除信息 弹框
            this.deleteShow = true;
        },
        deleteOk(){ // 确认删除
        },
        cancel3(){ // 取消删除

        },
        //分页
        onChange (val) {
            this.formPagvale.pageNum = val;
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
        .searchItem{
            background: #fff;
            padding-top: 20px;
            padding-left: 20px;
            .item{
                margin-bottom: 30px;
                .name{
                    vertical-align: bottom;
                    text-align: center;
                    margin-top: 7px;
                }
                .inputClass{
                    width: 75%;
                    vertical-align: top;
                }
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
<style lang='scss'>
    .studentInformation{
        input{
            border: 1px solid #C5D2E4;
            border-radius: 5px;
        }
    }
    .editStudentInfo{
        .item{
            margin-top: 5px;
            .name{
                font-size: 14px;
            }
        }
        input{
            margin-top: 5px;
            border: 1px solid #C5D2E4;
            border-radius: 5px;
        }
        .btns{
            width: 100%;
            text-align: center;
            margin-top: 20px;
            button{
                margin-right: 20px;
                margin-left: 20px;
            }
        }
    }
</style>