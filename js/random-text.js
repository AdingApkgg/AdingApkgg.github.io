// 发现有时会和当前页面重复，加一个判断
function randomPost() {
    fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        while (true) {
            let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
            if (location.href == url) continue;
            location.href = url;
            return;
        }
    })
}
// 阅读文章时看了一遍写的代码，发现加个数组和一个遍历完全没必要，改成下面这个即可。
// function randomPost() {
//     fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
//         let ls = data.querySelectorAll('url loc');
//         location.href = ls[Math.floor(Math.random() * ls.length)].innerHTML
//     })
// }
// 旧代码
// function randomPost() {
    // fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    //     let ls = data.querySelectorAll('url loc');
    //     let list = [];
    //     ls.forEach(i => list.push(i.innerHTML))
    //     location.href = list[Math.floor(Math.random() * ls.length)]
    // })
// }
