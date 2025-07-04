fetch('pages.json')
  .then(response => response.json())
  .then(pages => {
    function getCurrentPageIndex() {
      const path = location.pathname;
      let current = pages.findIndex(p => path.endsWith('/' + p.file));
      if (current !== -1) return current;
      // Support path-based routing like /page/2
      const match = path.match(/\/page\/(\d+)/i);
      if (match) {
        const pageNum = match[1];
        return pages.findIndex(p => p.name === pageNum);
      }
      if (path === "/" || path.endsWith("index.html")) return 0;
      return 0;
    }

    const currentIndex = getCurrentPageIndex();
    const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
    const nextIndex = (currentIndex + 1) % pages.length;

    let html = '';
    html += `<a href="${pages[prevIndex].file}">&lt;</a>`;
    pages.forEach((p, i) => {
      html += `<a href="${p.file}"${i === currentIndex ? ' class="active"' : ''}>${p.name}</a>`;
    });
    html += `<a href="${pages[nextIndex].file}">&gt;</a>`;

    const el = document.getElementById('pagination');
    if (el) el.innerHTML = html;
  })
  .catch(error => {
    console.error("Failed to load pagination:", error);
  });
