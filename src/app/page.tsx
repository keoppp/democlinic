import { NEWS_ITEMS, CLINIC_INFO, IMAGES, HERO_COPY, CLINIC_SCHEDULE_MATRIX } from '@/config/clinic-data';
import WaitingStatus from '@/components/dashboard/WaitingStatus';
import ScheduleMatrix from '@/components/dashboard/ScheduleMatrix';
import { MapPin, ChevronRight, Stethoscope, Building2, Clock, CalendarHeart, Phone, ClipboardList, UserSearch, FileText, Shield, HeartPulse, Users, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

function getCategoryStyle(category: string) {
  switch (category) {
    case '重要': return 'badge-important';
    case '休診': return 'badge-closed';
    case '採用': return 'badge-recruit';
    default: return 'badge-info';
  }
}

export default function Home() {
  return (
    <div className="w-full">

      {/* ===== Hero Banner ===== */}
      <section className="relative w-full h-[180px] md:h-[220px] overflow-hidden bg-[#003366]">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${IMAGES.heroBackground}')` }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-[2px] bg-[#C1A476]" />
              <span className="text-[#C1A476] tracking-[0.3em] text-[10px] font-bold uppercase">{CLINIC_INFO.nameEn}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-wider whitespace-pre-line">{HERO_COPY.mainText}</h1>
            <p className="text-white/70 text-sm mt-2 max-w-lg tracking-wide">{HERO_COPY.subText}</p>
          </div>
        </div>
      </section>

      {/* ===== Quick Access Bar ===== */}
      <section className="bg-[#004488] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 md:grid-cols-8">
            {[
              { icon: <UserSearch className="w-4 h-4" />, label: '初めての方', href: '/#about' },
              { icon: <CalendarHeart className="w-4 h-4" />, label: 'オンライン予約', href: '/reservation' },
              { icon: <ClipboardList className="w-4 h-4" />, label: '問診票', href: '/questionnaire' },
              { icon: <Stethoscope className="w-4 h-4" />, label: '診療科案内', href: '/clinic' },
              { icon: <Building2 className="w-4 h-4" />, label: '医師紹介', href: '/doctor' },
              { icon: <Clock className="w-4 h-4" />, label: '外来診療表', href: '/#schedule' },
              { icon: <FileText className="w-4 h-4" />, label: 'お知らせ', href: '/#news' },
              { icon: <MapPin className="w-4 h-4" />, label: 'アクセス', href: '/#access' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="flex flex-col items-center justify-center py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all border-r border-white/5 last:border-r-0">
                <span className="text-[#C1A476] mb-1">{item.icon}</span>
                <span className="text-[9px] font-bold tracking-wider">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ===== Main Content ===== */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* --- Row 1: News + Waiting (横並び) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-200" id="news">
            <div className="md:col-span-2 md:border-r border-gray-200">
              <div className="flex items-center justify-between px-5 py-3 bg-[#F8FAFC] border-b border-gray-200">
                <h2 className="text-sm font-bold text-[#003366] flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#004488] inline-block" />
                  お知らせ
                </h2>
                <span className="text-[9px] text-gray-500 tracking-widest uppercase">News</span>
              </div>
              <div className="divide-y divide-gray-100">
                {NEWS_ITEMS.slice(0, 4).map((item, i) => (
                  <details key={i} className="group">
                    <summary className="flex items-center gap-2 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                      <span className="text-[11px] text-gray-500 font-mono tracking-wider min-w-[72px]">{item.date}</span>
                      <span className={`${getCategoryStyle(item.category)} text-[9px] font-bold px-2 py-0.5 tracking-wider min-w-[44px] text-center`}>{item.category}</span>
                      <span className="text-[13px] font-medium text-[#222] flex-1 truncate">{item.title}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                    </summary>
                    <div className="px-5 pb-3 ml-[72px] md:ml-[120px]">
                      <p className="text-sm text-[#333] leading-relaxed">{item.content}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="border-t md:border-t-0 border-gray-200">
              <div className="flex items-center gap-2 px-5 py-3 bg-[#F8FAFC] border-b border-gray-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <h2 className="text-sm font-bold text-[#003366]">外来待ち状況</h2>
                <span className="text-[9px] text-gray-500 tracking-widest uppercase ml-auto">LIVE</span>
              </div>
              <WaitingStatus />
            </div>
          </div>


          {/* --- Row 2: 受診案内 + Quick Links --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-200" id="about">
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <h2 className="text-sm font-bold text-[#003366] flex items-center gap-2 mb-4">
                <span className="w-1 h-4 bg-[#C1A476] inline-block" />
                受診予約のご案内
              </h2>
              <p className="text-sm text-[#333] leading-relaxed mb-5">
                初めてご来院される方は、下記ボタンよりオンライン予約が可能です。お電話でのご予約も承っております。
              </p>
              <Link href="/reservation" className="btn-academic-primary w-full sm:w-auto text-center mb-4">
                <CalendarHeart className="w-4 h-4" />
                WEB初診予約
              </Link>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-100">
                <Phone className="w-4 h-4 text-[#C1A476]" />
                <div>
                  <div className="text-[9px] text-gray-500 tracking-widest">ご予約電話番号</div>
                  <div className="text-lg font-bold tracking-widest text-[#003366]">{CLINIC_INFO.phone}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-gray-200">
              {[
                { label: '初めて受診する方', sub: 'First Visit', href: '/#about', icon: <UserSearch className="w-5 h-5" /> },
                { label: '通院中・再来の方', sub: 'Return Visit', href: '/#schedule', icon: <Clock className="w-5 h-5" /> },
                { label: '診療科・部門を探す', sub: 'Departments', href: '/clinic', icon: <Stethoscope className="w-5 h-5" /> },
                { label: '医師を探す', sub: 'Find a Doctor', href: '/doctor', icon: <UserSearch className="w-5 h-5" /> },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="p-5 hover:bg-gray-50 transition-colors group flex flex-col">
                  <span className="text-[#C1A476] mb-2">{item.icon}</span>
                  <span className="text-sm font-bold text-[#222] tracking-wide mb-0.5 group-hover:text-[#C1A476] transition-colors">{item.label}</span>
                  <span className="text-[9px] text-gray-400 tracking-widest uppercase">{item.sub}</span>
                </Link>
              ))}
            </div>
          </div>


          {/* --- Row 3: 診療理念（NEW: 余白埋め） --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-200">
            {[
              { icon: <Shield className="w-6 h-6" />, title: '安心・安全の医療', desc: '最新の医療知見に基づいた診断と、エビデンスに基づく治療方針を徹底しています。' },
              { icon: <HeartPulse className="w-6 h-6" />, title: '患者様中心の診療', desc: '一人ひとりの症状と生活背景に寄り添い、分かりやすい説明と温かなコミュニケーションを心がけます。' },
              { icon: <Users className="w-6 h-6" />, title: 'チーム医療の実践', desc: '各分野の専門医が連携し、総合的な視点から最適な治療計画をご提案いたします。' },
            ].map((item, i) => (
              <div key={i} className={`p-6 ${i < 2 ? 'md:border-r border-b md:border-b-0' : ''} border-gray-200`}>
                <div className="text-[#C1A476] mb-3">{item.icon}</div>
                <h3 className="text-sm font-bold text-[#003366] mb-2 tracking-wider">{item.title}</h3>
                <p className="text-xs text-[#444] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>


          {/* --- Row 4: 外来診療担当表 --- */}
          <section id="schedule" className="py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-[#004488] inline-block" />
              <h2 className="text-sm font-bold text-[#003366]">外来診療担当表</h2>
              <span className="text-[9px] text-gray-500 tracking-widest uppercase ml-2">Schedule</span>
            </div>
            <ScheduleMatrix />
          </section>


          {/* --- Row 5: 当院の特長 --- */}
          <section className="py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-[#C1A476] inline-block" />
              <h2 className="text-sm font-bold text-[#003366]">当院の特長</h2>
              <span className="text-[9px] text-gray-500 tracking-widest uppercase ml-2">Features</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 divide-x divide-y divide-gray-200">
              {CLINIC_INFO.features.map((f, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="text-[#C1A476] text-lg font-bold mb-1 opacity-40">{String(i + 1).padStart(2, '0')}</div>
                  <p className="text-xs font-bold text-[#222] tracking-wide leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </section>


          {/* --- Row 6: よくあるご質問（NEW: 余白埋め） --- */}
          <section className="py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-[#004488] inline-block" />
              <h2 className="text-sm font-bold text-[#003366] flex items-center gap-2">
                <MessageCircleQuestion className="w-4 h-4 text-[#C1A476]" />
                よくあるご質問
              </h2>
              <span className="text-[9px] text-gray-500 tracking-widest uppercase ml-2">FAQ</span>
            </div>
            <div className="border border-gray-200 divide-y divide-gray-200">
              {[
                { q: '初診の場合、予約は必要ですか？', a: 'はい。当院は完全予約制です。WEB予約またはお電話にてご予約の上ご来院ください。' },
                { q: '保険証を忘れた場合はどうなりますか？', a: '保険証をお忘れの場合は全額自費となります。後日保険証をお持ちいただければ差額を返金いたします。' },
                { q: '駐車場はありますか？', a: 'ビル地下に提携駐車場がございます。受付にて駐車券をご提示ください（1時間無料）。' },
                { q: 'クレジットカードは使えますか？', a: 'はい。各種クレジットカード、電子マネー、QRコード決済に対応しております。' },
              ].map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                    <span className="text-[#C1A476] font-bold text-sm">Q</span>
                    <span className="text-sm font-medium text-[#222] flex-1">{faq.q}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <div className="px-5 pb-3 ml-6">
                    <div className="flex items-start gap-2">
                      <span className="text-[#004488] font-bold text-sm mt-0.5">A</span>
                      <p className="text-sm text-[#333] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>


          {/* --- Row 7: 交通アクセス --- */}
          <section id="access" className="py-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-[#004488] inline-block" />
              <h2 className="text-sm font-bold text-[#003366]">交通アクセス</h2>
              <span className="text-[9px] text-gray-500 tracking-widest uppercase ml-2">Access</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
              <div className="p-6">
                <h3 className="text-base font-bold text-[#003366] mb-3">{CLINIC_INFO.name}</h3>
                <div className="space-y-3 text-sm text-[#333]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C1A476] shrink-0 mt-0.5" />
                    <span>{CLINIC_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C1A476] shrink-0" />
                    <span className="text-lg font-bold tracking-widest text-[#003366]">{CLINIC_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C1A476] shrink-0" />
                    <div className="text-xs">
                      <div>午前 09:00〜12:30 / 午後 16:30〜19:00</div>
                      <div className="text-gray-500">休診：木曜午後・土曜午後・日曜・祝日</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full aspect-[16/9] md:aspect-auto relative border-t md:border-t-0 md:border-l border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d139.7671248!3d35.6812362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                  className="absolute inset-0" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
