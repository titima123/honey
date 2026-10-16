 import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  Clock3,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react'
import { WHATSAPP_NUMBER, DELIVERY_FEE } from './config/whatsapp'

type Lang = 'fr' | 'ar'

type Product = {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  price: number
  sizeOptions: string[]
  image: string
  imageAlt: {
    fr: string
    ar: string
  }
  category: 'honey' | 'amlou' | 'oil' | 'pack'
  fixedPrice?: boolean
}

const navItems = [
  { href: '#top', label: { fr: 'Accueil', ar: 'الرئيسية' } },
  { href: '#products', label: { fr: 'Produits', ar: 'منتجاتنا' } },
  { href: '#packs', label: { fr: 'Packs & Offres', ar: 'العروض' } },
  { href: '#story', label: { fr: 'Notre histoire', ar: 'قصتنا' } },
  { href: 'https://wa.me/21625279817', label: { fr: 'Contact', ar: 'تواصل' } },
]

const productCards: Product[] = [
  {
    id: 'miel-thym',
    title: 'Miel de thym',
    titleAr: 'عسل الزعتر',
    description: 'Un miel parfumé aux notes herbacées.',
    descriptionAr: 'عسل معطر بنوتات عشبية عطرة.',
    price: 100,
    sizeOptions: ['250 g'],
    image: '/honey-jar.jpg',
    imageAlt: {
      fr: 'Miel doré dans un bocal en verre, servi avec une cuillère en bois.',
      ar: 'عسل ذهبي في مرطبان زجاجي مع ملعقة خشبية.',
    },
    category: 'honey',
  },
   
  {
    id: 'amlou-trad',
    title: 'Amlou traditionnel',
    titleAr: 'أملو تقليدي',
    description: "Amandes, huile d'argan et miel.",
    descriptionAr: 'اللوز، زيت الأركان، والعسل.',
    price: 100,
    sizeOptions: ['250 g'],
    image: '/images/ka.jpg',
    imageAlt: {
      fr: 'Pot d’amlou traditionnel accompagné d’amandes et de miel.',
      ar: 'مرطبان أملو تقليدي مع اللوز والعسل.',
    },
    category: 'amlou',
  },
  {
    id: 'huile-olive',
    title: "Huile d'olive extra vierge",
    titleAr: 'زيت زيتون بكر',
    description: "Première pression à froid, goût fruité.",
    descriptionAr: 'ضغط بارد أول، بنكهة فاكهية.',
    price: 100,
    sizeOptions: ['1 L'],
    image: '/images/huile-olive.jpg',
    imageAlt: {
      fr: 'Bouteille en verre d’huile d’olive avec des olives et des branches.',
      ar: 'قنينة زجاجية من زيت الزيتون بجانب الزيتون وأغصانه.',
    },
    category: 'oil',
  },
  {
    id: 'miel-fruits-secs',
    title: 'Miel aux fruits secs',
    titleAr: 'العسل بالمكسرات',
    description: 'Miel naturel marocain accompagné d’un délicieux mélange de fruits secs.',
    descriptionAr: 'عسل طبيعي مع تشكيلة لذيذة من المكسرات.',
    price: 100,
    sizeOptions: ['250 g'],
    image: '/images/frui.jpg',
    imageAlt: {
      fr: 'Bocaux de miel et de fruits secs avec des amandes visibles.',
      ar: 'مرطبانات عسل ومكسرات مع ظهور حبات اللوز.',
    },
    category: 'honey',
    fixedPrice: true,
  },
]

const packCards: Product[] = [
  {
    id: 'pack-decouverte',
    title: 'Pack Découverte',
    titleAr: 'باقة الاستكشاف',
    description: 'Miel + Amlou + Huile d\'olive',
    descriptionAr: 'عسل + أملو + زيت زيتون',
    price: 270,
    sizeOptions: ['Pack standard'],
    image: '/hero-moroccan.jpg',
    imageAlt: {
      fr: 'Sélection marocaine de miel, amlou, huile d’olive et amandes.',
      ar: 'تشكيلة مغربية من العسل والأملو وزيت الزيتون واللوز.',
    },
    category: 'pack',
  },
   
]

