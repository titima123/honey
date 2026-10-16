
export type ProductSize = {
  label: string
  price: number
}

export type Product = {
  id: string
  category: 'miel' | 'amlou' | 'huile'
  name: {
    fr: string
    ar: string
  }
  description: {
    fr: string
    ar: string
  }
  image: string
  gallery: string[]
  sizes: ProductSize[]
  stock: string
  inStock: boolean
  badge?: string
}

export const products: Product[] = [
  {
    id: 'miel-naturel',
    category: 'miel',
    name: { fr: 'Miel naturel', ar: 'عسل طبيعي' },
    description: {
      fr: 'Un miel savoureux pour découvrir les saveurs authentiques de la nature.',
      ar: 'عسل بنكهة طبيعية مميزة للاستمتاع بمذاق خيرات الطبيعة.',
    },
    image: '/honey-jar.jpg',
    gallery: [
      '/honey-jar.jpg',
      '/images/miel-emballage.jpg',
      '/images/miel-fruits-secs.jpg',
    ],
    sizes: [
      { label: '250 g', price: 120 },
      { label: '500 g', price: 210 },
      { label: '1 kg', price: 390 },
    ],
    stock: 'En stock',
    inStock: true,
    badge: 'Best seller',
  },
  {
    id: 'miel-fruits-secs',
    category: 'miel',
    name: {
      fr: 'Miel aux fruits secs',
      ar: 'العسل بالمكسرات',
    },
    description: {
      fr: 'Miel marocain naturel accompagné d’un délicieux mélange de fruits secs.',
      ar: 'عسل طبيعي مع تشكيلة لذيذة من المكسرات.',
    },
    image: '/images/miel-fruits-secs.jpg',
    gallery: ['/images/miel-fruits-secs.jpg'],
    sizes: [{ label: '250 g', price: 100 }],
    stock: 'En stock',
    inStock: true,
  },
  {
    id: 'amlou-traditionnel',
    category: 'amlou',
    name: { fr: 'Amlou traditionnel', ar: 'أملو تقليدي' },
    description: {
      fr: 'Une spécialité marocaine gourmande à base d’amandes, de miel et d’huile d’argan alimentaire, selon les ingrédients réellement utilisés.',
      ar: 'أملو بنكهة مغربية لذيذة، تُحدّد مكوناته حسب الوصفة الحقيقية للمنتج.',
    },
    image: '/hero-moroccan.jpg',
    gallery: [
      '/hero-moroccan.jpg',
      '/images/bocaux-gourmands.jpg',
      '/images/miel-emballage.jpg',
    ],
    sizes: [
      { label: '200 g', price: 160 },
      { label: '350 g', price: 260 },
      { label: '500 g', price: 340 },
    ],
    stock: 'En stock',
    inStock: true,
  },
  {
    id: 'huile-olive',
    category: 'huile',
    name: { fr: 'Huile d’olive', ar: 'زيت الزيتون' },
    description: {
      fr: 'Une huile d’olive au goût authentique, idéale pour accompagner vos plats et vos salades.',
      ar: 'زيت زيتون بمذاق أصيل، مناسب لمرافقة أطباقكم وسلطاتكم.',
    },
    image: '/images/huile-olive.jpg',
    gallery: [
      '/images/huile-olive.jpg',
      '/hero-moroccan.jpg',
      '/images/bocaux-gourmands.jpg',
    ],
    sizes: [
      { label: '250 ml', price: 95 },
      { label: '500 ml', price: 170 },
      { label: '1 L', price: 300 },
    ],
    stock: 'En stock',
    inStock: true,
  },
]
