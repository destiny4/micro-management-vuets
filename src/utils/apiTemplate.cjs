
/*
 * 接口统一集成模块
 */
<% maps.forEach(function(item,key){ %>
import * as <%= key %> from '<%= item.split('.')[0] %>'
<% }); %>
// 默认全部导出
export default {
  <%= keys.join(", ") %>
}
