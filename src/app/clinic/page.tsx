import { IMAGES } from '@/config/clinic-data';
import { Stethoscope, Microscope } from 'lucide-react';

export default function ClinicInfoPage() {
    return (
        <div className="w-full bg-white min-h-screen">

            {/* Page Header (slim) */}
            <div className="bg-[#004488] py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <span className="text-[#C1A476] tracking-[0.2em] text-[9px] font-bold uppercase block mb-1">Departments & Facilities</span>
                    <h1 className="text-white text-2xl font-bold tracking-wider">診療科目・施設設備</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Intro */}
                <div className="py-8 border-b border-gray-200">
                    <p className="body-academic text-sm max-w-3xl">
                        当院では、各専門分野の医師が連携し、質の高いチーム医療を提供しています。
                        患者様の症状を総合的に判断し、最適な検査・治療計画をご提案いたします。
                    </p>
                </div>

                {/* Departments */}
                <section className="py-10 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-1 h-5 bg-[#004488] inline-block" />
                        <h2 className="heading-academic text-base flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-[#C1A476]" />
                            診療科目
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 divide-x divide-y divide-gray-200">
                        {[
                            { name: '総合内科', desc: '風邪やインフルエンザ、生活習慣病の管理まで、内科全般の診療を行います。' },
                            { name: '消化器・胃腸科', desc: '胃カメラ・大腸カメラ等を用いた精密な検査と、消化器疾患の専門治療を提供します。' },
                            { name: '糖尿病・内分泌内科', desc: '専門医による血糖コントロールと、合併症予防のための長期的なサポートを行います。' },
                        ].map((dept, i) => (
                            <div key={i} className="p-6 hover:bg-[#F8FAFC] transition-colors">
                                <div className="text-[#C1A476] text-xl font-bold mb-1 opacity-30">{String(i + 1).padStart(2, '0')}</div>
                                <h3 className="heading-academic text-sm mb-2">{dept.name}</h3>
                                <p className="body-academic text-xs">{dept.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Facility Image (compact) */}
                <section className="py-10 border-b border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="h-48 w-full overflow-hidden border border-gray-200">
                            <img src={IMAGES.facilityExterior} alt="施設外観" className="w-full h-full object-cover" />
                        </div>
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-1 h-5 bg-[#C1A476] inline-block" />
                                <h2 className="heading-academic text-base flex items-center gap-2">
                                    <Microscope className="w-4 h-4 text-[#C1A476]" />
                                    主要検査設備
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { name: '最新鋭MRI設備', desc: 'より短時間で高精細な画像診断が可能な最新モデルを導入。' },
                                    { name: '内視鏡システム', desc: 'AI病変検出支援システムを備えた高画質内視鏡システムを完備。' },
                                    { name: '超音波（エコー）', desc: '腹部・頸部・心臓など、被曝なく迅速に検査します。' },
                                ].map((eq, i) => (
                                    <div key={i} className="flex gap-3 py-3">
                                        <span className="font-bold text-[#004488] text-xs min-w-[100px]">{eq.name}</span>
                                        <span className="body-academic text-xs">{eq.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
