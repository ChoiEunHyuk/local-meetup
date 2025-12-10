/**
 * Login Page JavaScript
 * 로그인 페이지의 유효성 검사 및 UX 기능 담당
 */

// DOM이 완전히 로드된 후 실행
$(document).ready(function() {
    // 비밀번호 표시/숨김 토글
    $('#togglePassword').on('click', function() {
        const $passwordInput = $('#password');
        const type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordInput.attr('type', type);
        $(this).text(type === 'password' ? '👁️' : '🙈');
    });

    // 이메일 유효성 검사 함수
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 이메일 입력 필드 실시간 유효성 검사
    $('#email').on('blur', function() {
        const $this = $(this);
        const $emailError = $('#emailError');
        const email = $this.val();

        if (email && !validateEmail(email)) {
            $this.addClass('error');
            $emailError.addClass('show');
        } else {
            $this.removeClass('error');
            $emailError.removeClass('show');
        }
    });

    // 이메일 입력 시 에러 제거
    $('#email').on('input', function() {
        const $this = $(this);
        if ($this.hasClass('error') && validateEmail($this.val())) {
            $this.removeClass('error');
            $('#emailError').removeClass('show');
        }
    });

    // 비밀번호 입력 시 에러 제거
    $('#password').on('input', function() {
        const $this = $(this);
        if ($this.val().length > 0) {
            $this.removeClass('error');
            $('#passwordError').removeClass('show');
        }
    });

    // 폼 제출 처리
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // 이메일 검증
        const emailValue = $('#email').val();
        if (!emailValue || !validateEmail(emailValue)) {
            $('#email').addClass('error');
            $('#emailError').addClass('show');
            isValid = false;
        }

        // 비밀번호 검증
        const passwordValue = $('#password').val();
        if (!passwordValue) {
            $('#password').addClass('error');
            $('#passwordError').addClass('show');
            isValid = false;
        }

        if (isValid) {
            // 로딩 상태 표시
            $('#loginBtn').hide().prop('disabled', true);
            $('#loading').show();

            // 실제 환경에서는 서버로 전송
            // 현재는 시뮬레이션 (1초 후 실제 폼 제출)
            const form = this;
            setTimeout(function() {
                // 여기서 실제 폼 제출을 수행
                form.submit();
            }, 1000);
        }
    });

    // Enter 키로 폼 제출
    $('#password').on('keypress', function(e) {
        if (e.key === 'Enter') {
            $('#loginForm').trigger('submit');
        }
    });

    // 페이지 로드 시 이메일 입력란에 자동 포커스
    $('#email').focus();
});
