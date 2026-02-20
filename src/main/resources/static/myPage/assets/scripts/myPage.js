// 사이드바 메뉴 클릭 시 active 이동
const sidebarItems = document.querySelectorAll('.sidebar .menu');

const myPageWrapper = document.getElementById('myPage');
const content = myPageWrapper.querySelector(':scope > .content');

const myInformation = content.querySelector(':scope > .myInformation');
const petInformation = content.querySelector(':scope > .petInformation');
const reservationInformation = content.querySelector(':scope > .reservationInformation');

const sections = [
    myInformation,
    petInformation,
    reservationInformation
];

// 메뉴 클릭 시
sidebarItems.forEach((item, index) => {
    item.addEventListener('click', () => {

        // 1. 메뉴 active 변경
        sidebarItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        // 2. 모든 content 숨김
        sections.forEach(section => {
            section.classList.remove('visible');
        });

        // 3. 해당 index content 보이기
        if (sections[index]) {
            sections[index].classList.add('visible');
        }
    });
});


// 주소 관리, 등록 모달
const deliveryModal = document.getElementById('delivery-change-modal');

const deliveryModalOpenButton = myInformation.querySelector('.delivery-open-button');

deliveryModalOpenButton.addEventListener('click', () => {
    deliveryModal.classList.add('visible');
    modalContent.classList.add('visible');
    deliveryRegistrationModal.classList.remove('visible');
});

const deliveryModalCloseButton = deliveryModal.querySelector('.close-btn');

deliveryModalCloseButton.addEventListener('click', () => {
    closeModal();
});



const selectBtns = document.querySelectorAll('.select-btn');
selectBtns.forEach(selectBtn => {
    selectBtn.addEventListener('click', () => {
        closeModal(deliveryModal);
    })
})

const deleteBtns = document.querySelectorAll('.delivery-item .delete-btn');
deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('이 배송지를 삭제하시겠습니까?')) {
            const item = e.target.closest('.delivery-item');
            const isDefault = item.querySelector('.default-badge') !== null;

            item.remove();

            if (isDefault) {
                document.querySelector('.delivery-name .input').value = '';
                document.querySelector('.orderer-name .input').value = '';
                document.querySelector('.postal-code').textContent = '';
                document.querySelector('.about-address').textContent = '';
                document.querySelector('.detail-address .detail').value = '';
                document.querySelector('.phone-num .num-select').value = '010';
                document.querySelector('.phone-num .input').value = '';
            }
        }
    });
});


const modalRegistrationButton = deliveryModal.querySelector('.add-btn');
const modalContent = deliveryModal.querySelector(':scope > .modal-content');
const deliveryRegistrationModal = deliveryModal.querySelector(':scope > .delivery-registration');

modalRegistrationButton.addEventListener('click', () => {
    modalContent.classList.remove('visible');
    deliveryRegistrationModal.classList.add('visible');
});

deliveryRegistrationModal.querySelector('.close-btn').addEventListener('click', () => {
    closeModal();
});







// 주소검색 띄우기
const addressFind = deliveryRegistrationModal.querySelector(':scope > .registration-wrapper > .label > .button');
const addressWrapper = document.getElementById('address-wrapper');
const addressContainer = document.getElementById('address-container');
const modalCover = deliveryModal.querySelector('.modal-cover');
const postalInput = deliveryRegistrationModal.querySelector('.postalCode');
const primaryAddressInput = deliveryRegistrationModal.querySelector('.addressPrimary');
const detailAddressInput = deliveryRegistrationModal.querySelector('.addressSecondary');

addressFind.addEventListener('click', () => {
    addressWrapper.classList.add('visible');
    modalCover.classList.add('visible');
    addressContainer.innerHTML = '';
    new daum.Postcode({
        oncomplete: function(data) {
            // 우편번호
            postalInput.value = data.zonecode;
            primaryAddressInput.value = data.roadAddress || data.jibunAddress;
            addressWrapper.classList.remove('visible');
            modalCover.classList.remove('visible');
            detailAddressInput.focus();
        }
    }).embed(addressContainer);
});

const addressCancelButton = addressWrapper.querySelector(':scope > .button');
addressCancelButton.addEventListener('click', () => {
    addressWrapper.classList.remove('visible');
    modalCover.classList.remove('visible');
});



// 이름 변경 모달
const nameChangeModalOpen = myInformation.querySelector('.nameChangeButton');
const nameChangeModal = document.getElementById('name-change-modal');
const nameChangeModalCancelButton = nameChangeModal.querySelector('.close-btn');

nameChangeModalOpen.addEventListener('click', () => {
    nameChangeModal.classList.add('visible');
});

nameChangeModalCancelButton.addEventListener('click', () => {
    nameChangeModal.classList.remove('visible');
});


// 닉네임 변경 모달
const nicknameChangeModalOpen = myInformation.querySelector('.nicknameChangeButton');
const nicknameChangeModal = document.getElementById('nickname-change-modal');
const nicknameChangeModalCancelButton = nicknameChangeModal.querySelector('.close-btn');

nicknameChangeModalOpen.addEventListener('click', () => {
    nicknameChangeModal.classList.add('visible');
});

nicknameChangeModalCancelButton.addEventListener('click', () => {
    nicknameChangeModal.classList.remove('visible');
});



