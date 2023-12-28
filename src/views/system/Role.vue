<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输角色名称" clearable v-model="name" @clear="searchRole">
                        <el-button slot="append" icon="el-icon-search" @click="searchRole"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table :data="roleList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="name"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="showEditDialog(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="removeRoleById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10 , 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
        </el-card>
        <!--添加角色-->
        <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addRoleFormClose">
            <el-form
                    :model="addRoleForm"
                    :rules="addRoleFormRules"
                    ref="addRoleFormRef"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="addRoleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addRole">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--修改角色-->
        <el-dialog
                title="修改角色"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editRoleFormClose"
        >
            <el-form
                    :model="editRoleForm"
                    :rules="editRoleFormRules"
                    ref="editRoleFormRef"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="editRoleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editRole">确 定</el-button>
                <el-button @click="editDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                addDialogVisible: false,
                editDialogVisible: false,
                pageNum: 1,
                pageSize: 5,
                name: "",
                roleList: [],
                total: 0,
                addRoleForm: {
                    name: ""
                },
                editRoleForm: {
                    id: -1,
                    name: ""
                }
            };
        },
        methods: {
            // 删除角色信息
            removeRoleById(id) {

            },
            //添加角色
            showAddDialog(row) {
                this.addDialogVisible = true;
            },
            //编辑角色
            showEditDialog(row) {
                this.editDialogVisible = true;
                this.editRoleForm.id = row.id;
                this.editRoleForm.name = row.name;
            },
            editRoleFormClose() {
                this.$refs.editRoleFormRef.resetFields();
            },


            editRole() {

            },
            addRole() {

            },

            getRoleList() {

            },
            searchRole() {
                this.pageNum = 1;
                this.pageSize = 2;
                this.getRoleList();
            },
            handleSizeChange(newSize) {
                this.pageSize = newSize;
                this.getRoleList();
            },
            handleCurrentChange(newPage) {
                this.pageNum = newPage;
                this.getRoleList();
            },


        },
        created() {
            this.searchRole();
        }
    };
</script>
<style lang="less" scoped>
</style>