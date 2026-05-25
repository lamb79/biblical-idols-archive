document.addEventListener('DOMContentLoaded', () => {
    /* ==================== 1. 탭 전환 로직 (Tab Switch) ==================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // 탭 버튼 활성화 상태 변경
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 탭 콘텐츠 표시/숨김 처리
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetTab) {
                    content.classList.add('active');
                }
            });
            
            // 탭 전환 시 화면 맨 위로 부드럽게 이동
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    /* ==================== 2. 아코디언 토글 & 스크롤 (Accordion) ==================== */
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');

            // 다른 아코디언 모두 닫기
            accordions.forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.accordion-content').style.maxHeight = null;
            });

            // 클릭한 아코디언 열기
            if (!isActive) {
                accordion.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                
                // 해당 아코디언 카드가 화면에 잘 들어오도록 부드러운 스크롤링
                setTimeout(() => {
                    const y = accordion.getBoundingClientRect().top + window.scrollY - 120;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 300);
            }
        });
    });

    /* ==================== 3. 이방신 사전 필터링 (Deity DB Filter) ==================== */
    const filterEraSelect = document.getElementById('filter-era');
    const filterStrengthSelect = document.getElementById('filter-strength');
    const deityCards = document.querySelectorAll('.deity-card');
    const countNumSpan = document.getElementById('count-num');

    function filterDeities() {
        const selectedEra = filterEraSelect.value;
        const selectedStrength = filterStrengthSelect.value;
        let visibleCount = 0;

        deityCards.forEach(card => {
            const cardEra = card.getAttribute('data-era');
            const cardStrength = card.getAttribute('data-strength');

            const matchEra = (selectedEra === 'all' || cardEra === selectedEra);
            const matchStrength = (selectedStrength === 'all' || cardStrength === selectedStrength);

            if (matchEra && matchStrength) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 개수 동적 업데이트
        countNumSpan.textContent = visibleCount;
    }

    if (filterEraSelect && filterStrengthSelect) {
        filterEraSelect.addEventListener('change', filterDeities);
        filterStrengthSelect.addEventListener('change', filterDeities);
        
        // 초기 개수 세팅
        filterDeities();
    }

    // 초기에 첫 번째 챕터를 자동으로 열어두기 (시작 연출 극대화)
    if (accordions.length > 0) {
        setTimeout(() => {
            accordions[0].querySelector('.accordion-header').click();
        }, 500);
    }
});