// 전화번호 변경 모달
const phoneChangeModalOpen = myInformation.querySelector('.phoneChangeButton');
const phoneChangeModal = document.getElementById('phone-change-modal');
const phoneChangeModalCancelButton = phoneChangeModal.querySelector('.close-btn');

phoneChangeModalOpen.addEventListener('click', () => {
    phoneChangeModal.classList.add('visible');
});

phoneChangeModalCancelButton.addEventListener('click', () => {
   phoneChangeModal.classList.remove('visible');
});



// 비밀번호 변경 모달
const passwordChangeModalOpen = myInformation.querySelector('.passwordChangeButton');
const passwordChangeModal = document.getElementById('password-change-modal');
const passwordChangeModalCancelButton = passwordChangeModal.querySelector('.close-btn');

passwordChangeModalOpen.addEventListener('click', () => {
    passwordChangeModal.classList.add('visible');
});

passwordChangeModalCancelButton.addEventListener('click', () => {
    passwordChangeModal.classList.remove('visible');
});


// 유저 탈퇴 모달
const deleteUserModalOpen = myInformation.querySelector('.deleteUserButton');
const deleteUserModal = document.getElementById('delete-user-modal');
const deleteUserModalCancelButton = deleteUserModal.querySelector('.close-btn');

deleteUserModalOpen.addEventListener('click', () => {
    deleteUserModal.classList.add('visible');
});

deleteUserModalCancelButton.addEventListener('click', () => {
    deleteUserModal.classList.remove('visible');
});



// 모달 닫기
function closeModal() {
    deliveryModal.classList.remove('visible');
    currentEditingItem = null;
}


// 애완동물 강아지 종
const dogTypes = [
    "세상에하나뿐인믹스",
    "고든세터",
    "골든두들",
    "골든리트리버",
    "그레이하운드",
    "그레이트데인",
    "그레이트스위스마운틴도그",
    "그레이트피레니즈",
    "그로넨달",
    "그리스셰퍼드",
    "그리스헤어하운드",
    "그린란드견",
    "글렌오브이말테리어",
    "기슈견",
    "까나리오",
    "꼬동드툴레아",
    "나폴리탄마스티프",
    "노르보텐스피츠",
    "노르웨이안룬트훈트",
    "노르웨이안버훈트",
    "노르웨이안엘크하운드",
    "노르위치테리어",
    "노르포크테리어",
    "노바스코셔덕톨링리트리버",
    "뉴펀들랜드",
    "닥스훈트",
    "달마시안",
    "대니시스웨디시팜독",
    "댄디딘몬트테리어",
    "더치셰퍼드",
    "도고까나리오",
    "도고아르헨티노",
    "도그드보르도",
    "도베르만",
    "도사견",
    "동경견(경주개)",
    "드레버",
    "디어하운드",
    "라고토로마뇰로",
    "라사압소",
    "라이카",
    "라지먼스터랜더",
    "라케노이즈",
    "라포니안허더",
    "래브라도리트리버",
    "랫테리어",
    "러셀테리어",
    "러스키토이",
    "러처",
    "레드본쿤하운드",
    "레온베르거",
    "레이크랜드테리어",
    "로디지안리지백",
    "로첸",
    "로트와일러",
    "루마니안미오리틱셰퍼드독",
    "리틀라이언독",
    "마스티프",
    "마운틴커",
    "말리노이즈",
    "말티즈",
    "맨체스터테리어",
    "무디",
    "미니어처불테리어",
    "미니어처슈나우저",
    "미니어처핀셔",
    "미니어처아메리칸셰퍼드",
    "바베트",
    "바센지",
    "바셋포브드브레타뉴",
    "바셋하운드",
    "배들링턴테리어",
    "버거피카드",
    "버니즈마운틴독",
    "벨지안셰퍼드독",
    "보더콜리",
    "보더테리어",
    "보르도마스티프",
    "보르조이",
    "보비에드플란더스",
    "보스롱(뷰세런)",
    "보스턴테리어",
    "보어보엘",
    "보이킨스패니얼",
    "복서",
    "볼로네즈",
    "불마스티프",
    "불테리어",
    "불도그",
    "브라질리언가드독",
    "브라코이탈리아노",
    "브리어드",
    "브리타니스파니엘",
    "블랙러시안테리어",
    "블러드하운드",
    "비글",
    "비숑프리제",
    "비어디드콜리",
    "비즐라",
    "사모예드",
    "살루키",
    "삽살개",
    "샤페이",
    "세인트버나드",
    "셔틀랜드쉽독",
    "슈나우저",
    "스태포드셔불테리어",
    "스탠다드푸들",
    "스피츠",
    "시바견",
    "시베리안허스키",
    "시추",
    "실키테리어",
    "아메리칸불리",
    "아메리칸스태포드셔테리어",
    "아메리칸아키타견",
    "아메리칸에스키모독",
    "아메리칸코커스파니엘",
    "아이리시세터",
    "아이리시울프하운드",
    "아키타견",
    "아프간하운드",
    "알래스칸말라뮤트",
    "에어데일테리어",
    "오스트레일리안셰퍼드독",
    "오스트레일리안캐틀독",
    "오스트레일리안켈피",
    "올드잉글리시쉽독",
    "와이마라너",
    "요크셔테리어",
    "웰시코기",
    "이탈리안그레이하운드",
    "잉글리시불독",
    "잉글리시세터",
    "잭러셀테리어",
    "저먼셰퍼드독",
    "저먼스피츠",
    "제주개",
    "진돗개",
    "차우차우",
    "치와와",
    "카네코르소",
    "카발리에킹찰스스패니얼",
    "케리블루테리어",
    "코카스파니엘",
    "콜리",
    "킹찰스스파니엘",
    "토이푸들",
    "퍼그",
    "페키니즈",
    "포메라니안",
    "푸들",
    "풍산개",
    "프렌치불독",
    "플랫코티드리트리버",
    "핏불테리어",
    "하바니즈",
    "호바와트",
    "홋카이도견",
    "휘핏",
    "기타"
];
// 애완동물 고양이 종
const catTypes = [
    '세상에 하나뿐인 믹스',
    '네벨룽',
    '노르웨이 숲고양이',
    '데본렉스',
    '돈스코이',
    '라가머핀',
    '라이코이',
    '라팜',
    '라팜 쇼트헤어',
    '랙돌',
    '러시안 블루',
    '맹크스',
    '먼치킨',
    '먼치킨 롱헤어',
    '메인쿤',
    '미뉴엣 (나폴레옹)',
    '미뉴엣 롱헤어',
    '민스킨',
    '발리니즈',
    '뱅갈',
    '버만',
    '버미즈',
    '버밀라',
    '봄베이',
    '브라질리안 쇼트헤어',
    '브리티시 롱헤어',
    '브리티시 쇼트헤어',
    '사바나',
    '샤트룩스',
    '샴',
    '세렝게티',
    '셀커크 렉스',
    '셀커크 렉스 롱헤어',
    '소말리',
    '소코케',
    '스노우 슈',
    '스코티시 스트레이트',
    '스코티시 폴드',
    '스코티시 폴드 롱헤어',
    '스키프 토이 밥테일',
    '스핑크스',
    '시베리안 고양이',
    '싱가푸라',
    '싸이프러스 아프로디테',
    '아라비안 마우',
    '아메리칸 밥테일',
    '아메리칸 밥테일 쇼트헤어',
    '아메리칸 쇼트헤어',
    '아메리칸 와이어헤어',
    '아메리칸 컬',
    '아비시니안',
    '엑조틱 쇼트헤어',
    '오리엔탈 고양이',
    '오스트레일리안 미스트',
    '오시캣',
    '오호스 아즐레스',
    '오호스 아즐레스 롱헤어',
    '요크 초콜릿',
    '유러피안 버미즈',
    '유러피안 숏헤어',
    '이그조틱 고양이',
    '이집션 마우',
    '자바니즈',
    '재패니즈 밥테일',
    '저먼 렉스',
    '쵸시',
    '카오마니',
    '캘리포니아 스팽글드',
    '컬러포인트 숏헤어',
    '코니시 렉스',
    '코랏',
    '코리안 쇼트헤어',
    '쿠리리안 밥테일',
    '킴릭',
    '타이',
    '터키시 앙고라',
    '터키시 반',
    '토이거',
    '통키니즈',
    '페르시안',
    '피터볼드',
    '픽시 밥',
    '픽시 밥 롱헤어',
    '하바나 브라운',
    '하이랜더',
    '하이랜드 폴드',
    '히말라얀',
    '기타'
];










