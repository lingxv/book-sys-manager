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
                    <el-button type="primary" >添加权限</el-button>
                </el-col>
            </el-row>
            <el-table :data="permissionList" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="权限名称" prop="name"></el-table-column>
                <el-table-column label="权限路径" prop="url"></el-table-column>
                <el-table-column label="权限类型">
                    <template slot-scope="sc">{{sc.row.urlType==1?'菜单权限':'接口权限'}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="showEditDialog(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="removePermissionById(scope.row.id)">删除</el-button>
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
            };
        },
        methods: {
            handleSizeChange(size){

            },
            handleCurrentChange(now){

            },
            searchPermission(){

            },
            showEditDialog(obj){

            },
            removePermissionById(id){

            },
            reloadData(){

            }
        },
        created() {
            this.reloadData();
        }
    };
</script>
<style lang="less" scoped>
</style>