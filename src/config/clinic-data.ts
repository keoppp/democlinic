/* -------------------------------------------
   【システム管理者・開発者用】
   n8n Webhook連携設定エリア（三位一体連携）
   ------------------------------------------- */
export const N8N_CONFIG = {
  // ① 予約フォーム用 Webhook (POST)
  // [送信内容] name, phone, email, dob, reserveDate, reserveTime, mainSymptom
  // [n8n側で返す必須JSON] { "reservationId": "任意のID文字列", "message": "完了メッセージ" }
  RESERVATION_WEBHOOK_URL: process.env.NEXT_PUBLIC_RESERVATION_WEBHOOK_URL || "",

  // ② 待ち時間表示用 (GET) Webhook — 30秒ポーリング
  // [n8n側で返す必須JSON] { "waitTimeMinutes": 15, "waitingCount": 4, "statusMessage": "現在スムーズです" }
  WAITING_STATUS_WEBHOOK_URL: process.env.NEXT_PUBLIC_WAITING_STATUS_WEBHOOK_URL || "",

  // ③ 問診票用 顧客データ取得 Webhook (GET)
  // [URLに付与] ?reservationId=RSV-1234
  // [n8n側で返す必須JSON] { "name": "山田", "phone": "090...", "dob": "2000-01-01" }
  QUESTIONNAIRE_CUSTOMER_WEBHOOK_URL: process.env.NEXT_PUBLIC_QUESTIONNAIRE_CUSTOMER_WEBHOOK_URL || "",
};

/* -------------------------------------------
   【スタッフ用】クリニック基本情報
   ※ 名前・住所・電話番号を変更するとサイト全体に反映されます
   ------------------------------------------- */
export const CLINIC_INFO = {
  name: "Aクリニック",
  nameEn: "A CLINIC",
  subtitle: "Advanced Medical Center",
  address: "〒100-0000 東京都千代田区メディカル町1-2-3 Aビル1F",
  phone: "03-1234-5678",
  features: [
    "Web予約・問診による待ち時間削減",
    "最新の医療機器による精密検査",
    "各専門医によるチーム医療",
    "プライバシーに配慮した個室診療"
  ]
};

/* -------------------------------------------
   【スタッフ用】お知らせ管理エリア
   ※ 新しいお知らせを一番上に追加してください
   ※ category は "重要" "お知らせ" "休診" "採用" から選んでください
   ------------------------------------------- */
export const NEWS_ITEMS = [
  { date: "2026.03.18", category: "重要", title: "GWの診療体制について", content: "5/3(日)〜5/6(水)は休診とさせていただきます。システム上のWeb予約も停止しておりますので、ご不便をおかけしますが何卒よろしくお願いいたします。" },
  { date: "2026.03.15", category: "お知らせ", title: "インフルエンザワクチン予約開始のお知らせ", content: "今季のインフルエンザワクチンの予約受付を開始いたしました。当院での接種をご希望の方は、Web予約またはお電話にて承ります。数に限りがございますのでお早めにご予約ください。" },
  { date: "2026.03.01", category: "休診", title: "4月10日午後の診療について", content: "4月10日（木）は院内研修のため、午後の診療を休診とさせていただきます。午前の診療は通常通りです。ご迷惑をおかけいたしますが、何卒ご了承ください。" },
  { date: "2026.02.20", category: "お知らせ", title: "発熱外来を受診される患者様へ", content: "発熱のある方、または風邪症状のある方は、院内感染対策のため、直接来院せず事前に必ずお電話でご相談ください。専用の待合室へご案内いたします。" },
];

// 旧 CLINIC_NEWS との互換 (Accordion コンポーネントが使う場合)
export const CLINIC_NEWS = NEWS_ITEMS.map(item => ({
  title: `【${item.category}】${item.title}`,
  content: item.content,
  date: item.date
}));

/* -------------------------------------------
   【スタッフ用】外来診療スケジュール
   ※ 〇＝診療中、休＝休診 の順番は 月火水木金土日祝
   ------------------------------------------- */
export const CLINIC_SCHEDULE_MATRIX = {
  department: "内科・胃腸科・糖尿病内科",
  rows: [
    {
      name: "午前診察",
      time: "09:00 ～ 12:30",
      schedule: ["〇", "〇", "〇", "〇", "〇", "〇", "休", "休"]
    },
    {
      name: "午後診察",
      time: "16:30 ～ 19:00",
      schedule: ["〇", "〇", "〇", "休", "〇", "休", "休", "休"]
    }
  ],
  days: ["月", "火", "水", "木", "金", "土", "日", "祝"]
};

/* -------------------------------------------
   【運用保守用】画像URL一元管理エリア
   ※ URLを差し替えるだけでHP上の対応箇所の画像が変わります
   ※ 各画像が表示される場所をコメントで明記しています
   ------------------------------------------- */
export const IMAGES = {
  // ▼ トップページ：ヒーローセクション背景（画面幅いっぱいの大画像）
  heroBackground: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
  // ▼ 医師紹介ページ：院長の宣材写真（左側に縦長で表示）
  directorPortrait: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop",
  // ▼ トップページ＆診療案内：施設外観写真（カード内に表示）
  facilityExterior: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?q=80&w=1000&auto=format&fit=crop",
  // ▼ トップページ：診療風景（カード内に表示）
  medicalScene: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop",
};

/* -------------------------------------------
   【運用保守用】ヒーローコピー
   ------------------------------------------- */
export const HERO_COPY = {
  mainText: "誠実な医療で、\n皆様の明日を支える",
  subText: "最先端の医療機器と各分野の専門医によるチーム医療。\nプライバシーに配慮した上質な空間で、安心の診療をお約束します。"
};

/* -------------------------------------------
   【開発者用】3段ヘッダー・ナビゲーション定義
   ------------------------------------------- */
export const SITE_NAVIGATION = {
  // 上段ユーティリティ（電話・アクセス等の小さいリンク）
  utilityNav: [
    { label: "アクセス", href: "/#access" },
    { label: "お問い合わせ", href: "/#access" },
  ],
  // 中段ターゲット別ナビ（患者様向け / 医療関係者向け）
  targetNav: [
    { label: "患者様・ご来院の方", href: "/", active: true },
    { label: "医療関係者の方", href: "#", active: false },
  ],
  // 下段メインナビ
  mainNav: [
    { label: "初めての方へ", href: "/#about", isRoute: false },
    { label: "診療案内・検査", href: "/clinic", isRoute: true },
    { label: "医師紹介", href: "/doctor", isRoute: true },
    { label: "アクセス", href: "/#access", isRoute: false }
  ]
};