// region 회원가입 네번쨰 단계(개인+애완동물 로직)

/*============마이페이지 애완동물================*/

const $petRegistrationButton = petInformation.querySelector('.pet-card.add-card');
const $petDialogs = document.querySelectorAll('.dialog');
const $petDialogFirst = document.getElementById('petFirst');

const $petDialogSecond = document.getElementById('petSecond');
const $petDialogThird = document.getElementById('petThird');

// 무슨 애완동물 종류를 골랐는지
let selectType = null; // 강아지,고양이,그 외

// 모든 dialog 닫는 함수
function closeAllPetDialogs() {
    $petDialogs.forEach(dialog => {
        dialog.classList.remove('visible');
    });
    closeWrapper()
}

// dialog 내 모든 wrapper 닫기
function closeWrapper() {
    $petDialogFirst.querySelector(':scope > .anotherType-wrapper').classList.remove('visible');
    $petDialogSecondPetTypeWrapper.classList.remove('visible');
    yearWrapper.classList.remove('visible');
    monthWrapper.classList.remove('visible');
    dateWrapper.classList.remove('visible');
}

// dialog 하나만 열게하기
function openDialog(dialogStep) {
    currentStep = dialogStep;
    if (dialogStep === 1) {
        $petDialogFirst.classList.add('visible');
        $petDialogSecond.classList.remove('visible');
        $petDialogThird.classList.remove('visible');
    }
    if (dialogStep === 2) {
        $petDialogFirst.classList.remove('visible');
        $petDialogSecond.classList.add('visible');
        $petDialogThird.classList.remove('visible');
    }
    if (dialogStep === 3) {
        $petDialogFirst.classList.remove('visible');
        $petDialogSecond.classList.remove('visible');
        $petDialogThird.classList.add('visible');
    }
}

let currentStep = 1;
function goDialogNextStep() {
    if (currentStep === 1) {
        if (!selectType) {
            return;
        }
        if (petNameInput.value.trim() === '') {
            return;
        }
        openDialog(2);
        return;
    }
    if (currentStep === 2) {
        if (selectType !== 'another') {
            if (dialogSecondPetTypeInput.value.trim() === '') {
                return;
            }
        }
        openDialog(3);
    }
}

const $petDialogThirdCompleteButton = $petDialogThird.querySelector(':scope > .complete');

