
$(function () {
    // 전역 스코프에서 flipCard 함수 정의
    function flipCard(element) {
        const flipper = element.querySelector('.flipper');
        flipper.style.transform = flipper.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    }

    // 문서가 로드된 후에 실행
    $(document).ready(function () {
        $('.flip-container').click(function () {
            // flipCard 함수 호출
            flipCard(this);
        });
    });
})