const pages = [
    { name: "1", file: "Index.html" },
    { name: "2", file: "Page2.html" },
    { name: "3", file: "Page3.html" }
];

const currentPage = location.pathname.split('/').pop();
let currentIndex = pages.findIndex(p => p.file === currentPage);

if (currentIndex === -1) currentIndex = 0; // fallback

let html = '';

const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
const nextIndex = (currentIndex + 1) % pages.length;

html += `<a href="${pages[prevIndex].file}">&lt;</a>`;
pages.forEach((p, i) => {
    html += `<a href="${p.file}"${i === currentIndex ? ' class="active"' : ''}>${p.name}</a>`;
});
html += `<a href="${pages[nextIndex].file}">&gt;</a>`;

document.getElementById('pagination').innerHTML = html;