// 애완동물 첫번째 페이지 초기화
function resetDialogFirst() {
    $petDialogFirst.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.checked = false;
    });
    $petDialogFirst.querySelector(':scope > .petName-wrapper > .petName').value = '';
    $petDialogFirst.querySelector(':scope > .anotherType-wrapper').classList.remove('visible');
    selectType = null;
    $petDialogFirstNextButton.setAttribute('disabled', '');
}


function resetDialogSecond() {
    $petDialogSecond.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    preview.src = '';
    circle.classList.remove('visible');
    $petDialogSecondPetTypeWrapper.classList.remove('visible');
    birthWrappers.forEach(wrapper => {
        wrapper.classList.remove('visible');
    });
    $petDialogSecondNextButton.setAttribute('disabled', '');
    dialogSecondNextButton();
}

function resetDialogThird() {
    const genderInputs = $petDialogThird.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(gender => {
        gender.checked = false;
    });
    $petDialogThird.querySelector(':scope > .petWeightLabel > .weight-wrapper > .weight').value = '';
    const weightInputs = $petDialogThird.querySelectorAll('input[name="weightType"]');
    weightInputs.forEach(weightType => {
        weightType.checked = false;
    });
    $petDialogThirdCompleteButton.setAttribute('disabled', '');
}

function resetAllDialog() {
    resetDialogFirst()
    resetDialogSecond()
    resetDialogThird()
}

let editMod = null;

// 회원가입 네번째 단계에서 애완동물 등록버튼을 눌렀을 때
$petRegistrationButton.addEventListener('click', () => {
    editMod = null;
    resetAllDialog();
    openDialog(1);
});

// 애완동물 Dialog에서 취소버튼을 눌러 창을 껐을 때
$petDialogs.forEach(step => {
    const dialogCancelButton = step.querySelector(':scope > .cancel');

    dialogCancelButton.onclick = () => {
        closeAllPetDialogs()
        // 등록 모드일 때만 초기화
        if (!editMod) {
            resetAllDialog();
        }
        currentStep = 1;
        editMod = null; // 취소하면 editMod 초기화
    };
});


const dogSelect = $petDialogFirst.querySelector(':scope > .select-wrapper > .dog');
const catSelect = $petDialogFirst.querySelector(':scope > .select-wrapper > .cat');
const anotherSelect = $petDialogFirst.querySelector(':scope > .select-wrapper > .another');

dogSelect.addEventListener('click', () => {
    selectType = 'dog';
    dialogFirstNextButton()
    if (!editMod) {
        resetDialogSecond();
        resetDialogThird();
    }
    $petDialogFirst.querySelector(':scope > .anotherType-wrapper').classList.remove('visible');
    $petDialogFirst.querySelector(':scope > .anotherType-wrapper > .typeSelect').value = '';
    $petDialogSecond.querySelector(':scope > .selectedPetType > .petType').value = '';
    dialogSecondNextButton();
});
catSelect.addEventListener('click', () => {
    selectType = 'cat';
    dialogFirstNextButton()
    if (!editMod) {
        resetDialogSecond();
        resetDialogThird();
    }
    $petDialogFirst.querySelector(':scope > .anotherType-wrapper').classList.remove('visible');
    $petDialogFirst.querySelector(':scope > .anotherType-wrapper > .typeSelect').value = '';
    $petDialogSecond.querySelector(':scope > .selectedPetType > .petType').value = '';
    dialogSecondNextButton();
});
anotherSelect.addEventListener('click', () => {
    selectType = 'another';
    dialogFirstNextButton()

    $petDialogFirst.querySelector(':scope > .anotherType-wrapper').classList.add('visible');
    $petDialogSecond.querySelector(':scope > .selectedPetType > .petType').value = '';
    $petDialogSecondPetTypeWrapper.classList.remove('visible');
    if (!editMod) {
        resetDialogSecond();
        resetDialogThird();
    }
    dialogSecondNextButton();
});


function dialogFirstNextButton() {
    // 공통: 이름은 필수
    if (!selectType || petNameInput.value.trim() === '') {
        $petDialogFirstNextButton.setAttribute('disabled', '');
        return;
    }
    // another일 경우: 종류 선택도 필수
    if (selectType === 'another') {
        const anotherSelect = $petDialogFirst
            .querySelector(':scope > .anotherType-wrapper > .typeSelect');
        if (!anotherSelect.value) {
            $petDialogFirstNextButton.setAttribute('disabled', '');
            return;
        }
    }
    // 조건 다 만족하면 활성화
    $petDialogFirstNextButton.removeAttribute('disabled');
}


const petNameInput = $petDialogFirst.querySelector(':scope > .petName-wrapper > .petName');
petNameInput.addEventListener('input', () => {
    dialogFirstNextButton()
});


const anotherTypeSelect = $petDialogFirst.querySelector(':scope > .anotherType-wrapper > .typeSelect');
anotherTypeSelect.addEventListener('change', () => {
    dialogFirstNextButton();
});

// 애완동물 DialogFirst에서 다음버튼을 눌렀을 때
const $petDialogFirstNextButton = $petDialogFirst.querySelector(':scope > .button');
$petDialogFirstNextButton.addEventListener('click', () => {
    if (selectType === 'dog') {
        getTypeList(dogTypes);
        $petDialogSecondSelectType.classList.remove('hidden');
    } else if (selectType === 'cat') {
        getTypeList(catTypes);
        $petDialogSecondSelectType.classList.remove('hidden');
    } else if (selectType === 'another') {
        $petDialogSecondSelectType.classList.add('hidden');
        $petDialogSecondNextButton.removeAttribute('disabled');
    }
    goDialogNextStep();
});

