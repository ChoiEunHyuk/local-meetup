/**
 * Custom Popup Module
 * 공통 팝업 모듈 - alert, confirm 등을 이쁜 커스텀 팝업으로 대체
 */

let Popup = (function() {
    'use strict';

    // 팝업 타입별 아이콘
    const ICONS = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        question: '❓'
    };

    /**
     * 팝업 HTML 생성
     */
    function createPopupHTML(type, message, options = {}) {
        const icon = ICONS[type] || ICONS.info;
        const title = options.title || '';

        return `
            <div class="popup-overlay" id="popupOverlay">
                <div class="popup-container ${type}">
                    <div class="popup-icon">${icon}</div>
                    ${title ? `<div class="popup-title">${title}</div>` : ''}
                    <div class="popup-message">${message}</div>
                    <div class="popup-buttons" id="popupButtons"></div>
                </div>
            </div>
        `;
    }

    /**
     * 팝업 표시
     */
    function showPopup(type, message, options = {}) {
        return new Promise((resolve, reject) => {
            // 기존 팝업 제거
            removePopup();

            // 새 팝업 생성
            $('body').append(createPopupHTML(type, message, options));

            const $overlay = $('#popupOverlay');
            const $buttons = $('#popupButtons');

            // 버튼 생성
            if (options.buttons) {
                options.buttons.forEach((btn, index) => {
                    const $button = $(`
                        <button class="popup-btn ${btn.type || 'default'}" data-index="${index}">
                            ${btn.text}
                        </button>
                    `);

                    $button.on('click', function() {
                        const result = btn.value !== undefined ? btn.value : true;
                        removePopup();
                        resolve(result);
                    });

                    $buttons.append($button);
                });
            } else {
                // 기본 확인 버튼
                const $button = $(`
                    <button class="popup-btn primary">확인</button>
                `);

                $button.on('click', function() {
                    removePopup();
                    resolve(true);
                });

                $buttons.append($button);
            }

            // 오버레이 클릭 시 닫기 (옵션)
            if (options.closeOnOverlay !== false) {
                $overlay.on('click', function(e) {
                    if ($(e.target).hasClass('popup-overlay')) {
                        removePopup();
                        resolve(false);
                    }
                });
            }

            // ESC 키로 닫기
            $(document).on('keydown.popup', function(e) {
                if (e.key === 'Escape') {
                    removePopup();
                    resolve(false);
                }
            });

            // 애니메이션 시작
            setTimeout(() => {
                $overlay.addClass('show');
            }, 10);

            // 첫 번째 버튼에 포커스
            setTimeout(() => {
                $buttons.find('.popup-btn').first().focus();
            }, 100);
        });
    }

    /**
     * 팝업 제거
     */
    function removePopup() {
        const $overlay = $('#popupOverlay');

        if ($overlay.length) {
            $overlay.removeClass('show');

            setTimeout(() => {
                $overlay.remove();
                $(document).off('keydown.popup');
            }, 300);
        }
    }

    // Public API
    return {
        /**
         * Alert 팝업 (정보 표시)
         * @param {string} message - 표시할 메시지
         * @param {object} options - 추가 옵션 (title, type 등)
         * @returns {Promise} - 확인 시 resolve
         */
        alert: function(message, options = {}) {
            const type = options.type || 'info';
            return showPopup(type, message, {
                title: options.title,
                closeOnOverlay: options.closeOnOverlay
            });
        },

        /**
         * Success 팝업
         * @param {string} message - 성공 메시지
         * @param {object} options - 추가 옵션
         * @returns {Promise}
         */
        success: function(message, options = {}) {
            return this.alert(message, { ...options, type: 'success' });
        },

        /**
         * Error 팝업
         * @param {string} message - 에러 메시지
         * @param {object} options - 추가 옵션
         * @returns {Promise}
         */
        error: function(message, options = {}) {
            return this.alert(message, { ...options, type: 'error' });
        },

        /**
         * Warning 팝업
         * @param {string} message - 경고 메시지
         * @param {object} options - 추가 옵션
         * @returns {Promise}
         */
        warning: function(message, options = {}) {
            return this.alert(message, { ...options, type: 'warning' });
        },

        /**
         * Confirm 팝업 (확인/취소)
         * @param {string} message - 확인 메시지
         * @param {object} options - 추가 옵션 (title, confirmText, cancelText 등)
         * @returns {Promise<boolean>} - 확인:true, 취소:false
         */
        confirm: function(message, options = {}) {
            const confirmText = options.confirmText || '확인';
            const cancelText = options.cancelText || '취소';
            const type = options.type || 'question';

            return showPopup(type, message, {
                title: options.title,
                closeOnOverlay: false,
                buttons: [
                    {
                        text: cancelText,
                        type: 'secondary',
                        value: false
                    },
                    {
                        text: confirmText,
                        type: 'primary',
                        value: true
                    }
                ]
            });
        },

        /**
         * Custom 팝업 (자유로운 버튼 구성)
         * @param {string} message - 메시지
         * @param {object} options - 옵션 (buttons 배열 필수)
         * @returns {Promise}
         */
        custom: function(message, options = {}) {
            const type = options.type || 'info';
            return showPopup(type, message, options);
        },

        /**
         * 팝업 강제 닫기
         */
        close: function() {
            removePopup();
        }
    };
})();

// 전역으로 노출 (선택적)
window.Popup = Popup;
