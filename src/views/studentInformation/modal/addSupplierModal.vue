<template>
    <div class="addSupplierModal">
        <Modal v-model="showModal" title="修改学生成绩" width='800px'>
            <Row class="formGroup" type='flex'>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学生姓名:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学生姓名" maxlength="5" v-model="formItem.name" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学生学号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学生学号" maxlength="12" v-model="formItem.no" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>分数:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入分数" maxlength="3" v-model="formItem.fraction" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学分:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学分" v-model="formItem.credit" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学年:</label>
                    </Col>
                    <Col span="19" class="itemForm"> 
                        <Input placeholder="请输入学年" maxlength="20" v-model="formItem.school_year" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学期:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学期" maxlength="20" v-model="formItem.term" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="default" @click="onCancelHandle">取消</Button>
                <Button type="primary" @click="onOkHandle">确定修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {Modal,Button,Input,Select,Message} from 'view-design'
import VDistpicker from 'v-distpicker'
export default {
    components:{Modal,Button,Input,Select,VDistpicker,Message},
    data(){
        return {
            showModal:this.showModalState,
            true:false,
            formItem:{
                name:'',
                no:'',
                fraction:'',
                credit:'',
                school_year:'',
                term:'',
            },
            data:this.currentRowData,//展示的数据
        }
    },
    props:[
        'showModalState','currentRowData',
    ],
    methods:{
        exhibition(){
          this.formItem = this.data  
        },
        onOkHandle(){
            if(this.identifier === 'B'){
                this.axios({
                    url:'/dcf/supplier/updatesupplier',
                    method:'post',
                    data:JSON.stringify(this.formItem)
                }).then((res)=>{
                    if(res.code === 200){
                        Message.success(res.data);
                        this.showModal=false;
                    }else{
                        Message.error(res.message);
                    }
                })
            }else{
                this.axios({
                    url:'/dcf/supplier/newsupplier',
                    method:'post',
                    data:JSON.stringify(this.formItem)
                }).then((res)=>{
                    if(res.code === 200){
                        Message.success(res.data);
                        this.showModal=false;
                    }else{
                        Message.error(res.message);
                    }
                })
            }

        },
        onCancelHandle(){
            this.showModal=false;
        },
        onSelected(data) {
            this.formItem.province = data.province.value
            this.formItem.city = data.city.value
            this.formItem.area = data.area.value
        },
    },
    created() {
        this.exhibition()
    },
    mounted() {},
    watch:{
        showModal(){
            this.$emit('changeState',false)
        } 
    }
}
</script>

<style lang="scss" scoped>
    .formGroup{
        margin-bottom: 15px;
        span{
            color: red;
        }
        .itemName{
            text-align: right;
            height: 34px;
            line-height: 34px;
        }
        .itemForm{
            .inputStyle{
                border:1px solid #C5D2E4;
                width: 80%;
                border-radius: 5px;
            }
        }
        .selectStyle{
            margin-left: 17px;
        }
    }
</style>

<style lang="scss">
    .distpicker-address-wrapper select {
        height: 37px;
    }
</style>