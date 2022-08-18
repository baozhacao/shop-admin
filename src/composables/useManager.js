import { logOut, updatePassword } from "~/api/manager";
import { showModel, toast } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, reactive } from "vue";

//修改密码表单
export function useRePassword() {
  const router = useRouter();
  const store = useStore();
  // 修改密码
  const fromDrawerRef = ref(null);
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });
  const rules = {
    oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
    password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
    repassword: [{ required: true, message: "确认密码不能为空", trigger: "blur" }],
  };
  // 使用ref变成响应式
  const refFrom = ref(null);
  const onSubmit = () => {
    refFrom.value.validate(async (valid) => {
      if (!valid) {
        return false;
      }
      updatePassword(form).then((res) => {
        toast("修改密码成功，请重新登录");
        //移除vuex信息
        store.dispatch("logOut");
        // 返回登录页面
        router.push("/login");
      });
    });
  };
  return {
    fromDrawerRef,
    form,
    rules,
    refFrom,
    onSubmit
  };
}
// 退出登录
export function useHandleLogOut() {
  const router = useRouter();
  const store = useStore();
  const handleLogOut = () => {
    showModel("是否退出登录？").then((res) => {
      logOut().finally(() => {
        // 移除cookie
        //移除vuex信息
        store.dispatch("logOut");
        // 返回登录页面
        router.push("/login");
        // 提示退出登录成功
        toast("退出登录成功");
      });
    });
  };
  return {
    handleLogOut
  }
}