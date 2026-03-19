// document.addEventListener("DOMContentLoaded", () => {

  // 브라우저의 자동 스크롤 복원 기능을 수동으로 변경 (최상단에 배치)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
  
  // 페이지 로드 시 스크롤을 맨 위(0, 0)로 이동
  window.scrollTo(0, 0);

  // EmailJS 초기화
  emailjs.init("AgGe-xzTfJSdfVVQc");

  // 스크롤 페이드인
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // 네비게이션 active 상태
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  // 햄버거 메뉴
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // 메뉴 클릭 시 자동 닫힘
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // EmailJS Send Message
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name       = document.getElementById('field-name').value.trim();
      const phone      = document.getElementById('field-phone').value.trim();
      const lessonType = document.getElementById('field-lesson').value;
      const message    = document.getElementById('field-message').value.trim();

      if (!name || !phone || !lessonType || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }

      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending...';

      emailjs.send("service_p3erpgr", "template_8b110ew", {
        name:        name,
        phone:       phone,
        lesson_type: lessonType,
        message:     message,
      })
      .then(() => {
        sendBtn.textContent = 'Message Sent ✓';
        sendBtn.style.background = 'var(--mint-dark)';
        sendBtn.style.color = 'white';
        sendBtn.style.border = 'none';
        document.getElementById('field-name').value = '';
        document.getElementById('field-phone').value = '';
        document.getElementById('field-lesson').value = '';
        document.getElementById('field-message').value = '';
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        sendBtn.textContent = 'Failed. Try Again.';
        sendBtn.disabled = false;
      });
    });
  }

});