// 애완동물 DialogSecond에서 이전버튼을 눌렀을 때
const $petDialogPreviousButton = $petDialogSecond.querySelector(':scope > .previous');
$petDialogPreviousButton.addEventListener('click', () => {
    currentStep = 1;
    openDialog(1);
    $petDialogSecondPetTypeWrapper.classList.remove('visible');
    birthWrappers.forEach(wrapper => {
        wrapper.classList.remove('visible');
    });
});

// 애완동물 DialogSecond에서 다음버튼을 눌렀을 때
const $petDialogSecondNextButton = $petDialogSecond.querySelector(':scope > .button');
$petDialogSecondNextButton.addEventListener('click', () => {
    goDialogNextStep();
});

// 애완동물 DialogSecond에서 이미지를 등록했을 때
const circle = $petDialogSecond.querySelector(':scope > .image-wrapper > .circle');
const preview = circle.querySelector(':scope > .preview');
const fileInput = circle.querySelector(':scope > .image');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        preview.src = reader.result;
        circle.classList.add('visible'); // add 숨기고 이미지 표시
    };
    reader.readAsDataURL(file);
});

// 애완동물 DialogSecond에서 종류선택을 클릭했을 때, 열고 취소 버튼을 눌렀을 때
const $petDialogSecondSelectType = $petDialogSecond.querySelector(':scope > .selectedPetType');
const $petDialogSecondPetTypeWrapper = $petDialogSecond.querySelector(':scope > .selectPetType');
$petDialogSecondSelectType.addEventListener('click', () => {
    $petDialogSecondPetTypeWrapper.classList.add('visible');
    typeList.scrollTop = 0;
});
const $petDialogSecondSelectTypeCancelButton = $petDialogSecondPetTypeWrapper.querySelector(':scope > .cancel');
$petDialogSecondSelectTypeCancelButton.addEventListener('click', () => {
    $petDialogSecondPetTypeWrapper.classList.remove('visible');
});



const typeList = $petDialogSecondPetTypeWrapper.querySelector(':scope > .typeList');

function getTypeList(types) {
    typeList.innerHTML = '';

    types.forEach(typeName => {
        const li = document.createElement('li');
        li.classList.add('type');
        li.textContent = typeName;
        typeList.append(li);
    });
}

const dialogSecondPetTypeInput = $petDialogSecondSelectType.querySelector(':scope > .petType');
function dialogSecondNextButton() {
    if (selectType === 'another') {
        $petDialogSecondNextButton.removeAttribute('disabled');
        return;
    }

    // selectType이 dog/cat인 경우
    if (dialogSecondPetTypeInput.value.trim() !== '') {
        $petDialogSecondNextButton.removeAttribute('disabled');
    } else {
        $petDialogSecondNextButton.setAttribute('disabled', '');
    }
}


// 애완동물 종 검색기능
const typeSearch = $petDialogSecondPetTypeWrapper.querySelector(':scope > .typeSearch');

typeSearch.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();

    typeList.querySelectorAll('.type').forEach(li => {
        li.style.display = li.textContent.includes(keyword) ? '' : 'none';
    });
});

// 애완동물 종 선택기능
typeList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('type')) {
        return;
    }
    $petDialogSecondSelectType.querySelector(':scope > .petType').value = e.target.textContent;
    $petDialogSecondPetTypeWrapper.classList.remove('visible');
    dialogSecondNextButton()
});


// 애완동물 생년월일
const yearList = $petDialogSecond.querySelector(':scope > .yearList-wrapper > .yearList');
const currentYear = new Date().getFullYear();
const minYear = currentYear - 40;
for (let year = currentYear; year >= minYear; year--) {
    const li = document.createElement('li');
    li.classList.add('year');
    li.textContent = `${year}년`;
    yearList.append(li);
}
yearList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('year')) {
        return;
    }
    petYear.value = e.target.textContent;
    const year = parseInt(petYear.value);
    const month = parseInt(petMonth.value);
    getLastDate(year, month);
    yearWrapper.classList.remove('visible');
});

const monthList = $petDialogSecond.querySelector(':scope > .monthList-wrapper > .monthList');
for (let month = 1; month <= 12; month++) {
    const li = document.createElement('li');
    li.classList.add('month');
    li.textContent = `${month}월`;
    monthList.append(li);
}
monthList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('month')) {
        return;
    }
    petMonth.value = e.target.textContent;
    const month = parseInt(e.target.textContent);
    const year = parseInt(petYear.value || petYear.placeholder);
    getLastDate(year, month);
    monthWrapper.classList.remove('visible');
});

const dateList = $petDialogSecond.querySelector(':scope > .dateList-wrapper > .dateList');
function getLastDate(year, month) {
    dateList.innerHTML = '';
    let maxDate = 31;
    if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0 )|| year % 400 === 0) {
            maxDate = 29;
        } else {
            maxDate = 28;
        }
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        maxDate = 30;
    }
    for (let date = 1; date <= maxDate; date++) {
        const li = document.createElement('li');
        li.classList.add('date');
        li.textContent = `${date}일`;
        dateList.append(li);
    }
}
dateList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('date')) {
        return;
    }
    petDate.value = e.target.textContent;
    dateWrapper.classList.remove('visible');
});

