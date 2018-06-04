export function escapeHtml(text) {
  var map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'"
  }

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

console.log(99, escapeHtml('&amp;'))
