<template>
    <div class="root">
        <div class="head">
            <h3>可选信号量</h3>
            <div>
                <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchValue" clearable>
                </el-input>
            </div>
        </div>
        <div class="divi"></div>
        <div class="signals">
            <el-checkbox-group v-model="checkList" class="signal-item-container">
                <el-checkbox class="signal-item" v-bind:label="item.trainCoach + '-' + item.signalName"
                    v-for=" item in signals.filter(item => item.signalName.includes(searchValue))"
                    v-bind:key="item.id"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div style="display: flex;justify-content: space-between;margin: 5px 0;">
            <span>已选信号量({{ checkList.length }})</span>
            <span style="color: #1f86cf;cursor: pointer;" @click="empty">清除</span>
        </div>
        <div class="selected">
            <div class="selected-item" v-for="item in checkList" v-bind:key="item">
                <span>{{ item }}</span>
                <div style="margin-left: 5px;cursor: pointer;color: #898d95;" @click="remove(item)"><i
                        class="el-icon-close"></i></div>
            </div>
        </div>
        <div class="divi"></div>
        <div class="bottom">
            <el-button size="mini" @click="cancel">取消</el-button>
            <el-button size="mini" @click="comfirm" type="primary" style="background-color: #1f86cf;">确认</el-button>
        </div>
    </div>
</template>

<script>
import { signals } from "@/api/api.js"

export default {
    props: {
        initCheckList: {
            type: Array,
            default: () => {
                return [];
            }
        },
    },
    data() {
        return {
            searchValue: '',
            signals: [],
            checkList: []
        }
    },
    mounted() {
        var sigs = signals()
        this.signals = sigs;
        this.checkList = this.initCheckList
        console.log('mounted', this.checkList, this.initCheckList);

    },
    methods: {
        remove(val) {
            this.checkList = this.checkList.filter(item => item !== val)
        },
        empty() {
            this.checkList = []
        },
        cancel() {
            this.$emit('cancel');
        },
        comfirm() {
            this.$emit('comfirm', this.checkList);
        }
    }
}
</script>

<style lang="less" scoped>
.root {
    background-color: #0b1121;
    color: #aeb1b7;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1rem;
    }

    .divi {
        height: 1px;
        width: 100%;
        background-color: #ffffffa6;
        margin: 5px 0;
    }

    .signals {
        padding: 10px 20px;
        height: 50%;
        overflow-y: scroll;

        .signal-item-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;

            .signal-item {
                color: #ffffffb0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                webkit-box-orient: vertical;
                align-items: center;
                display: flex;
            }
        }
    }

    /* 自定义滚动条整体样式 */
    .signals::-webkit-scrollbar {
        width: 5px;
        display: block;
    }

    /* 滚动条轨道 */
    .signals::-webkit-scrollbar-track {
        background: #161c2b;
    }

    /* 滚动条把手 */
    .signals::-webkit-scrollbar-thumb {
        background: #6e6e6e;
    }

    /* 滚动条把手在鼠标悬停时 */
    .signals::-webkit-scrollbar-thumb:hover {
        background: #6e6e6e;
    }

    .selected {
        border: 1px solid #696d78;
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 5px;
        height: 20%;
        overflow-y: auto;
        font-size: 12px;

        .selected-item {
            color: #b7babf;
            background-color: #313847;
            border-radius: 3px;
            padding: 2px 3px;
            margin: 3px;
            display: flex;
        }
    }

    /* 自定义滚动条整体样式 */
    .selected::-webkit-scrollbar {
        width: 5px;
        display: block;
    }

    /* 滚动条轨道 */
    .selected::-webkit-scrollbar-track {
        background: #161c2b;
    }

    /* 滚动条把手 */
    .selected::-webkit-scrollbar-thumb {
        background: #6e6e6e;
    }

    /* 滚动条把手在鼠标悬停时 */
    .selected::-webkit-scrollbar-thumb:hover {
        background: #6e6e6e;
    }

    .bottom {
        padding: 5px;
        text-align: end;
    }
}
</style>
<style>
.el-checkbox__label {
    display: block;
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
}

.el-checkbox__inner {
    border: 1px solid #2f3442;
    background-color: #0b1121;
}
</style>