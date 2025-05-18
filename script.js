const dictionary = [];

const dictionaryDiv = document.getElementById("dictionary");
const searchInput = document.getElementById("search");
const newTermInput = document.getElementById("newTerm");
const newDescInput = document.getElementById("newDesc");
const addBtn = document.getElementById("addBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");

let deleteMode = false;

function renderDictionary(list) {
  dictionaryDiv.innerHTML = "";
  list.forEach((item, index) => {
    const termDiv = document.createElement("div");
    termDiv.className = "term";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "term-checkbox";
    checkbox.dataset.index = index;
    if (deleteMode) checkbox.classList.add("show");

    const termName = document.createElement("div");
    termName.className = "term-name";
    termName.textContent = item.term;

    const termDesc = document.createElement("div");
    termDesc.className = "term-desc";
    termDesc.textContent = item.desc;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "term-buttons";

  const editBtn = document.createElement("button");
editBtn.textContent = "수정";
editBtn.addEventListener("click", () => {
  const newTerm = prompt("제목을 수정하세요", item.term);
  const newDesc = prompt("설명을 수정하세요", item.desc);
  if (newTerm && newDesc) {
    dictionary[index] = { term: newTerm, desc: newDesc };
    filterDictionary();
  }
});


    buttonsDiv.appendChild(editBtn);

    termDiv.appendChild(checkbox);
    termDiv.appendChild(termName);
    termDiv.appendChild(termDesc);
    termDiv.appendChild(buttonsDiv);
    dictionaryDiv.appendChild(termDiv);

    // 설명 토글 (삭제모드 아닐 때만)
    termDiv.addEventListener("click", (e) => {
      if (deleteMode || e.target.classList.contains("term-checkbox") || e.target.tagName === "BUTTON") return;
      termDesc.classList.toggle("open");
    });
  });
}

function filterDictionary() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = dictionary.filter(item => item.term.toLowerCase().includes(keyword));
  renderDictionary(filtered);
}

function addNewTerm() {
  const term = newTermInput.value.trim();
  const desc = newDescInput.value.trim();
  if (!term || !desc) {
    alert("제목과 설명을 모두 입력해주세요.");
    return;
  }
  dictionary.push({ term, desc });
  newTermInput.value = "";
  newDescInput.value = "";
  filterDictionary();
}

function toggleDeleteMode() {
  if (!deleteMode) {
    deleteMode = true;
    deleteSelectedBtn.textContent = "선택 삭제";
  } else {
    const checkedBoxes = document.querySelectorAll(".term-checkbox:checked");
    if (checkedBoxes.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    const indexes = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.index)).sort((a, b) => b - a);
    indexes.forEach(i => dictionary.splice(i, 1));
    deleteMode = false;
    deleteSelectedBtn.textContent = "삭제";
  }
  filterDictionary();
}

// 이벤트 바인딩
searchInput.addEventListener("input", filterDictionary);
addBtn.addEventListener("click", addNewTerm);
deleteSelectedBtn.addEventListener("click", toggleDeleteMode);

renderDictionary(dictionary);