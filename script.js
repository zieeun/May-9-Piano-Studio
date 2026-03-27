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
  const animateElements = document.querySelectorAll('.fade-in, .fade-right, .fade-left');
  animateElements.forEach(el => observer.observe(el));

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

// EmailJS를 이용한 상담 신청 폼 제출 처리
const sendBtn = document.getElementById('send-btn');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    // 1. 사용자 입력값 가져오기 및 공백 제거(trim)
    const name       = document.getElementById('field-name').value.trim();
    const phone      = document.getElementById('field-phone').value.trim();
    const lessonType = document.getElementById('field-lesson').value;
    const message    = document.getElementById('field-message').value.trim();

    // 2. 유효성 검사 (모든 필드가 채워졌는지 확인)
    if (!name || !phone || !lessonType || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // 3. 전송 중 중복 클릭 방지 및 상태 표시
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    // 4. EmailJS 서비스 호출 (서비스 ID, 템플릿 ID, 전송할 데이터)
    emailjs.send("service_p3erpgr", "template_ashkx9l", {
      name:        name,
      phone:       phone,
      lesson_type: lessonType,
      message:     message,
    })
    .then(() => {
      // 5. 전송 성공 시 UX 처리: 버튼 UI 변경 및 입력란 초기화
      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.style.background = 'var(--mint-dark)';
      sendBtn.style.color = 'white';
      sendBtn.style.border = 'none';

      // 폼 데이터 리셋
      document.getElementById('field-name').value = '';
      document.getElementById('field-phone').value = '';
      document.getElementById('field-lesson').value = '';
      document.getElementById('field-message').value = '';
    })
    .catch((err) => {
      // 6. 전송 실패 시 에러 로그 출력 및 버튼 복구
      console.error('EmailJS Error:', err);
      sendBtn.textContent = 'Failed to send. Please try again.';
      sendBtn.disabled = false;
    });
  });
}

});