const form = document.querySelector("#inputGroup");
const ul = document.querySelector("#taskContainer");
const taskList = [];

const day = new Date();
const japanDay = day.toISOString().replace("Z", "+09:00");
// 確認用　console.log(japanDay);
const sliceDay = japanDay.slice(0, 10);
const defaultDay = document.querySelector("#taskLimit");
defaultDay.value = `${sliceDay}`;

let taskName = form.elements.taskName;
let taskLimit = form.elements.taskLimit;
let taskStatus = form.elements.taskStatus;
let taskId = 0;
// 今後、余力があれば実装したい要素。タスク進行ステータスの種類ごとの数を動的に表示
const showStatusNams = document.querySelector("#showStatusNams");

// 一覧に行を加える
form.addEventListener("submit", function (e) {
  //submitのデフォルト処理（ページ遷移）を阻止
  e.preventDefault();
  // submitが押された時点での情報を取得したいのでここ
  taskId++;
  const task = {
    name: taskName.value,
    limit: taskLimit.value,
    status: taskStatus.value,
    id: taskId,
  };
  taskList.push(task);
  // 確認用　console.log(taskList);
  addList(task);
  // 入力欄を初期化
  taskName.value = "";
  taskLimit.value = `${sliceDay}`;
  taskStatus.value = "0";
});

// 一覧に行を加えるための関数を作成
const addList = function (task) {
  // 進行状態を表すセレクトボタンを追加
  const li = document.createElement("li");
  const statusSelect = document.createElement("select");
  statusSelect.className = "changeStatus";
  const optionBefore = document.createElement("option");
  const optionNow = document.createElement("option");
  const optionFinish = document.createElement("option");
  // 未対応
  optionBefore.value = 0;
  optionBefore.text = "未対応";
  // 処理中
  optionNow.value = 1;
  optionNow.text = "処理中";
  // 完了
  optionFinish.value = 2;
  optionFinish.text = "完了";

  // selectの中にoptionを格納
  statusSelect.add(optionBefore);
  statusSelect.add(optionNow);
  statusSelect.add(optionFinish);

  // button要素を作成し、そこに子要素として画像をつける
  const deleteButton = document.createElement("button");
  deleteButton.ariaLabel = "削除";
  const deleteImg = document.createElement("img");
  deleteImg.src = "Vector.png";
  deleteImg.style.pointerEvents = "none";
  deleteButton.append(deleteImg);

  // nameが空文字もしくはnullのとき
  if (task.name === "" || task.name === null) {
    alert("タスク名を入力してください");
    // それ以外（＝タスク名が入力されている）のとき、入力されたものをliに追加
  } else {
    // CSSで整理したいため、span要素をそれぞれに作成し、その中にオブジェクトの内容を格納
    const nameSpan = document.createElement("span");
    nameSpan.id = "nameSpan";
    nameSpan.innerText = `${task.name}`;
    li.append(nameSpan);
    const limitSpan = document.createElement("span");
    limitSpan.id = "limitSpan";
    const taskLimitView = task.limit.replaceAll("-", "/");
    limitSpan.innerText = taskLimitView;
    li.append(limitSpan);
    // セレクトボタンの中にもオブジェクトの内容を反映
    statusSelect.value = task.status;
    li.append(statusSelect);
    li.append(deleteButton);
    // 検索のため、liの中にidも格納するが非表示にしておく。
    const idSpan = document.createElement("span");
    idSpan.id = "idSpan";
    idSpan.innerText = `${task.id}`;
    li.append(idSpan);
    idSpan.style.display = "none";
    // 親要素ulの中にliを格納
    ul.append(li);
  }
};

// 画像がクリックされたときに、同じ欄の中にあるToDoを削除
ul.addEventListener("click", function (ev) {
  // ボタン（画像はマウスイベントを無視）を押すと、親要素が削除されるように設定
  if (ev.target.nodeName === "BUTTON") {
    const parent = ev.target.parentElement;
    // spanにつけておいたid属性から、liの中のidを拾う
    const parentId = parent.querySelector("#idSpan");
    const parentIdNumber = Number(parentId.innerText);
    // 配列内の要素に、クリックされたliのidと一致するものがあるかを確認する関数を用意
    const checkId = (element) => element.id === parentIdNumber;
    // 初めにtrueを返す要素のインデックスを渡す、findIndexを利用
    const deliteTargetIndex = Number(taskList.findIndex(checkId));
    if (deliteTargetIndex !== -1 && deliteTargetIndex !== null) {
      // 配列から、一致するインデックスの要素一項目のみを削除
      taskList.splice(deliteTargetIndex, 1);
      //画面上からも削除。buttonからもっとも近いli要素を指定する。
      ev.target.closest("li").remove();
    }
    //確認用 console.log(taskList);
  }
});

//一覧の中で状態が変更されたら配列内の情報も更新するように設定
ul.addEventListener("change", function (eve) {
  if (eve.target.nodeName === "SELECT") {
    // 今、選択しているのはselect要素自体であり、その中のidから参照したい→親要素のIDを変数に入れる？
    const parent = eve.target.parentElement;
    //　確認用　console.log(parent);
    //　querySelectorはformに限らず、HTML内の要素を呼ぶことができる。
    const parentId = parent.querySelector("#idSpan");
    // 数字として受け取りたいので、idSpanの中に格納されている文字列としての数字にNumber()を利用
    // innerTextは必ずしも文字の更新だけに使うわけではない
    const parentIdNumber = Number(parentId.innerText);
    // 確認用　console.log(parentIdValue);
    // 配列内のid要素と、idSpanの中の数字が一致する要素を探す関数を用意
    const checkId = (element) => element.id === parentIdNumber;
    // findIndex(配列内の要素で、初めに一致するものを返す)を利用し検索、インデックスを数字で返してもらう
    const changeTargetIndex = Number(taskList.findIndex(checkId));
    if (changeTargetIndex !== -1 && changeTargetIndex !== null) {
      // .changeStatusはliのselect要素につけたclass名
      const changeStatusValue = parent.querySelector(".changeStatus").value;
      taskList[changeTargetIndex].status = changeStatusValue;
    }
  }
});
