
$(function () {
    // 헤더?
    // document.addEventListener('DOMContentLoaded', function () {
    //     const menuItems = document.querySelectorAll('#header .left div');
    //     const sections = document.querySelectorAll('section');

    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 // If the section is intersecting with the viewport
    //                 // Hide all menu items
    //                 menuItems.forEach(item => item.classList.remove('active'));

    //                 // Show the corresponding menu item
    //                 const index = Array.from(sections).indexOf(entry.target);
    //                 menuItems[index + 1].classList.add('active');
    //             }
    //         });
    //     }, { threshold: 0.5 }); // Adjust the threshold as needed

    //     // Observe each section
    //     sections.forEach(section => observer.observe(section));
    // });

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

    document.addEventListener('DOMContentLoaded', function () {
        const container = document.querySelector('.background-container');
        const copies = document.querySelectorAll('.background-copy');

        // Number of copies
        const numCopies = copies.length;

        window.addEventListener('scroll', function () {
            // 현재 스크롤 위치 구하기
            const scrollPosition = window.scrollY;

            // 스크롤 위치에 따라 특정 비율의 이미지를 보여주기
            for (let i = 0; i < numCopies; i++) {
                if (i === 0) {
                    // nth-child(1)일 경우에는 고정으로 나오도록 설정
                    copies[i].style.opacity = 1;
                } else {
                    // 다른 이미지들은 스크롤 위치에 따라 특정 비율의 효과 적용
                    const percentage = ((scrollPosition - copies[i].offsetTop) / window.innerHeight) * 100;
                    copies[i].style.opacity = Math.max(0, Math.min(1, (percentage - (i - 1) * 20) / 20));
                }
            }
        });
    });
})