// 애완동물 생일 누르면 아래에서 나오게 하는거
const petYear = $petDialogSecond.querySelector(':scope > .birthPet > .birth-wrapper > .field > .year');
const petMonth = $petDialogSecond.querySelector(':scope > .birthPet > .birth-wrapper > .field > .month');
const petDate = $petDialogSecond.querySelector(':scope > .birthPet > .birth-wrapper > .field > .date');
const yearWrapper = $petDialogSecond.querySelector(':scope > .yearList-wrapper');
const monthWrapper = $petDialogSecond.querySelector(':scope > .monthList-wrapper');
const dateWrapper = $petDialogSecond.querySelector(':scope > .dateList-wrapper');
// 일(1~31) 기본값 설정
const defaultYear = parseInt(petYear.placeholder);
const defaultMonth = parseInt(petMonth.placeholder);
getLastDate(defaultYear, defaultMonth);
petYear.addEventListener('click', () => {
    yearWrapper.classList.add('visible');
    yearList.scrollTop = 0;
});
petMonth.addEventListener('click', () => {
    monthWrapper.classList.add('visible');
    monthList.scrollTop = 0;
});
petDate.addEventListener('click', () => {
    dateWrapper.classList.add('visible');
    dateList.scrollTop = 0;
});

// 애완동물 생일 정보(연,월,일)에서 취소버튼을 눌렀을 때
const birthWrappers = $petDialogSecond.querySelectorAll(':scope > .birthWrapper');
birthWrappers.forEach(step => {
    const cancelButton = step.querySelector(':scope > .cancel');
    cancelButton.addEventListener('click', () => {
        step.classList.remove('visible');
    });
});


const weightInput = $petDialogThird.querySelector(':scope > .petWeightLabel > .weight-wrapper > .weight');
// 몸무게 자릿수 제한
weightInput.addEventListener('input', () => {
    if (parseFloat(weightInput.value) > 100) {
        weightInput.value = 100;
    }

    if (weightInput.value.length > 1 && weightInput.value.startsWith('0') && !weightInput.value.startsWith('0.')) {
        weightInput.value = weightInput.value.replace(/^0+/, '');
    }

    if (weightInput.value < 0) {
        weightInput.value = 0;
    }

    if (weightInput.value.includes('.')) {
        const [intPart, decimalPart] = weightInput.value.split('.');
        if (decimalPart.length > 1) {
            weightInput.value = intPart + '.' + decimalPart.slice(0, 1);
        }
    }
});
function dialogThirdCompleteButton() {
    const genderCheck = $petDialogThird.querySelector('input[name="gender"]:checked');
    const weightTypeCheck = $petDialogThird.querySelector('input[name="weightType"]:checked');
    if (genderCheck && weightInput.value.trim() !== '' && weightTypeCheck) {
        $petDialogThirdCompleteButton.removeAttribute('disabled');
    } else {
        $petDialogThirdCompleteButton.setAttribute('disabled', '');
    }
    if (weightInput.value <= 0) {
        $petDialogThirdCompleteButton.setAttribute('disabled', '');
    }
}

$petDialogThird.querySelectorAll('input[name="gender"]').forEach(gender => {
    gender.addEventListener('change',  dialogThirdCompleteButton);
});
weightInput.addEventListener('input',  dialogThirdCompleteButton);

$petDialogThird.querySelectorAll('input[name="weightType"]').forEach(type => {
    type.addEventListener('change',  dialogThirdCompleteButton);
})

// 애완동물 DialogThird에서 이전버튼을 눌렀을 때
const $petDialogThirdPreviousButton = $petDialogThird.querySelector(':scope > .previous');
$petDialogThirdPreviousButton.addEventListener('click', () => {
    currentStep = 2;
    openDialog(2);
});

const pets = [];
const petList = petInformation.querySelector(':scope > .pet-grid');

