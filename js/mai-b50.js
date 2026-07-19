(()=>{let b="mai-b50-cache",g=6e5,$=8,f=[],y=[],h=!1,x=a=>document.getElementById(a),w=document.getElementById("mai-b50");if(w&&x("dxScores")&&x("standardScores")&&x("detailModal")&&!w.dataset.maiInit){w.dataset.maiInit="1",document.documentElement.style.overflow="";let i=a=>String(null==a?"":a).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),n=a=>`https://assets.lxns.net/maimai/jacket/${Number(a)}.png!webp`,d=a=>{a=Number(a.level_index);return 0<=a&&a<=4?"mai-diff-"+a:"mai-diff-3"},s={fc:["FC","fc"],fcp:["FC+","fc"],ap:["AP","ap"],app:["AP+","ap"],sync:["SYNC","fs"],fs:["FS","fs"],fsp:["FS+","fs"],fsd:["FSD","fsd"],fsdp:["FSD+","fsd"]},l=a=>{a=s[a];return a?`<span class="mai-chip mai-chip-${a[1]}">${a[0]}</span>`:""},r=a=>a?a.toUpperCase().replace(/P$/,"+"):"N/A",o=a=>a?"sssp"===a?"mai-rate-max":"s"===a[0]?"mai-rate-s":"a"===a[0]?"mai-rate-a":"b"===a[0]?"mai-rate-b":"mai-rate-c":"",m=(a,s)=>"number"==typeof a?a.toFixed(s):"N/A",e=(a,s,t)=>{var e=i(a.song_name);return`
      <div class="mai-card mai-in ${d(a)}" style="animation-delay:${Math.min(35*s,700)}ms" data-section="${t}" data-index="${s}" tabindex="0" role="button" aria-label="${e} 详情">
        <div class="mai-jacket-wrap">
          <img class="mai-jacket" src="${n(a.id)}" alt="${e}" loading="lazy" decoding="async">
          <span class="mai-rank">#${s+1}</span>
          <span class="mai-type ${"dx"===a.type?"is-dx":"is-sd"}">${"dx"===a.type?"DX":"标准"}</span>
          <span class="mai-card-badges">${l(a.fc)}${l(a.fs)}</span>
        </div>
        <div class="mai-card-body">
          <div class="mai-song" title="${e}">${e}</div>
          <div class="mai-meta">
            <span class="mai-level">${i(a.level)}</span>
            <span class="mai-rate ${o(a.rate)}">${r(a.rate)}</span>
          </div>
          <div class="mai-stats">
            <span class="mai-ach">${m(a.achievements,2)}%</span>
            <span class="mai-ra">${m(a.dx_rating,0)}</span>
          </div>
        </div>
      </div>`},c=(a,s,t)=>{s=x(s);a.length?s.innerHTML=a.map((a,s)=>e(a,s,t)).join(""):s.innerHTML='<div class="mai-empty">暂无成绩数据</div>'},t=(a,s)=>{f=a.dx||[],y=a.standard||[];var t=a.dx_total||0,a=a.standard_total||0;x("totalRating").textContent=Math.round(t+a),x("dxRating").textContent=Math.round(t),x("standardRating").textContent=Math.round(a),x("dxStats").textContent=`b15 · ${f.length} 首`,x("standardStats").textContent=`b35 · ${y.length} 首`,x("maiUpdated").textContent="更新于 "+new Date(s).toLocaleString("zh-CN",{hour12:!1}),c(f,"dxScores","dx"),c(y,"standardScores","std")},p=()=>{var a=x("detailModal");a.classList.contains("open")&&(a.classList.remove("open"),document.documentElement.style.overflow="",a=a.querySelector("audio"))&&a.pause()},v=a=>{if(!h){if(!a){a=(()=>{try{var a,s=sessionStorage.getItem(b);return s?(a=JSON.parse(s),Date.now()-a.time>g?null:a):null}catch(a){return null}})();if(a)return void t(a.data,a.time)}h=!0,w.classList.add("is-loading"),a='<div class="mai-skeleton"><div class="mai-skeleton-jacket"></div><div class="mai-skeleton-line"></div><div class="mai-skeleton-line short"></div></div>',x("dxScores").innerHTML=a.repeat($),x("standardScores").innerHTML=a.repeat($),fetch("https://maimai.lxns.net/api/v0/user/maimai/player/bests",{headers:{"X-User-Token":"TlbtMfvBbw3rImek-aPL0X3HtSRbU6II9VGoiXPesO0="}}).then(a=>{if(a.ok)return a.json();throw new Error(401===a.status?"API 令牌无效或已过期":`请求失败 (HTTP ${a.status})`)}).then(a=>{if(!a.success||!a.data)throw new Error(a.message||"接口返回异常");(a=>{try{sessionStorage.setItem(b,JSON.stringify({time:Date.now(),data:a}))}catch(a){}})(a.data),t(a.data,Date.now())}).catch(a=>{console.error("B50 数据获取失败:",a),a="加载失败："+a.message,x("dxScores").innerHTML=`<div class="mai-empty"><p>${i(a)}</p><button type="button" class="mai-btn mai-retry">重试</button></div>`,x("standardScores").innerHTML='<div class="mai-empty">—</div>'}).finally(()=>{h=!1,w.classList.remove("is-loading")})}},u=a=>{var s,t,e;s=a.dataset.section,a=Number(a.dataset.index),(s=("dx"===s?f:y)[a])&&(t=i(s.song_name),e=s.upload_time?new Date(s.upload_time).toLocaleString("zh-CN",{hour12:!1}):"未知",x("modalContent").innerHTML=`
      <div class="mai-modal-head ${d(s)}">
        <img class="mai-modal-jacket" src="${n(s.id)}" alt="${t}" decoding="async">
        <div class="mai-modal-title">
          <h3 title="${t}">${t}</h3>
          <div class="mai-modal-chips">
            <span class="mai-level">${i(s.level)}</span>
            <span class="mai-type-chip ${"dx"===s.type?"is-dx":"is-sd"}">${"dx"===s.type?"DX":"标准"}</span>
            <span class="mai-b50-chip">B50 #${a+1}</span>
          </div>
          <div class="mai-modal-rate ${o(s.rate)}">${r(s.rate)}</div>
        </div>
      </div>
      <div class="mai-modal-stats">
        <div class="mai-stat"><span class="mai-stat-label">达成率</span><span class="mai-stat-value">${m(s.achievements,4)}%</span></div>
        <div class="mai-stat"><span class="mai-stat-label">Rating</span><span class="mai-stat-value mai-ra">${m(s.dx_rating,2)}</span></div>
        <div class="mai-stat"><span class="mai-stat-label">FC</span><span class="mai-stat-value">${l(s.fc)||"—"}</span></div>
        <div class="mai-stat"><span class="mai-stat-label">FS</span><span class="mai-stat-value">${l(s.fs)||"—"}</span></div>
        <div class="mai-stat"><span class="mai-stat-label">DX 分数</span><span class="mai-stat-value">${"number"==typeof s.dx_score?s.dx_score:"—"}</span></div>
        <div class="mai-stat"><span class="mai-stat-label">游玩时间</span><span class="mai-stat-value">${e}</span></div>
      </div>
      `+(Number(s.id)?`<audio controls preload="none" src="https://assets2.lxns.net/maimai/music/${Number(s.id)}.mp3"></audio>`:""),x("detailModal").classList.add("open"),document.documentElement.style.overflow="hidden")};w.addEventListener("click",a=>{var s=a.target.closest(".mai-card");return s?u(s):a.target.closest("#maiRefresh")||a.target.closest(".mai-retry")?v(!0):a.target.closest(".mai-modal-close")?p():void(a.target.classList.contains("mai-modal")&&p())}),w.addEventListener("keydown",a=>{var s;"Enter"!==a.key&&" "!==a.key||(s=a.target.closest(".mai-card"))&&(a.preventDefault(),u(s))}),w.addEventListener("error",a=>{a.target.classList&&a.target.classList.contains("mai-jacket")&&(a.target.style.visibility="hidden")},!0),window.__maiAbort&&window.__maiAbort.abort(),window.__maiAbort=new AbortController,document.addEventListener("keydown",a=>{"Escape"===a.key&&p()},{signal:window.__maiAbort.signal}),window.btf&&window.btf.addGlobalFn&&window.btf.addGlobalFn("pjaxSend",()=>{document.documentElement.style.overflow=""},"maiB50"),v(!1)}})();