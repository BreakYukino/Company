<script setup>
import { computed, nextTick, onUnmounted, ref } from 'vue'
import { ArrowRight, ChevronRight, Eye, EyeOff, HelpCircle, Leaf, LockKeyhole, Mail, Monitor, ShieldCheck, Smartphone, Sprout, Star, UserRound, X } from 'lucide-vue-next'
import { brand } from './brand'

const mode = ref('password')
const account = ref('')
const password = ref('')
const confirmPassword = ref('')
const code = ref('')
const visible = ref(false)
const busy = ref(false)
const helpOpen = ref(false)
const sent = ref(false)
const notice = ref('')
const errors = ref({})
const rememberAccount = ref(false)
if (brand.id === 'signage') {
  try {
    account.value = localStorage.getItem('signage-account') || ''
    rememberAccount.value = !!account.value
  } catch { /* Storage may be unavailable; sign-in remains usable. */ }
}
let timer
const registering = computed(() => mode.value === 'register')
const passwordMode = computed(() => mode.value !== 'code')
function switchMode(value) {
  if (busy.value) return
  mode.value = value
  errors.value = {}
  notice.value = ''
  sent.value = false
  code.value = ''
  password.value = ''
  confirmPassword.value = ''
  visible.value = false
}
async function switchScreen(value) {
  switchMode(value)
  await nextTick()
  document.getElementById('login-title')?.focus({ preventScroll: true })
}
function getCode() {
  errors.value = {}
  if (!/^1[3-9]\d{9}$/.test(account.value.trim())) {
    errors.value.account = '请输入正确的 11 位手机号'
    return
  }
  sent.value = true
  notice.value = '预览模式：未发送短信，请输入演示验证码 123456。'
}
function submit() {
  if (busy.value) return
  errors.value = {}
  notice.value = ''
  if (!account.value.trim()) errors.value.account = passwordMode.value ? '请输入账号或手机号' : '请输入手机号'
  else if (!passwordMode.value && !/^1[3-9]\d{9}$/.test(account.value.trim())) errors.value.account = '请输入正确的 11 位手机号'
  if (passwordMode.value && !password.value) errors.value.secret = '请输入密码'
  if (registering.value) {
    if (!account.value.trim()) errors.value.account = '请输入要注册的账号或手机号'
    if (password.value && password.value.length < 8) errors.value.secret = '请设置至少 8 位密码'
    if (!confirmPassword.value) errors.value.confirm = '请再次输入密码'
    else if (confirmPassword.value !== password.value) errors.value.confirm = '两次输入的密码不一致'
  }
  if (!passwordMode.value && !sent.value) errors.value.secret = '请先获取演示验证码'
  else if (!passwordMode.value && code.value !== '123456') errors.value.secret = '演示验证码为 123456，请重新输入'
  if (Object.keys(errors.value).length) return
  if (brand.id === 'signage' && !registering.value) {
    try {
      if (rememberAccount.value) localStorage.setItem('signage-account', account.value.trim())
      else localStorage.removeItem('signage-account')
    } catch { /* Remembering the account is optional. */ }
  }
  busy.value = true
  timer = setTimeout(() => {
    busy.value = false
    notice.value = registering.value
      ? '注册表单校验通过。当前为界面预览，未创建真实账号，也未保存密码。'
      : '登录交互演示完成。当前为界面预览，尚未连接业务系统。'
  }, 850)
}
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="login-page" :class="`theme-${brand.id}`" :style="{ '--brand': brand.color }">
    <div class="landscape" :style="{ backgroundImage: `url(${brand.image})` }" aria-hidden="true"></div>
    <div class="atmosphere" aria-hidden="true"></div>

    <header class="site-header">
      <a class="brand" :href="brand.home" :aria-label="`${brand.name}首页`">
        <span class="brand-mark"><Star v-if="brand.id === 'signage'" :size="25" :stroke-width="1.7" /><Sprout v-else :size="25" :stroke-width="1.7" /></span>
        <span class="brand-text"><strong>{{ brand.name }}</strong><span>{{ brand.subtitle }}</span></span>
      </a>
      <div class="help-wrap">
        <button class="help-button" type="button" :aria-expanded="helpOpen" aria-controls="help-content" @click="helpOpen = !helpOpen"><HelpCircle :size="17" />需要帮助</button>
        <section v-if="helpOpen" id="help-content" class="help-content" aria-label="登录帮助">
          <div class="help-title"><strong>登录帮助</strong><button class="icon-button" aria-label="关闭帮助" @click="helpOpen = false"><X :size="17" /></button></div>
          <p>已有账号可直接登录；还没有账号，请点击“注册账号”。忘记密码时，请联系所属组织的管理员。</p>
          <p class="help-note">当前版本仅用于界面体验，不会提交或保存密码。</p>
        </section>
      </div>
    </header>

    <main class="main-content">
      <section class="story" aria-label="平台介绍">
        <h1>{{ brand.title[0] }}<br /><span>{{ brand.title[1] }}</span></h1>
        <p>{{ brand.description }}</p>
        <div v-if="brand.principle" class="decision-note"><ShieldCheck :size="16" /><span>{{ brand.principle }}</span></div>
        <p v-if="brand.trace" class="trace-note">{{ brand.trace }}</p>
      </section>

      <section class="login-area" aria-labelledby="login-title">
        <div class="welcome"><h2 id="login-title" tabindex="-1">{{ registering ? '注册账号' : '欢迎回来' }}</h2><p>{{ registering ? '创建您的账号，开启智慧管理。' : brand.welcome }}</p></div>
        <div v-if="!registering" class="login-tabs" aria-label="选择登录方式">
          <button type="button" :class="{ active: passwordMode }" :aria-pressed="passwordMode" :disabled="busy" @click="switchMode('password')">密码登录</button>
          <button type="button" :class="{ active: !passwordMode }" :aria-pressed="!passwordMode" :disabled="busy" @click="switchMode('code')">验证码登录</button>
        </div>
        <form novalidate :class="{ 'register-form': registering }" @submit.prevent="submit">
          <div class="field">
            <label for="account">{{ passwordMode ? '账号 / 手机号' : '手机号' }}</label>
            <div class="input-wrap" :class="{ invalid: errors.account }">
              <UserRound v-if="passwordMode" :size="18" /><Smartphone v-else :size="18" />
              <input id="account" v-model="account" :type="passwordMode ? 'text' : 'tel'" :inputmode="passwordMode ? 'text' : 'tel'" autocomplete="username" :placeholder="passwordMode ? '请输入账号或手机号' : '请输入手机号'" :disabled="busy" :aria-invalid="!!errors.account" :aria-describedby="errors.account ? 'account-error' : undefined" @input="errors.account = ''" />
            </div>
            <p v-if="errors.account" id="account-error" class="error" role="alert">{{ errors.account }}</p>
          </div>
          <div class="field">
            <label for="secret">{{ passwordMode ? '密码' : '验证码' }}</label>
            <div class="input-wrap" :class="{ invalid: errors.secret }">
              <LockKeyhole v-if="passwordMode" :size="18" /><Mail v-else :size="18" />
              <input v-if="passwordMode" id="secret" v-model="password" :type="visible ? 'text' : 'password'" :autocomplete="registering ? 'new-password' : 'current-password'" :placeholder="registering ? '设置密码（至少 8 位）' : '请输入密码'" :disabled="busy" :aria-invalid="!!errors.secret" :aria-describedby="errors.secret ? 'secret-error' : undefined" @input="errors.secret = ''" />
              <input v-else id="secret" v-model="code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="请输入验证码" :disabled="busy" :aria-invalid="!!errors.secret" :aria-describedby="errors.secret ? 'secret-error' : undefined" @input="errors.secret = ''" />
              <button v-if="passwordMode" type="button" class="icon-button eye" :aria-label="visible ? '隐藏密码' : '显示密码'" :aria-pressed="visible" @click="visible = !visible"><EyeOff v-if="visible" :size="18" /><Eye v-else :size="18" /></button>
              <button v-else type="button" class="send-code" :disabled="busy || sent" @click="getCode">{{ sent ? '已获取' : '获取验证码' }}</button>
            </div>
            <p v-if="errors.secret" id="secret-error" class="error" role="alert">{{ errors.secret }}</p>
          </div>
          <div v-if="registering" class="field">
            <label for="confirm-password">确认密码</label>
            <div class="input-wrap" :class="{ invalid: errors.confirm }">
              <LockKeyhole :size="18" />
              <input id="confirm-password" v-model="confirmPassword" :type="visible ? 'text' : 'password'" autocomplete="new-password" placeholder="请再次输入密码" :disabled="busy" :aria-invalid="!!errors.confirm" :aria-describedby="errors.confirm ? 'confirm-error' : undefined" @input="errors.confirm = ''" />
            </div>
            <p v-if="errors.confirm" id="confirm-error" class="error" role="alert">{{ errors.confirm }}</p>
          </div>
          <div v-else class="form-options"><label v-if="brand.id === 'signage'" class="remember-account"><input v-model="rememberAccount" type="checkbox" />记住账号</label><span v-else class="organization-note">使用您的账号登录</span><button type="button" class="text-button" @click="notice = '请联系所属组织的管理员重置密码。预览版不提供真实密码重置。'">忘记密码？</button></div>
          <button class="submit-button" type="submit" :disabled="busy" :aria-busy="busy"><span class="spinner" v-if="busy" aria-hidden="true"></span><span>{{ busy ? '正在验证' : registering ? '创建账号' : '登录工作台' }}</span><ArrowRight v-if="!busy" :size="18" /></button>
          <p v-if="notice" class="notice" role="status">{{ notice }}</p>
        </form>
        <div class="access-note"><ShieldCheck :size="16" /><span>{{ registering ? '仅供预览，不会创建真实账号' : '请妥善保管您的账号与密码' }}</span></div>
        <div class="account-switch"><span>{{ registering ? '已有账号？' : '还没有账号？' }}</span><button type="button" :disabled="busy" @click="switchScreen(registering ? 'password' : 'register')">{{ registering ? '返回登录' : '注册账号' }}<ChevronRight :size="14" /></button></div>
        <p v-if="brand.disclaimer" class="ai-disclaimer">{{ brand.disclaimer }}</p>
      </section>
    </main>

    <footer class="site-footer"><span class="footer-brand"><Monitor v-if="brand.id === 'signage'" :size="15" /><Leaf v-else :size="15" />{{ brand.footer }}</span><span class="preview-label">界面预览 · 未连接业务系统</span><span class="footer-end">{{ brand.name }}</span></footer>
  </div>
</template>
