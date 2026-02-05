const $profileTabNav = document.querySelector('.profile-tab-nav');
const $tabs = $profileTabNav.querySelectorAll(':scope > .tab');

$tabs.forEach($tab => {
    $tab.addEventListener("click", () => {
        $tabs.forEach($tab => $tab.classList.remove('active'));
        $tab.classList.add('active');
    });
});