// 애완동물 DialogThird에서 작성완료 버튼을 눌렀을 때
$petDialogThirdCompleteButton.addEventListener('click', async () => {
    const genderInput = $petDialogThird.querySelector('input[name="gender"]:checked');
    const weight = $petDialogThird.querySelector(':scope > .petWeightLabel > .weight-wrapper > .weight');
    const weightTypeInput = $petDialogThird.querySelector('input[name="weightType"]:checked');
    const introduction = $petDialogSecond.querySelector(':scope > .introduction > .introduce');

    let species = null;
    if (selectType === 'another') {
        species = $petDialogFirst
            .querySelector(':scope > .anotherType-wrapper > .typeSelect')
            .value;
    } else {
        species = $petDialogSecondSelectType
            .querySelector(':scope > .petType')
            .value;
    }

    const year = parseInt((petYear.value || petYear.placeholder).replace(/\D/g,''), 10);
    const month = parseInt((petMonth.value || petMonth.placeholder).replace(/\D/g,''), 10);
    const day = parseInt((petDate.value || petDate.placeholder).replace(/\D/g,''), 10);

    const birthDate = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;


    const petData = {
        name: petNameInput.value,
        imageUrl: fileInput.files.length > 0
            ? preview.src
            : editMod
                ? editMod.imageUrl
                : '/user/assets/images/defaultPetImage.png',
        species: species,
        birthDate: birthDate,
        introduction: introduction.value,
        gender: genderInput ? genderInput.classList.contains('male') ? 'MALE' : 'FEMALE' : null,
        weight: weight.value,
        bodyType: weightTypeInput
            ? weightTypeInput.classList.contains('slim') ? 'SLIM'
                : weightTypeInput.classList.contains('normal') ? 'NORMAL'
                    : 'CHUBBY'
            : null,
        isPrimary: false
    }

    if (editMod) {
        // 수정모드
        const index = pets.findIndex(p => p.petId === editMod.petId);
        pets[index] = petData;

        const petBirth = new Date(petData.birthDate);
        const today = new Date();
        const age = today.getFullYear() - petBirth.getFullYear();
        let bodyType = null;
        if (petData.bodyType === 'SLIM') {
            bodyType = '날씬해요';
        }
        else if (petData.bodyType === 'NORMAL') {
            bodyType = '적당해요';
        }
        else if (petData.bodyType === 'CHUBBY') {
            bodyType = '통통해요';
        }

        const li = petList.querySelector(`li[data-pet-id="${editMod.petId}"]`);
        if (li) {
            li.querySelector('.pet-name > .pet-name.realName').textContent = petData.name;
            li.querySelector('.pet-name .gender').src = petData.gender === 'MALE'
                ? '/user/assets/images/male.png'
                : '/user/assets/images/female.png';
            li.querySelector('.species').textContent = `품종 : ${petData.species}`;
            li.querySelector('.birth').textContent = `나이 : ${age}살 (🍰 ${petMonth.value || petMonth.placeholder} ${petDate.value || petDate.placeholder})`;
            li.querySelector('.weight').textContent = `몸무게 : ${petData.weight}kg (${bodyType})`;
            li.querySelector('.introduction').textContent = `소개 : ${petData.introduction}`;
            li.querySelector('.petImage').src = petData.imageUrl;
        }

        // 서버로 수정 내용 전송
        try {
            const res = await fetch('/my/pet/update', {
                method: 'POST', // 혹은 POST
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    petId: editMod.petId, // 기존 애완동물 ID
                    ...petData
                })
            });
            const result = await res.json();
            if (result.result === 'SUCCESS') {
                console.log('DB 반영 성공');
            } else {
                console.log('DB 반영 실패', result);
            }
        } catch (err) {
            console.error('서버 전송 오류', err);
        }

        // 화면 닫고 초기화
        editMod = null;
        closeAllPetDialogs();
        // 수정모드는 resetAllDialog 호출 안함
        currentStep = 1;
    } else {


        const res = await fetch("/my/pet/registration", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petData)
        });
        const data = await res.json();
        if (data.result === 'SUCCESS') {
            console.log('성공');
            petData.petId = data.petId;
            // 등록모드
            pets.push(petData);
            addPetToList(petData);
        } else {
            console.log('실패', data);
        }


        // 화면 닫고 초기화
        closeAllPetDialogs();
        resetAllDialog();
        currentStep = 1;
    }
});