const contactCards = [
  { icon: Truck, title: { fr: 'Zones de livraison', ar: 'مناطق التوصيل' }, text: { fr: 'Livraison partout au Maroc', ar: 'توصيل في جميع أنحاء المغرب' } },
  { icon: Clock3, title: { fr: 'Délais de livraison', ar: 'مواعيد التوصيل' }, text: { fr: '24h à 48h selon votre ville', ar: 'من 24 إلى 48 ساعة حسب مدينتك' } },
  { icon: ShieldCheck, title: { fr: 'Paiement', ar: 'الدفع' }, text: { fr: 'Paiement à la livraison (Cash on Delivery)', ar: 'الدفع عند الاستلام' } },
]

const translations = {
  fr: {
    languageToggle: 'FR / العربية',
    heroTitle: 'Rahiq — رحيق',
    heroSubtitle: "Miel, amlou et huile d'olive — le goût authentique du terroir Honey, amlou, and olive oil — the authentic taste of the land",
    primaryCta: 'Voir les produits',
    secondaryCta: 'Commander',
    productsTitle: 'Produits',
    fromPrice: 'À partir de',
    packsTitle: 'Packs & Offres',
    storyTitle: 'Notre histoire',
    storyText:
      "Une sélection d'exception issue du terroir marocain. Nos produits sont 100% naturels, préparés avec soin selon un savoir-faire traditionnel... Des saveurs pures, des textures généreuses et un équilibre juste entre traditions ancestrales et exigence moderne.",
    contactTitle: 'Livraison & contact',
    orderTitle: 'Commander',
    orderCancel: 'Annuler',
    orderConfirm: 'Confirmer la commande sur WhatsApp',
    orderSummary: 'Sous-total',
    orderShipping: 'Livraison',
    orderTotal: 'Total estimé',
    orderUnknownShipping: 'À confirmer',
    validationName: 'Veuillez renseigner votre nom complet.',
    validationPhone: 'Veuillez renseigner un numéro de téléphone marocain valide.',
    validationCity: 'Veuillez renseigner votre ville.',
    validationAddress: 'Veuillez renseigner votre adresse de livraison.',
    noticeWhatsapp: 'Les commandes WhatsApp seront bientôt disponibles.',
    formName: 'Nom complet',
    formPhone: 'Numéro de téléphone',
    formCity: 'Ville',
    formAddress: 'Adresse de livraison',
    formWeight: 'Format / Poids',
    formQuantity: 'Quantité',
    formNotes: 'Notes facultatives',
    formPlaceholderName: 'Votre nom',
    formPlaceholderPhone: '.....',
    formPlaceholderCity: '',
    formPlaceholderAddress: 'Rue, quartier, etc.',
    formPlaceholderNotes: 'Informations complémentaires',
    quantity: 'Quantité',
    footerDelivery: 'Livraison partout au Maroc',
    footerPayment: 'Paiement à la livraison',
    footerWhatsApp: 'WhatsApp',
    footerSoon: 'WhatsApp sous peu',
    menu: 'Menu',
  },
  ar: {
    languageToggle: 'العربية / FR',
    heroTitle: 'رحيق — Rahiq',
    heroSubtitle: 'العسل، الأملو، وزيت الزيتون — نكهات أصيلة من تراث المغرب.',
    primaryCta: 'استكشف المنتجات',
    secondaryCta: 'اطلب الآن',
    productsTitle: 'منتجاتنا',
    fromPrice: 'من',
    packsTitle: 'العروض والباقات',
    storyTitle: 'قصتنا',
    storyText:
      'اختيار استثنائي مستوحى من تراث المغرب. منتجاتنا طبيعية 100%، تم تحضيرها بعناية وفق مهارة تقليدية... نكهات نقية، قوامات غنية، وتوازن بين الأصالة العريقة ومتطلبات العصر.',
    contactTitle: 'التوصيل والتواصل',
    orderTitle: 'اطلب الآن',
    orderCancel: 'إلغاء',
    orderConfirm: 'تأكيد الطلب عبر واتساب',
    orderSummary: 'المجموع الفرعي',
    orderShipping: 'التوصيل',
    orderTotal: 'الإجمالي المقدر',
    orderUnknownShipping: 'تأكيد مع البائع',
    validationName: 'يرجى إدخال الاسم الكامل.',
    validationPhone: 'يرجى إدخال رقم هاتف مغربي صحيح.',
    validationCity: 'يرجى إدخال المدينة.',
    validationAddress: 'يرجى إدخال عنوان التسليم.',
    noticeWhatsapp: 'سيكون واتساب متاحًا قريبًا.',
    formName: 'الاسم الكامل',
    formPhone: 'رقم الهاتف',
    formCity: 'المدينة',
    formAddress: 'عنوان التوصيل',
    formWeight: 'الحجم / الوزن',
    formQuantity: 'الكمية',
    formNotes: 'ملاحظات إضافية',
    formPlaceholderName: 'اسمك',
    formPlaceholderPhone: '.....',
    formPlaceholderCity: '',
    formPlaceholderAddress: 'الشارع، الحي، إلخ',
    formPlaceholderNotes: 'معلومات إضافية',
    quantity: 'الكمية',
    footerDelivery: 'توصيل في جميع أنحاء المغرب',
    footerPayment: 'الدفع عند الاستلام',
    footerWhatsApp: 'واتساب',
    footerSoon: 'واتساب قريبًا',
    menu: 'القائمة',
  },
} as const

