
            document.addEventListener('DOMContentLoaded', () => {
                
            const controller = navigator.serviceWorker?.controller
            if (!controller) return
            const postMessage2Sw = (type) => navigator.serviceWorker.controller.postMessage({ type });
const pjaxUpdate = (url) => {
                const type = url.endsWith('js') ? 'script' : 'link';
                const name = type === 'link' ? 'href' : 'src';
                for (let item of document.getElementsByTagName(type)) {
                    // @ts-ignore
                    const itUrl = item[name];
                    if (url.length > itUrl ? url.endsWith(itUrl) : itUrl.endsWith(url)) {
                        const newEle = document.createElement(type);
                        const content = item.textContent || item.innerHTML || '';
                        Array.from(item.attributes).forEach(attr => newEle.setAttribute(attr.name, attr.value));
                        newEle.appendChild(document.createTextNode(content));
                        item.parentNode.replaceChildren(newEle, item);
                        return;
                    }
                }
            };
const SESSION_KEY = 'updated';
const onSuccess = () => console.log('版本更新成功');
const _inlineA = () => {
                if (sessionStorage.getItem(SESSION_KEY)) {
                    onSuccess();
                    sessionStorage.removeItem(SESSION_KEY);
                }
                else
                    postMessage2Sw('update');
            };
const messageEvent = (event) => {
                const data = event.data;
                sessionStorage.setItem(SESSION_KEY, data.type);
                const list = data.data?.filter((url) => /\.(js|css)$/.test(url));
                if (list?.length) {
                    // @ts-ignore
                    if (window.Pjax?.isSupported?.())
                        list.forEach(pjaxUpdate);
                    location.reload();
                }
                else {
                    onSuccess();
                    sessionStorage.removeItem(SESSION_KEY);
                }
            };
            _inlineA()
            navigator.serviceWorker.addEventListener('message', messageEvent)
        
            })
        