/**
 * Join Page JavaScript
 * 회원가입 페이지의 유효성 검사 및 UX 기능 담당
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 가져오기
    const joinForm = document.getElementById('joinForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('passwordConfirm');
    const nicknameInput = document.getElementById('nickname');
    const regionInput = document.getElementById('region');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const togglePasswordConfirmBtn = document.getElementById('togglePasswordConfirm');
    const agreeAllCheckbox = document.getElementById('agreeAll');
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const agreePrivacyCheckbox = document.getElementById('agreePrivacy');
    const joinBtn = document.getElementById('joinBtn');
    const loading = document.getElementById('loading');

    // 비밀번호 표시/숨김 토글
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    if (togglePasswordConfirmBtn) {
        togglePasswordConfirmBtn.addEventListener('click', function() {
            const type = passwordConfirmInput.type === 'password' ? 'text' : 'password';
            passwordConfirmInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // 이메일 유효성 검사 함수
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 비밀번호 강도 검사 함수
    function checkPasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        return strength;
    }

    // 비밀번호 강도 표시
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = document.querySelector('.password-strength');
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        if (password.length === 0) {
            strengthIndicator.classList.remove('show');
            return;
        }

        strengthIndicator.classList.add('show');
        const strength = checkPasswordStrength(password);

        strengthFill.className = 'strength-fill';
        if (strength <= 2) {
            strengthFill.classList.add('weak');
            strengthText.textContent = '약함';
        } else if (strength <= 4) {
            strengthFill.classList.add('medium');
            strengthText.textContent = '보통';
        } else {
            strengthFill.classList.add('strong');
            strengthText.textContent = '강함';
        }

        // 에러 제거
        if (password.length >= 8) {
            this.classList.remove('error');
            document.getElementById('passwordError').classList.remove('show');
        }
    });

    // 이메일 유효성 검사
    emailInput.addEventListener('blur', function() {
        const emailError = document.getElementById('emailError');
        if (this.value && !validateEmail(this.value)) {
            this.classList.add('error');
            this.classList.remove('success');
            emailError.classList.add('show');
        } else if (this.value) {
            this.classList.remove('error');
            this.classList.add('success');
            emailError.classList.remove('show');
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error') && validateEmail(this.value)) {
            this.classList.remove('error');
            this.classList.add('success');
            document.getElementById('emailError').classList.remove('show');
        }
    });

    // 비밀번호 확인 검사
    passwordConfirmInput.addEventListener('input', function() {
        const passwordConfirmError = document.getElementById('passwordConfirmError');
        const passwordConfirmSuccess = document.getElementById('passwordConfirmSuccess');

        if (this.value.length > 0) {
            if (this.value === passwordInput.value) {
                this.classList.remove('error');
                this.classList.add('success');
                passwordConfirmError.classList.remove('show');
                passwordConfirmSuccess.classList.add('show');
            } else {
                this.classList.add('error');
                this.classList.remove('success');
                passwordConfirmError.classList.add('show');
                passwordConfirmSuccess.classList.remove('show');
            }
        } else {
            this.classList.remove('error', 'success');
            passwordConfirmError.classList.remove('show');
            passwordConfirmSuccess.classList.remove('show');
        }
    });

    // 비밀번호 변경 시 확인 필드도 재검사
    passwordInput.addEventListener('input', function() {
        if (passwordConfirmInput.value.length > 0) {
            passwordConfirmInput.dispatchEvent(new Event('input'));
        }
    });

    // 닉네임 유효성 검사
    nicknameInput.addEventListener('input', function() {
        const nicknameError = document.getElementById('nicknameError');

        if (this.value.length > 0) {
            if (this.value.length < 2) {
                this.classList.add('error');
                this.classList.remove('success');
                nicknameError.textContent = '닉네임은 최소 2자 이상이어야 합니다';
                nicknameError.classList.add('show');
            } else if (this.value.length > 20) {
                this.classList.add('error');
                this.classList.remove('success');
                nicknameError.textContent = '닉네임은 최대 20자까지 가능합니다';
                nicknameError.classList.add('show');
            } else {
                this.classList.remove('error');
                this.classList.add('success');
                nicknameError.classList.remove('show');
            }
        } else {
            this.classList.remove('error', 'success');
            nicknameError.classList.remove('show');
        }
    });

    // 전체 동의 체크박스
    agreeAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        agreeTermsCheckbox.checked = isChecked;
        agreePrivacyCheckbox.checked = isChecked;
    });

    // 개별 체크박스
    [agreeTermsCheckbox, agreePrivacyCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            agreeAllCheckbox.checked = agreeTermsCheckbox.checked && agreePrivacyCheckbox.checked;
        });
    });

    // 폼 제출 처리
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const errors = [];

        // 이메일 검증
        if (!emailInput.value || !validateEmail(emailInput.value)) {
            emailInput.classList.add('error');
            document.getElementById('emailError').classList.add('show');
            errors.push('이메일');
            isValid = false;
        }

        // 비밀번호 검증
        if (!passwordInput.value || passwordInput.value.length < 8) {
            passwordInput.classList.add('error');
            const passwordError = document.getElementById('passwordError');
            passwordError.textContent = '비밀번호는 최소 8자 이상이어야 합니다';
            passwordError.classList.add('show');
            errors.push('비밀번호');
            isValid = false;
        }

        // 비밀번호 확인 검증
        if (!passwordConfirmInput.value || passwordConfirmInput.value !== passwordInput.value) {
            passwordConfirmInput.classList.add('error');
            document.getElementById('passwordConfirmError').classList.add('show');
            errors.push('비밀번호 확인');
            isValid = false;
        }

        // 닉네임 검증
        if (!nicknameInput.value || nicknameInput.value.length < 2) {
            nicknameInput.classList.add('error');
            const nicknameError = document.getElementById('nicknameError');
            nicknameError.textContent = '닉네임은 최소 2자 이상이어야 합니다';
            nicknameError.classList.add('show');
            errors.push('닉네임');
            isValid = false;
        }

        // 약관 동의 검증
        if (!agreeTermsCheckbox.checked || !agreePrivacyCheckbox.checked) {
            alert('필수 약관에 동의해주세요.');
            isValid = false;
        }

        if (isValid) {
            // 로딩 상태 표시
            joinBtn.style.display = 'none';
            loading.style.display = 'block';
            joinBtn.disabled = true;

            // AJAX로 회원가입 요청
            const userData = {
                email: emailInput.value,
                password: passwordInput.value,
                nickname: nicknameInput.value,
                region: regionInput.value || null
            };

            fetch('/insertUser.do', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                loading.style.display = 'none';
                joinBtn.style.display = 'block';
                joinBtn.disabled = false;

                if (data.success) {
                    alert(data.message);
                    // 회원가입 성공 시 로그인 페이지로 이동
                    window.location.href = '/login.do';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                loading.style.display = 'none';
                joinBtn.style.display = 'block';
                joinBtn.disabled = false;
                alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            });
        } else {
            // 첫 번째 에러 필드로 스크롤
            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // 페이지 로드 시 이메일 입력란에 자동 포커스
    emailInput.focus();
});
