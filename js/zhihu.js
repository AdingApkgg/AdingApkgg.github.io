fetch('https://api.gmit.vip/Api/ZhiHuHot?format=json').then(data=>data.json()).then((json)=>{
    let html = ''
    html += '<div class="zhihu-list">'
    var i = 1 
    for (let item of json.data) {
        html += '<div class="zhihu-list-item"><div class="zhihu-hotness">' + i + '</div>' + '<span class="zhihu-title"><a title="' + item.title + '"href="' + item.url + '" target="_blank" rel="external nofollow noreferrer">' + item.title + '</a></span>' + '<div class="zhihu-hot"><span>' + item.hot + '</span></div></div>'
        i++
    }
    html += '</div>'
    document.getElementById('zhihu-container').innerHTML = html
}).catch(function(error) {
    console.log(error);
});