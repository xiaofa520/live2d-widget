try {const baseUrl = "https://fastly.jsdelivr.net/gh/xiaofa520/live2d-widget@latest/"; // 替换为你的CDN链接或者你服务器的链接
    // 加载脚本文件的函数
    function loadScript(fileName, callback) {const script = document.createElement("script");script.src = baseUrl + fileName;script.type = "text/javascript";script.onload = callback;document.head.appendChild(script);}
    function loadCSS(fileName) {$("<link>").attr({href: baseUrl + fileName,rel: "stylesheet",type: "text/css",}).appendTo("head");}
    // 加载jQuery和依赖文件
    loadScript("jquery.min.js", function () {
        console.log("jQuery Loaded");
        window.$ = window.jQuery; // 确保全局变量定义
        loadScript("jquery-ui.min.js", function () {
            console.log("jQuery UI Loaded");
            // 加载CSS文件
            loadCSS("waifu.css");
            // 初始化Live2D组件
            $("body").append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
            // 加载Live2D
            loadScript("waifu-tips.js", function () {
                loadScript("live2d.js", function () {
                    /* 可直接修改部分参数 */
                    live2d_settings["hitokotoAPI"] = "hitokoto.cn";      // 一言 API
                    live2d_settings["modelId"] = 1;                 // 默认模型 ID
                    live2d_settings["modelTexturesId"] = 1;        // 默认材质 ID
                    live2d_settings["modelStorage"] = false;      // 不储存模型 ID
                    /* 在 initModel 前添加 */
                    initModel(baseUrl + "waifu-tips.json");
                });
            });
        });
    });
} catch (err) {console.log("[Error] JQuery is not defined.", err.message);}
