"use client"

import { useState } from "react"
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Package, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const product = {
  id: 1,
  name: "新品JL系列锁芯",
  price: 5.9,
  originalPrice: 10.9,
  rating: 4.8,
  reviews: 134,
  description: "采用优质锌合金材质搭配铁盖板与不锈钢拨动件。结构强度更高，耐用性与稳定性显著提升。",
  features: [
    "优质锌合金",
    "高强度铁板",
    "不锈钢拨动件",
    "磁吸",
    "静音",
    "锁体强度高",
    "防锈蚀"
  ],
  models: [
    { name: "磁吸款", value: "magnetic" },
    { name: "静音款", value: "silent" }
  ],
  modelDetails: ["NH-JL48", "NH-JL50", "NH-JL60", "NH-JL70"],
  images: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260509155344_1005_3-alt4k3R5JDPmjmJaD9rkSHOkSy0pqt.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260509164648-8oTSGqDVwMS0o8PoNDzHXLzGqsCtNC.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%94%8C%E5%90%88%E9%87%91%E7%A3%81%E5%90%B8-m3YFi212tsfy7RdnNGsnJRDsBB7oOG.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260509155839_1007_3-UrxRJg9hcTHqTh9oIG70fs6CTT7fA4.png"
  ]
}



export default function ProductPage() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-[#1a1a2e]">南恒锁芯</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm text-gray-600 hover:text-[#1a1a2e] transition-colors">首页</a>
                <a href="#" className="text-sm text-gray-600 hover:text-[#1a1a2e] transition-colors">产品</a>
                <a href="#" className="text-sm text-gray-600 hover:text-[#1a1a2e] transition-colors">分类</a>
                <a href="#" className="text-sm text-gray-600 hover:text-[#1a1a2e] transition-colors">关于我们</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-[#1a1a2e] transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center gap-2">
            <li className="text-[#1a1a2e]">新品锁芯</li>
          </ol>
        </nav>

        {/* 产品详情 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* 图片展示区 */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-inner">
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* 图片切换按钮 */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* 折扣标签 */}
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1">
                  -{discount}%
                </Badge>
              </div>

              {/* 缩略图 */}
              <div className="flex gap-3 mt-6 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === idx 
                        ? "border-[#1a1a2e] shadow-lg scale-105" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 产品信息区 */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="flex-1">
                {/* 评分 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews.toLocaleString()} 评价)
                  </span>
                </div>

                {/* 标题 */}
                <h1 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-4">
                  {product.name}
                </h1>

                {/* 价格 */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-lg text-gray-400 line-through">
                    原价 ¥{product.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-red-500">
                    限时 ¥{product.price}
                  </span>
                </div>

                {/* 描述 */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* 型号选择 */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    型号选择: <span className="text-gray-600">{product.models[selectedModel].name}</span>
                  </h3>
                  <div className="flex gap-3">
                    {product.models.map((model, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedModel(idx)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center justify-center ${
                          selectedModel === idx
                            ? "border-[#1a1a2e] bg-[#1a1a2e] text-white"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 款式详情 */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">款式详情</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.modelDetails.map((detail, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 特性标签 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs py-1">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 h-14 text-base font-medium bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                  disabled
                >
                  暂无订购
                </Button>
                <div className="h-14 px-4 border-2 border-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-600">
                  上市时间 6.1日
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 服务保障 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: Truck, title: "锁单优惠", desc: "提前预订" },
            { icon: Shield, title: "正品保障", desc: "官方授权" },
            { icon: RotateCcw, title: "7天退换", desc: "无忧售后" },
            { icon: Package, title: "闪电发货", desc: "24小时内" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#f0f2f5] rounded-full flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#1a1a2e]" />
              </div>
              <div>
                <h4 className="font-medium text-[#1a1a2e]">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        </main>

      {/* 页脚 */}
      <footer className="bg-[#1a1a2e] text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">关于我们</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">公司介绍</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">加入我们</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">帮助中心</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
                <li><a href="#" className="hover:text-white transition-colors">退换政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">配送说明</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">服务</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">售后服务</a></li>
                <li><a href="#" className="hover:text-white transition-colors">保修政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">维修预约</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">关注我们</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">微信公众号</a></li>
                <li><a href="#" className="hover:text-white transition-colors">微博</a></li>
                <li><a href="#" className="hover:text-white transition-colors">抖音</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 南恒锁芯. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  )
}
