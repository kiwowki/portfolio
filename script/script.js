$(document).ready(function () {
    // 스크롤 이벤트 리스너 등록
    $(window).on('scroll', function () {
        updateHeaderVisibility();
    });

    // 페이지 로딩 후 초기 적용
    updateHeaderVisibility();

    // intro 타이틀, 이미지 등장 설정
    document.querySelectorAll(".split").forEach(desc => {
        let splitText = desc.innerText;
        let splitWrap = splitText.split('').join("</span><span aria-hidden='true'>");
        splitWrap = "<span aria-hidden='true'>" + splitWrap + "</span>";
        desc.innerHTML = splitWrap;
        desc.setAttribute("aria-label", splitText);
    });

    gsap.set(".intro_title .title .title_t1, .intro_title .title .title_t2", { overflow: "hidden" });
    gsap.set(".intro_title .title .title_t1 p", { opacity: 0, translateY: 500, z: -1000 });
    gsap.set(".intro_title .title .title_t2 p", { opacity: 0, translateY: -500, z: -1000 });
    gsap.set(".images_wrap .flip-container", { scale: 2, opacity: 0 });
    gsap.set("#header", { y: -500 });

    let imageElements = document.querySelectorAll(".images_wrap .flip-container");
    let shuffledImages = Array.from(imageElements).sort(() => Math.random() - 0.5);

    let tl = gsap.timeline();

    tl.to(".intro_title .title .title_t1 p, .intro_title .title .title_t2 p", { duration: 0.7, opacity: 1, translateY: 0, stagger: 0.5 });
    tl.to(shuffledImages, { duration: 0.3, opacity: 1, scale: 1, stagger: 0.2 });
    tl.to("#header", { duration: 1.2, y: 0 });

    // intro 이미지 뒤집으면 글자 나오게
    function flipCard(element) {
        const flipper = element.querySelector('.flipper');
        flipper.style.transform = flipper.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    }

    $('.flip-container').click(function () {
        // flipCard 함수 호출
        flipCard(this);
    });
});

// 스크롤 위치에 따른 헤더 메뉴 업데이트 함수
function updateHeaderVisibility() {
    const headerLeft = document.querySelector('.left');
    const introSection = document.getElementById('intro');
    const aboutSection = document.getElementById('about');

    const introOffset = introSection.offsetTop;
    const aboutOffset = aboutSection.offsetTop;

    if (window.scrollY < aboutOffset && window.scrollY >= introOffset) {
        // Intro section
        headerLeft.querySelectorAll('.visual').forEach(item => {
            item.style.display = 'block';
            item.style.opacity = 1;
        });
        headerLeft.querySelectorAll('.about, .works, .skills, .playground, .contact, .comment').forEach(item => {
            item.style.display = 'none';
            item.style.opacity = 0;
        });
    } else if (window.scrollY >= aboutOffset) {
        // About section and beyond
        headerLeft.querySelectorAll('.visual').forEach(item => {
            item.style.display = 'none';
            item.style.opacity = 0;
        });
        headerLeft.querySelectorAll('.about, .works, .skills, .playground, .contact, .comment').forEach(item => {
            item.style.display = 'block';
            item.style.opacity = 1;
        });
    }
}

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