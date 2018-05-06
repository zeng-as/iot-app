// ************个性化设置************
var prefix = "/iot-manage/sys/notice";
var localParams = {};
var localColumns = [
    {
        checkbox: true
    },
    {
        field: 'id', // 列字段名
        title: '序号' // 列标题
    },
    {
        field: 'title', // 列字段名
        title: '标题' // 列标题
    },
    {
        field: 'type', // 列字段名
        title: '通知类型', // 列标题
        align: 'center',
        formatter: function (value, row, index) {
            if (value === 0) {
                return '<span class="label label-info">系统通知</span>';
            } else if (value === 1) {
                return '<span class="label label-danger">系统预警</span>';
            }
        }
    },
    {
        title: '操作',
        field: 'id',
        align: 'center',
        formatter: function (value, row, index) {
            var a = '<a class="btn btn-info btn-sm ' + s_add_h + '" href="#" title="编辑通知"  mce_href="#" onclick="add(\''
                + row.id
                + '\')"><i class="fa fa-key"></i></a> ';
            var b = '<a class="btn btn-info btn-sm ' + s_sendNotice_h + '" href="#" title="发送通知"  mce_href="#" onclick="sendNotice(\''
                + row.id
                + '\')"><i class="fa fa-camera-retro"></i></a> ';
            var c = '<a class="btn btn-danger btn-sm ' + s_remove_h + '" href="#" title="删除通知"  mce_href="#" onclick="remove(\''
                + row.id
                + '\')"><i class="fa fa-user-plus"></i></a> ';
            return a + b + c;
        }
    }];
var localPageName = "通知";
// ************个性化设置************

$(function () {
    load();
});

// 加载
function load() {
    $('#exampleTable').bootstrapTable({
        method: 'post', // 服务器数据的请求方式 get or post
        url: prefix + "/list", // 服务器数据的加载地址
        // showRefresh : true,
        // showToggle : true,
        // showColumns : true,
        iconSize: 'outline',
        toolbar: '#exampleToolbar',
        striped: true, // 设置为true会有隔行变色效果
        dataType: "json", // 服务器返回的数据类型
        pagination: true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect: false, // 设置为true将禁止多选
        // contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        pageSize: 10, // 如果设置了分页，每页数据条数
        pageNumber: 1, // 如果设置了分布，首页页码
        // search : true, // 是否显示搜索框
        showColumns: false, // 是否显示内容下拉框（选择显示的列）
        sidePagination: "server", // 设置在哪里进行分页，可选值为"client" 或者
        queryParams: function (params) {
            localParams["limit"] = params.limit;
            localParams["offset"] = params.offset;
            localParams["title"] = $("#title").val();
            return localParams;
        },
        // //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
        // queryParamsType = 'limit' ,返回参数必须包含
        // limit, offset, search, sort, order 否则, 需要包含:
        // pageSize, pageNumber, searchText, sortName,
        // sortOrder.
        // 返回false将会终止请求
        columns: localColumns,
        onLoadSuccess: function (data) {
            if (data.code && data.code !== '0000') {
                layer.alert(data.msg, {
                    title: '提示',
                    icon: 2
                });
            }
        }
    });
}

// 刷新列表
function reLoad() {
    $('#exampleTable').bootstrapTable('refresh');
}

// 添加
function add() {
    // iframe层
    layer.open({
        type: 2,
        title: '增加' + localPageName,
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['60%', '70%'],
        content: prefix + '/add'
    });
}

// 删除
function remove(id) {
    layer.confirm('确定要删除选中的记录？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: prefix + "/remove",
            type: "post",
            data: {
                'id': id
            },
            success: function (data) {
                if (data.code === '0000') {
                    layer.msg("删除成功");
                    reLoad();
                } else {
                    layer.alert(data.msg, {
                        title: '提示',
                        icon: 2
                    });
                }
            }
        });
    })
}

// 重置密码
function resetPwd(id) {
    layer.open({
        type: 2,
        title: '重置密码',
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['400px', '260px'],
        content: prefix + '/resetPwd/' + id // iframe的url
    });
}

// 刷新登录授权
function resetAuth(id) {
    layer.confirm('确定要刷新选中记录的授权信息？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: prefix + "/resetAuth",
            type: "post",
            data: {
                'id': id
            },
            success: function (data) {
                if (data.code === '0000') {
                    layer.msg("授权成功");
                    reLoad();
                } else {
                    layer.alert(data.msg, {
                        title: '提示',
                        icon: 2
                    });
                }
            }
        });
    })
}

// 订阅地址
function subscribe(id) {
    layer.open({
        type: 2,
        title: '注册订阅地址',
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['400px', '260px'],
        content: prefix + '/subscribe/' + id // iframe的url
    });
}