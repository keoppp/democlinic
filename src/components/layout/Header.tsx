'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CLINIC_INFO, SITE_NAVIGATION } from '@/config/clinic-data';
import { MapPin, Phone, CalendarHeart, Menu, X, Search, Type } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

    const changeFontSize = useCallback((size: number) => {
        setFontSize(size);
        document.documentElement.style.fontSize = `${size}%`;
    }, []);

    return (
        <header className="w-full flex flex-col z-50">

            {/* ===== Tier 1: Utility Bar (darkest navy, hidden on scroll) ===== */}
            <div className={`hidden lg:block bg-[#001C3D] text-white/80 transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-16 opacity-100'}`}>
                <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-9 text-[10px] tracking-[0.15em]">
                    <div className="flex items-center gap-5">
                        <span className="flex items-center gap-1 opacity-70">
                            <MapPin className="w-3 h-3" />
                            {CLINIC_INFO.address.split(' ')[0]}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-white">
                            <Phone className="w-3 h-3 text-academic-gold" />
                            {CLINIC_INFO.phone}
                        </span>
                        {SITE_NAVIGATION.utilityNav.map((item, i) => (
                            <Link key={i} href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Text size controls */}
                        <div className="flex items-center gap-1 border-r border-white/10 pr-4">
                            <Type className="w-3 h-3 opacity-50 mr-1" />
                            {[90, 100, 110].map(s => (
                                <button key={s} onClick={() => changeFontSize(s)}
                                    className={`px-1.5 py-0.5 text-[9px] transition-colors ${fontSize === s ? 'text-white bg-white/20' : 'text-white/50 hover:text-white'}`}
                                >
                                    {s === 90 ? '小' : s === 100 ? '中' : '大'}
                                </button>
                            ))}
                        </div>
                        {/* Site search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="サイト内検索"
                                className="bg-white/10 border border-white/10 text-white placeholder-white/40 text-[10px] pl-6 pr-2 py-1 w-32 focus:outline-none focus:border-academic-gold focus:w-44 transition-all"
                            />
                            <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Tier 2: Target Audience Selector (hidden on scroll) ===== */}
            <div className={`hidden lg:block bg-[#003366] text-white transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-16 opacity-100'}`}>
                <div className="max-w-7xl mx-auto px-8 flex items-center gap-0">
                    {SITE_NAVIGATION.targetNav.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            className={`px-6 py-2.5 text-[11px] tracking-[0.2em] font-bold transition-all border-b-2 ${item.active
                                ? 'border-[#C1A476] text-white bg-white/5'
                                : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/#about" className="px-6 py-2.5 text-[11px] tracking-[0.2em] font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all border-b-2 border-transparent">
                        初めての方へ
                    </Link>
                </div>
            </div>

            {/* ===== Tier 3: Main Nav (sticky on scroll) ===== */}
            <div className={`w-full bg-white transition-shadow duration-300 ${isScrolled ? 'fixed top-0 shadow-lg border-b border-gray-200 z-50' : 'relative border-b border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-[72px]">

                        {/* Logo Area */}
                        <div className="flex-shrink-0 pr-6 border-r border-gray-100 mr-6">
                            <Link href="/" className="flex flex-col">
                                <span className="heading-academic text-xl tracking-[0.15em]">{CLINIC_INFO.name}</span>
                                <span className="text-[9px] text-academic-gold tracking-[0.25em] uppercase font-bold mt-0.5 opacity-80">{CLINIC_INFO.subtitle}</span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-stretch h-full flex-1">
                            {SITE_NAVIGATION.mainNav.map((item, i) => {
                                const isActive = item.isRoute && pathname.startsWith(item.href) && item.href !== '/';
                                return (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className={`flex items-center px-5 text-[13px] font-bold transition-all relative group ${isActive ? 'text-[#C1A476]' : 'text-[#004488] hover:text-[#C1A476]'}`}
                                    >
                                        <span className="tracking-[0.08em]">{item.label}</span>
                                        <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#C1A476] transition-transform duration-300 origin-bottom-right ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left'}`} />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA Button (gradient) */}
                        <div className="hidden lg:flex items-center pl-4">
                            <Link href="/reservation" className="btn-academic-primary">
                                <CalendarHeart className="w-4 h-4" />
                                初診予約・問診
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#004488] p-2">
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-white pt-[72px] overflow-auto">
                    <div className="px-4 py-6 space-y-1">
                        {SITE_NAVIGATION.mainNav.map((item, i) => (
                            <Link key={i} href={item.href} className="block px-4 py-4 text-base font-bold text-[#004488] hover:bg-[#F1F5F9] border-b border-gray-100 tracking-wider">
                                {item.label}
                            </Link>
                        ))}
                        <Link href="/reservation" className="block mt-6 btn-academic-primary text-center w-full py-4">
                            初診予約・問診へ
                        </Link>
                        <div className="mt-8 pt-8 border-t border-gray-200 px-4">
                            <div className="text-xs text-slate-400 tracking-widest mb-2">ご予約・お問い合わせ</div>
                            <div className="text-2xl heading-academic flex items-center gap-2">
                                <Phone className="h-5 w-5 text-[#C1A476]" />{CLINIC_INFO.phone}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
