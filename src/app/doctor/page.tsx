import { IMAGES } from '@/config/clinic-data';
import { Award, BookOpen } from 'lucide-react';

export default function DoctorInfoPage() {
    return (
        <div className="w-full bg-white min-h-screen">

            {/* Page Header (slim navy bar) */}
            <div className="bg-[#004488] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <span className="text-[#C1A476] tracking-[0.2em] text-[9px] font-bold uppercase block mb-1">Doctors & Medical Team</span>
                    <h1 className="text-white text-2xl font-bold tracking-wider">医師・専門医紹介</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Director Card */}
                <section className="border border-gray-200">
                    <div className="flex flex-col md:flex-row">
                        {/* Photo (compact, max 240px width) */}
                        <div className="w-full md:w-[240px] h-40 md:h-auto shrink-0 relative border-b md:border-b-0 md:border-r border-gray-200">
                            <img src={IMAGES.directorPortrait} alt="院長" className="w-full h-full object-cover" />
                        </div>
                        {/* Info */}
                        <div className="flex-1 p-8">
                            <span className="text-[#C1A476] tracking-widest text-[9px] font-bold uppercase block mb-1">Hospital Director</span>
                            <h2 className="heading-academic text-xl mb-0.5">医学博士 山田 太郎</h2>
                            <p className="text-slate-400 font-mono text-xs mb-4 pb-4 border-b border-gray-100">Taro Yamada, MD, Ph.D.</p>

                            <p className="body-academic text-sm mb-6">
                                「誠実な医療で、皆様の明日を支える」を理念に、当院を開設いたしました。
                                総合病院での長年の臨床経験と、最先端の医療知識を活かし、患者様一人ひとりに最適なテーラーメイドの医療を提供することをお約束いたします。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-[#004488] flex items-center gap-1.5 mb-2 tracking-widest text-xs border-l-2 border-[#C1A476] pl-2">
                                        <Award className="w-3.5 h-3.5 text-[#C1A476]" />
                                        専門医資格・所属学会
                                    </h3>
                                    <ul className="body-academic text-xs list-disc list-inside ml-2 space-y-1">
                                        <li>日本内科学会認定 総合内科専門医</li>
                                        <li>日本消化器病学会 専門医</li>
                                        <li>日本医師会認定 産業医</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#004488] flex items-center gap-1.5 mb-2 tracking-widest text-xs border-l-2 border-[#C1A476] pl-2">
                                        <BookOpen className="w-3.5 h-3.5 text-[#C1A476]" />
                                        略歴
                                    </h3>
                                    <ul className="body-academic text-xs space-y-1 ml-2">
                                        <li><span className="inline-block w-16">2005年</span>東京大学 医学部医学科 卒業</li>
                                        <li><span className="inline-block w-16">2010年</span>虎ノ門病院 消化器内科 医長</li>
                                        <li><span className="inline-block w-16">2026年</span>当院 院長就任</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
