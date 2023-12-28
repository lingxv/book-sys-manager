<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入姓名" clearable v-model="userName" @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="工号" prop="userCode"></el-table-column>
                <el-table-column label="姓名" prop="userName"></el-table-column>
                <el-table-column label="部门">
                    <template slot-scope="scope">{{scope.row.department.name}}</template>
                </el-table-column>
                <el-table-column label="角色">
                    <template slot-scope="scope">{{getRoleNames(scope.row.roleList)}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="removeUserById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 4 , 6, 12]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
        </el-card>
        <!--添加用戶-->
        <el-dialog title="添加用戶" :visible.sync="addDialogVisible" width="50%" @close="addUserFormClose">
            <el-form
                    :model="addUserForm"
                    :rules="addUserFormRules"
                    ref="addUserFormRef"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="用户编号" prop="userCode">
                    <el-input v-model="addUserForm.userCode"></el-input>
                </el-form-item>
                <el-form-item label="用戶名" prop="userName">
                    <el-input v-model="addUserForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                    <el-input v-model="addUserForm.userPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="cellphone">
                    <el-input v-model="addUserForm.cellphone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model="userRoleList" multiple placeholder="请选择角色">
                        <el-option :label="item.name" :value="item.id" v-for="item in roleList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否锁定" prop="locked">
                    <el-select v-model="addUserForm.locked" placeholder="请选择是否锁定账户">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
        </el-dialog>
        <!--修改用戶-->
        <el-dialog
                title="修改用戶"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editUserFormClose"
        >
            <el-form
                    :model="editUserForm"
                    :rules="editUserFormRules"
                    ref="editUserFormRef"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="用户编号" prop="userCode">
                    <el-input v-model="editUserForm.userCode"></el-input>
                </el-form-item>
                <el-form-item label="用戶名" prop="userName">
                    <el-input v-model="editUserForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="cellphone">
                    <el-input v-model="editUserForm.cellphone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserForm.email"></el-input>
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model="userRoleList" multiple placeholder="请选择角色">
                        <el-option :label="item.name" :value="item.id" v-for="item in roleList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否锁定" prop="locked">
                    <el-select v-model="editUserForm.locked" placeholder="请选择是否锁定账户">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUser">确 定</el-button>
        <el-button @click="editDialogVisible = false">取 消</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                editDialogVisible: false,
                swflag: false,
                pageNum: 1,
                pageSize: 5,
                userList: [],
                roleList: [], //系统中所有的角色
                userRoleList: [], //用户拥有的角色
                total: 9,
                userName: "",
                addDialogVisible: false,
                addUserForm: {
                    userName: "",
                    userCode: "",
                    userPassword: "",
                    locked: "",
                    roleIds: "",
                    email: "",
                    cellphone: ""
                },
                editUserForm: {
                    id: -1,
                    userCode: "",
                    userName: "",
                    locked: "",
                    roleIds: "",
                    email: "",
                    cellphone: ""
                },
                editUserFormRules: {
                    // userCode: [
                    //   { required: true, message: "請輸入工号", trigger: "blur" },
                    //   { min: 6, max: 6, message: "工号必须是4个字符", trigger: "blur" }
                    // ],
                    // userName: [
                    //   { required: true, message: "請輸入用戶名", trigger: "blur" },
                    //   { min: 3, max: 8, message: "用戶名在3-8個字符之間", trigger: "blur" }
                    // ]
                    // department: [{ required: true, message: '請选择部门', trigger: 'change' }],
                    // locked: [{ required: true, message: "请选择账号状态", trigger: "blur" }]
                },
                addUserFormRules: {
                    // userCode: [
                    //   { required: true, message: "請輸入工号", trigger: "blur" },
                    //   { min: 6, max: 6, message: "工号必须是6个字符", trigger: "blur" }
                    // ],
                    // userName: [
                    //   { required: true, message: "請輸入用戶名", trigger: "blur" },
                    //   { min: 3, max: 8, message: "用戶名在3-8個字符之間", trigger: "blur" }
                    // ],
                    // userPassword: [
                    //   { required: true, message: "請輸入密碼", trigger: "blur" },
                    //   { min: 3, max: 8, message: "密碼在3-8個字符之間", trigger: "blur" }
                    // ]
                    // department: [{ required: true, message: '請选择部门', trigger: 'change' }],
                    // locked: [{ required: true, message: "请选择账号状态", trigger: "blur" }]
                }
            };
        },
        methods: {
            async removeUserById(id) {

            },
            showEditDialog(row) {

            },
            editUserFormClose() {
                this.$refs.editUserFormRef.resetFields();
                this.userRoleList = [];
                this.editUserForm.deptId = "";
                this.editUserForm.roleIds = "";
            },
            editUser() {

            },
            addUser() {

            },
            addUserFormClose() {
                this.$refs.addUserFormRef.resetFields();
                this.userRoleList = [];
                this.addUserForm.deptId = "";
                this.addUserForm.roleIds = "";
            },
            getUserList() {

            },

            getRoleList() {

            },
            searchUser() {
                this.pageNum = 1;
                this.pageSize = 5;
                this.getUserList();
            },
            handleSizeChange(newSize) {
                this.pageSize = newSize;
                this.getUserList();
            },
            handleCurrentChange(newPage) {
                this.pageNum = newPage;
                this.getUserList();
            },
            //把用户对象中包含的roleList其中的rolename转换为逗号分隔的字符串
            getRoleNames(arr) {
                if (!arr) return;
                let roleNameArr = new Array();
                for (let i = 0; i < arr.length; i++) {
                    roleNameArr.push(arr[i].name);
                }
                return roleNameArr.join(",");
            },

            reloadData() {
                this.searchUser();
                this.getRoleList();
            }
        },
        created() {
            this.reloadData();
        }
    };
</script>
<style lang="less" scoped>
</style>