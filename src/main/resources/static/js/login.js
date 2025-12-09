/**
 * Login Page JavaScript
 * 로그인 페이지의 유효성 검사 및 UX 기능 담당
 */

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 가져오기
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const loading = document.getElementById('loading');

    // 비밀번호 표시/숨김 토글
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // 이메일 유효성 검사 함수
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 이메일 입력 필드 실시간 유효성 검사
    emailInput.addEventListener('blur', function() {
        const emailError = document.getElementById('emailError');
        if (this.value && !validateEmail(this.value)) {
            this.classList.add('error');
            emailError.classList.add('show');
        } else {
            this.classList.remove('error');
            emailError.classList.remove('show');
        }
    });

    // 이메일 입력 시 에러 제거
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error') && validateEmail(this.value)) {
            this.classList.remove('error');
            document.getElementById('emailError').classList.remove('show');
        }
    });

    // 비밀번호 입력 시 에러 제거
    passwordInput.addEventListener('input', function() {
        const passwordError = document.getElementById('passwordError');
        if (this.value.length > 0) {
            this.classList.remove('error');
            passwordError.classList.remove('show');
        }
    });

    // 폼 제출 처리
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // 이메일 검증
        if (!emailInput.value || !validateEmail(emailInput.value)) {
            emailInput.classList.add('error');
            document.getElementById('emailError').classList.add('show');
            isValid = false;
        }

        // 비밀번호 검증
        if (!passwordInput.value) {
            passwordInput.classList.add('error');
            document.getElementById('passwordError').classList.add('show');
            isValid = false;
        }

        if (isValid) {
            // 로딩 상태 표시
            loginBtn.style.display = 'none';
            loading.style.display = 'block';
            loginBtn.disabled = true;

            // 실제 환경에서는 서버로 전송
            // 현재는 시뮬레이션 (1초 후 실제 폼 제출)
            setTimeout(() => {
                // 여기서 실제 폼 제출을 수행
                this.submit();
            }, 1000);
        }
    });

    // Enter 키로 폼 제출
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // 페이지 로드 시 이메일 입력란에 자동 포커스
    emailInput.focus();
});
