const form = document.querySelector("#inputGroup");
const ul = document.querySelector("#taskContainer");
const taskList = [];

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
  const trashImg = document.createElement("img");
  trashImg.src = "Vector.png";
  // 配列の中に画像も入れて、クリックした画像からidを拾えるようにしたい
  const task = {
    name: taskName.value,
    limit: taskLimit.value,
    status: taskStatus.value,
    id: taskId,
    img: trashImg,
  };
  addList(task.name, task.limit, task.status, task.id, task.img);
  // 入力欄を初期化
  taskName.value = "";
  taskLimit.value = "";
  taskStatus.value = "0";
});

// 一覧に行を加えるための関数を作成
const addList = function (addName, addLimit, addStatus, addId, addImg) {
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

  // nameが空文字もしくはnullのとき
  if (taskName.value === "" || taskName.value === null) {
    alert("タスク名を入力してください");
    // それ以外（＝タスク名が入力されている）のとき、入力されたものをliに追加
  } else {
    //それぞれのspan要素の中に実際の値を格納
    li.innerText = `${addName} ${addLimit} `;
    //Selectの中でも値を保持して表示するように設定
    statusSelect.value = addStatus;
    li.appendChild(statusSelect);
    li.id = addId;
    li.appendChild(addImg);
    ul.appendChild(li);
    // 配列の中にliをそのまま格納することで、以降の動作でTFでの返答をしやすくする。
    taskList.push(li);
    // 確認用　console.log(taskList);
  }
};

// 画像がクリックされたときに、同じ欄の中にあるToDoを削除
ul.addEventListener("click", function (ev) {
  // 画像をクリックしたら親要素が削除されるように設定
  if (ev.target.nodeName === "IMG") {
    // IMGの親要素であるliと、配列の中のliが一致するかTFを返すメソッドを用意
    const equalParentDelite = (element) => element == ev.target.parentElement;
    // 初めにtrueを返す要素のインデックスを渡すfindIndexを利用
    const deliteTargetIndex = taskList.findIndex(equalParentDelite);
    // 確認用　console.log(changeTargetIndex);
    // 配列から、一致するインデックスの要素一項目のみを削除
    taskList.splice(deliteTargetIndex, 1);
    //画面上からも削除。IMGからもっとも近いli要素を指定する。
    ev.target.closest("li").remove();
    // 確認用　console.log(taskList);
  }
});

//一覧の中で状態が変更されたら配列内の情報も更新するように設定
ul.addEventListener("change", function (eve) {
  if (eve.target.nodeName === "SELECT") {
    // 今、選択しているのはselect要素自体であり、その中の数字(value)を変えたい。
    // ただ、listにはliをそのまま格納している。
    // セレクトボタンを触ったliを配列から呼び出しておく
    const equalParentChange = (element) => element == eve.target.parentElement; //<li>
    const changeTargetIndex = taskList.findIndex(equalParentChange);
    // 確認用　console.log(changeTargetIndex);
    // querySelectorの指定範囲がdocumentでは不正確。イベントの中で対象となるかを確認したいため、渡すのはeve.target.parentElement
    const changeStatusValue =
      eve.target.parentElement.querySelector(".changeStatus").value;
    // 書き換える→innerHTMLという手段もある
    taskList[changeTargetIndex].taskStatus = changeStatusValue;
    // 以下、配列にliを入れていること、またliの中にselectを直で入れているために配列の中身まで変更されているか確認するためのconsole.log
    // console.log(taskList[0].taskStatus);
    // console.log(taskist[1].taskStatus);
  }
});
