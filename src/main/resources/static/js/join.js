/**
 * Join Page JavaScript
 * 회원가입 페이지의 유효성 검사 및 UX 기능 담당
 */

$(document).ready(function() {
    // 비밀번호 표시/숨김 토글
    $('#togglePassword').on('click', function() {
        const $passwordInput = $('#password');
        const type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordInput.attr('type', type);
        $(this).text(type === 'password' ? '👁️' : '🙈');
    });

    $('#togglePasswordConfirm').on('click', function() {
        const $passwordConfirmInput = $('#passwordConfirm');
        const type = $passwordConfirmInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordConfirmInput.attr('type', type);
        $(this).text(type === 'password' ? '👁️' : '🙈');
    });

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
    $('#password').on('input', function() {
        const password = $(this).val();
        const $strengthIndicator = $('.password-strength');
        const $strengthFill = $('.strength-fill');
        const $strengthText = $('.strength-text');

        if (password.length === 0) {
            $strengthIndicator.removeClass('show');
            return;
        }

        $strengthIndicator.addClass('show');
        const strength = checkPasswordStrength(password);

        $strengthFill.attr('class', 'strength-fill');
        if (strength <= 2) {
            $strengthFill.addClass('weak');
            $strengthText.text('약함');
        } else if (strength <= 4) {
            $strengthFill.addClass('medium');
            $strengthText.text('보통');
        } else {
            $strengthFill.addClass('strong');
            $strengthText.text('강함');
        }

        // 에러 제거
        if (password.length >= 8) {
            $(this).removeClass('error');
            $('#passwordError').removeClass('show');
        }
    });

    // 이메일 유효성 검사
    $('#email').on('blur', function() {
        const $this = $(this);
        const $emailError = $('#emailError');
        const email = $this.val();

        if (email && !validateEmail(email)) {
            $this.addClass('error').removeClass('success');
            $emailError.addClass('show');
        } else if (email) {
            $this.removeClass('error').addClass('success');
            $emailError.removeClass('show');
        }
    });

    $('#email').on('input', function() {
        const $this = $(this);
        if ($this.hasClass('error') && validateEmail($this.val())) {
            $this.removeClass('error').addClass('success');
            $('#emailError').removeClass('show');
        }
    });

    // 비밀번호 확인 검사
    $('#passwordConfirm').on('input', function() {
        const $this = $(this);
        const $passwordConfirmError = $('#passwordConfirmError');
        const $passwordConfirmSuccess = $('#passwordConfirmSuccess');
        const confirmValue = $this.val();
        const passwordValue = $('#password').val();

        if (confirmValue.length > 0) {
            if (confirmValue === passwordValue) {
                $this.removeClass('error').addClass('success');
                $passwordConfirmError.removeClass('show');
                $passwordConfirmSuccess.addClass('show');
            } else {
                $this.addClass('error').removeClass('success');
                $passwordConfirmError.addClass('show');
                $passwordConfirmSuccess.removeClass('show');
            }
        } else {
            $this.removeClass('error success');
            $passwordConfirmError.removeClass('show');
            $passwordConfirmSuccess.removeClass('show');
        }
    });

    // 비밀번호 변경 시 확인 필드도 재검사
    $('#password').on('input', function() {
        if ($('#passwordConfirm').val().length > 0) {
            $('#passwordConfirm').trigger('input');
        }
    });

    // 닉네임 유효성 검사
    $('#nickname').on('input', function() {
        const $this = $(this);
        const $nicknameError = $('#nicknameError');
        const nickname = $this.val();

        if (nickname.length > 0) {
            if (nickname.length < 2) {
                $this.addClass('error').removeClass('success');
                $nicknameError.text('닉네임은 최소 2자 이상이어야 합니다').addClass('show');
            } else if (nickname.length > 20) {
                $this.addClass('error').removeClass('success');
                $nicknameError.text('닉네임은 최대 20자까지 가능합니다').addClass('show');
            } else {
                $this.removeClass('error').addClass('success');
                $nicknameError.removeClass('show');
            }
        } else {
            $this.removeClass('error success');
            $nicknameError.removeClass('show');
        }
    });

    // 전체 동의 체크박스
    $('#agreeAll').on('change', function() {
        const isChecked = $(this).prop('checked');
        $('#agreeTerms, #agreePrivacy').prop('checked', isChecked);
    });

    // 개별 체크박스
    $('#agreeTerms, #agreePrivacy').on('change', function() {
        const allChecked = $('#agreeTerms').prop('checked') && $('#agreePrivacy').prop('checked');
        $('#agreeAll').prop('checked', allChecked);
    });

    // 폼 제출 처리
    $('#joinForm').on('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const errors = [];

        // 이메일 검증
        const emailValue = $('#email').val();
        if (!emailValue || !validateEmail(emailValue)) {
            $('#email').addClass('error');
            $('#emailError').addClass('show');
            errors.push('이메일');
            isValid = false;
        }

        // 비밀번호 검증
        const passwordValue = $('#password').val();
        if (!passwordValue || passwordValue.length < 8) {
            $('#password').addClass('error');
            $('#passwordError').text('비밀번호는 최소 8자 이상이어야 합니다').addClass('show');
            errors.push('비밀번호');
            isValid = false;
        }

        // 비밀번호 확인 검증
        const passwordConfirmValue = $('#passwordConfirm').val();
        if (!passwordConfirmValue || passwordConfirmValue !== passwordValue) {
            $('#passwordConfirm').addClass('error');
            $('#passwordConfirmError').addClass('show');
            errors.push('비밀번호 확인');
            isValid = false;
        }

        // 닉네임 검증
        const nicknameValue = $('#nickname').val();
        if (!nicknameValue || nicknameValue.length < 2) {
            $('#nickname').addClass('error');
            $('#nicknameError').text('닉네임은 최소 2자 이상이어야 합니다').addClass('show');
            errors.push('닉네임');
            isValid = false;
        }

        // 약관 동의 검증
        if (!$('#agreeTerms').prop('checked') || !$('#agreePrivacy').prop('checked')) {
            Popup.warning('필수 약관에 동의해주세요.');
            isValid = false;
        }

        if (isValid) {
            // 로딩 상태 표시
            $('#joinBtn').hide().prop('disabled', true);
            $('#loading').show();

            // AJAX로 회원가입 요청
            const userData = {
                email: emailValue,
                password: passwordValue,
                nickname: nicknameValue,
                region: $('#region').val() || null
            };

            $.ajax({
                url: '/insertUser.do',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(userData),
                success: function(data) {
                    $('#loading').hide();
                    $('#joinBtn').show().prop('disabled', false);

                    if (data.success) {
                        Popup.success(data.message).then(() => {
                            // 회원가입 성공 시 로그인 페이지로 이동
                            window.location.href = '/login.do';
                        });
                    } else {
                        Popup.error(data.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    $('#loading').hide();
                    $('#joinBtn').show().prop('disabled', false);
                    Popup.error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                }
            });
        } else {
            // 첫 번째 에러 필드로 스크롤
            const $firstError = $('.error').first();
            if ($firstError.length) {
                $firstError[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                $firstError.focus();
            }
        }
    });

    // 페이지 로드 시 이메일 입력란에 자동 포커스
    $('#email').focus();
});
