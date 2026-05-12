"use client"

import { useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Loader2 } from "lucide-react"

type FormMode = "login" | "register"

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function AuthForm() {
  const [mode, setMode] = useState<FormMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        if (value.length < 3) return "用户名至少需要3个字符"
        if (value.length > 20) return "用户名不能超过20个字符"
        return ""
      case "email":
        if (!validateEmail(value)) return "请输入有效的邮箱地址"
        return ""
      case "password":
        if (value.length < 6) return "密码至少需要6个字符"
        if (!/[A-Z]/.test(value)) return "密码需要包含至少一个大写字母"
        if (!/[0-9]/.test(value)) return "密码需要包含至少一个数字"
        return ""
      case "confirmPassword":
        if (value !== formData.password) return "两次输入的密码不一致"
        return ""
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 10) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 验证所有字段
    const newErrors: FormErrors = {}
    const fieldsToValidate = mode === "register" 
      ? ["username", "email", "password", "confirmPassword"]
      : ["email", "password"]
    
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field as keyof FormData])
      if (error) newErrors[field as keyof FormErrors] = error
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
      return
    }

    startTransition(async () => {
      // 模拟API请求
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      
      // 重置成功状态
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ username: "", email: "", password: "", confirmPassword: "" })
        setTouched({})
      }, 2000)
    })
  }

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"))
    setErrors({})
    setTouched({})
    setFormData({ username: "", email: "", password: "", confirmPassword: "" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-5">
      <div className="w-full max-w-[450px] bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {mode === "login" ? "欢迎回来" : "创建账户"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "login" 
              ? "请输入您的凭据以登录" 
              : "填写以下信息以注册新账户"}
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 用户名 - 仅注册时显示 */}
          <div className={cn(
            "grid transition-all duration-300",
            mode === "register" 
              ? "grid-rows-[1fr] opacity-100" 
              : "grid-rows-[0fr] opacity-0"
          )}>
            <div className="overflow-hidden">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-foreground">
                  用户名
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-lg border bg-background transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      errors.username && touched.username
                        ? "border-destructive"
                        : "border-input hover:border-muted-foreground/50"
                    )}
                    placeholder="请输入用户名"
                    disabled={mode === "login"}
                    tabIndex={mode === "login" ? -1 : 0}
                  />
                </div>
                {errors.username && touched.username && (
                  <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                    {errors.username}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 邮箱 */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border bg-background transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  errors.email && touched.email
                    ? "border-destructive"
                    : "border-input hover:border-muted-foreground/50"
                )}
                placeholder="请输入邮箱地址"
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* 密码 */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={cn(
                  "w-full pl-10 pr-12 py-3 rounded-lg border bg-background transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  errors.password && touched.password
                    ? "border-destructive"
                    : "border-input hover:border-muted-foreground/50"
                )}
                placeholder="请输入密码"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                {errors.password}
              </p>
            )}
            
            {/* 密码强度指示器 - 仅注册时显示 */}
            {mode === "register" && formData.password && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all duration-300",
                        passwordStrength >= level
                          ? level <= 2
                            ? "bg-destructive"
                            : level <= 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  密码强度: {passwordStrength <= 2 ? "弱" : passwordStrength <= 3 ? "中等" : "强"}
                </p>
              </div>
            )}
          </div>

          {/* 确认密码 - 仅注册时显示 */}
          <div className={cn(
            "grid transition-all duration-300",
            mode === "register" 
              ? "grid-rows-[1fr] opacity-100" 
              : "grid-rows-[0fr] opacity-0"
          )}>
            <div className="overflow-hidden">
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                  确认密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full pl-10 pr-12 py-3 rounded-lg border bg-background transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-destructive"
                        : "border-input hover:border-muted-foreground/50"
                    )}
                    placeholder="请再次输入密码"
                    disabled={mode === "login"}
                    tabIndex={mode === "login" ? -1 : 0}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={mode === "login" ? -1 : 0}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 记住我 & 忘记密码 - 仅登录时显示 */}
          {mode === "login" && (
            <div className="flex items-center justify-between animate-in fade-in">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-input accent-primary cursor-pointer"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  记住我
                </span>
              </label>
              <button 
                type="button"
                className="text-sm text-primary hover:underline transition-all"
              >
                忘记密码？
              </button>
            </div>
          )}

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={isPending || isSuccess}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium text-primary-foreground transition-all duration-300",
              "flex items-center justify-center gap-2",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
              isSuccess
                ? "bg-green-500 hover:bg-green-500"
                : "bg-primary hover:bg-primary/90 active:scale-[0.98]",
              (isPending || isSuccess) && "cursor-not-allowed"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>处理中...</span>
              </>
            ) : isSuccess ? (
              <>
                <Check className="h-5 w-5" />
                <span>成功！</span>
              </>
            ) : (
              <>
                <span>{mode === "login" ? "登录" : "注册"}</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* 分隔线 */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-muted-foreground">或者</span>
          </div>
        </div>

        {/* 社交登录 */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="flex items-center justify-center p-3 rounded-lg border border-input bg-background hover:bg-muted transition-colors group"
          >
            <svg className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92c1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
            </svg>
          </button>
          <button
            type="button"
            className="flex items-center justify-center p-3 rounded-lg border border-input bg-background hover:bg-muted transition-colors group"
          >
            <svg className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35 11.1h-9.18v2.73h5.34c-.24 1.42-1.48 4.17-5.34 4.17c-3.21 0-5.83-2.66-5.83-5.93s2.62-5.93 5.83-5.93c1.83 0 3.05.78 3.75 1.45l2.55-2.46C16.32 3.32 14.07 2 11.39 2C5.89 2 1.5 6.39 1.5 11.89s4.39 9.89 9.89 9.89c5.71 0 9.5-4.01 9.5-9.67c0-.65-.07-1.15-.16-1.64c-.03-.15-.05-.21-.05-.21h-.03Z"/>
            </svg>
          </button>
          <button
            type="button"
            className="flex items-center justify-center p-3 rounded-lg border border-input bg-background hover:bg-muted transition-colors group"
          >
            <svg className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47c-1.34.03-1.77-.79-3.29-.79c-1.53 0-2 .77-3.27.82c-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51c1.28-.02 2.5.87 3.29.87c.78 0 2.26-1.07 3.81-.91c.65.03 2.47.26 3.64 1.98c-.09.06-2.17 1.28-2.15 3.81c.03 3.02 2.65 4.03 2.68 4.04c-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5c.13 1.17-.34 2.35-1.04 3.19c-.69.85-1.83 1.51-2.95 1.42c-.15-1.15.41-2.35 1.05-3.11Z"/>
            </svg>
          </button>
        </div>

        {/* 切换模式 */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          {mode === "login" ? "还没有账户？" : "已有账户？"}
          <button
            type="button"
            onClick={switchMode}
            className="text-primary font-medium hover:underline ml-1 transition-all"
          >
            {mode === "login" ? "立即注册" : "立即登录"}
          </button>
        </p>
      </div>
    </div>
  )
}
