const form = document.querySelector("#inputGroup");
const ul = document.querySelector("#container");
const list = [];

let taskName = form.elements.taskName;
let taskLimit = form.elements.taskLimit;
let taskStatus = form.elements.taskStatus;
let taskId = 0;
const showStatusNams = document.querySelector("#showStatusNams");
// showStatusNams.innerText=`未対応${}・処理中${}・完了${}`

//一覧に行を加える
form.addEventListener("submit", function (e) {
  //submitのデフォルト処理（ページ遷移）を阻止
  e.preventDefault();
  //submitが押された時点での情報を取得したいのでここ
  taskId++;
  console.log(`IDは${taskId}`);
  const trashImg = document.createElement("img");
  trashImg.src = "Vector.png";
  //配列の中に画像も入れて、クリックした画像からidを拾えるようにしたい
  const task = {
    name: taskName.value,
    limit: taskLimit.value,
    status: taskStatus.value,
    id: taskId,
    img: trashImg,
  };
  addList(task.name, task.limit, task.status, task.id, task.img);
  //入力欄を初期化
  list.push(task);
  taskName.value = "";
  taskLimit.value = "";
  taskStatus.value = "0";
});

//一覧に行を加えるための関数を作成
const addList = function (addName, addLimit, addStatus, addId, addImg) {
  const li = document.createElement("li");
  li.classList.add("taskLi");
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

  //nameが空文字もしくはnullのとき
  if (taskName.value === "" || taskName.value === null) {
    alert("タスク名を入力してください");
    // それ以外（＝タスク名が入力されている）のとき、入力されたものをliに追加
  } else {
    //それぞれのspan要素の中に実際の値を格納
    li.innerText = `${addName}${addLimit}`;
    //Selectの中でも値を保持して表示するように設定
    statusSelect.value = addStatus;
    li.appendChild(statusSelect);
    li.appendChild(addImg);
    ul.appendChild(li);
    console.log(list);
  }
};

// 画像がクリックされたときに、同じ欄の中にあるToDoを削除
// imgをliの中の要素にしているので、可能であればこのイベントが発火する位置はliにしたいが、
// liの追加を指定しているのがaddList関数の中であるため指定できない。
// liにタグをつけてquerySelectorAllで呼び出し、新しい関数に格納する？
// addEventListernerは単一の要素に対してしか使えないため、querySelectorAllでは矛盾する。

const taskLi = document.querySelector(".taskLi");
console.log(taskLi);
taskLi.addEventListener("click", function (ev) {
  // 画像をクリックしたら親要素が削除されるように設定
  if (ev.target.nodeName === "IMG") {
    console.log(ev.target.id);
    const equalNum = (element) => element === ev.target.id;
    console.log(list.findIndex(equalNum));
    const targetIndex = list.findIndex(equalNum);
    list.splice(targetIndex, 1);
    ev.target.closest("li").remove();
    console.log(list);
  }
});
/* <ul>
    <li></li>
</ul>

<div>
    <span>タスク名</span><span>期日</span><span>ステータス</span>
</div> */

//一覧の中で状態が変更されたら配列内の情報も更新するように設定
container.addEventListener("change", function (eve) {
  if (eve.target.nodeName === "SELECT") {
    console.log(eve.target);
  }
});
