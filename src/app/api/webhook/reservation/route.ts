import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const webhookUrl = N8N_CONFIG.RESERVATION_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, message: 'Webhook URLが設定されていません。' },
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

    // レスポンスボディを取得（ステータスに関わらず読み取る）
    let n8nRaw: any;
    try {
      n8nRaw = await n8nResponse.json();
    } catch {
      // JSONパース失敗
      return NextResponse.json(
        { success: false, message: 'n8nからの応答を解析できませんでした。' },
        { status: 502 }
      );
    }

    // n8n が配列で返す場合があるので先頭を取り出す
    const n8nData = Array.isArray(n8nRaw) ? n8nRaw[0] : n8nRaw;

    console.log('[API /reservation] n8n HTTP:', n8nResponse.status, 'Body:', JSON.stringify(n8nData));

    // 成功判定: n8n の status === "success" をチェック
    if (n8nData && (n8nData.status === 'success' || n8nData.success === true)) {
      return NextResponse.json({
        success: true,
        reservationId: n8nData.reservation_id || n8nData.reservationId,
        message: n8nData.message || 'ご予約を承りました。',
        triageResult: n8nData.triage_result || n8nData.triageResult || null,
      });
    }

    // 成功でない場合
    return NextResponse.json({
      success: false,
      message: n8nData?.message || '予約処理に失敗しました。',
    }, { status: n8nResponse.ok ? 200 : n8nResponse.status });

  } catch (error) {
    console.error('Webhook Error (Reservation):', error);
    return NextResponse.json(
      { success: false, message: '現在メンテナンス中です。お急ぎの方はお電話にてご連絡ください。' },
      { status: 503 }
    );
  }
}
