import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const webhookUrl = N8N_CONFIG.RESERVATION_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Webhook URLが設定されていません。管理者にお問い合わせください。'
        },
        { status: 500 }
      );
    }

    // n8n Webhook へ POST し、レスポンスを待機する
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        type: 'INITIAL_VISIT',
        timestamp: new Date().toISOString()
      })
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n responded with status: ${n8nResponse.status}`);
    }

    // n8n からのレスポンスをそのまま読み取る
    const n8nData = await n8nResponse.json();

    // n8n の status フィールドで成功/失敗を判定
    if (n8nData.status === 'success') {
      return NextResponse.json({
        success: true,
        reservationId: n8nData.reservation_id,
        message: n8nData.message,
        triageResult: n8nData.triage_result || null,
      });
    }

    // n8n が success 以外を返した場合
    return NextResponse.json({
      success: false,
      message: n8nData.message || '予約処理に失敗しました。',
    }, { status: 400 });

  } catch (error) {
    console.error('Webhook Error (Reservation):', error);
    return NextResponse.json(
      {
        success: false,
        message: '現在メンテナンス中です。お急ぎの方はお電話にてご連絡ください。'
      },
      { status: 503 }
    );
  }
}
