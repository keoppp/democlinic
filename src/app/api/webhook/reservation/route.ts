import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // ① 設定ファイルから n8n Webhook URL を取得して使用するロジック
    const webhookUrl = N8N_CONFIG.RESERVATION_WEBHOOK_URL;

    if (webhookUrl) {
      // 実際の実装パターン (n8nがある場合)
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

      // n8nからのレスポンスをJSONとして読み込み、そのままフロントエンドに返す
      const n8nData = await n8nResponse.json();
      return NextResponse.json({
        success: true,
        reservationId: n8nData.reservationId || `RSV-N8N-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        message: n8nData.message || 'n8n経由で予約を受け付けました。',
        ...n8nData
      });
    }

    // デモ用処理: 擬似的な遅延と予約IDの発行
    await new Promise(resolve => setTimeout(resolve, 1500));
    // ユーザー要件: 予約ID (例: RSV-0318-ABCD)
    const dateStr = new Date().toISOString().slice(5, 10).replace('-', '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const reservationId = `RSV-${dateStr}-${randomStr}`;

    return NextResponse.json({
      success: true,
      reservationId,
      message: '予約情報を受け付けました。'
    });

  } catch (error) {
    console.error('Webhook Error (Reservation):', error);
    // ユーザー要件: メンテナンス中などのエラーハンドリング
    return NextResponse.json(
      {
        success: false,
        error: 'System Error',
        message: '現在メンテナンス中です。お急ぎの方はお電話にてご連絡ください。'
      },
      { status: 503 }
    );
  }
}
