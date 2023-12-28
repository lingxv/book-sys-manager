<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输权限名称" clearable v-model="name" @clear="searchPermission">
                        <el-button slot="append" icon="el-icon-search" @click="searchPermission"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showEditDialog">添加权限</el-button>
                </el-col>
            </el-row>
            <el-table :data="permissionList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="权限名称" prop="name"></el-table-column>
                <el-table-column label="权限路径" prop="url"></el-table-column>
                <el-table-column label="权限类型">
                    <template slot-scope="sc">{{ sc.row.urlType == 1 ? '菜单权限' : '接口权限' }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="showEditDialog(scope.row)">修改</el-button>
                        <el-popconfirm title="确认要删除吗?" @confirm="removePermissionById(scope.row.id)">
                            <el-button slot="reference" type="danger" size="mini">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total"></el-pagination>
        </el-card>
        <el-dialog title="新增权限" :visible.sync="permissionDialog">
            <el-form :model="permission" :rules="rules" ref="permissionFormRef" label-position="left" label-width="80px">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="permission.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="权限路径" prop="url">
                    <el-input v-model="permission.url" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="权限类型" prop="urlType">
                    <el-radio v-model="permission.urlType" label="1">菜单权限</el-radio>
                    <el-radio v-model="permission.urlType" label="2">接口权限</el-radio>
                </el-form-item>
                <el-form-item label="父级菜单">
                    <el-select v-model="permission.parentId" placeholder="">
                        <el-option v-for="item in parentMenu" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="info" @click="permissionDialog = false">取消</el-button>
            <el-button type="primary" @click="edit()">确认</el-button>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 5,
            permissionList: [],
            total: 0,
            name: "", //权限名称
            urlTypeDesc: "菜单权限",
            permission: {},
            permissionDialog: false,
            rules: [],
            addModel: false,
            parentMenu: [],
        };
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.reloadData();
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.reloadData();
        },
        searchPermission() {
            this.reloadData();
        },
        showEditDialog(obj) {
            this.getParentMenu();
            this.permissionDialog = true;
            console.log(obj)
            if (obj.name) {
                this.permission = Object.assign({}, obj);
                this.addModel = false
                
                
            } else {
                this.addModel = true
                this.permission={}
            }

        },
        edit() {
            if (this.addModel) {
                this.$axios.post('/url-permission/add', this.permission).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("添加成功");
                        this.reloadData();
                        this.permissionDialog = false;
                        this.permission = {};
                    }
                })

            } else {
                this.$axios.put('/url-permission/update', this.permission).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("修改成功");
                        this.reloadData();
                        this.permissionDialog = false;
                        this.permission = {};
                    }
                })
            }
        },
        removePermissionById(id) {
            this.$axios.delete(`/url-permission/deleteById/${id}`).then(resp => {
                if (resp.data.code == 200) {
                    this.$message.success("删除成功");
                    this.reloadData();
                }
            })
        },
        reloadData() {
            this.$axios.get(`/url-permission/findByPage`, {
                params: {
                    name: this.name,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }
            }).then(resp => {
                this.permissionList = resp.data.data.list;
                this.total = resp.data.data.total;
            })
        },
        //获取父级菜单
        getParentMenu() {
            this.$axios.get(`/url-permission/findParentPermissions`).then(resp => {
                this.parentMenu = resp.data.data;
            }
            )
        }
    },
    created() {
        this.reloadData();
    }
};
</script>
<style lang="less" scoped></style>