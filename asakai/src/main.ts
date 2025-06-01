
/**
 * スプレッドシートから次の当番のemailを取得し、Slackに通知するGASメイン関数
 */
function notifyDutyOnSlack() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('team');
  if (!sheet) throw new Error('シート「team」が見つかりません');
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) throw new Error('データがありません'); // last_num + 説明 = 2行

  // 1行目：last_num（最後に朝会をした番号）
  // 2行目：説明
  // 3行目以降：番号、名前、メールアドレス
  const rows = data.slice(2);　// 三行目以降のデータ
  const numbers = rows.map(row => Number(row[0])).filter(n => !isNaN(n));
  const maxNumber = Math.max(...numbers);
  console.log(`maxNumber: ${maxNumber}`);
  // 最後の当番番号を取得（最終行の番号と仮定）
  const lastNumber = Number(data[0][1]); // 1行目の2列目（番号）
  console.log(`lastNumber: ${lastNumber}`);
  const nextNumber = lastNumber >= maxNumber ? 1 : lastNumber + 1;
  // 次の当番行を検索
  const nextRow = rows.find(row => Number(row[0]) === nextNumber);
  if (!nextRow) throw new Error('次の当番が見つかりません');
  const email = nextRow[2];
  console.log(`email: ${email}`);
  // sendSlackMention(email); TODO: Slack通知を有効にする
  // 最終行の番号を次の番号に更新
  const secondColumn = 2;
  const firstRow = 1;
  sheet.getRange(firstRow, secondColumn).setValue(nextNumber); // 1行目の2列目に次の番号を設定
  console.log(`A2セルの値: ${sheet.getRange(firstRow, secondColumn).getValue()}`);
  console.log(`nextNumber: ${nextNumber}`);
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