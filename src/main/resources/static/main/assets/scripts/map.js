/*페이지가 준비되면 지도가 초기화되는 구조*/
window.addEventListener('DOMContentLoaded', () => {
    kakao.maps.load(initMap);
});


/*실제 Kakao 지도 객체 전역으로 생성, 가변으로 */
let map;


function initMap() {
    //지도를 띄울 크기, 위치
    const container = document.getElementById('map');
    const options = {
        //지도의 중심좌표
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 4 //지도의 확대 레벨
    };
    map = new kakao.maps.Map(container, options); // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다


    // 지도 클릭 시 마커 생성
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        const lat = mouseEvent.latLng.getLat();
        const lng = mouseEvent.latLng.getLng();
        addMarker(lat, lng);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const $search = document.getElementById('search');
    if (!$search) return;

    const $keywordInput = $search.querySelector(':scope > .search-input');

    const $button = $search.querySelector(':scope > .search-btn');
    $button.addEventListener('click', () => {
        const keyword = $keywordInput.value.trim();
        if (!keyword) return;

        searchByKeyword(keyword);
    });
});

//검색 함수 -> 검색어를 매개변수로
function searchByKeyword(keyword) {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
        if (status !== kakao.maps.services.Status.OK) return;

        const place = data[0];
        const lat = place.y;
        const lng = place.x;

        moveToLocation(lat, lng);
    });
}
//이 함수가 하는 일 :기존 마커 제거 - > 새 마커 생성 -> 지도 중심 이동
function moveToLocation(lat, lng) {
    addMarker(lat, lng); // 기존 마커 제거
    map.setCenter(new kakao.maps.LatLng(lat, lng)); // 지도 중심 이동
}
// 마크 생성은 전역함수로
// 마커 여러개 생성을 위한 배열
const markers = [];
// 이 함수는 지도에 마커 한개만 띄우는 함수(생성, 삭제를 반복하는 함수) -> 여러개 할거면 수정 해야함(if문을 밖으로 빼서 삭제는 필요할 때만 실행)
function addMarker(lat, lng) {
    // 기존 마커가 있으면 지도에서 제거-> 1개만 생성
    if (markers.length > 0) {
        markers[0].setMap(null); // 지도에서 삭제
        markers.pop();           // 배열에서도 삭제
    }

    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        map: map
    });
    //지도에 새로운 마커 생성
    markers.push(marker);
}


