function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.onload = callback;
    document.head.appendChild(script);
}

function loadJQueryAndRun() {
    // 加载 jQuery
    loadScript("jquery.min.js", function () {
        console.log("jQuery Loaded");
        // 设置全局变量
        window.$ = window.jQuery;

        // 加载 jQuery UI
        loadScript("jquery-ui.min.js", function () {
            console.log("jQuery UI Loaded");

            // 加载 CSS 文件
            $("<link>")
                .attr({
                    href: "waifu.css",
                    rel: "stylesheet",
                    type: "text/css",
                })
                .appendTo("head");

            // 运行你的逻辑
            $("body").append(
                '<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>'
            );

            // 加载Live2D相关脚本
            $.ajax({
                url: "waifu-tips.js",
                dataType: "script",
                cache: true,
                success: function () {
                    $.ajax({
                        url: "live2d.js",
                        dataType: "script",
                        cache: true,
                        success: function () {
                            live2d_settings["hitokotoAPI"] = "hitokoto.cn";
                            live2d_settings["modelId"] = 0;
                            live2d_settings["modelTexturesId"] = 0;
                            live2d_settings["modelStorage"] = false;
                            initModel(
                                "waifu-tips.json"
                            );
                        },
                    });
                },
            });
        });
    });
}

try {
    loadJQueryAndRun();
} catch (err) {
    console.log("[Error] JQuery is not defined.", err.message);
}
