'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { User, Activity, AlertCircle, CheckCircle2, Lock, ChevronRight, ClipboardList } from 'lucide-react';

function QuestionnaireForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const { register, handleSubmit, setValue, watch, trigger } = useForm();

    const reservationId = searchParams.get('id');
    const reservationMessage = searchParams.get('message');
    const triageResult = searchParams.get('triage');
    const [customerData, setCustomerData] = useState({ name: '', phone: '', dob: '' });
    const [isLoadingData, setIsLoadingData] = useState(false);

    // Completely preserved n8n data fetching logic
    useEffect(() => {
        if (reservationId) {
            setValue('reservationId', reservationId);
            setIsLoadingData(true);

            fetch(`/api/webhook/questionnaire-customer?reservationId=${reservationId}`)
                .then(res => res.json())
                .then(data => {
                    if (data && !data.error) {
                        setCustomerData({
                            name: data.name || '',
                            phone: data.phone || '',
                            dob: data.dob || ''
                        });
                        if (data.name) setValue('name', data.name);
                        if (data.phone) setValue('phone', data.phone);
                        if (data.dob) setValue('dob', data.dob);
                    }
                })
                .catch(err => console.error("Error fetching customer data:", err))
                .finally(() => setIsLoadingData(false));
        }
    }, [reservationId, setValue]);

    if (!reservationId) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-4 max-w-2xl mx-auto text-center">
                <Lock className="h-12 w-12 text-academic-navy mb-6" />
                <h2 className="heading-academic text-3xl mb-4">アクセスが制限されています</h2>
                <p className="body-academic mb-12">
                    オンライン問診はセキュリティの観点から、初診予約を完了された患者様のみアクセス可能なページです。
                    一度トップページへ戻り、ご予約のお手続きをお願いいたします。
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-academic-navy hover:bg-[#002244] text-white font-bold py-4 px-12 transition-colors tracking-widest"
                >
                    トップページへ戻る
                </button>
            </div>
        );
    }

    const onSubmit = async (data: any) => {
        console.log('Sending questionnaire data to n8n (Mock):', data);
        await new Promise(r => setTimeout(r, 1500));
        setIsSubmitted(true);
    };

    const nextStep = async () => {
        // Simple manual validation could go here if needed. We just proceed for now.
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSubmitted) {
        return (
            <div className="w-full bg-[#F8F9FA] py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-white p-12 md:p-20 text-center border-t border-gray-200 shadow-sm">
                        <CheckCircle2 className="w-16 h-16 text-academic-gold mx-auto mb-8" />
                        <h2 className="heading-academic text-3xl mb-4">問診票の送信が完了しました</h2>
                        <p className="body-academic mb-12 max-w-lg mx-auto">
                            ご協力いただき誠にありがとうございます。いただいた情報は電子カルテに安全に連携されます。<br />
                            当日は受付でお名前をお申し出いただき、お待ちくださいませ。
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-academic-navy hover:bg-[#002244] text-white font-bold py-4 px-12 transition-colors tracking-widest inline-flex items-center gap-2"
                        >
                            終了してトップに戻る
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#F8F9FA] min-h-screen pb-32">

            {/* Header Area */}
            <div className="bg-[#004488] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <span className="text-[#C1A476] tracking-[0.2em] text-[9px] font-bold uppercase block mb-1">Medical Questionnaire</span>
                    <h1 className="text-white text-2xl font-bold tracking-wider">初診オンライン問診票</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">

                {/* n8n Reservation Confirmation Banner */}
                {reservationMessage && (
                    <div className="bg-white border border-gray-200 shadow-sm mb-12 overflow-hidden">
                        <div className="bg-[#003366] px-8 py-4 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-[#C1A476]" />
                            <h3 className="text-white font-bold tracking-wider">ご予約を承りました</h3>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#F8F9FA] border-l-4 border-[#003366] px-5 py-3">
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Reservation ID</p>
                                    <p className="text-xl font-mono font-bold text-[#003366] tracking-widest">{reservationId}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm">{reservationMessage}</p>
                            {triageResult && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4">
                                    <p className="text-xs font-bold text-amber-700 tracking-wide mb-1">AIトリアージ判定</p>
                                    <p className="text-amber-900 font-bold text-sm leading-relaxed">{triageResult}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step Progress Tracker */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <div className={`flex items-center gap-2 px-4 py-2 border-b-2 ${currentStep === 1 ? 'border-academic-navy text-academic-navy' : 'border-gray-200 text-gray-400'}`}>
                        <span className="font-bold text-sm tracking-widest">STEP 1</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <div className={`flex items-center gap-2 px-4 py-2 border-b-2 ${currentStep === 2 ? 'border-academic-navy text-academic-navy' : 'border-gray-200 text-gray-400'}`}>
                        <span className="font-bold text-sm tracking-widest">STEP 2</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <div className={`flex items-center gap-2 px-4 py-2 border-b-2 ${currentStep === 3 ? 'border-academic-navy text-academic-navy' : 'border-gray-200 text-gray-400'}`}>
                        <span className="font-bold text-sm tracking-widest">確認・送信</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                    {/* --- STEP 1: Basic & Linkage Data --- */}
                    {currentStep === 1 && (
                        <div className="bg-white p-10 md:p-14 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">

                            <div className="mb-10 text-center">
                                <User className="w-8 h-8 text-academic-gold mx-auto mb-4" />
                                <h2 className="heading-academic text-2xl">自動連携されたお客様情報</h2>
                                <p className="body-academic mt-4 text-sm max-w-md mx-auto">ご予約時に入力いただいた情報です。修正が必要な場合は受付窓口にてお申し出ください。</p>
                            </div>

                            <div className="space-y-8 relative">
                                {isLoadingData && (
                                    <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                                        <div className="w-8 h-8 border-4 border-academic-navy/20 border-t-academic-navy rounded-full animate-spin"></div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-academic-navy tracking-widest mb-2">ご予約ID（自動）</label>
                                    <input type="text" readOnly value={reservationId || ''} className="w-full bg-[#f8f9fa] border border-gray-200 px-5 py-4 focus:outline-none cursor-not-allowed font-mono text-gray-500" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-academic-navy tracking-widest mb-2">お名前</label>
                                        <input type="text" readOnly value={customerData.name || ''} placeholder="取得中..." className="w-full bg-[#f8f9fa] border border-gray-200 px-5 py-4 focus:outline-none cursor-not-allowed text-gray-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-academic-navy tracking-widest mb-2">お電話番号</label>
                                        <input type="text" readOnly value={customerData.phone || ''} placeholder="取得中..." className="w-full bg-[#f8f9fa] border border-gray-200 px-5 py-4 focus:outline-none cursor-not-allowed text-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-academic-navy tracking-widest mb-2">生年月日</label>
                                    <input type="text" readOnly value={customerData.dob || ''} placeholder="取得中..." className="w-full bg-[#f8f9fa] border border-gray-200 px-5 py-4 focus:outline-none cursor-not-allowed text-gray-600 font-mono" />
                                </div>
                                <input type="hidden" {...register('reservationId')} value={reservationId || ''} />
                            </div>

                            <div className="mt-16 text-center">
                                <button type="button" onClick={nextStep} disabled={isLoadingData} className="bg-academic-navy hover:bg-[#002244] text-white font-bold py-5 px-16 tracking-[0.2em] transition-colors disabled:opacity-50">
                                    次へ進む
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 2: Symptoms --- */}
                    {currentStep === 2 && (
                        <div className="bg-white p-10 md:p-14 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500">

                            <div className="mb-10 text-center">
                                <Activity className="w-8 h-8 text-academic-gold mx-auto mb-4" />
                                <h2 className="heading-academic text-2xl">症状の詳細について</h2>
                                <p className="body-academic mt-4 text-sm max-w-md mx-auto">正確な診断につなげるため、現在の症状についてなるべく詳しくお教えください。</p>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <label className="block text-sm font-bold text-academic-navy tracking-widest mb-4">いつ頃から症状がありますか？</label>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {['今日から', '昨日から', '2〜3日前から', '1週間ほど前から', 'それ以上前から'].map((opt) => (
                                            <label key={opt} className="cursor-pointer">
                                                <input type="radio" value={opt} {...register('symptomSince')} className="peer sr-only" />
                                                <div className="border border-gray-300 text-center py-4 px-2 text-sm font-bold text-slate-600 transition-colors peer-checked:bg-academic-navy peer-checked:text-white peer-checked:border-academic-navy hover:border-academic-gold">
                                                    {opt}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-academic-navy tracking-widest mb-4">具体的な症状をお選びください（複数可）</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {['発熱', '咳・痰', '喉の痛み', '鼻水・鼻づまり', '頭痛', '急な腹痛・胃痛', '吐き気・嘔吐', '下痢・便秘', '強い倦怠感', '動悸・息切れ', 'めまい', 'その他'].map((symptom) => (
                                            <label key={symptom} className="cursor-pointer flex items-center p-4 border border-gray-200 hover:border-academic-gold transition-colors">
                                                <input type="checkbox" value={symptom} {...register('symptomsList')} className="w-5 h-5 text-academic-navy border-gray-300 focus:ring-academic-navy rounded-none" />
                                                <span className="ml-3 text-sm font-medium text-slate-700">{symptom}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 flex justify-between items-center border-t border-gray-100 pt-8">
                                <button type="button" onClick={prevStep} className="text-academic-navy font-bold hover:text-academic-gold transition-colors text-sm tracking-widest">
                                    戻る
                                </button>
                                <button type="button" onClick={nextStep} className="bg-academic-navy hover:bg-[#002244] text-white font-bold py-4 px-12 tracking-[0.2em] transition-colors">
                                    次へ進む
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 3: Medical History & Submit --- */}
                    {currentStep === 3 && (
                        <div className="bg-white p-10 md:p-14 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500">

                            <div className="mb-10 text-center">
                                <AlertCircle className="w-8 h-8 text-academic-gold mx-auto mb-4" />
                                <h2 className="heading-academic text-2xl">既往歴およびアレルギー</h2>
                                <p className="body-academic mt-4 text-sm max-w-md mx-auto">安全な処方や治療方針決定のため、正しくご入力をお願いいたします。</p>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <label className="block text-sm font-bold text-academic-navy tracking-widest mb-4">現在治療中のご病気はありますか？</label>
                                    <div className="flex gap-4 mb-4">
                                        <label className="cursor-pointer">
                                            <input type="radio" value="yes" {...register('hasHistory')} className="peer sr-only" />
                                            <span className="inline-block border border-gray-300 py-3 px-8 text-sm font-bold text-slate-600 transition-colors peer-checked:bg-academic-navy peer-checked:text-white peer-checked:border-academic-navy">はい</span>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input type="radio" value="no" defaultChecked {...register('hasHistory')} className="peer sr-only" />
                                            <span className="inline-block border border-gray-300 py-3 px-8 text-sm font-bold text-slate-600 transition-colors peer-checked:bg-academic-navy peer-checked:text-white peer-checked:border-academic-navy">いいえ</span>
                                        </label>
                                    </div>
                                    <textarea
                                        {...register('historyDetails')}
                                        placeholder="「はい」の場合は病名等をご記入ください（例：高血圧、糖尿病など）"
                                        className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-academic-gold text-academic-navy resize-none h-32 leading-relaxed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-toranomon-navy tracking-widest mb-4">お薬や食べ物でアレルギーはありますか？</label>
                                    <div className="flex gap-4 mb-4">
                                        <label className="cursor-pointer">
                                            <input type="radio" value="yes" {...register('hasAllergy')} className="peer sr-only" />
                                            <span className="inline-block border border-gray-300 py-3 px-8 text-sm font-bold text-slate-600 transition-colors peer-checked:bg-toranomon-navy peer-checked:text-white peer-checked:border-toranomon-navy">はい</span>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input type="radio" value="no" defaultChecked {...register('hasAllergy')} className="peer sr-only" />
                                            <span className="inline-block border border-gray-300 py-3 px-8 text-sm font-bold text-slate-600 transition-colors peer-checked:bg-toranomon-navy peer-checked:text-white peer-checked:border-toranomon-navy">いいえ</span>
                                        </label>
                                    </div>
                                    <textarea
                                        {...register('allergyDetails')}
                                        placeholder="「はい」の場合は薬品名・原因食物等をご記入ください"
                                        className="w-full bg-[#fcfcfc] border border-gray-300 px-5 py-4 focus:outline-none focus:border-toranomon-gold text-toranomon-navy resize-none h-32 leading-relaxed"
                                    />
                                </div>
                            </div>

                            <div className="mt-16 text-center border-t border-gray-100 pt-12">
                                <button type="submit" className="bg-toranomon-gold hover:bg-[#A98E63] text-white font-bold py-6 px-16 tracking-[0.2em] transition-colors shadow-lg flex items-center justify-center gap-3 w-full md:w-auto mx-auto">
                                    <ClipboardList className="w-6 h-6" />
                                    <span>問診内容を確定し送信する</span>
                                </button>
                                <p className="text-xs text-gray-400 mt-6 tracking-wide">
                                    個人情報保護方針に同意した上で送信してください。通信内容はすべて暗号化されます。
                                </p>
                                <button type="button" onClick={prevStep} className="mt-8 text-toranomon-navy font-bold hover:text-toranomon-gold transition-colors text-sm tracking-widest">
                                    戻る
                                </button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}

export default function QuestionnairePage() {
    return (
        <Suspense fallback={
            <div className="flex-1 w-full flex items-center justify-center py-40">
                <div className="w-10 h-10 border-4 border-toranomon-navy/20 border-t-toranomon-navy rounded-full animate-spin"></div>
            </div>
        }>
            <QuestionnaireForm />
        </Suspense>
    );
}
