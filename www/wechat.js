var exec = require('cordova/exec');

module.exports = {
    Scene: {
        SESSION:  0, // 聊天界面
        TIMELINE: 1, // 朋友圈
        FAVORITE: 2  // 收藏
    },

    Type: {
        APP:     1,
        EMOTION: 2,
        FILE:    3,
        IMAGE:   4,
        MUSIC:   5,
        VIDEO:   6,
        WEBPAGE: 7
    },

    isInstalled: function (appid, onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "isWXAppInstalled", [appid]);
    },

    /**
     * Share a message to wechat app
     *
     * @example
     * <code>
     * Wechat.share({
     *     message: {
     *        title: "Message Title",
     *        description: "Message Description(optional)",
     *        mediaTagName: "Media Tag Name(optional)",
     *        thumb: "http://YOUR_THUMBNAIL_IMAGE",
     *        media: {
     *            type: Wechat.Type.WEBPAGE,   // webpage
     *            webpageUrl: "https://github.com/Luncher/phonegap-social-wechat.git" // webpage
     *        }
     *    },
     *    scene: Wechat.Scene.TIMELINE   // share to Timeline
     * }, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    share: function (appid, message, onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "share", [appid, message]);
    },

    /**
     * Sending an auth request to Wechat
     *
     * @example
     * <code>
     * Wechat.auth(function (response) { alert(response.code); });
     * </code>
     */
    auth: function (appid, scope, state, onSuccess, onError) {
        if (typeof scope == "function") {
            // Wechat.auth(function () { alert("Success"); });
            // Wechat.auth(function () { alert("Success"); }, function (error) { alert(error); });
            return exec(scope, state, "Wechat", "sendAuthRequest", [appid]);
        }

        if (typeof state == "function") {
            // Wechat.auth("snsapi_userinfo", function () { alert("Success"); });
            // Wechat.auth("snsapi_userinfo", function () { alert("Success"); }, function (error) { alert(error); });
            return exec(state, onSuccess, "Wechat", "sendAuthRequest", [appid, scope]);
        }

        return exec(onSuccess, onError, "Wechat", "sendAuthRequest", [appid, scope, state]);
    }
};
