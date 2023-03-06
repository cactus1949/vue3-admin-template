export function GetCurrentBrowser():string {
    const ua = navigator.userAgent.toLocaleLowerCase()
    let browserType = ''
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = 'IE'
    } else if (ua.match(/firefox/) != null) {
        browserType = 'firefox'
    } else if (ua.match(/ucbrowser/) != null) {
        browserType = 'UC'
    } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
        browserType = 'opera'
    } else if (ua.match(/bidubrowser/) != null) {
        browserType = 'baidu'
    } else if (ua.match(/metasr/) != null) {
        browserType = 'sougou'
    } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browserType = 'QQ'
    } else if (ua.match(/maxthon/) != null) {
        browserType = 'maxthon'
    } else if (ua.match(/chrome/) != null) {
        if ((checkChromeFor360() || checkIeFor360())) {
            browserType = '360'
        } else {
            browserType = 'chrome'
        }
    } else if (ua.match(/safari/) != null) {
        browserType = 'Safari'
    } else {
        browserType = 'others'
    }
    return browserType
}

// 检测兼容模式下的360浏览器
function checkIeFor360() {
    /**
     *
     * 截止20170731得到有差异的数据项
     *                                                      IE  搜狗  2345    遨游  QQ  360
     * _IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE                   ×  √   √   √   √   √
     * window.maxConnectionsPerServer                       10(http协议下值为6)  10  10(http协议下值为6)  10  6   10(http协议下值为6)
     * navigator.userAgent                                  ×   √/×(IE9及以上) ×   ×   √   ×
     * window.external                                          [Sogou Explorer Object]
     * navigator.msDoNotTrack (IE10及以下)                 1   0   0   0   0   1
     * window.doNotTrack(IE11)                              1   null    null    null    null    1
     * navigator.msPointerEnabled                           TRUE    TRUE    FALSE   FALSE   TRUE    TRUE
     * window.screenLeft - window.screenX != 8 (IE9及以上) FALSE   TRUE    FALSE   FALSE   TRUE    TRUE
     * console.count(仅测试了IE7、8)                         undefined   undefined   undefined   undefined   undefined
     *
     */
    return ((navigator.msPointerEnabled == undefined ? true : navigator.msPointerEnabled)
        && (navigator.msDoNotTrack == 1 || window.doNotTrack == 1)
        && ((Number(window.screenX) ? (window.screenLeft - window.screenX != 8) : false)
            || ((navigator.userAgent.indexOf('MSIE 7.0') != -1 || navigator.userAgent.indexOf('MSIE 8.0') != -1) && console.count == undefined)));
}

// 检测极速内核下的360浏览器
function checkChromeFor360() {
    const uas = navigator.userAgent.split(' '),
        result = false;
    // 排除ua自带标志的双核浏览器, 余下chrome,chromium及360浏览器
    if (uas[uas.length - 1].indexOf('Safari') == -1) {
        return result;
    }
    for (const key in navigator.plugins) {
        // np-mswmp.dll文件在chromium及chrome未查询到
        if (navigator.plugins[key].filename == 'np-mswmp.dll') {
            return !result;
        }
    }
    return result;
}