'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CLINIC_INFO } from '@/config/clinic-data';
import { ChevronRight, AlertTriangle, CheckCircle2, PhoneCall, CalendarHeart, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function ReservationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successData, setSuccessData] = useState<{ id: string, name: string, phone: string, dob: string } | null>(null);

    // Setup form
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            dob: '',
            reserveDate: '',
            reserveTime: '',
            mainSymptom: ''
        }
    });

    const selectedDate = watch('reserveDate');

    // Date Options
    const dateOptions = Array.from({ length: 14 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        const dateValue = d.toISOString().split('T')[0];
        const month = d.getMonth() + 1;
        const date = d.getDate();
        const dayStr = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
        return { value: dateValue, label: `${month}月${date}日 (${dayStr})` };
    });

    // Time Options (Buttons instead of Select)
    const timeOptions: string[] = [];
    for (let h = 9; h < 18; h++) {
        for (let m = 0; m < 60; m += 10) {
            if ((h === 13) || (h === 14 && m < 30)) continue; // lunch break
            timeOptions.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
        }
    }

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const res = await fetch('/api/webhook/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    // Format dob to YYYY-MM-DD if needed automatically
                }),
            });

            const result = await res.json();

            if (result.success) {
                setSuccessData({
                    id: result.reservationId,
                    name: data.name,
                    phone: data.phone,
                    dob: data.dob
                });
            } else {
                throw new Error(result.message || '予約の送信に失敗しました。');
            }
        } catch (error: any) {
            console.error('Reservation error:', error);
            setSubmitError(error.message || '現在システムメンテナンス中です。お電話にてご連絡ください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProceedToQuestionnaire = () => {
        if (!successData) return;
        const params = new URLSearchParams({ id: successData.id });
        router.push(`/questionnaire?${params.toString()}`);
    };

    // --- Success UI ---
    if (successData) {
        return (
            <div className="w-full bg-[#F8F9FA] py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-white p-12 md:p-20 text-center border-t border-gray-200">
                        <CheckCircle2 className="w-16 h-16 text-academic-gold mx-auto mb-8" />
                        <h2 className="heading-academic text-3xl mb-4">オンライン初診予約を承りました</h2>
                        <p className="body-academic mb-12">
                            ご入力いただいた内容をオンラインで受け付けました。<br />
                            当日はお気をつけてお越しくださいませ。
                        </p>

                        <div className="bg-[#F8F9FA] p-8 inline-block text-left border-l-4 border-academic-navy mb-16">
                            <p className="text-sm font-bold text-academic-navy mb-2 tracking-widest uppercase">Reservation ID</p>
                            <p className="text-3xl font-mono tracking-widest text-[#003366]">{successData.id}</p>
                        </div>

                        <div className="border-t border-gray-100 pt-16">
                            <h3 className="heading-academic text-xl mb-6 flex items-center justify-center gap-3">
                                <ClipboardList className="w-6 h-6 text-academic-gold" />
                                【任意】事前のオンライン問診にご協力ください
                            </h3>
                            <p className="body-academic mb-10 max-w-xl mx-auto text-sm">
                                事前に問診票をご入力いただくことで、来院時のカルテ作成や待ち時間を大幅に短縮でき、よりスムーズなご案内が可能となります。
                            </p>
                            <button
                                onClick={handleProceedToQuestionnaire}
                                className="inline-flex items-center justify-center gap-3 bg-academic-navy hover:bg-[#002244] text-white font-bold py-5 px-12 transition-colors tracking-widest mb-6"
                            >
                                オンライン問診へ進む（所要時間：約2分） <ChevronRight className="w-5 h-5" />
                            </button>
                            <div className="block mt-4">
                                <Link href="/" className="text-sm text-slate-400 hover:text-academic-navy transition-colors font-medium tracking-wide">
                                    トップページへ戻る
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Form UI ---
    return (
        <div className="w-full bg-[#F8F9FA] min-h-screen pb-32">

            {/* Header Area */}
            <div className="bg-[#004488] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <span className="text-[#C1A476] tracking-[0.2em] text-[9px] font-bold uppercase block mb-1">Online Reservation</span>
                    <h1 className="text-white text-2xl font-bold tracking-wider">初診オンライン予約</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

                {submitError && (
                    <div className="bg-red-50 p-6 mb-12 border-l-4 border-red-600 flex gap-4 items-start">
                        <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                        <div>
                            <h3 className="text-red-800 font-bold mb-2">{submitError}</h3>
                            <p className="text-red-700 text-sm leading-relaxed mb-4">
                                大変恐れ入りますが、現在オンライン予約システムが混み合っているか、メンテナンス中です。<br />
                                お急ぎの方は、お電話にて直接ご予約をお願いいたします。
                            </p>
                            <div className="flex items-center gap-2 text-red-800 font-bold text-lg">
                                <PhoneCall className="w-5 h-5" /> {CLINIC_INFO.phone}
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-24">

                    {/* Section 1: Customer Info */}
                    <section>
                        <div className="mb-10">
                            <h2 className="heading-academic text-2xl flex items-center gap-4">
                                <span className="text-academic-gold font-light tracking-widest text-lg">01</span>
                                お客様情報
                            </h2>
                            <p className="body-academic mt-4 text-sm">初診のカルテ作成に必要な情報をご入力ください。</p>
                        </div>

                        <div className="space-y-12 bg-white p-10 md:p-14 border-t border-gray-200 shadow-sm">

                            {/* Name */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 pt-2">
                                    <label className="font-bold text-academic-navy tracking-wide">
                                        お名前（ひらがな） <span className="text-xs font-normal bg-red-100 text-red-700 px-2 py-1 ml-2">必須</span>
                                    </label>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <input
                                        type="text"
                                        {...register('name', { required: 'お名前は必須です' })}
                                        placeholder="例: やまだ たろう"
                                        className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold transition-colors text-academic-navy"
                                    />
                                    {errors.name && <p className="text-red-600 text-xs mt-2 font-medium">{errors.name.message as string}</p>}
                                </div>
                            </div>

                            {/* Phone / Email */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 pt-2">
                                    <label className="font-bold text-academic-navy tracking-wide">
                                        ご連絡先 <span className="text-xs font-normal bg-red-100 text-red-700 px-2 py-1 ml-2">必須</span>
                                    </label>
                                </div>
                                <div className="w-full md:w-2/3 space-y-6">
                                    <div>
                                        <input
                                            type="tel"
                                            {...register('phone', { required: 'お電話番号は必須です', pattern: /^[0-9]+$/ })}
                                            placeholder="お電話番号（ハイフンなし）"
                                            className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold transition-colors text-academic-navy"
                                        />
                                        {errors.phone && <p className="text-red-600 text-xs mt-2 font-medium">正しい電話番号を入力してください</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            placeholder="メールアドレス（任意）"
                                            className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold transition-colors text-academic-navy"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* DOB */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 pt-2">
                                    <label className="font-bold text-academic-navy tracking-wide">
                                        生年月日 <span className="text-xs font-normal bg-red-100 text-red-700 px-2 py-1 ml-2">必須</span>
                                    </label>
                                </div>
                                <div className="w-full md:w-2/3">
                                    {/* Using standard date input which handles YYYY auto-complete naturally */}
                                    <input
                                        type="date"
                                        {...register('dob', { required: '生年月日は必須です' })}
                                        className="w-full md:w-1/2 bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold transition-colors text-academic-navy font-mono"
                                    />
                                    {errors.dob && <p className="text-red-600 text-xs mt-2 font-medium">{errors.dob.message as string}</p>}
                                </div>
                            </div>

                        </div>
                    </section>


                    {/* Section 2: Reservation Details */}
                    <section>
                        <div className="mb-10">
                            <h2 className="heading-academic text-2xl flex items-center gap-4">
                                <span className="text-academic-gold font-light tracking-widest text-lg">02</span>
                                ご来院日時とご用件
                            </h2>
                            <p className="body-academic mt-4 text-sm">システム上で10分単位の目安時間をお選びいただきます。</p>
                        </div>

                        <div className="space-y-12 bg-white p-10 md:p-14 border-t border-gray-200 shadow-sm">

                            {/* Date Selection */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 pt-2">
                                    <label className="font-bold text-academic-navy tracking-wide">
                                        受診希望日 <span className="text-xs font-normal bg-red-100 text-red-700 px-2 py-1 ml-2">必須</span>
                                    </label>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <select
                                        {...register('reserveDate', { required: '受診希望日は必須です' })}
                                        className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold transition-colors text-academic-navy font-bold tracking-wide"
                                    >
                                        <option value="">（お日にちをお選びください）</option>
                                        {dateOptions.map((opt, i) => (
                                            <option key={i} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    {errors.reserveDate && <p className="text-red-600 text-xs mt-2 font-medium">{errors.reserveDate.message as string}</p>}
                                </div>
                            </div>

                            {/* Time Selection (Grid Buttons) */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 pt-2">
                                    <label className="font-bold text-academic-navy tracking-wide">
                                        お時間（目安） <span className="text-xs font-normal bg-red-100 text-red-700 px-2 py-1 ml-2">必須</span>
                                    </label>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">※診療状況によりお待ちいただく場合がございます。</p>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <Controller
                                        name="reserveTime"
                                        control={control}
                                        rules={{ required: 'お時間を選択してください' }}
                                        render={({ field }) => (
                                            <>
                                                <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 ${!selectedDate ? 'opacity-30 pointer-events-none' : ''}`}>
                                                    {timeOptions.map((time, i) => (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() => field.onChange(time)}
                                                            className={`py-3 px-2 border text-sm font-mono transition-all ${field.value === time
                                                                ? 'bg-[#C1A476] text-white border-[#C1A476] font-bold ring-2 ring-[#C1A476] ring-offset-2 shadow-md scale-105'
                                                                : 'bg-[#fcfcfc] text-toranomon-navy border-gray-300 hover:border-toranomon-gold hover:text-toranomon-gold'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                                {!selectedDate && <p className="text-sm text-toranomon-gold mt-4 font-bold">先にお日にちを選択してください</p>}
                                                {errors.reserveTime && <p className="text-red-600 text-xs mt-3 font-medium">{errors.reserveTime.message as string}</p>}
                                            </>
                                        )}
                                    />

                                </div>
                            </div>

                            {/* Main Symptom */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 pt-2">
                                    <label className="font-bold text-toranomon-navy tracking-wide">
                                        受診の理由 <span className="text-xs font-normal bg-red-100 text-red-700 px-2 py-1 ml-2">必須</span>
                                    </label>
                                </div>
                                <div className="w-full md:w-2/3">
                                    <textarea
                                        {...register('mainSymptom', { required: '受診の理由は必須です' })}
                                        placeholder="主な症状やご用件をご記入ください"
                                        rows={4}
                                        className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-toranomon-gold focus:ring-1 focus:ring-toranomon-gold transition-colors text-toranomon-navy resize-none leading-relaxed"
                                    ></textarea>
                                    {errors.mainSymptom && <p className="text-red-600 text-xs mt-2 font-medium">{errors.mainSymptom.message as string}</p>}
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Submit Section */}
                    <div className="pt-8 flex flex-col items-center border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative font-bold py-6 px-16 text-lg tracking-[0.2em] transition-all overflow-hidden ${isSubmitting ? 'bg-gray-400 text-white opacity-70 cursor-not-allowed' : 'bg-[#C1A476] hover:bg-[#a8905f] text-white shadow-lg hover:shadow-xl'}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-3">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    システム送信中
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    予約内容を確定する
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                        <p className="mt-6 text-xs text-gray-400 tracking-wider">
                            ご入力いただいた情報は通信暗号化（TLS）により強固に保護されています。
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
