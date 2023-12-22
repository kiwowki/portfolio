$(document).ready(function () {
    // 스크롤 이벤트 리스너 등록
    $(window).on('scroll', function () {
        updateHeaderVisibility();
    });

    // 페이지 로딩 후 초기 적용
    updateHeaderVisibility();


    // 텍스트 분할 애니메이션 함수(기본)
    function applyTextSplitAnimation(selector, staggerAmount, staggerFrom) {
        gsap.utils.toArray(selector).forEach(text => {
            let theText = text.innerText;
            let newText = "";

            for (let i = 0; i < text.innerText.length; i++) {
                newText += "<span aria-hidden='true'>";

                if (theText[i] === " ") {
                    newText += "&nbsp;";
                } else if (theText[i] === "\n") {
                    newText += "<br>";
                } else {
                    newText += theText[i];
                }

                newText += "</span>";
            }
            text.innerHTML = newText;
            text.setAttribute("aria-label", theText);
        });

        gsap.utils.toArray(selector).forEach(text => {
            gsap.from(text.querySelectorAll("span"), {
                yPercent: 100,
                autoAlpha: 0,
                duration: 0.5,
                opacity: 0,
                ease: "circ.out",
                stagger: {
                    amount: staggerAmount,
                    from: staggerFrom
                },
                scrollTrigger: {
                    trigger: text,
                    start: "top bottom",
                    end: "+400",
                    markers: true
                }
            });
        });


    }

    // 초기 설정 및 이미지 나타기 효과
    gsap.set(".intro_title .title .title_t1, .intro_title .title .title_t2", { overflow: "hidden" });
    gsap.set(".intro_title .title .title_t1 p", { opacity: 0, y: 100, z: -1000 });
    gsap.set(".intro_title .title .title_t2 p", { opacity: 0, y: -100, z: -1000 });
    gsap.set(".images_wrap .flip-container", { opacity: 0, scale: 2.5 });
    gsap.set("#header", { y: -500 });

    let imageElements = document.querySelectorAll(".images_wrap .flip-container");
    let shuffledImages = Array.from(imageElements).sort(() => Math.random() - 0.5);

    setTimeout(() => {
        let tl = gsap.timeline();

        tl.to(".intro_title .title .title_t1 p, .intro_title .title .title_t2 p", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "a");
        tl.to(shuffledImages, { duration: 0.2, opacity: 1, scale: 1, stagger: 0.2 });
        tl.to("#header", { duration: 1.2, y: 0 });
    }, 2000);

    // 이미지 뒤집으면 글자 나오게
    function flipCard(element) {
        const flipper = element.querySelector('.flipper');
        flipper.style.transform = flipper.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    }

    $('.flip-container').click(function () {
        flipCard(this);
    });

    // .split 클래스를 가진 모든 요소에 대한 텍스트 분할 애니메이션
    applyTextSplitAnimation(".split", 0.7, "start");
    applyTextSplitAnimation(".split2", 0.3, "random");
    applyTextSplitAnimation(".split3", 0.5, "start");

    // // 추가 텍스트에 대한 페이드인 효과
    // gsap.to(".text.t7 p", {
    //     opacity: 1,
    //     duration: 0.5,
    //     stagger: 0.5,
    //     scrollTrigger: {
    //         trigger: ".text.t7",
    //         start: "top bottom",
    //         end: "+400",
    //         markers: true
    //     }
    // });


    // about_text_top
    // about_text_top 글자 애니메이션
    const targetsT1 = gsap.utils.toArray(".about_text_top .t1.split");
    const targetsT2 = gsap.utils.toArray(".about_text_top .t2.split");
    const targetsT3 = gsap.utils.toArray(".about_text_top .t3.split");

    targetsT1.forEach(target => {
        let splitClient = new SplitType(target, { type: "lines, words, chars" });
        let chars = splitClient.chars;

        gsap.from(chars, {
            yPercent: 50,
            opacity: 0,
            rotation: 10,
            duration: 0.3,
            stagger: 0.1,
            scrollTrigger: {
                trigger: target,
                start: "top bottom",
                end: "+400",
                markers: true
            }
        });
    });
    targetsT2.forEach(target => {
        let splitClient = new SplitType(target, { type: "lines, words, chars" });
        let chars = splitClient.chars;

        gsap.from(chars, {
            yPercent: 50,
            opacity: 0,
            rotation: 10,
            duration: 0.1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: target,
                start: "top bottom",
                end: "+400",
                markers: true
            }
        });
    });
    targetsT3.forEach(target => {
        let splitClient = new SplitType(target, { type: "lines, words, chars" });
        let chars = splitClient.chars;

        gsap.from(chars, {
            yPercent: 50,
            opacity: 0,
            rotation: 10,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: target,
                start: "top bottom",
                end: "+400",
                markers: true
            }
        });
    });



});




// header
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

// 헤더 숨기기 효과
const showNav = gsap.from("#header", {
    yPercent: -200,
    paused: true,
    duration: 0.8
}).progress(1);

ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse()
    }
});

const container = document.querySelector('.background-container');
const copies = document.querySelectorAll('.background-copy');

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
            const offsetAdjustment = 600;

            // 다른 이미지들은 스크롤 위치에 따라 특정 비율의 효과 적용
            const percentage = ((scrollPosition - (copies[i].offsetTop + offsetAdjustment)) / window.innerHeight) * 100;
            copies[i].style.opacity = Math.max(0, Math.min(1, (percentage - (i - 1) * 10) / 10));
        }
    }
});





// about photos 2 랜덤이미지
// 이미지 파일 이름을 배열에 저장합니다.
const imageArray = ["img/about_img2.jpg", "img/about_img3.jpg", "img/about_img4.jpg"];

// 모든 photo 클래스를 가진 div 요소를 선택합니다.
const photoElements = document.querySelectorAll(".p2 .about_photos_img .photo");

// 각 요소에 대해 랜덤한 이미지를 적용합니다.
photoElements.forEach((photoElement) => {
    // 랜덤한 숫자를 생성하여 배열에서 이미지를 선택합니다.
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    const randomImage = imageArray[randomIndex];

    // 선택된 이미지를 배경으로 설정합니다.
    photoElement.style.backgroundImage = `url('${randomImage}')`;
});


// work gsap 핀 효과 넣기
const works = gsap.utils.toArray(".work");

works.forEach((work, i) => {
    const img = work.querySelector(".img img");

    const ani = gsap.timeline();
    ani.to(img, {
        scale: 1.5,
    });

    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    if (mediaQuery.matches) {
        ScrollTrigger.create({
            trigger: work,
            start: "top top",
            end: "bottom top",
            scrub: true,
        });
    } else {
        ScrollTrigger.create({
            animation: ani,
            trigger: work,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
        });
    }
});




//contact// GSAP ScrollTrigger 플러그인을 사용하여 스크롤 트리거를 초기화합니다.
function adjustContactSize() {
    gsap.to(".contact_wrap .mid .img_wrap", {
        width: "53%", // 커지는 너비 설정
        scrollTrigger: {
            trigger: "#contact", // 트리거로 사용할 요소
            start: "top bottom", // 트리거가 시작되는 지점
            end: "bottom top", // 트리거가 종료되는 지점
            scrub: true, // 스크롤에 따른 애니메이션 강도
        },
    });
}

window.addEventListener("load", adjustContactSize);

