<template>
    <div class="adminInfo">
        <div class="adminInfoTitle">
            <h1>
                管理员个人信息
            </h1>
        </div>
        <div class="adminInfoContent">
            <Row class="item">
                <Col span="4">
                    <span class="name">姓名:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.name" disabled />
                </Col>
            </Row>
            <Row class="item">
                <Col span="4">
                    <span class="name">账号:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.no" disabled />
                </Col>
            </Row>
            <Row class="item">
                <Col span="4">
                    <span class="name">密码:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.password" disabled/>
                </Col>
            </Row>
            <Row class="item">
                <Col span="4">
                    <span class="name">角色:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.message" disabled />
                </Col>
            </Row>
            <Row class="item">
                <Col span="20" offset='4' class="btn">
                   <Button type="primary" @click="editInfo">修改</Button>
                </Col>
            </Row>
        </div>
        <!-- 修改信息框 -->
        <Drawer title="修改个人信息" v-model="showDrawer" class="editInfo">
            <div class="item">
                <span class="name">姓名:</span>
                <Input v-model="name" />
            </div>
            <div class="item">
                <span class="name">账号:</span>
                <Input v-model="no" />
            </div>
            <div class="item">
                <span class="name">新密码:</span>
                <Input v-model="password" />
            </div>
            <div class="item">
                <span class="name">确认新密码:</span>
                <Input v-model="rePassword" />
            </div>
            <div class="btns">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="editInfo2">确认</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
import {Input,Button,Drawer} from 'view-design'
export default {
    name:'adminInfo',
    components:{Input,Button,Drawer},
    data(){
        return {
            showData:{
                name:'',
                no:'',
                password:'',
                message:'',
            },
            name:'',
            no:'',
            password:'',
            rePassword:'',
            showDrawer:false
        }
    },
    created(){
    },
    methods:{
        editInfo(){ // 点击修改事件 弹框
            this.showDrawer = true;
        },
        editInfo2(){ // 点击确认修改

        },
        cancel(){
            this.showDrawer = false;
        }
    }
}
</script>
<style lang='scss' scoped>
.adminInfo{
    width: 100%;
    background: #fff;
    .adminInfoTitle{
        width: 100%;
        padding-top: 10px;
        h1{
            font-size: 20px;
            text-align: center;
        }
    }
    .adminInfoContent{
        width: 100%;
        padding-bottom: 50px;
        .item{
            width: 35%;
            margin: 0 auto;
            margin-top: 60px;
            .name{
                display:inline-block;
                margin-top: 10px;
                font-size: 18px;
            }
            .btn{
                text-align: center;
                button{
                    width: 200px;
                    height: 40px;
                }
            }
        }
    }
}
</style>
<style lang='scss'>
.adminInfo,.editInfo{
    input{
        border: 1px solid #C5D2E4;
        border-radius: 5px;
        height: 40px;
    }
}
.editInfo{
    .item{
        margin-top: 30px;
        .name{
            font-size: 16px;
        }
    }
    input{
        margin-top: 5px;
    }
    .btns{
        width: 100%;
        text-align: center;
        margin-top: 60px;
        button{
            margin-right: 20px;
            margin-left: 20px;
        }
    }
}
</style>