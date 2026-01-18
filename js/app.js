const checkBtn = document.getElementById("checkBtn");
const userTextArea = document.getElementById("userText");
const referenceTextArea = document.getElementById("referenceText");
const similarityValue = document.getElementById("similarityValue");
const riskLevel = document.getElementById("riskLevel");
const resultBox = document.getElementById("resultBox");

checkBtn.addEventListener("click", () => {
  const userText = userTextArea.value.trim();
  const referenceText = referenceTextArea.value.trim();

  if (!userText || !referenceText) {
    alert("Please enter both user text and reference text.");
    return;
  }

  const userWords = preprocessText(userText);
  const refWords = preprocessText(referenceText);

  const documents = [userWords, refWords];

  const userTF = termFrequency(userWords);
  const refTF = termFrequency(refWords);
  const idf = inverseDocumentFrequency(documents);

  const userVector = tfidfVector(userTF, idf);
  const refVector = tfidfVector(refTF, idf);

  let similarity = cosineSimilarity(userVector, refVector);

  // 🔹 FALLBACK FOR SHORT TEXTS
  if (similarity === 0) {
    similarity = wordOverlapSimilarity(userWords, refWords);
  }

  similarityValue.textContent = `Similarity: ${similarity.toFixed(2)}%`;
  riskLevel.textContent = `Risk Level: ${getRiskLevel(similarity)}`;

  resultBox.classList.remove("hidden");
});

/* ================== HELPERS ================== */

function wordOverlapSimilarity(words1, words2) {
  const set1 = new Set(words1);
  const set2 = new Set(words2);

  let common = 0;
  set1.forEach(word => {
    if (set2.has(word)) common++;
  });

  return (common / Math.max(set1.size, set2.size)) * 100;
}

function getRiskLevel(similarity) {
  if (similarity < 20) return "Low Risk";
  if (similarity < 50) return "Medium Risk";
  return "High Risk";
}