function addPetToList(petData) {
    const li = document.createElement('li');
    li.classList.add('pet-card');
    const petBirth = new Date(petData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - petBirth.getFullYear();
    let bodyType = null;
    if (petData.bodyType === 'SLIM') {
        bodyType = '날씬해요';
    }
    else if (petData.bodyType === 'NORMAL') {
        bodyType = '적당해요';
    }
    else if (petData.bodyType === 'CHUBBY') {
        bodyType = '통통해요';
    }
    li.dataset.petId = petData.petId;
    const genderIcon = petData.gender === 'MALE' ? '/user/assets/images/male.png' : '/user/assets/images/female.png';
    const petImage = petData.imageUrl;
    li.innerHTML = `
    <div class="pet-wrapper">
        <div class="pet-left">
            <div class="pet-image">
                <img class="petImage" src="${petImage}" alt="">
            </div>
        </div>
        <div class="pet-right">
            <span class="pet-name">
                <span class="pet-name realName">${petData.name}</span>
                <img class="gender" src="${genderIcon}" alt="">
            </span>
            <span class="species pet-info">종류 : ${petData.species}</span>
            <span class="birth pet-info">나이 : ${age}살 (🍰 ${petMonth.value || petMonth.placeholder} ${petDate.value || petDate.placeholder})</span>
            <span class="weight pet-info">몸무게 : ${petData.weight}kg (${bodyType})</span>
            <span class="introduction pet-info">한 줄 소개 : ${petData.introduction}</span>
        </div>
    </div>
    <div class="pet-bottom">
        <label class="remember">
            <input hidden class="checkbox primary-input" type="radio" name="primary" value="${petData.petId}">
            <span class="text"></span>
        </label>
        <span class="-flex-stretch"></span>
        <button class="modify" type="button">수정</button>
        <button class="delete" type="button">삭제</button>
    </div>`;
    petList.append(li);
}



// region ============회원가입 네번째 단계(개인) 애완동물 수정 ================

const petModifyButtons = petInformation.querySelectorAll('.modify');

// 수정버튼 눌렀을 때 모달 띄우면서 정보 불러오기
const introduce = $petDialogSecond.querySelector(':scope > .introduction > .introduce');
const petSpecies = $petDialogSecond.querySelector(':scope > .selectedPetType > .petType');
petList.addEventListener('click', (e) => {
    const modifyButton = e.target.closest('.modify');
    if (!modifyButton) return; // modify 버튼이 아니라면 무시

    const card = modifyButton.closest('.pet-card');
    if (!card) return;

    const petId = parseInt(card.dataset.petId);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if(xhr.status < 200 || xhr.status >= 400){

            return;
        }
        const response = JSON.parse(xhr.responseText);
        switch (response.result) {
            case 'FAILURE':
                break;
            case 'SUCCESS':
                const petData = response.pet;

                editMod = petData; // 수정 모드
                console.log(editMod);

                petNameInput.value = petData.name;
                petSpecies.value = petData.species;

                preview.src = petData.imageUrl || '/user/assets/images/defaultPetImage.png';
                const isDefaultImage =
                    petData.imageUrl === '/user/assets/images/defaultPetImage.png';
                if (isDefaultImage) {
                    circle.classList.remove('visible'); // 기본이미지면 미리보기 숨김
                } else {
                    circle.classList.add('visible');    // 실제 업로드 이미지면 보이기
                }

                introduce.value = petData.introduction;
                petYear.value = petData.birthDate.substring(0, 4) + "년";
                petMonth.value = petData.birthDate.substring(5, 7) + "월";
                petDate.value = petData.birthDate.substring(8, 10) + "일";

                const maleInput = $petDialogThird.querySelector(':scope > .genderLabel > .gender-wrapper > .maleLabel > .male');
                const femaleInput = $petDialogThird.querySelector(':scope > .genderLabel > .gender-wrapper > .femaleLabel > .female');
                if (petData.gender === "MALE") {
                    maleInput.checked = true;
                }
                if (petData.gender === 'FEMALE') {
                    femaleInput.checked = true;
                }
                weightInput.value = petData.weight;
                const slimInput = $petDialogThird.querySelector(':scope > .weightTypeLabel > .weightType-wrapper > .slim > .slim');
                const normalInput = $petDialogThird.querySelector(':scope > .weightTypeLabel > .weightType-wrapper > .normal > .normal');
                const chubbyInput = $petDialogThird.querySelector(':scope > .weightTypeLabel > .weightType-wrapper > .chubby > .chubby');

                if (petData.bodyType === 'SLIM') {
                    slimInput.checked = true;
                }
                else if (petData.bodyType === 'NORMAL') {
                    normalInput.checked = true;
                }
                else if (petData.bodyType === 'CHUBBY') {
                    chubbyInput.checked = true;
                }

                // 버튼 상태 갱신
                dialogSecondNextButton();
                dialogThirdCompleteButton();

                openDialog(1);          // dialog 열기
                break;
            default:
        }
    };
    const url = `/my/pet/load?petId=${petId}`;
    xhr.open('GET', url);
    xhr.send();
});


// 삭제눌렀을 때 띄울 모달
const petDeleteMessage = document.getElementById('petDeleteMessage');
const deleteMessageTitle = document.createElement('span');
const deleteMessageText = document.createElement('span');
const deleteButton = petDeleteMessage.querySelector(':scope > .button-wrapper > .delete');
const cancelButton = petDeleteMessage.querySelector(':scope > .button-wrapper > .cancel');
deleteMessageTitle.classList.add('title');
deleteMessageText.classList.add('text');
petDeleteMessage.prepend(deleteMessageTitle, deleteMessageText);


// 삭제버튼 눌렀을 때 모달 띄우면서 정보 삭제하기
petList.addEventListener('click', (e) => {
    const deleteButton = e.target.classList.contains('delete');
    if (!deleteButton) {
        return;
    }
    const petItems = petList.querySelectorAll(':scope > .pet-card');

    let findLi = null;
    petItems.forEach(item => {
        if (item.contains(e.target)) {
            findLi = item;
        }
    });
    if (!findLi) {
        return;
    }
    showDeleteMessage('경고', '정말로 삭제하시겠습니까?', findLi);

});

let deleteLi = null;
function showDeleteMessage(title, text, findLi) {
    deleteLi = findLi;
    petDeleteMessage.classList.add('visible');
    deleteMessageTitle.innerText = title;
    deleteMessageText.innerText = text;
}

deleteButton.addEventListener('click', () => {
    if (!deleteLi) return;

    // 삭제할 petId
    const removeId = Number(deleteLi.dataset.petId);

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("petId", removeId);
    xhr.onreadystatechange = () => {
        if(xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if(xhr.status < 200 || xhr.status >= 400){

            return;
        }
        const response = JSON.parse(xhr.responseText);
        switch (response.result) {
            case 'FAILURE':
                showMessage('삭제에 실패하였습니다. 다시 시도해주세요.');
                break;
            case 'SUCCESS':
                //  화면에서 제거
                deleteLi.remove();
                deleteLi = null;
                petDeleteMessage.classList.remove('visible');

                // 대표동물 처리
                const checked = petList.querySelector('input[name="primary"]:checked');
                const petItems = petList.querySelectorAll(':scope > .pet-card:not(.add-card)');

                if (!checked && petItems.length > 0) {
                    const firstPrimaryInput = petItems[0].querySelector('input.primary-input[type="radio"]');
                    if (firstPrimaryInput) {
                        firstPrimaryInput.checked = true;
                    }
                }
                break;
            default:
        }
    };
    xhr.open('DELETE', '/my/pet/delete');
    xhr.send(formData);


});

cancelButton.addEventListener('click', () => {
    deleteLi = null;
    petDeleteMessage.classList.remove('visible');
});


// endregion


// endregion




