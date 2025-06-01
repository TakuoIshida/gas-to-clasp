
/**
 * スプレッドシートから次の当番のemailを取得し、Slackに通知するGASメイン関数
 */
function notifyDutyOnSlack() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('team');
  if (!sheet) throw new Error('シート「team」が見つかりません');
  const data = sheet.getDataRange().getValues();
  console.log(`data: ${JSON.stringify(data)}`);
  if (data.length < 2) throw new Error('データがありません');

  // 1行目はヘッダー、2行目以降がデータ
  const rows = data.slice(1);
  const numbers = rows.map(row => Number(row[0])).filter(n => !isNaN(n));
  const maxNumber = Math.max(...numbers);
  // 最後の当番番号を取得（最終行の番号と仮定）
  const lastNumber = sheet.getRange(sheet.getLastRow(), 1).getValue();
  const nextNumber = lastNumber >= maxNumber ? 1 : lastNumber + 1;
  // 次の当番行を検索
  const nextRow = rows.find(row => Number(row[0]) === nextNumber);
  if (!nextRow) throw new Error('次の当番が見つかりません');
  const email = nextRow[2];
  sendSlackMention(email);
  // 最終行の番号を次の番号に更新
  sheet.getRange(sheet.getLastRow(), 1).setValue(nextNumber);
}

/**
 * Slack Webhookでメンション通知を送信
 * @param email 通知先のメールアドレス
 */
function sendSlackMention(email: string) {
  const props = PropertiesService.getScriptProperties();
  const webhookUrl = props.getProperty('SLACK_WEBHOOK_URL');
  if (!webhookUrl) throw new Error('SLACK_WEBHOOK_URLが設定されていません');
  const payload = {
    text: `今日の朝会当番は、${email}さんです。おねがいします！`
  };
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  };
  UrlFetchApp.fetch(webhookUrl, options);
}

/**
 * 平日朝9時にnotifyDutyOnSlackを実行するトリガーを作成
 */
function setWeekdayTrigger() {
  const triggeredFunctionName = 'notifyDutyOnSlack';
  ScriptApp.newTrigger(triggeredFunctionName)
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

// gasからfunc指定で呼び出せるようにする
globalThis.notifyDutyOnSlack = notifyDutyOnSlack;
globalThis.setWeekdayTrigger = setWeekdayTrigger;