const formatPrice = (value: number, lang: Lang = 'fr') => {
  const formatter = new Intl.NumberFormat(lang === 'ar' ? 'en-US' : 'fr-MA', { maximumFractionDigits: 0 })
  return `${formatter.format(value)} DH`
}


function App() {
  const [language, setLanguage] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'fr'
    const saved = window.localStorage.getItem('rahiq-language')
    return saved === 'ar' ? 'ar' : 'fr'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedDetailsProduct, setSelectedDetailsProduct] = useState<Product | null>(null)
  const [selectedDetailsSize, setSelectedDetailsSize] = useState('')
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    quantity: 1,
    size: '',
    notes: '',
  })
  const [orderError, setOrderError] = useState('')
  const [orderNotice, setOrderNotice] = useState('')

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('rahiq-language', language)
  }, [language])

  const t = translations[language]
  const isRTL = language === 'ar'
  const productForOrder = useMemo(() => selectedProduct ?? productCards[0], [selectedProduct])
  const selectedSize = orderForm.size || productForOrder.sizeOptions[0]
  const subtotal = productForOrder.price * orderForm.quantity
  const deliveryFee = DELIVERY_FEE
  const estimatedTotal = subtotal + (deliveryFee ?? 0)

  const openOrderModal = (product: Product, preferredSize?: string) => {
    setSelectedProduct(product)
    setSelectedDetailsProduct(null)
    setOrderForm({
      fullName: '',
      phone: '',
      city: '',
      address: '',
      quantity: 1,
      size: preferredSize || product.sizeOptions[0],
      notes: '',
    })
    setOrderError('')
    setOrderNotice('')
  }

  const closeOrderModal = () => {
    setSelectedProduct(null)
    setOrderError('')
    setOrderNotice('')
  }

  const openProductDetails = (product: Product) => {
    setSelectedDetailsProduct(product)
    setSelectedDetailsSize(product.sizeOptions[0])
  }

  const closeProductDetails = () => {
    setSelectedDetailsProduct(null)
    setSelectedDetailsSize('')
  }

  const submitOrder = (event: React.FormEvent) => {
    event.preventDefault()

    const fullName = orderForm.fullName.trim()
    const phone = orderForm.phone.trim().replace(/\s+/g, '')
    const city = orderForm.city.trim()
    const address = orderForm.address.trim()
    const size = orderForm.size || selectedSize

    if (!fullName) {
      setOrderError(t.validationName)
      return
    }

    if (!/^((\+212|212|0)([5-7]\d{8}))$/.test(phone)) {
      setOrderError(t.validationPhone)
      return
    }

    if (!city) {
      setOrderError(t.validationCity)
      return
    }

    if (!address) {
      setOrderError(t.validationAddress)
      return
    }

    setOrderError('')

    if (!WHATSAPP_NUMBER) {
      setOrderNotice(t.noticeWhatsapp)
      return
    }

    const deliveryText = deliveryFee === null ? (language === 'ar' ? 'تأكيد مع البائع' : 'À confirmer avec le vendeur') : formatPrice(deliveryFee, language)
    const unitPriceText = formatPrice(productForOrder.price, language)
    const subtotalText = formatPrice(subtotal, language)
    const estimatedTotalText = formatPrice(estimatedTotal, language)
    const notesText = orderForm.notes.trim() || (language === 'ar' ? 'لا شيء' : 'Aucune')

    if (language === 'ar') {
      const message = [
        'السلام عليكم، أود طلب:',
        '',
        `المنتج: ${productForOrder.titleAr || productForOrder.title}`,
        `الحجم: ${size}`,
        `الكمية: ${orderForm.quantity}`,
        `السعر الفردي: ${unitPriceText}`,
        `المجموع الفرعي: ${subtotalText}`,
        `التوصيل: ${deliveryText}`,
        `الإجمالي المقدر: ${estimatedTotalText}`,
        '',
        `الاسم: ${fullName}`,
        `الهاتف: ${phone}`,
        `المدينة: ${city}`,
        `عنوان التوصيل: ${address}`,
        `ملاحظات: ${notesText}`,
        '',
        'الدفع: عند الاستلام.',
        '',
        'يرجى تأكيد التوفر والمبلغ النهائي.',
      ].join('\n')

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
      closeOrderModal()
      return
    }

    const message = [
      'Bonjour, je souhaite commander :',
      '',
      `Produit : ${productForOrder.title}`,
      `Format : ${size}`,
      `Quantité : ${orderForm.quantity}`,
      `Prix unitaire : ${unitPriceText}`,
      `Sous-total : ${subtotalText}`,
      `Livraison : ${deliveryText}`,
      `Total estimé : ${estimatedTotalText}`,
      '',
      `Nom : ${fullName}`,
      `Téléphone : ${phone}`,
      `Ville : ${city}`,
      `Adresse : ${address}`,
      `Notes : ${notesText}`,
      '',
      'Paiement : à la livraison.',
      '',
      'Merci de confirmer la disponibilité et le montant final.',
    ].join('\n')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    closeOrderModal()
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="rahiq-page relative isolate min-h-screen text-[#2C221E] antialiased">
      <div className="rahiq-particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} className={`rahiq-particle${index % 4 === 0 ? ' rahiq-particle-star' : ''}`} />
        ))}
      </div>
      <div className="relative z-10 min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[#EAE3D5] bg-[#FAF7F2]/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[900px] items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4 lg:px-0">
          <a href="#top" className="flex shrink-0 items-center gap-2">
            <img
              src="/images/rahiq-logo.png"
              alt="Logo Rahiq — رحيق"
              className="h-9 w-9 rounded-lg object-cover shadow-sm sm:h-11 sm:w-11"
            />
            <div className="whitespace-nowrap font-serif text-lg tracking-tight text-[#2C221E] sm:text-xl">
              Rahiq <span lang="ar" dir="rtl">رحيق</span>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-[11px] font-medium text-[#6E655F] md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#2C221E]">
                {item.label[language]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage((current) => (current === 'fr' ? 'ar' : 'fr'))}
              className="hidden rounded-full border border-[#C87D20] px-3 py-2 text-[10px] font-semibold text-[#C87D20] md:inline-flex"
            >
              {t.languageToggle}
            </button>
            <button
              type="button"
              onClick={() => setLanguage((current) => (current === 'fr' ? 'ar' : 'fr'))}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-[#C87D20] px-2 py-1.5 text-[9px] font-semibold text-[#C87D20] md:hidden"
              aria-label={language === 'fr' ? 'Switch to Arabic' : 'Retour en français'}
            >
              {language === 'fr' ? 'AR' : 'FR'}
            </button>
            <a
              href={WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : '#'}
              onClick={(event) => {
                if (!WHATSAPP_NUMBER) {
                  event.preventDefault()
                  setOrderNotice(t.noticeWhatsapp)
                }
              }}
              target={WHATSAPP_NUMBER ? '_blank' : undefined}
              rel={WHATSAPP_NUMBER ? 'noreferrer' : undefined}
              aria-label={t.secondaryCta}
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-[#C87D20] px-2.5 py-2 text-[11px] font-semibold text-[#C87D20] transition hover:bg-[#C87D20] hover:text-white sm:px-4"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden min-[400px]:inline">{t.secondaryCta}</span>
            </a>
            <button
              type="button"
              aria-label={t.menu}
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-[#C87D20] p-2 text-[#C87D20] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#EAE3D5] bg-[#FAF7F2] px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3 text-sm text-[#6E655F]">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center">
                  {item.label[language]}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLanguage((current) => (current === 'fr' ? 'ar' : 'fr'))}
                className="mt-2 min-h-11 rounded-full border border-[#C87D20] px-3 py-2 text-left text-xs font-semibold text-[#C87D20]"
              >
                {t.languageToggle}
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F7F0E4] to-[#EFE3CE]">
          <div className="mx-auto grid min-h-[520px] max-w-[1280px] grid-cols-1 items-center gap-9 px-4 py-12 md:min-h-[480px] md:py-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-8">
            <div className="mx-auto w-full max-w-[460px] text-left text-[#2C221E]" dir={isRTL ? 'rtl' : 'ltr'}>
              <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{t.heroTitle}</h1>
              <p className="mt-4 text-sm text-[#6E655F] md:text-base">{t.heroSubtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-full bg-[#C87D20] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B06B18]"
                >
                  {t.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
              <div className="h-56 overflow-hidden rounded-2xl border border-[#EAE3D5] bg-[#EFE8DA] shadow-md sm:h-64 lg:h-[320px]">
                <img
                  src="/images/hero-miel-fruits-secs.jpg"
                  alt={language === 'ar' ? 'مرطبان عسل مغربي بالمكسرات والفواكه المجففة.' : 'Pot de miel marocain aux fruits secs et fruits séchés.'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-56 overflow-hidden rounded-2xl border border-[#EAE3D5] bg-[#3A2A1D] shadow-lg sm:h-64 lg:h-[320px]">
                {videoUnavailable ? (
                  <img
                    src="/images/hero-miel-fruits-secs.jpg"
                    alt={language === 'ar' ? 'عسل مغربي بالمكسرات والفواكه المجففة.' : 'Miel marocain aux fruits secs et fruits séchés.'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/hero-miel-fruits-secs.jpg"
                    onError={() => setVideoUnavailable(true)}
                  >
                    <source src="/videos/rahiq-product.mp4" type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-[900px] px-4 py-16 lg:px-0">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 className="font-serif text-[2rem] leading-none text-[#2C221E]">{t.productsTitle}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {productCards.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-xl border border-[#EAE3D5] bg-white shadow-sm">
                <img
                  src={product.image}
                  alt={product.imageAlt[language]}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="space-y-3 p-4">
                  <h3 className="break-words font-serif text-[1.5rem] leading-tight text-[#2C221E] sm:text-[1.7rem] sm:leading-none">{language === 'ar' ? product.titleAr : product.title}</h3>
                  <p className="text-[11px] leading-5 text-[#6E655F]">{language === 'ar' ? product.descriptionAr : product.description}</p>
                  <div className="text-[11px] font-semibold text-[#C87D20]">
                    {product.fixedPrice ? formatPrice(product.price, language) : `${t.fromPrice} ${formatPrice(product.price, language)}`}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => openOrderModal(product)}
                      className="min-h-11 flex-1 rounded-full bg-[#C87D20] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#B06B18]"
                    >
                      {t.secondaryCta}
                    </button>
                    <button
                      type="button"
                      onClick={() => openProductDetails(product)}
                      className="min-h-11 rounded-full border border-[#E5DEC9] px-3 py-2 text-xs font-medium text-[#2C221E]"
                    >
                      {language === 'ar' ? 'التفاصيل' : 'Détails'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="packs" className="bg-[#EFE8DA] py-16">
          <div className="mx-auto max-w-[900px] px-4 lg:px-0">
            <div className="mb-7">
              <h2 className="font-serif text-[2rem] leading-none text-[#2C221E]">{t.packsTitle}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {packCards.map((pack) => (
                <article key={pack.id} className="overflow-hidden rounded-xl border border-[#EAE3D5] bg-white shadow-sm">
                  <img
                    src={pack.image}
                    alt={pack.imageAlt[language]}
                    className="h-52 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="space-y-3 p-4">
                    <h3 className="break-words font-serif text-[1.5rem] leading-tight text-[#2C221E] sm:text-[1.7rem] sm:leading-none">{language === 'ar' ? pack.titleAr : pack.title}</h3>
                    <p className="text-[11px] leading-5 text-[#6E655F]">{language === 'ar' ? pack.descriptionAr : pack.description}</p>
                    <div className="text-[11px] font-semibold text-[#C87D20]">{t.fromPrice} {formatPrice(pack.price, language)}</div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openOrderModal({ ...pack, title: language === 'ar' ? pack.titleAr : pack.title, description: language === 'ar' ? pack.descriptionAr : pack.description, sizeOptions: pack.sizeOptions })}
                        className="min-h-11 flex-1 rounded-full bg-[#C87D20] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#B06B18]"
                      >
                        {t.secondaryCta}
                      </button>
                      <button type="button" onClick={() => openProductDetails(pack)} className="min-h-11 rounded-full border border-[#E5DEC9] px-3 py-2 text-xs font-medium text-[#2C221E]">
                        {language === 'ar' ? 'التفاصيل' : 'Détails'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="mx-auto max-w-[900px] px-4 py-16 lg:px-0">
          <div className="grid items-center gap-8 md:grid-cols-[1.05fr_1.3fr]">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src="/images/bocaux-gourmands.jpg"
                alt={language === 'ar' ? 'مرطبانات مغربية من العسل والمكسرات مرتبة بعناية.' : 'Bocaux marocains de miel et de fruits secs soigneusement présentés.'}
                className="h-56 w-full object-cover sm:h-[330px]"
                loading="lazy"
              />
            </div>
            <div dir={isRTL ? 'rtl' : 'ltr'}>
              <h2 className="font-serif text-[2rem] leading-none text-[#2C221E]">{t.storyTitle}</h2>
              <p className="mt-5 text-sm leading-relaxed text-[#6E655F]">{t.storyText}</p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-[900px] px-4 pb-20 pt-4 lg:px-0">
          <h2 className="mb-7 font-serif text-[2rem] leading-none text-[#2C221E]">{t.contactTitle}</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map(({ icon: Icon, title, text }) => (
              <div key={typeof title === 'string' ? title : title.fr} className="rounded-xl border border-[#EAE3D5] bg-white p-4 shadow-sm">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#FAF7F2] text-[#C87D20]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-[#2C221E]">{typeof title === 'string' ? title : title[language]}</div>
                <p className="mt-2 text-xs leading-5 text-[#6E655F]">{typeof text === 'string' ? text : text[language]}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#3A4628] text-white/90">
        <div className="mx-auto grid max-w-[900px] gap-8 px-4 py-10 md:grid-cols-3 lg:px-0" dir={isRTL ? 'rtl' : 'ltr'}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/images/rahiq-logo.png"
                alt="Logo Rahiq — رحيق"
                className="h-9 w-9 rounded-lg object-cover"
              />
              <div className="font-serif text-xl text-white">
                Rahiq <span lang="ar" dir="rtl">رحيق</span>
              </div>
            </div>
            <p className="text-xs leading-6 text-white/80">Miel, amlou et huile d'olive — le goût authentique du terroir.</p>
            <div className="mt-4 flex items-center gap-3">
             
            </div>
          </div>

          <div>
            <ul className="space-y-2 text-xs text-white/80">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-white">{item.label[language]}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-xs text-white/80">
            <p>{t.footerDelivery}</p>
            <p>{t.footerPayment}</p>
            <div className="pt-2">
              {WHATSAPP_NUMBER ? (
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white hover:text-[#F7D78A]">
                  <MessageCircle className="h-4 w-4" /> {t.footerWhatsApp}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-white/70">
                  <MessageCircle className="h-4 w-4" /> {t.footerSoon}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>

      {selectedDetailsProduct && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:p-4">
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EAE3D5] px-5 py-4">
              <h3 className="break-words font-serif text-2xl text-[#2C221E] sm:text-3xl">{language === 'ar' ? selectedDetailsProduct.titleAr : selectedDetailsProduct.title}</h3>
              <button type="button" onClick={closeProductDetails} className="min-h-10 min-w-10 rounded-full border border-[#EAE3D5] p-2 text-[#2C221E]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.1fr_1.2fr]">
              <div className="bg-[#FAF7F2]">
                <img
                  src={selectedDetailsProduct.image}
                  alt={selectedDetailsProduct.imageAlt[language]}
                  className="h-56 w-full object-cover md:h-[320px]"
                />
              </div>

              <div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C87D20]">
                    {language === 'ar' ? 'منتج' : 'Produit'}
                  </div>
                  <h4 className="mt-2 break-words font-serif text-2xl text-[#2C221E] sm:text-3xl">
                    {language === 'ar' ? selectedDetailsProduct.titleAr : selectedDetailsProduct.title}
                  </h4>
                </div>

                <p className="text-sm leading-6 text-[#6E655F]">
                  {language === 'ar' ? selectedDetailsProduct.descriptionAr : selectedDetailsProduct.description}
                </p>

                <div className="flex items-center justify-between rounded-xl bg-[#FAF7F2] px-3 py-2">
                  <span className="text-sm text-[#6E655F]">
                    {selectedDetailsProduct.fixedPrice ? (language === 'ar' ? 'السعر' : 'Prix') : t.fromPrice}
                  </span>
                  <span className="text-base font-semibold text-[#C87D20]">{formatPrice(selectedDetailsProduct.price, language)}</span>
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-[#2C221E]">{language === 'ar' ? 'الأحجام المتاحة' : 'Tailles disponibles'}</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDetailsProduct.sizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedDetailsSize(size)}
                        className={`min-h-10 rounded-full border px-3 py-2 text-xs font-medium ${
                          selectedDetailsSize === size
                            ? 'border-[#C87D20] bg-[#C87D20] text-white'
                            : 'border-[#EAE3D5] bg-white text-[#2C221E]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      closeProductDetails()
                      openOrderModal(selectedDetailsProduct, selectedDetailsSize)
                    }}
                    className="flex-1 rounded-full bg-[#C87D20] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#B06B18]"
                  >
                    {t.secondaryCta}
                  </button>
                  <button
                    type="button"
                    onClick={closeProductDetails}
                    className="rounded-full border border-[#EAE3D5] px-4 py-3 text-sm font-semibold text-[#2C221E]"
                  >
                    {t.orderCancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-serif text-2xl text-[#2C221E] sm:text-3xl">{t.orderTitle}</h3>
              <button type="button" onClick={closeOrderModal} className="min-h-10 min-w-10 rounded-full border border-[#EAE3D5] p-2 text-[#2C221E]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submitOrder} className="space-y-4">
              <div className="rounded-xl bg-[#FAF7F2] p-3 text-sm text-[#2C221E]">
                <div className="flex items-center justify-between gap-3">
                  <span>{language === 'ar' ? productForOrder.titleAr : productForOrder.title}</span>
                  <span className="font-semibold text-[#C87D20]">{formatPrice(productForOrder.price, language)}</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-[#2C221E]">
                  <span>{t.formName}</span>
                  <input
                    value={orderForm.fullName}
                    onChange={(event) => setOrderForm((current) => ({ ...current, fullName: event.target.value }))}
                    className="rounded-xl border border-[#EAE3D5] bg-white px-3 py-2.5 outline-none focus:border-[#C87D20]"
                    placeholder={t.formPlaceholderName}
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-[#2C221E]">
                  <span>{t.formPhone}</span>
                  <input
                    value={orderForm.phone}
                    onChange={(event) => setOrderForm((current) => ({ ...current, phone: event.target.value }))}
                    className="rounded-xl border border-[#EAE3D5] bg-white px-3 py-2.5 outline-none focus:border-[#C87D20]"
                    placeholder={t.formPlaceholderPhone}
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-[#2C221E]">
                  <span>{t.formCity}</span>
                  <input
                    value={orderForm.city}
                    onChange={(event) => setOrderForm((current) => ({ ...current, city: event.target.value }))}
                    className="rounded-xl border border-[#EAE3D5] bg-white px-3 py-2.5 outline-none focus:border-[#C87D20]"
                    placeholder={t.formPlaceholderCity}
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-[#2C221E]">
                  <span>{t.formWeight}</span>
                  <select
                    value={selectedSize}
                    onChange={(event) => setOrderForm((current) => ({ ...current, size: event.target.value }))}
                    className="rounded-xl border border-[#EAE3D5] bg-white px-3 py-2.5 outline-none focus:border-[#C87D20]"
                  >
                    {productForOrder.sizeOptions.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-[#2C221E]">
                <span>{t.formAddress}</span>
                <input
                  value={orderForm.address}
                  onChange={(event) => setOrderForm((current) => ({ ...current, address: event.target.value }))}
                  className="rounded-xl border border-[#EAE3D5] bg-white px-3 py-2.5 outline-none focus:border-[#C87D20]"
                  placeholder={t.formPlaceholderAddress}
                />
              </label>

              <div className="flex min-h-11 items-center gap-3">
                <span className="text-sm text-[#2C221E]">{t.quantity}</span>
                <button type="button" onClick={() => setOrderForm((current) => ({ ...current, quantity: Math.max(1, current.quantity - 1) }))} className="min-h-11 min-w-11 rounded-full border border-[#EAE3D5] p-2 text-[#2C221E]">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-[#2C221E]">{orderForm.quantity}</span>
                <button type="button" onClick={() => setOrderForm((current) => ({ ...current, quantity: current.quantity + 1 }))} className="min-h-11 min-w-11 rounded-full border border-[#EAE3D5] p-2 text-[#2C221E]">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <label className="flex flex-col gap-2 text-sm text-[#2C221E]">
                <span>{t.formNotes}</span>
                <textarea
                  rows={3}
                  value={orderForm.notes}
                  onChange={(event) => setOrderForm((current) => ({ ...current, notes: event.target.value }))}
                  className="rounded-xl border border-[#EAE3D5] bg-white px-3 py-2.5 outline-none focus:border-[#C87D20]"
                  placeholder={t.formPlaceholderNotes}
                />
              </label>

              <div className="rounded-xl bg-[#FAF7F2] p-3 text-sm text-[#2C221E]">
                <div className="flex items-center justify-between py-1">
                  <span>{t.orderSummary}</span>
                  <span>{formatPrice(subtotal, language)}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>{t.orderShipping}</span>
                  <span>{deliveryFee === null ? t.orderUnknownShipping : formatPrice(deliveryFee, language)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#EAE3D5] pt-2 font-semibold text-[#2C221E]">
                  <span>{t.orderTotal}</span>
                  <span>{formatPrice(estimatedTotal, language)}</span>
                </div>
              </div>

              {orderError && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{orderError}</div>}
              {orderNotice && <div className="rounded-xl border border-[#EAE3D5] bg-[#F7F0E0] px-3 py-2 text-sm text-[#6E655F]">{orderNotice}</div>}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeOrderModal} className="min-h-11 rounded-full border border-[#EAE3D5] px-4 py-2.5 text-sm font-semibold text-[#2C221E]">
                  {t.orderCancel}
                </button>
                <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C87D20] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B06B18]">
                  <Check className="h-4 w-4" />
                  {t.orderConfirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <a
        href={WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : '#'}
        onClick={(event) => {
          if (!WHATSAPP_NUMBER) {
            event.preventDefault()
            setOrderNotice(t.noticeWhatsapp)
          }
        }}
        target={WHATSAPP_NUMBER ? '_blank' : undefined}
        rel={WHATSAPP_NUMBER ? 'noreferrer' : undefined}
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      </div>
    </div>
  )
}

export default App
