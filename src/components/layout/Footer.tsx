import Link from 'next/link';
import { CLINIC_INFO, SITE_NAVIGATION } from '@/config/clinic-data';

export default function Footer() {
    return (
        <footer className="bg-academic-navy text-white pt-16 pb-8 border-t-4 border-academic-gold">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-12">
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-bold text-2xl tracking-[0.15em] block">{CLINIC_INFO.name}</span>
                            <span className="text-[10px] text-academic-gold tracking-[0.2em] uppercase mt-1 block">{CLINIC_INFO.subtitle}</span>
                        </Link>
                        <address className="not-italic text-sm text-white/70 leading-relaxed mb-6 tracking-wide">
                            {CLINIC_INFO.address.replace(' ', '\n').split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                            ))}
                        </address>
                        <div className="text-academic-gold font-bold text-xl tracking-widest flex items-center gap-2">
                            <span className="text-xs text-white/50 tracking-widest">TEL.</span>
                            {CLINIC_INFO.phone}
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xs tracking-[0.2em] text-academic-gold font-bold mb-6 uppercase">Navigation</h3>
                            <ul className="space-y-4">
                                {SITE_NAVIGATION.mainNav.map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href} className="text-sm text-white/80 hover:text-white transition-colors tracking-widest">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs tracking-[0.2em] text-academic-gold font-bold mb-6 uppercase">Patient Services</h3>
                            <ul className="space-y-4">
                                <li><Link href="/reservation" className="text-sm text-white/80 hover:text-white transition-colors tracking-widest">初診オンライン予約</Link></li>
                                <li><Link href="/questionnaire" className="text-sm text-white/80 hover:text-white transition-colors tracking-widest">オンライン問診票</Link></li>
                                <li><Link href="/#schedule" className="text-sm text-white/80 hover:text-white transition-colors tracking-widest">外来診療担当表</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40 tracking-widest">&copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest">プライバシーポリシー</Link>
                        <Link href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest">サイトマップ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
