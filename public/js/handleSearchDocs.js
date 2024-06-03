
export const handleSearchDocs = () => {
    const searchData = document.querySelector('.search__input').value;
    if (searchData) {
        // history.replaceState(null, '', `${window.location.href}`);
        window.location.href = `${window.location.origin}/docs?q=${searchData}`;
    }

}