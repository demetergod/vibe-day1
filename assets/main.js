// 스크롤 등장 애니메이션
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 다크 모드 토글
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const syncLabel = () => toggle.setAttribute('aria-label', root.dataset.theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
syncLabel();
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  syncLabel();
});
// 직접 선택한 적이 없으면 시스템 설정 변경을 따라감
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (err) {}
  if (!saved) { root.dataset.theme = e.matches ? 'dark' : 'light'; syncLabel(); }
});

// 현재 페이지 메뉴 표시
const here = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
document.querySelectorAll('header nav a').forEach(a => {
  if (a.getAttribute('href').replace(/\.html$/, '') === here) a.setAttribute('aria-current', 'page');
});

// 모바일 메뉴
const header = document.querySelector('header');
const menuBtn = document.querySelector('.menu-toggle');
menuBtn.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
