let students = [];
const studentNumbers = [...Array(18).keys()].map(n => n + 1).concat(20); // 1~18, 20번

function assignFruits() {
  const fruits = [
    ...Array(6).fill("🍓 딸기"),
    ...Array(6).fill("🍉 수박"),
    ...Array(6).fill("🍌 바나나"),
    ...Array(5).fill("🍈 멜론"),
    ...Array(5).fill("🍎 사과"),
    ...Array(5).fill("🍇 포도"),
    ...Array(5).fill("🥑 아보카도")
  ];

  const shuffled = fruits.sort(() => Math.random() - 0.5);
  students = [];

  while (shuffled.length >= 2 && students.length < studentNumbers.length) {
    let fruit1 = shuffled.pop();
    let fruit2Index = shuffled.findIndex(f => f !== fruit1);
    if (fruit2Index === -1) break;
    let fruit2 = shuffled.splice(fruit2Index, 1)[0];
    students.push({
      number: studentNumbers[students.length],
      fruits: [fruit1, fruit2]
    });
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  students.forEach((student) => {
    const studentDiv = document.createElement("div");
    studentDiv.className = "student-box";
    studentDiv.innerHTML = `
      <div class="student-title">${student.number}번</div>
      <div>${student.fruits[0]}</div>
      <div>${student.fruits[1]}</div>
    `;
    resultDiv.appendChild(studentDiv);
  });

  document.getElementById("fruit-groups").innerHTML = "";
}

function showFruitGroups() {
  const fruitOrder = ["🍓 딸기", "🍉 수박", "🍌 바나나", "🍈 멜론", "🍎 사과", "🍇 포도", "🥑 아보카도"];
  const fruitMap = {};
  fruitOrder.forEach(fruit => fruitMap[fruit] = []);

  students.forEach((student) => {
    student.fruits.forEach((fruit) => {
      fruitMap[fruit].push(`${student.number}번`);
    });
  });

  const maxLen = Math.max(...Object.values(fruitMap).map(list => list.length));

  let tableHTML = `<h2>🍎 과일별 학생 목록</h2><table><tr>`;
  fruitOrder.forEach(fruit => {
    tableHTML += `<th class="fruit-header">${fruit}</th>`;
  });
  tableHTML += `</tr>`;

  for (let i = 0; i < maxLen; i++) {
    tableHTML += `<tr>`;
    fruitOrder.forEach(fruit => {
      const studentText = fruitMap[fruit][i] || "";
      tableHTML += `<td class="fruit-cell">${studentText}</td>`;
    });
    tableHTML += `</tr>`;
  }
  tableHTML += `</table>`;

  document.getElementById("fruit-groups").innerHTML = tableHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("assign-btn").addEventListener("click", assignFruits);
  document.getElementById("show-btn").addEventListener("click", showFruitGroups);
});
