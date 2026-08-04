const form = document.querySelector("#inputGroup");
const list = [];
let taskName = form.elements.taskName;
let taskLimit = form.elements.taskLimit;
let taskStatus = form.elements.taskStatus;
let taskId = 0;

//一覧に行を加える
form.addEventListener("submit", function (e) {
  //submitのデフォルト処理（ページ遷移）を阻止
  e.preventDefault();
  //submitが押された時点での情報を取得したいのでここ
  taskId++;
  console.log(taskId);
  const task = {
    name: taskName.value,
    limit: taskLimit.value,
    status: taskStatus.value,
    id: taskId,
  };
  addList(task.name, task.limit, task.status);
  list.push(task);
  //入力欄を初期化
  taskName.value = "";
  taskLimit.value = "";
  taskStatus.value = "0";
});

//一覧に行を加えるための関数を作成
const addList = function (addName, addLimit, addStatus) {
  // body末尾にdiv、spanを追加
  const newDiv = document.createElement("div");
  const nameSpan = document.createElement("span");
  nameSpan.id = taskId;
  const limitSpan = document.createElement("span");
  //進行状態を表すセレクトボタンを追加
  const statusSelect = document.createElement("select");
  const optionBefore = document.createElement("option");
  const optionNow = document.createElement("option");
  const optionFinish = document.createElement("option");
  //未対応
  optionBefore.value = 0;
  optionBefore.text = "未対応";
  //処理中
  optionNow.value = 1;
  optionNow.text = "処理中";
  //完了
  optionFinish.value = 2;
  optionFinish.text = "完了";

  //selectの中にoptionを格納
  statusSelect.add(optionBefore);
  statusSelect.add(optionNow);
  statusSelect.add(optionFinish);

  const img = document.createElement("img");
  img.src = "Vector.png";

  //nameが空文字もしくはnullのとき
  if (name.value === "" || name.value === null) {
    alert("タスク名を入力してください");
    // それ以外（＝タスク名が入力されている）のとき、入力されたものを新規作成したdivに追加
  } else {
    // newDivの中に、子要素としてnameSpan,limitSpanを追加
    newDiv.appendChild(nameSpan);
    newDiv.appendChild(limitSpan);
    //それぞれのspan要素の中に実際の値を格納
    nameSpan.innerText = `${addName}`;
    limitSpan.innerText = `${addLimit}`;
    //Selectの中でも値を保持して表示するように設定

    statusSelect.value = addStatus;
    newDiv.appendChild(statusSelect);
    newDiv.appendChild(img);
    container.appendChild(newDiv);
  }
};

//画像がクリックされたときに、同じ欄の中にあるToDoを削除。
const container = document.querySelector("#container");
container.addEventListener("click", function (ev) {
  if (ev.target.nodeName === "IMG") {
    console.log(ev.target);
    console.log(ev.target.parentElement);
    //配列からもクリックされた要素を削除
    list.splice(taskId, 1);
    ev.target.parentElement.remove();
    console.log(list);
  }
});

//一覧の中で状態が変更されたら配列内の情報も更新するように設定
container.addEventListener("change", function (eve) {
  if (eve.target.nodeName === "SELECT") {
    console.log(eve.target);
  }
});
