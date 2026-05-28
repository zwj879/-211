/**
 * ============================================
 *  组件动态加载器
 *  功能：将外部HTML组件加载到页面指定位置
 *  使用：在页面中放置占位div，脚本自动替换
 * ============================================
 */

// 等待整个页面DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function () {

    // 加载导航栏：将components/nav.html的内容放入id为navbar-placeholder的元素中
    loadComponent('navbar-placeholder', '/components/nav.html');

    // 加载页脚：将components/footer.html的内容放入id为footer-placeholder的元素中
    loadComponent('footer-placeholder', '/components/footer.html');

});

/**
 * 加载指定组件到页面占位元素
 * 
 * @param {string} placeholderId - 页面中占位元素的id
 * @param {string} componentUrl  - 组件HTML文件的路径
 */
function loadComponent(placeholderId, componentUrl) {

    // 第一步：获取页面中的占位元素
    var placeholder = document.getElementById(placeholderId);

    // 第二步：如果占位元素不存在，输出警告并终止
    if (!placeholder) {
        console.warn('⚠️ 占位元素 #' + placeholderId + ' 未找到，跳过加载');
        return;
    }

    // 第三步：使用fetch发送HTTP请求，获取组件文件内容
    fetch(componentUrl)
        .then(function (response) {
            // 检查响应状态，如果404或500则抛出错误
            if (!response.ok) {
                throw new Error('加载失败: ' + componentUrl + ' (状态码: ' + response.status + ')');
            }
            // 将响应内容转为文本（HTML代码）
            return response.text();
        })
        .then(function (html) {
            // 第四步：将获取到的HTML代码插入占位元素
            placeholder.innerHTML = html;
            console.log('✅ 组件加载成功: ' + componentUrl);
        })
        .catch(function (error) {
            // 第五步：如果出错，显示错误信息
            console.error('❌ 组件加载出错: ' + error.message);
            placeholder.innerHTML = '<div class="alert alert-warning m-3 text-center">组件加载失败，请检查网络连接或文件路径</div>';
        });

}