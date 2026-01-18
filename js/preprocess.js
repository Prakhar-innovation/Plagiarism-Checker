function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);
}
