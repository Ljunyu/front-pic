<template>
  <div>
      <table class="layui-table" border="0">
            <thead>
                <tr >
                    <th>
                        <div class="layui-cell pl0">
                            <span>贴子标题</span>
                        </div>
                    </th>
                     <th class="text-cent">
                        <div class="layui-cell">
                            <span>状态</span>
                        </div>
                    </th>
                     <th class="text-cent">
                        <div class="layui-cell">
                            <span>结帖</span>
                        </div>
                    </th>
                     <th class="text-cent">
                        <div class="layui-cell">
                            <span>发表时间</span>
                        </div>
                    </th>
                     <th class="text-cent">
                        <div class="layui-cell">
                            <span>数据</span>
                        </div>
                    </th>
                     <th class="text-cent">
                        <div class="layui-cell">
                            <span>操作</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-cent">
                     <td class="text-left">文章的测试标题</td>
                     <td>打开</td>
                     <td>未结</td>
                     <td>2019-01-01</td>
                     <td>10阅/2答</td>
                    <td>
                        <div class="layui-btn layui-btn-xs">编辑</div>
                        <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
                    </td>
                </tr>
            </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'myposts'
}
</script>

<style lang="scss" scoped>
.text-cent{
    text-align: center;
}
.pl0{
    padding-left: 0;
}
.text-left{
    text-align: left;
}
</style>
