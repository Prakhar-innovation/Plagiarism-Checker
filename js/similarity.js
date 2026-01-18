function cosineSimilarity(vec1, vec2) {
  let dot = 0;
  let mag1 = 0;
  let mag2 = 0;

  for (let key in vec1) {
    if (vec2[key]) {
      dot += vec1[key] * vec2[key];
    }
    mag1 += vec1[key] * vec1[key];
  }

  for (let key in vec2) {
    mag2 += vec2[key] * vec2[key];
  }

  mag1 = Math.sqrt(mag1);
  mag2 = Math.sqrt(mag2);

  if (mag1 === 0 || mag2 === 0) return 0;

  return (dot / (mag1 * mag2)) * 100;
}
