import request from "@/utils/request";

// 登录
export const login = (data: {
  business_id: any;
  tenant_id: any;
  operator_id: any;
  type: number;
  passwd_md5double: string;
}) => {
  return request({
    url: "/user/api/OperatorLogin",
    method: "post",
    data,
  });
};

// 登出
export const logout = (data: {
  business_id: any;
  tenant_id: any;
  operator_id: any;
  operator_token: any;
}) => {
  return request({
    url: "/user/api/OperatorLogout",
    method: "post",
    data,
  });
};
export const getBusinessId = (v: any) =>
  request.post("/user/api/BusinessGetByTerm", v);
export const getTenantId = (v: any) =>
  request.post("/user/api/TenantGetByTerm", v);
