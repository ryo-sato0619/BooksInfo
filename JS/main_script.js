function showPage(pageId) {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'none';
    document.getElementById(pageId).style.display = 'grid';
}