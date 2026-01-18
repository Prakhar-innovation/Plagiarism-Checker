function termFrequency(words) {
  const tf = {};
  words.forEach(word => {
    tf[word] = (tf[word] || 0) + 1;
  });

  const totalWords = words.length;
  for (let word in tf) {
    tf[word] = tf[word] / totalWords;
  }

  return tf;
}

function inverseDocumentFrequency(documents) {
  const idf = {};
  const totalDocs = documents.length;

  documents.forEach(doc => {
    const uniqueWords = new Set(doc);
    uniqueWords.forEach(word => {
      idf[word] = (idf[word] || 0) + 1;
    });
  });

  for (let word in idf) {
    idf[word] = Math.log(totalDocs / idf[word]);
  }

  return idf;
}

function tfidfVector(tf, idf) {
  const vector = {};
  for (let word in tf) {
    vector[word] = tf[word] * (idf[word] || 0);
  }
  return vector;
}
