/**
 * app更新
 */
import i18n from '@/langs'
function checkUpdate(callback) {
    // 在app运行的情况且是正式环境 => 检查更新
    if (window.api && process.env.VUE_APP_IS_PRODUCTION) {
        var mam = window.api.require('mam');
        mam.checkUpdate(function (ret, err) {
            if (ret) {
                var result = ret.result;
                if (result.update == true) {
                    // if (result.update == true && result.closed == false) {
                    var data = JSON.parse(result.updateTip);
                    let msg = '', buttons = ''
                    if (data.isForceUpdate) {
                        msg = data.tip[i18n.locale] + '\n\n' + i18n.t('common.forceUpdate');
                        buttons = [i18n.t('common.updateNow'), i18n.t('common.close')];
                    } else {
                        msg = data.tip[i18n.locale];
                        buttons = [i18n.t('common.updateNow'), i18n.t('common.cancel')];
                    }
                    window.api.confirm(
                        '强制更新',
                        msg,
                        buttons
                        // eslint-disable-next-line no-unused-vars
                        , function (ret, err) {
                            if (ret.buttonIndex == 1) {
                                if (window.api.systemType == "android") {
                                    window.api.download({
                                        url: result.source,
                                        report: true
                                        // eslint-disable-next-line no-unused-vars
                                    }, function (ret, err) {
                                        if (ret && 0 == ret.state) {/* 下载进度 */
                                            window.api.toast({
                                                msg: i18n.t('common.downloadingApp') + ret.percent + "%",
                                                duration: 2000
                                            });
                                        }
                                        if (ret && 1 == ret.state) {/* 下载完成 */
                                            var savePath = ret.savePath;
                                            window.api.installApp({
                                                appUri: savePath
                                            });
                                            callback()
                                        }
                                    });
                                }
                                if (window.api.systemType == "ios") {
                                    window.api.installApp({
                                        appUri: result.source
                                    });
                                }
                            } else {
                                // 关闭按钮
                                if (result.closed) {
                                    window.api.closeWidget({
                                        id: window.api.appId,
                                        silent: true
                                    })
                                }
                            }
                        });
                } else {
                    // window.api.alert({
                    //     msg : "暂无更新"
                    // });
                }
            } else {
                window.api.alert({
                    msg: err.msg
                });
            }
        });
    }
}
export default checkUpdate