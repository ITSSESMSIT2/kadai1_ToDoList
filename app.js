const form = document.querySelector("#inputGroup");
const ul = document.querySelector("#taskContainer");
const taskList = [];

const day = new Date();
const dayString = day.toISOString();
console.log(dayString);
const sliceDay = dayString.slice(0, 10);
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
  console.log(taskList);
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
  const deleteImg = document.createElement("img");
  deleteImg.src = "Vector.png";
  deleteImg.alt = "削除ボタン";
  deleteButton.appendChild(deleteImg);

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
    limitSpan.innerText = `${task.limit}`;
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
  // ボタン（画像）を押すと親要素が削除されるように設定
  // nodeNameと完全一致にすると、画像が判定から外れてしまうのでclosestメソッドを利用。
  // クリックした（=イベントが発火した）ものに一番近接の要素がボタンならばというif文
  // if (ev.target.closest("BUTTON")) {
  //   const parent = ev.target.parentElement;
  //   console.log(parent);
  //   // IMGの親要素であるliと、配列の中のliが一致するかTFを返すメソッドを用意
  //   const parentId = Number(parent.querySelector("#idSpan").innerText);
  //   const equalIdValue = (element) => element.id === parentId;
  //   // 初めにtrueを返す要素のインデックスを渡すfindIndexを利用
  //   const deliteTargetIndex = Number(taskList.findIndex(equalIdValue));
  //   if (deliteTargetIndex !== -1 && deliteTargetIndex !== null) {
  //     // 配列から、一致するインデックスの要素一項目のみを削除
  //     taskList.splice(deliteTargetIndex, 1);
  //     //画面上からも削除。IMGからもっとも近いli要素を指定する。
  //     ev.target.closest("li").remove();
  //   }
    // 確認用　console.log(taskList);
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
    const parentIdValue = Number(parentId.innerText);
    // 確認用　console.log(parentIdValue);
    // 配列内のid要素と、idSpanの中の数字が一致する要素を探すboolean式を用意
    const equalIdValue = (element) => element.id === parentIdValue;
    // findIndex(配列内の要素で、初めに一致するものを返す)を利用し検索、インデックスを数字で返してもらう
    const targetIndex = Number(taskList.findIndex(equalIdValue));
    if (targetIndex !== -1 && targetIndex !== null) {
      // .changeStatusはliのselect要素につけたclass名
      const changeStatusValue = parent.querySelector(".changeStatus").value;
      taskList[targetIndex].status = changeStatusValue;
    }
  }
});
