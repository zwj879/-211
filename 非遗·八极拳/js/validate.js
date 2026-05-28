// 等待页面 DOM 结构完全加载完毕后，再执行内部的 JavaScript 代码，防止获取不到元素报错
document.addEventListener('DOMContentLoaded', function () {
    
    // ==================== 1. 卡片主要按钮点击事件 ====================
    let btn1 = document.querySelector('.card .btn-primary');
    // 增加空值判断，防止页面上没有该按钮时报错导致后续代码不执行
    if (btn1) {
        btn1.addEventListener('click', function () {
            console.log('主要按钮被点击了。');
        });
    }

    // ==================== 2. 川剧脸谱介绍按钮点击事件 ====================
    // 原代码使用了 querySelectorAll 返回的是数组（NodeList），但直接用 btn2.addEventListener 会报错
    // 这里改用 querySelector 获取单个元素（假设只有一个触发按钮）
    let btn2 = document.querySelector('.card .btn-outline-primary');
    let ceSheWenZi = document.querySelector('#msgBox');
    
    if (btn2 && ceSheWenZi) {
        btn2.addEventListener('click', function () {
            // 修改提示框的 HTML 内容
            ceSheWenZi.innerHTML = '您正在了解《川剧脸谱》，这是一幅融合巴蜀文化的蜀绣作品';
        });
    }

    // ==================== 3. 手机号输入框验证功能（核心优化部分） ====================
    let textPhone = document.querySelector('#rPhone'); // 获取手机号输入框元素
    let textTiShi = document.getElementById('phoneTiShi'); // 获取提示信息显示的元素

    // 只有当这两个元素都存在时，才绑定事件，增强代码的健壮性
    if (textPhone && textTiShi) {
        
        // 【焦点事件】当鼠标点击输入框准备输入时触发
        textPhone.addEventListener('focus', function () {
            // 如果当前输入框是空的，则添加 Bootstrap 的 is-invalid 类显示红色边框
            if (textPhone.value.trim() === '') {
                textPhone.classList.add('is-invalid');
                textTiShi.innerHTML = '请输入手机号';
            }
        });

        // 【失焦事件】当鼠标离开输入框时触发
        textPhone.addEventListener('blur', function () {
            // 失去焦点时，先移除错误样式（或者你也可以在这里保留校验结果）
            textPhone.classList.remove('is-invalid');
            textTiShi.innerHTML = '';
        });

        // 【输入事件】每当用户输入或删除一个字符时实时触发
        textPhone.addEventListener('input', function () {
            // 1. 获取输入框的值，并使用 trim() 去除首尾的空格
            let inputValue = textPhone.value.trim(); 
            
            // 2. 定义手机号正则表达式：
            // ^1 表示以1开头；[3-9] 表示第二位是3到9之间的数字；\d{9} 表示后面跟着9个0-9的数字；$ 表示结束
            // 这样能精确匹配标准的11位中国大陆手机号
            let phoneRegex = /^1[3-9]\d{9}$/; 

            // 3. 开始进行条件判断
            if (inputValue === '') {
                // 情况一：如果输入框为空，清除错误样式和提示文字
                textPhone.classList.remove('is-invalid');
                textTiShi.innerHTML = '';
            } else if (phoneRegex.test(inputValue)) { 
                // 情况二：如果输入的格式符合正则表达式规则（验证通过）
                textPhone.classList.remove('is-invalid'); // 移除错误样式
                textPhone.classList.add('is-valid');      // (可选) 添加 Bootstrap 的成功绿色样式
                textTiShi.innerHTML = '';                 // 清空错误提示
            } else {
                // 情况三：输入了内容，但格式不符合手机号规则
                textPhone.classList.add('is-invalid');    // 添加 Bootstrap 的错误红色样式
                textTiShi.innerHTML = '请输入正确的11位手机号码'; // 给出明确的错误提示
            }
        });
    }
});