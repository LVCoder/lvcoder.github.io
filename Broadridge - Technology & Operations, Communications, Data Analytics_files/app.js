! function e(t, n, o) {
    function a(i, s) {
        if (!n[i]) {
            if (!t[i]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(i, !0);
                if (r) return r(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[i] = {
                exports: {}
            };
            t[i][0].call(u.exports, function(e) {
                var n = t[i][1][e];
                return a(n ? n : e)
            }, u, u.exports, e, t, n, o)
        }
        return n[i].exports
    }
    for (var r = "function" == typeof require && require, i = 0; i < o.length; i++) a(o[i]);
    return a
}({
    1: [function(e, t, n) {
        var o = ["Ind. Broker/Dealer", "RIA", "Wirehouse", "Private Bank", "Bank", "Trust Company", "Online"],
            a = ["Online", "Trust Company", "Bank", "Private Bank", "Wirehouse", "RIA", "<span id='indBroker'>Ind. Broker/</span><br>Dealer"],
            r = ["Online", "Trust Company", "Bank", "Private Bank", "Wirehouse", "RIA", "Ind. Broker/Dealer"],
            i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            s = {
                AUM: ["rgba(0, 54, 87, 1)", "rgba(0, 87, 142, 1)", "rgba(0, 123, 182, 1)", "rgba(0, 163, 214, 1)", "rgba(168, 180, 0, 1)"],
                CHAN: ["rgba(0, 54, 87, 1)", "rgba(0, 87, 142, 1)", "rgba(0, 123, 182, 1)", "rgba(0, 163, 214, 1)", "rgba(79, 134, 54, 1)", "rgba(168, 180, 0, 1)", "rgba(82, 85, 165, 1)"],
                QTR: ["rgba(0, 54, 87, 1)", "rgba(0, 87, 142, 1)", "rgba(0, 123, 182, 1)", "rgba(0, 163, 214, 1)", "rgba(168, 180, 0, 1)"],
                MON: ["rgba(0, 54, 87, 1)", "rgba(0, 87, 142, 1)", "rgba(0, 123, 182, 1)", "rgba(0, 163, 214, 1)", "rgba(168, 180, 0, 1)"]
            },
            l = {
                AUM: {
                    LABELS: ["Check 1", "Check 2", "Check 3", "Check 4", "Check 5"],
                    TOT: [!0, !1, !1, !0, !0],
                    ETF: [!0, !1, !1, !0, !0],
                    MF: [!0, !1, !1, !0, !0]
                },
                CHAN: {
                    LABELS: o,
                    TOT: [!0, !0, !0, !0, !0, !0, !0],
                    ETF: [!0, !0, !0, !0, !0, !0, !0],
                    MF: [!0, !0, !0, !0, !0, !0, !0]
                },
                QTR: {
                    LABELS: ["Check 1", "Check 2", "Check 3", "Check 4", "Check 5"],
                    TOT: [!0, !0, !1, !1, !0],
                    ETF: [!0, !0, !1, !1, !0],
                    MF: [!0, !0, !1, !1, !0]
                },
                MON: {
                    LABELS: ["Check 1", "Check 2", "Check 3", "Check 4"],
                    TOT: [!0, !0, !0, !0],
                    ETF: [!0, !0, !0, !0],
                    MF: [!0, !0, !0, !0]
                }
            },
            c = {
                YAXIS: "Assets ($ Billion)",
                CHAN: {
                    TOT: null,
                    ETF: null,
                    MF: null
                }
            },
            u = {
                YEAR: null,
                MONTH: null,
                QTR: null
            },
            d = {
                AUM: {
                    TOT: null,
                    ETF: null,
                    MF: null
                },
                CHAN: {
                    TOT: null,
                    ETF: null,
                    MF: null
                },
                QTR: {
                    TOT: null,
                    ETF: null,
                    MF: null
                },
                MON: {
                    TOT: null,
                    ETF: null,
                    MF: null
                }
            },
            f = {
                sector: null,
                type: null,
                graph: null
            },
            p = [];
        $(function() {
            function e() {
                if ($("#csv").length) {
                    var e = $("#csv").html().replace(/\|/g, "\n"),
                        t = $.csv.toArrays(e);
                    return t
                }
                return null
            }

            function t(e, t, n, o) {
                var a = o.toString(),
                    r = n.toString() + "-" + (a.length > 1 ? a : "0" + a);
                if ("TOT" == t) {
                    for (var i = _.extend([], N["ETF" + r].slice(3, 10)), s = N["MF" + r].slice(3, 10), l = 0; l < 7; l++) i[l] += s[l];
                    return i
                }
                return N[t + r].slice(3, 10)
            }

            function n(e, n, o, a, r, i) {
                for (var s = [], l = 0; l < i; l++) s.push(t(e, n, o, a)), a += -1 * r, a <= 0 && (a = 12, o += -1);
                return s.reverse(), s
            }

            function h(e, n, o, a, r, i) {
                for (var s = [], l = 0; l < i; l++) s.push(t(e, n, o, a)), a += -1 * r, a <= 0 && (a = 12, o += -1);
                return s
            }

            function m(e, t, n, o) {
                for (var a = h(e, t, n, o, 3, 6), r = [], i = 1; i < 6; i++) {
                    for (var s = [], l = 0; l < 7; l++) s[l] = (a[i - 1][l] - a[i][l]) / a[i][l] * 100, 0 === s[l] && (s[l] = .12345678);
                    r.push(s)
                }
                return r
            }

            function g() {
                for (var e = u.QTR, t = u.MONTH.toString(), n = u.MONTH < 3 ? (u.YEAR - 1).toString() : u.YEAR.toString(), o = e, a = n, r = "", s = l.AUM.LABELS.length - 1; s >= 0; s--) 0 === o && (o = 4, a--), r += "Q" + o + " " + a, l.AUM.LABELS[s] = r, o--, r = "";
                for (var c = e, d = n.substr(n.length - 2), f = "", p = 0; p < l.QTR.LABELS.length; p++) c - 1 === 0 ? (f += "Q4'" + (d - 1) + " - Q" + c + "'" + d, c = 4, d--) : (f += "Q" + (c - 1) + " - Q" + c + "'" + d, c--), l.QTR.LABELS[p] = f, f = "";
                for (var h = t, m = u.YEAR, _ = "", g = l.MON.LABELS.length; g > 0; g--) _ += i[h - 1] + " " + m, l.MON.LABELS[g - 1] = _, h--, 0 === h && (h = 12, m--), _ = ""
            }

            function v(e, t) {
                if (!d[e][t]) {
                    var a = u.YEAR,
                        r = 3 * Math.floor(u.MONTH / 3),
                        i = r ? r : function() {
                            return a--, 12
                        }(),
                        f = 3,
                        p = 5;
                    d[e][t] = n(h, t, a, i, f, p)
                }
                for (var h = d[e][t], m = T(e, t), _ = [], g = [], v = 0; v < m.length; v++) _.push(h[m[v]]);
                for (var b = 0; b < m.length; b++) g.push(s[e][m[b]]);
                var w = $.jqplot("chart", _, {
                    grid: {
                        background: "#fff",
                        shadow: !1
                    },
                    seriesColors: g,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            barMargin: 5,
                            barPadding: 0,
                            groups: 1,
                            shadow: !1
                        }
                    },
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: o,
                            tickOptions: {
                                angle: -45
                            }
                        },
                        yaxis: {
                            label: c.YAXIS,
                            tickOptions: {
                                formatString: "%'d "
                            }
                        }
                    },
                    highlighter: {
                        show: !0,
                        tooltipAxes: "y",
                        showMarker: !1,
                        tooltipLocation: "n",
                        tooltipContentEditor: function(t, n, a) {
                            var r = "<h4>" + l[e].LABELS[m[n]] + "</h4><p>$" + _[n][a].format() + " BN | " + o[a] + "</p>";
                            return r
                        }
                    }
                });
                return w
            }

            function b(e, t) {
                if (!d[e][t]) {
                    for (var n = u.YEAR, a = 3 * Math.floor(u.MONTH / 3), r = a ? a : function() {
                            return n--, 12
                        }(), i = 3, l = 5, f = 5, p = h(y, t, n, r, i, l), m = u.QTR, g = u.MONTH < 3 ? u.YEAR - 1 : u.YEAR, v = "", b = [], w = 0; w < f; w++) {
                        0 === m && (m = 4, g--);
                        var k = _.reduce(p[w], function(e, t) {
                            return e + t
                        }).toPrecision(3);
                        v += "Q" + m + " " + g + " | $" + k.substr(0, k.length - 3) + " TN", b.push(v), m--, v = ""
                    }
                    c[e][t] = b, d[e][t] = p
                }
                var y = d[e][t],
                    C = T(e, t),
                    x = [],
                    E = [],
                    N = [];
                x = _.zip.apply(_, y);
                for (var S = 0; S < C.length; S++) E.push(x[C[S]]), N.push(s[e][C[S]]);
                var A = $.jqplot("chart", E, {
                    grid: {
                        background: "#fff",
                        shadow: !1
                    },
                    stackSeries: !0,
                    seriesColors: N,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            barMargin: 10,
                            shadow: !1
                        }
                    },
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: c[e][t],
                            tickOptions: {
                                angle: -45
                            }
                        },
                        yaxis: {
                            label: c.YAXIS,
                            tickOptions: {
                                formatString: "%'d "
                            }
                        }
                    },
                    highlighter: {
                        show: !0,
                        showMarker: !1,
                        tooltipLocation: "n",
                        tooltipContentEditor: function(e, t, n) {
                            var a = "<h4>" + o[C[t]] + "</h4><p>$" + E[t][n].format() + " BN</p>";
                            return a
                        }
                    }
                });
                return A
            }

            function w(e, t) {
                if (!d[e][t]) {
                    for (var n = u.YEAR, o = 3 * Math.floor(u.MONTH / 3), i = o ? o : function() {
                            return n--, 12
                        }(), c = m(p, t, n, i), f = 0; f < c.length; f++) c[f].reverse();
                    d[e][t] = c
                }
                var p = d[e][t],
                    h = T(e, t),
                    _ = [],
                    g = [];
                h.reverse();
                for (var v = 0; v < h.length; v++) _.push(p[h[v]]), g.push(s[e][h[v]]);
                var b = $.jqplot("chart", _, {
                    grid: {
                        background: "#fff",
                        shadow: !1
                    },
                    seriesColors: g,
                    negativeSeriesColors: g,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            barMargin: 5,
                            barPadding: 0,
                            groups: 1,
                            barDirection: "horizontal",
                            fillToZero: !0,
                            shadow: !1
                        }
                    },
                    axesDefaults: {
                        tickOptions: {
                            angle: -45
                        }
                    },
                    axes: {
                        xaxis: {
                            tickOptions: {
                                formatString: "%d%"
                            }
                        },
                        yaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: a
                        }
                    },
                    highlighter: {
                        show: !0,
                        showMarker: !1,
                        tooltipLocation: "e",
                        tooltipContentEditor: function(t, n, o) {
                            var a = " ";
                            return a = .12345678 == _[n][o] ? "<h4>" + l[e].LABELS[h[n]] + "</h4><p>0.0% Growth | " + r[o] + "</p>" : "<h4>" + l[e].LABELS[h[n]] + "</h4><p>" + _[n][o].toFixed(2) + "% Growth | " + r[o] + "</p>"
                        }
                    }
                });
                return $(".jqplot-yaxis-label").css({
                    width: "100px"
                }), b
            }

            function k(e, t) {
                if (!d[e][t]) {
                    var n = u.YEAR,
                        a = u.MONTH,
                        r = 1,
                        i = 4,
                        f = h(p, t, n, a, r, i);
                    d[e][t] = f.reverse()
                }
                for (var p = d[e][t], m = T(e, t), _ = [], g = [], v = 0; v < m.length; v++) _.push(p[m[v]]), g.push(s[e][m[v]]);
                var b = $.jqplot("chart", _, {
                    grid: {
                        background: "#fff",
                        shadow: !1
                    },
                    seriesColors: g,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            barMargin: 5,
                            barPadding: 0,
                            groups: 1,
                            shadow: !1
                        }
                    },
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: o,
                            tickOptions: {
                                angle: -45
                            }
                        },
                        yaxis: {
                            label: c.YAXIS,
                            tickOptions: {
                                formatString: "%'d "
                            }
                        }
                    },
                    highlighter: {
                        show: !0,
                        tooltipAxes: "y",
                        showMarker: !1,
                        tooltipLocation: "n",
                        tooltipContentEditor: function(t, n, a) {
                            var r = "<h4>" + l[e].LABELS[m[n]] + "</h4><p>$" + _[n][a].format() + " BN | " + o[a] + "</p>";
                            return r
                        }
                    }
                });
                return b
            }

            function y() {
                x("AUM", "TOT"), E("AUM", "TOT")
            }

            function C(e, t) {
                f.graph.destroy(), x(e, t), E(e, t)
            }

            function x(e, t) {
                var n;
                switch (e) {
                    case "AUM":
                        n = v(e, t);
                        break;
                    case "CHAN":
                        n = b(e, t);
                        break;
                    case "QTR":
                        n = w(e, t);
                        break;
                    case "MON":
                        n = k(e, t)
                }
                f.sector = t, f.type = e, f.graph = n
            }

            function T(e, t) {
                var n = [];
                return _.each(l[e][t], function(e, t) {
                    e && n.push(t)
                }), 0 === n.length && _.each(l[e][t], function(o, a) {
                    l[e][t][a] = !0, n.push(a)
                }), n
            }

            function E(e, t) {
                var n = "";
                _.each(l[e][t], function(t, o) {
                    var a = t ? "" : "off";
                    n += '<li><div class="graph-checkbox ' + e + o + " " + a + '" id="' + e + "-check" + o + '"></div><label>' + l[e].LABELS[o] + "</label></li>"
                }), $("#toggleButtons ul").html(n)
            }
            if ($("#chart").length) {
                p = e();
                var N = {};
                _.each(p, function(e) {
                    var t = e[0] + e[1] + "-" + (e[2].length > 1 ? e[2] : "0" + e[2]);
                    e[1] > u.YEAR && (u.YEAR = parseInt(e[1]));
                    for (var n = 3; n < 10; n++) e[n] = parseInt(e[n]);
                    N[t] = e
                }), _.each(p, function(e) {
                    e[1] == u.YEAR && e[2] > u.MONTH && (u.MONTH = parseInt(e[2]))
                }), 12 == u.MONTH ? u.QTR = 4 : u.MONTH >= 9 ? u.QTR = 3 : u.MONTH >= 6 ? u.QTR = 2 : u.MONTH >= 3 ? u.QTR = 1 : u.QTR = 4, g(), $("#toggleButtons").on("click", "li", function(e) {
                    var t = f.type,
                        n = f.sector,
                        o = $(e.currentTarget).find(".graph-checkbox").attr("id"),
                        a = o.substr(o.length - 1),
                        r = l[t][n][a];
                    $(this).toggleClass("", "off"), l[t][n][a] = !r, C(f.type, f.sector)
                }), $(".TYPE").click(function() {
                    var e = $(this),
                        t = e.attr("id");
                    t !== f.type && ($(".top-tabs .active").removeClass("active"), e.parent().addClass("active"), C(t, f.sector))
                }), $(".SEC").click(function() {
                    var e = $(this),
                        t = e.attr("id");
                    if (t !== f.sector) {
                        $(".side-text").hide();
                        var n = "#" + t + "-side";
                        $(n).toggle(), $(".side-tabs .active").removeClass("active"), e.parent().addClass("active"), C(f.type, t)
                    }
                }), $(window).on("resize", function() {
                    var e = $("#chart"),
                        t = e.width();
                    e.css({
                        height: t + "px"
                    }), $.each(f.graph.series, function(e, t) {
                        t.barWidth = void 0
                    }), f.graph.replot({
                        resetAxes: !0
                    })
                });
                var S = $("#chart").width();
                $("#chart").css({
                    height: S + "px"
                }), y()
            }
        }), Number.prototype.format = function() {
            return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }, {}],
    2: [function(e, t, n) {
        $(function() {
            function e(e) {
                return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }

            function t(e, t) {
                return Number(Math.round(e + "e" + t) + "e-" + t)
            }
            window.controller = window.controller || new ScrollMagic.Controller, $(".animate-number").each(function(n, o) {
                new ScrollMagic.Scene({
                    triggerElement: o,
                    triggerHook: 1
                }).addTo(window.controller).on("enter", function() {
                    function n() {
                        s += r, r < 1 && (s = t(s, r.toString().length - 1)), s < i ? (a.text(e(s)), setTimeout(n, 90)) : a.text(e(i))
                    }
                    var a = $(o),
                        r = +a.data("animate-number-rate"),
                        i = +a.text().replace(",", ""),
                        s = +a.data("animate-number-start");
                    a.attr("data-animate-number-end", i), isNaN(i) || (isNaN(s) && (s = .8 * i), isNaN(r) && (r = Math.floor(.02 * i) + 1), n())
                })
            })
        })
    }, {}],
    3: [function(e, t, n) {
        e("./Ad-Chart.js"), e("./animate-number.js"), e("./article-util-bar.js"), e("./broadridge-history.js"), e("./browser-detection.js"), e("./carousel.js"), e("./carousel-recent-news.js"), e("./executive-leadership.js"), e("./form.js"), e("./header.js"), e("./hero-bg-video.js"), e("./hero_module.js"), e("./jq-csv.js"), e("./nav.js"), e("./product-specs_module.js"), e("./segment-solutions-affix.js"), e("./site-footer.js"), e("./solution-products-affix.js"), e("./top-flyout.js"), e("./international-locations.js"), e("./notification.js"), e("./international-locations.js"), e("./search-box.js"), e("./international-locations.js"), e("./insight-subscribe.js"), e("./multi-select.js")
    }, {
        "./Ad-Chart.js": 1,
        "./animate-number.js": 2,
        "./article-util-bar.js": 4,
        "./broadridge-history.js": 5,
        "./browser-detection.js": 6,
        "./carousel-recent-news.js": 7,
        "./carousel.js": 8,
        "./executive-leadership.js": 9,
        "./form.js": 10,
        "./header.js": 11,
        "./hero-bg-video.js": 12,
        "./hero_module.js": 13,
        "./insight-subscribe.js": 14,
        "./international-locations.js": 15,
        "./jq-csv.js": 16,
        "./multi-select.js": 17,
        "./nav.js": 18,
        "./notification.js": 19,
        "./product-specs_module.js": 20,
        "./search-box.js": 21,
        "./segment-solutions-affix.js": 22,
        "./site-footer.js": 23,
        "./solution-products-affix.js": 24,
        "./top-flyout.js": 25
    }],
    4: [function(e, t, n) {
        $(function() {
            $(".article-utility-bar__buttons__share").on("click", function(e) {
                e.preventDefault(), $(".article-utility-bar__buttons__share-buttons").toggleClass("share-buttons--open")
            }), $(".article-utility-bar__buttons__share-buttons__cancel").on("click", function(e) {
                e.preventDefault(), $(".article-utility-bar__buttons__share-buttons").removeClass("share-buttons--open")
            }), $(".article-utility-bar__buttons__copy").each(function() {
                $(this).attr("data-clipboard-text", document.location.href), new Clipboard(this)
            }).on("click", function(e) {
                e.preventDefault(), $(this).toggleClass("link-copied")
            }), $(".share-button").click(function(e) {
                e.preventDefault();
                var t = $(this),
                    n = t.attr("href");
                t.hasClass("fb-share-button") && (n = n + "?u=" + encodeURIComponent(document.location.href)), t.hasClass("twitter-share-button") && (n = n + "?status=" + encodeURIComponent($("title").first().text()) + "%20" + encodeURIComponent(document.location.href + " via @Broadridge")), t.hasClass("li-share-button") && (n = n + "?url=" + encodeURIComponent(document.location.href) + "&summary=" + encodeURIComponent($(".hero__info").text()) + "&source=&title=" + encodeURIComponent($("title").first().text()));
                var o = window.open(n, "", "titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,height=400,width=600");
                window.focus && o.focus()
            })
        })
    }, {}],
    5: [function(e, t, n) {
        $(function() {
            $(".timeline-item__view-more__link").on("click", function(e) {
                e.preventDefault(), $(this).toggleClass("view-more-open").parent().siblings(".timeline-item__details").slideToggle()
            })
        })
    }, {}],
    6: [function(e, t, n) {
        $(function() {
            var e = window.navigator.userAgent;
            e.match(/iPad/i) || e.match(/iPhone/i) ? $("body").addClass("ios") : (e.match(/MSIE/i) || e.match(/.NET/i) || "Netscape" === navigator.appName && navigator.appVersion.indexOf("Trident") > -1) && $("body").addClass("ie")
        })
    }, {}],
    7: [function(e, t, n) {
        $(function() {
            var e = $(".recent-news__carousel__content--1");
            e.slick({
                accessibility: !0,
                arrows: !0,
                keyboard: !0,
                dots: !1,
                prevArrow: $(".recent-news__carousel__arrow--left--1"),
                nextArrow: $(".recent-news__carousel__arrow--right--1")
            });
            var t = $(".recent-news__carousel__content--2");
            t.slick({
                accessibility: !0,
                arrows: !0,
                keyboard: !0,
                dots: !1,
                prevArrow: $(".recent-news__carousel__arrow--left--2"),
                nextArrow: $(".recent-news__carousel__arrow--right--2")
            })
        })
    }, {}],
    8: [function(e, t, n) {
        $(function() {
            var e = $(".product-carousel__carousel");
            e.length && (e.slick({
                accessibility: !0,
                arrows: !0,
                keyboard: !0,
                dots: !0,
                mobileFirst: !0,
                prevArrow: $(".product-carousel__left-nav"),
                nextArrow: $(".product-carousel__right-nav"),
                appendDots: $(".product-carousel__frame"),
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        appendDots: $(".product-carousel__inner-wrapper")
                    }
                }]
            }), e.on("beforeChange", function(e, t, n, o) {
                $(".product-carousel__slide-text").removeClass("fadeIn"), $(".product-carousel__slide-text").addClass("hidden");
                var a = $(".product-carousel__slide-text:eq(" + o + ")");
                a.removeClass("hidden"), setTimeout(function() {
                    a.addClass("fadeIn")
                }, 200)
            }), window.onresize = function() {
                e.slick("slickSetOption", "refresh, true")
            })
        })
    }, {}],
    9: [function(e, t, n) {
        $(function() {
            $(".executive-leadership__see-all__link").on("click", function(e) {
                e.preventDefault(), $(this).toggleClass("see-all-open"), $(".executive-leadership__list--more").slideToggle().toggleClass("list-more--open"), $(".list-more--open").length || $("html, body").animate({
                    scrollTop: $(".executive-leadership").offset().top - $(".header").outerHeight()
                }, 500)
            })
        })
    }, {}],
    10: [function(e, t, n) {
        $(function() {
            function e() {
                $(".form__field__input--text").blur(function() {
                    $(this).val() ? $(this).addClass("form__field__input--not-empty") : $(this).removeClass("form__field__input--not-empty")
                })
            }

            function t(e) {
                for (var t, n = [], o = "", a = 0; a < e.length; a++) {
                    var r = $(e[a]).val();
                    n.push(r), o = o + " " + r, "" !== r && void 0 !== r || (t = !0)
                }
                return !t && [n, o]
            }

            function n(e) {
                var n = $(e).data("expand-parent"),
                    o = $(e).closest(".form__group").attr("id"),
                    a = $("#" + o + " .form__field__input-group"),
                    r = t(a);
                r ? ($(n + " span").text(r[1]).addClass("modified"), $(n).addClass("not-empty"), $(n).removeClass("hidden"), $("#" + o).addClass("hidden")) : $(n).removeClass("not-empty")
            }
            var o;
            $(".form__field__input-group").focus(function() {
                o && (clearTimeout(o), o = null)
            }), $("body").on("click", ".form__expand-button", function(e) {
                e.preventDefault();
                var t = $(this).data("form-target"),
                    n = $(this).data("form-focus");
                $(this).addClass("hidden"), $(t).removeClass("hidden"), $(n).focus()
            }), $(".form__field__input-group").on("blur", function() {
                var e = $(this);
                o = setTimeout(function() {
                    n(e)
                }, 1)
            }), $(".form__field__select-wrapper.first-child-as-placeholder select").change(function() {
                $(this).closest(".form__field__select-wrapper").addClass("modified")
            }), e(), $(".contact-broadridge__form__submit").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), $(".contact-broadridge__form").slideUp(), $(".contact-broadridge__thanks").slideDown().removeClass("hidden"), $("html, body").animate({
                    scrollTop: $(".contact-broadridge").offset().top - $(".header").outerHeight()
                }, 500)
            }), $(".gated-content-form").length && $("body").addClass("has-gated-content"), $("#contactMe").change(function() {
                if(this.checked) { $(".form__supplemental-fields").removeClass("hidden")}
				else{$(".form__supplemental-fields").addClass("hidden")}
            }), $("#gated-content__submit").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), $(".gated-content-form").slideUp(), $(".article-rich-text").slideDown(), $("body").removeClass("has-gated-content"), $("html, body").animate({
                    scrollTop: $(".article-rich-text").offset().top - $(".header").outerHeight()
                }, 500)
            })
        })
    }, {}],
    11: [function(e, t, n) {
        $(function() {
            function e() {
                if (i) {
                    var e = $(".hero").height(),
                        t = $(".footer").height(),
                        n = $(window).scrollTop(),
                        o = $(window).height(),
                        a = r.height();
                    if (n > e) {
                        var s = (n - e) / (a - (t + o + e)) * 100;
                        $(".header__progressbar").css("width", s + "%")
                    } else $(".header__progressbar").css("width", 0)
                }
            }

            function t() {
                var e = $("header");
                $(document).scrollTop() > e.offset().top ? e.find(".header").addClass("background-in").removeClass("background-out") : e.find(".header").removeClass("background-in").addClass("background-out")
            }

            function n() {
                o = o || new ScrollMagic.Scene({
                    triggerElement: a[0],
                    triggerHook: "onLeave",
                    duration: 0
                }).setPin(a[0], {
                    pushFollowers: !1
                }).addTo(window.controller)
            }
            var o, a = $(".header"),
                r = $(document);
            window.controller = window.controller || new ScrollMagic.Controller, r.scroll(t), r.scroll(e), e(), n(), t(), $(window).resize(function() {
                o.update(!0)
            });
            var i = $("body").hasClass("article");
            if (i) {
                var s = $("body").data("article-type");
                $(".header__progressbar").addClass(s)
            }
        })
    }, {}],
    12: [function(e, t, n) {
        $(function() {
            function e(e) {
                if (e.matches) {
                    if (n) {
                        $(o).css("visibility", "visible");
                        var t = $(n).data("background-video-url");
                        $("#video-background").attr("src", t)
                    }
                } else n && $(o).css("visibility", "hidden")
            }
            var t = window.matchMedia("(min-width: 768px)"),
                n = $(".hero--video"),
                o = $("#video-background");
            t.addListener(e), e(t)
        })
    }, {}],
    13: [function(e, t, n) {
        $(function() {
            function e(e) {
                void 0 !== r && r.destroy(!0), void 0 !== a && a.destroy(!0), e.matches ? $(".hero__carousel").length > 0 ? (o(), t(".hero__slide", 0), n(".hero__slide", 0)) : (t(), n()) : o()
            }

            function t(e, t) {
                e = e || ".hero", t = t || 0;
                var n;
                if (".hero" !== e) {
                    var o = $(e + '[data-slick-index="' + t + '"]');
                    n = $(o).find(".hero__content"), $(".hero__content").length && (a = new ScrollMagic.Scene({
                        duration: "250px"
                    }).setTween(n, .5, {
                        opacity: "0",
                        scale: ".97"
                    }).addTo(window.controller))
                } else n = e + " .hero__content", $(".hero__content").length && (a = new ScrollMagic.Scene({
                    duration: "150px"
                }).setTween(n, .5, {
                    opacity: "0",
                    scale: ".97"
                }).addTo(window.controller));
                $(".hero__content").length && (a = new ScrollMagic.Scene({
                    duration: "250px"
                }).setTween(n, .5, {
                    opacity: "0",
                    scale: ".97"
                }).addTo(window.controller))
            }

            function n(e, t) {
                e = e || ".hero", t = t || 0;
                var n, o, a = $(".notification"),
                    i = 0;
                if (".hero" !== e) {
                    var s = $(e + '[data-slick-index="' + t + '"]');
                    n = $(s).find(".hero__background-image")
                } else n = e + " .hero__background-image";
                o = $(e).height(), a.length > 0 && "none" !== a.css("display") && (i = a.height()), $(e).length > 0 && (window.controller = window.controller || new ScrollMagic.Controller, r = new ScrollMagic.Scene({
                    duration: o,
                    offset: i,
                    triggerHook: "onLeave"
                }).setTween(n, .5, {
                    yPercent: "30%"
                }).addTo(window.controller))
            }

            function o() {
                var e = $(".hero__carousel");
                e.length && (e.slick({
                    accessibility: !0,
                    arrows: !0,
                    keyboard: !0,
                    dots: !1,
                    mobileFirst: !0,
                    autoplay: !0,
                    autoplaySpeed: 4e3,
                    prevArrow: $(".hero__left-arrow"),
                    nextArrow: $(".hero__right-arrow")
                }), e.on("beforeChange", function(e, o, s, l) {
                    void 0 !== r && r.destroy(!0), void 0 !== a && a.destroy(!0), $(".hero__slide .hero__background-image").css("transform", ""), i.matches && (n(".hero__slide", l), t(".hero__slide", l))
                }), e.on("afterChange", function(e, t, n) {
                    $(".slick-arrow").blur()
                }), window.onresize = function() {
                    e.slick("slickSetOption", "refresh, true")
                })
            }
            var a, r, i = window.matchMedia("(min-width: 1024px)");
            i.addListener(e), e(i)
        }), window.limelightPlayerCallback = function(e, t, n) {
            switch (t) {
                case "onMediaLoad":
                    $("#" + e).closest(".flyout").length > 0 && !isMobileOrTablet() && LimelightPlayer.doPlay();
                    break;
                case "onPlayStateChanged":
                    isMobileOrTablet() && !n.isPlaying && $(document).trigger("flyout:close")
            }
        }, window.onPlaylistItemClick = function(e) {
            isMobileOrTablet() && LimelightPlayer.doSetMedia(e, !0, 0)
        }, window.isMobileOrTablet = function() {
            var e = !1;
            return function(t) {
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
            }(navigator.userAgent || navigator.vendor || window.opera), e
        }
    }, {}],
    14: [function(e, t, n) {
        $(function() {
            $(".insight-subscribe__form__submit").on("click", function(e) {
                //e.preventDefault(), $(".insight-subscribe__info").slideUp(), $(".insight-subscribe__thanks").slideDown()
            }), $(".insight-subscribe__thanks__close").on("click", function(e) {
                e.preventDefault(), $(".insight-subscribe").slideUp()
            }), $(".insight-subscribe__tag").on("click", function() {

              if($(this).hasClass('selected'))
                 $(this).removeClass("selected");
             else
                 $(this).addClass("selected");

             if($(this).hasClass('select--all') && $(this).hasClass('selected'))
               $(this).siblings().addClass('selected');
             else if($(this).hasClass('select--all'))
               $(this).siblings().removeClass("selected");

            if($($(".select--all").siblings('.selected')).length == $(".insight-subscribe__tag").not('.select--all').length)
            {
              $(this).siblings().addClass('selected');
            }
            else{
              $(".select--all").removeClass('selected');
            }

            }), $(".select--all").on("click", function() {
                //$(this).siblings().removeClass("selected")
            })
        })
    }, {}],
    15: [function(e, t, n) {
        $(function() {
            var e = $(".international-locations__location__title");
            e.on("click", function() {
                var e = $(this).parents("li"),
                    t = e.siblings().find(".international-locations__location__content"),
                    n = $(this).siblings(".international-locations__location__content"),
                    o = $(this).closest("li");
                e.toggleClass("location-open").siblings().removeClass("location-open"), t.slideUp(), n.slideToggle(400, function() {
                    $("html, body").animate({
                        scrollTop: $(o).offset().top - $(".header").outerHeight()
                    }, 500)
                })
            })
        })
    }, {}],
    16: [function(e, t, n) {
        RegExp.escape = function(e) {
                return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            },
            function(e) {
                "use strict";
                e.csv = {
                    defaults: {
                        separator: ",",
                        delimiter: '"',
                        headers: !0
                    },
                    hooks: {
                        castToScalar: function(e) {
                            var t = /\./;
                            if (isNaN(e)) return e;
                            if (t.test(e)) return parseFloat(e);
                            var n = parseInt(e);
                            return isNaN(n) ? null : n
                        }
                    },
                    parsers: {
                        parse: function(e, t) {
                            function n() {
                                if (l = 0, c = "", t.start && t.state.rowNum < t.start) return s = [], t.state.rowNum++, void(t.state.colNum = 1);
                                if (void 0 === t.onParseEntry) i.push(s);
                                else {
                                    var e = t.onParseEntry(s, t.state);
                                    e !== !1 && i.push(e)
                                }
                                s = [], t.end && t.state.rowNum >= t.end && (u = !0), t.state.rowNum++, t.state.colNum = 1
                            }

                            function o() {
                                if (void 0 === t.onParseValue) s.push(c);
                                else {
                                    var e = t.onParseValue(c, t.state);
                                    e !== !1 && s.push(e)
                                }
                                c = "", l = 0, t.state.colNum++
                            }
                            var a = t.separator,
                                r = t.delimiter;
                            t.state.rowNum || (t.state.rowNum = 1), t.state.colNum || (t.state.colNum = 1);
                            var i = [],
                                s = [],
                                l = 0,
                                c = "",
                                u = !1,
                                d = RegExp.escape(a),
                                f = RegExp.escape(r),
                                p = /(D|S|\n|\r|[^DS\r\n]+)/,
                                h = p.source;
                            return h = h.replace(/S/g, d), h = h.replace(/D/g, f), p = RegExp(h, "gm"), e.replace(p, function(e) {
                                if (!u) switch (l) {
                                    case 0:
                                        if (e === a) {
                                            c += "", o();
                                            break
                                        }
                                        if (e === r) {
                                            l = 1;
                                            break
                                        }
                                        if ("\n" === e) {
                                            o(), n();
                                            break
                                        }
                                        if (/^\r$/.test(e)) break;
                                        c += e, l = 3;
                                        break;
                                    case 1:
                                        if (e === r) {
                                            l = 2;
                                            break
                                        }
                                        c += e, l = 1;
                                        break;
                                    case 2:
                                        if (e === r) {
                                            c += e, l = 1;
                                            break
                                        }
                                        if (e === a) {
                                            o();
                                            break
                                        }
                                        if ("\n" === e) {
                                            o(), n();
                                            break
                                        }
                                        if (/^\r$/.test(e)) break;
                                        throw new Error("CSVDataError: Illegal State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                    case 3:
                                        if (e === a) {
                                            o();
                                            break
                                        }
                                        if ("\n" === e) {
                                            o(), n();
                                            break
                                        }
                                        if (/^\r$/.test(e)) break;
                                        if (e === r) throw new Error("CSVDataError: Illegal Quote [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                        throw new Error("CSVDataError: Illegal Data [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                    default:
                                        throw new Error("CSVDataError: Unknown State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]")
                                }
                            }), 0 !== s.length && (o(), n()), i
                        },
                        splitLines: function(e, t) {
                            function n() {
                                if (i = 0, t.start && t.state.rowNum < t.start) return s = "", void t.state.rowNum++;
                                if (void 0 === t.onParseEntry) r.push(s);
                                else {
                                    var e = t.onParseEntry(s, t.state);
                                    e !== !1 && r.push(e)
                                }
                                s = "", t.end && t.state.rowNum >= t.end && (l = !0), t.state.rowNum++
                            }
                            var o = t.separator,
                                a = t.delimiter;
                            t.state.rowNum || (t.state.rowNum = 1);
                            var r = [],
                                i = 0,
                                s = "",
                                l = !1,
                                c = RegExp.escape(o),
                                u = RegExp.escape(a),
                                d = /(D|S|\n|\r|[^DS\r\n]+)/,
                                f = d.source;
                            return f = f.replace(/S/g, c), f = f.replace(/D/g, u), d = RegExp(f, "gm"), e.replace(d, function(e) {
                                if (!l) switch (i) {
                                    case 0:
                                        if (e === o) {
                                            s += e, i = 0;
                                            break
                                        }
                                        if (e === a) {
                                            s += e, i = 1;
                                            break
                                        }
                                        if ("\n" === e) {
                                            n();
                                            break
                                        }
                                        if (/^\r$/.test(e)) break;
                                        s += e, i = 3;
                                        break;
                                    case 1:
                                        if (e === a) {
                                            s += e, i = 2;
                                            break
                                        }
                                        s += e, i = 1;
                                        break;
                                    case 2:
                                        var r = s.substr(s.length - 1);
                                        if (e === a && r === a) {
                                            s += e, i = 1;
                                            break
                                        }
                                        if (e === o) {
                                            s += e, i = 0;
                                            break
                                        }
                                        if ("\n" === e) {
                                            n();
                                            break
                                        }
                                        if ("\r" === e) break;
                                        throw new Error("CSVDataError: Illegal state [Row:" + t.state.rowNum + "]");
                                    case 3:
                                        if (e === o) {
                                            s += e, i = 0;
                                            break
                                        }
                                        if ("\n" === e) {
                                            n();
                                            break
                                        }
                                        if ("\r" === e) break;
                                        if (e === a) throw new Error("CSVDataError: Illegal quote [Row:" + t.state.rowNum + "]");
                                        throw new Error("CSVDataError: Illegal state [Row:" + t.state.rowNum + "]");
                                    default:
                                        throw new Error("CSVDataError: Unknown state [Row:" + t.state.rowNum + "]")
                                }
                            }), "" !== s && n(), r
                        },
                        parseEntry: function(e, t) {
                            function n() {
                                if (void 0 === t.onParseValue) r.push(s);
                                else {
                                    var e = t.onParseValue(s, t.state);
                                    e !== !1 && r.push(e)
                                }
                                s = "", i = 0, t.state.colNum++
                            }
                            var o = t.separator,
                                a = t.delimiter;
                            t.state.rowNum || (t.state.rowNum = 1), t.state.colNum || (t.state.colNum = 1);
                            var r = [],
                                i = 0,
                                s = "";
                            if (!t.match) {
                                var l = RegExp.escape(o),
                                    c = RegExp.escape(a),
                                    u = /(D|S|\n|\r|[^DS\r\n]+)/,
                                    d = u.source;
                                d = d.replace(/S/g, l), d = d.replace(/D/g, c), t.match = RegExp(d, "gm")
                            }
                            return e.replace(t.match, function(e) {
                                switch (i) {
                                    case 0:
                                        if (e === o) {
                                            s += "", n();
                                            break
                                        }
                                        if (e === a) {
                                            i = 1;
                                            break
                                        }
                                        if ("\n" === e || "\r" === e) break;
                                        s += e, i = 3;
                                        break;
                                    case 1:
                                        if (e === a) {
                                            i = 2;
                                            break
                                        }
                                        s += e, i = 1;
                                        break;
                                    case 2:
                                        if (e === a) {
                                            s += e, i = 1;
                                            break
                                        }
                                        if (e === o) {
                                            n();
                                            break
                                        }
                                        if ("\n" === e || "\r" === e) break;
                                        throw new Error("CSVDataError: Illegal State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                    case 3:
                                        if (e === o) {
                                            n();
                                            break
                                        }
                                        if ("\n" === e || "\r" === e) break;
                                        if (e === a) throw new Error("CSVDataError: Illegal Quote [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                        throw new Error("CSVDataError: Illegal Data [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]");
                                    default:
                                        throw new Error("CSVDataError: Unknown State [Row:" + t.state.rowNum + "][Col:" + t.state.colNum + "]")
                                }
                            }), n(), r
                        }
                    },
                    toArray: function(t, n, o) {
                        n = n || {};
                        var a = {};
                        a.callback = void 0 !== o && "function" == typeof o && o, a.separator = "separator" in n ? n.separator : e.csv.defaults.separator, a.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter;
                        var r = void 0 !== n.state ? n.state : {},
                            i = {
                                delimiter: a.delimiter,
                                separator: a.separator,
                                onParseEntry: n.onParseEntry,
                                onParseValue: n.onParseValue,
                                state: r
                            },
                            s = e.csv.parsers.parseEntry(t, i);
                        return a.callback ? void a.callback("", s) : s
                    },
                    toArrays: function(t, n, o) {
                        n = n || {};
                        var a = {};
                        a.callback = void 0 !== o && "function" == typeof o && o, a.separator = "separator" in n ? n.separator : e.csv.defaults.separator, a.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter;
                        var r = [],
                            i = {
                                delimiter: a.delimiter,
                                separator: a.separator,
                                onParseEntry: n.onParseEntry,
                                onParseValue: n.onParseValue,
                                start: n.start,
                                end: n.end,
                                state: {
                                    rowNum: 1,
                                    colNum: 1
                                }
                            };
                        return r = e.csv.parsers.parse(t, i), a.callback ? void a.callback("", r) : r
                    },
                    toObjects: function(t, n, o) {
                        n = n || {};
                        var a = {};
                        a.callback = void 0 !== o && "function" == typeof o && o, a.separator = "separator" in n ? n.separator : e.csv.defaults.separator, a.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter, a.headers = "headers" in n ? n.headers : e.csv.defaults.headers, n.start = "start" in n ? n.start : 1, a.headers && n.start++, n.end && a.headers && n.end++;
                        var r = [],
                            i = [],
                            s = {
                                delimiter: a.delimiter,
                                separator: a.separator,
                                onParseEntry: n.onParseEntry,
                                onParseValue: n.onParseValue,
                                start: n.start,
                                end: n.end,
                                state: {
                                    rowNum: 1,
                                    colNum: 1
                                },
                                match: !1
                            },
                            l = {
                                delimiter: a.delimiter,
                                separator: a.separator,
                                start: 1,
                                end: 1,
                                state: {
                                    rowNum: 1,
                                    colNum: 1
                                }
                            },
                            c = e.csv.parsers.splitLines(t, l),
                            u = e.csv.toArray(c[0], s);
                        r = e.csv.parsers.splitLines(t, s), s.state.colNum = 1, u ? s.state.rowNum = 2 : s.state.rowNum = 1;
                        for (var d = 0, f = r.length; d < f; d++) {
                            for (var p = e.csv.toArray(r[d], s), h = {}, m = 0; m < u.length; m++) h[u[m]] = p[m];
                            i.push(h), s.state.rowNum++
                        }
                        return a.callback ? void a.callback("", i) : i
                    },
                    fromArrays: function(t, n, o) {
                        n = n || {};
                        var a = {};
                        if (a.callback = void 0 !== o && "function" == typeof o && o, a.separator = "separator" in n ? n.separator : e.csv.defaults.separator, a.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter, a.escaper = "escaper" in n ? n.escaper : e.csv.defaults.escaper, a.experimental = "experimental" in n && n.experimental, !a.experimental) throw new Error("not implemented");
                        for (var r = [], i = 0; i < t.length; i++) r.push(t[i]);
                        return a.callback ? void a.callback("", r) : r
                    },
                    fromObjects2CSV: function(t, n, o) {
                        n = n || {};
                        var a = {};
                        if (a.callback = void 0 !== o && "function" == typeof o && o, a.separator = "separator" in n ? n.separator : e.csv.defaults.separator, a.delimiter = "delimiter" in n ? n.delimiter : e.csv.defaults.delimiter, a.experimental = "experimental" in n && n.experimental, !a.experimental) throw new Error("not implemented");
                        for (var r = [], i = 0; i < t.length; i++) r.push(t[i]);
                        return a.callback ? void a.callback("", r) : r
                    }
                }, e.csvEntry2Array = e.csv.toArray, e.csv2Array = e.csv.toArrays, e.csv2Dictionary = e.csv.toObjects
            }(jQuery)
    }, {}],
    17: [function(e, t, n) {
        $(function() {
            function e() {
                var e = $(this),
                    t = e.find(".multi-select__title").text();
                e.on("click", function(t) {
                    t.stopPropagation(), t.preventDefault(), e.hasClass("open") ? $(".multi-select").removeClass("open") : ($(".multi-select").not(e).removeClass("open"), e.addClass("open").find("input").first().focus())
                }), e.find("li").on("click", function(e) {
                    e.stopPropagation()
                }).find("input").on("blur", function() {
                    console.log("blur event triggered"), setTimeout(function() {
                        0 === $(document.activeElement).closest(".multi-select").length && $(".multi-select").removeClass("open")
                    }, 400)
                }), e.find('input[type="checkbox"]').on("change", function() {
                    var n = e.find("input:checked").length;
                    n > 0 ? e.find(".multi-select__title").text(n + " selected") : e.find(".multi-select__title").text(t)
                }), e.find('input[type="radio"]').on("change", function() {
                    var t = e.find("input:checked").val();
                    e.find(".multi-select__title").text(t)
                })
            }
            $(".multi-select").each(e), $(document).on("multi-select:created", function(t, n) {
                n && n.elements && $(n.elements).find(".multi-select").each(e)
            })
        })
    }, {}],
    18: [function(e, t, n) {
        $(function() {
            function e() {
                V.matches, n()
            }

            function t() {
                var e = $(".nav__industry.active");
                V.matches ? (m(e), _(e), o()) : o()
            }

            function n() {
                V.matches ? (T(), a(), p()) : a()
            }

            function o() {
                var e, t, n, o, a, r;
                V.matches ? (M.css({
                    backgroundColor: "rgba(255,255,255,0)"
                }), j.css({
                    backgroundColor: "rgba(0,54,87,0)",
                    marginLeft: "-100%"
                }), R.css({
                    marginTop: "95px",
                    opacity: "0"
                }), e = M.animate({
                    backgroundColor: "rgba(255,255,255,1)"
                }, 400).promise(), t = j.animate({
                    backgroundColor: "rgba(0,54,87,1)",
                    marginLeft: "0"
                }, 400).promise(), n = R.animate({
                    marginTop: "40px",
                    opacity: "1"
                }, 400).promise(), $.when(e, t, n).then(function() {
                    E()
                })) : (j.css({
                    backgroundColor: "rgba(0,54,87,0)",
                    marginLeft: "-100%"
                }), I.css({
                    backgroundColor: "rgba(0,54,87,0)",
                    marginLeft: "-100%"
                }), B.css({
                    right: "100%"
                }), o = j.animate({
                    backgroundColor: "rgba(0,54,87,1)",
                    marginLeft: "0"
                }, 400).promise(), a = I.animate({
                    marginLeft: "0"
                }, 400).promise(), r = B.animate({
                    right: "16px"
                }), $.when(o, a, r).then(function() {
                    I.css({
                        backgroundColor: "rgba(0,54,87,1)"
                    })
                }))
            }

            function a() {
                var e, t, n, o;
                V.matches ? (e = M.animate({
                    backgroundColor: "rgba(255,255,255,0)"
                }, 400).promise(), t = j.animate({
                    backgroundColor: "rgba(0,54,87,0)",
                    marginLeft: "-100%"
                }, 400).promise(), n = R.animate({
                    marginTop: "95px",
                    opacity: "0"
                }, 400).promise(), $.when(e, t, n).then(function() {
                    N.trigger("flyout:destroy")
                })) : (o = j.animate({
                    backgroundColor: "rgba(0,54,87,0)",
                    marginLeft: "-100%"
                }, 400).promise(), B.css({
                    right: "16px"
                }), $.when(o).then(function() {
                    N.trigger("flyout:destroy")
                }))
            }

            function r(e) {
                var t = $(".flyout-back");
                switch (e) {
                    case "animate-in":
                        t.animate({
                            opacity: 1
                        }, 400);
                        break;
                    case "animate-out":
                        t.animate({
                            opacity: 0
                        }, 400)
                }
            }

            function i(e) {
                var t = $(".nav__primary");
                switch (e) {
                    case "animate-in":
                        t.animate({
                            left: "16px",
                            right: "16px"
                        }, 400);
                        break;
                    case "animate-out":
                        t.animate({
                            left: "-100%",
                            right: "100%"
                        }, 400)
                }
            }

            function s(e) {
                var t = $(".mobile-content__wrapper");
                switch (e) {
                    case "animate-in":
                        t.animate({
                            left: 0,
                            right: 0
                        }, 400);
                        break;
                    case "animate-out":
                        t.animate({
                            left: "100%",
                            right: "-100%"
                        }, 400)
                }
            }

            function l(e) {
                var t = $(".mobile-content__solutions-panel");
                switch (e) {
                    case "animate-in":
                        t.animate({
                            left: 0,
                            right: 0
                        }, 400, function() {
                            c("fixed"), $("#mobile-content__segment1").animate({
                                scrollTop: "500"
                            }, 0)
                        });
                        break;
                    case "animate-out":
                        c("absolute"), t.animate({
                            left: "100%",
                            right: "-100%"
                        }, 400, function() {
                            u("reset"), d("reset")
                        })
                }
            }

            function c(e) {
                var t = $(".solutions-panel__navigation");
                switch (e) {
                    case "fixed":
                        t.css("position", "fixed");
                        break;
                    case "absolute":
                        t.css("position", "absolute")
                }
            }

            function u(e) {
                switch (e) {
                    case "animate-in":
                        O.animate({
                            left: 0,
                            right: 0
                        }, 400);
                        break;
                    case "animate-out":
                        O.animate({
                            left: "-100%",
                            right: "100%"
                        }, 400);
                        break;
                    case "hide":
                        O.css({
                            left: "-100%",
                            right: "100%",
                            opacity: 0
                        });
                        break;
                    case "reset":
                        O.css({
                            left: 0,
                            right: 0,
                            opacity: 1
                        })
                }
            }

            function d(e) {
                switch (e) {
                    case "animate-in":
                        P.animate({
                            left: 0,
                            right: 0
                        }, 400);
                        break;
                    case "animate-out":
                        P.animate({
                            left: "100%",
                            right: "-100%"
                        }, 400);
                        break;
                    case "snap":
                        P.css({
                            left: 0,
                            right: 0
                        });
                        break;
                    case "reset":
                        P.css({
                            left: "100%",
                            right: "-100%"
                        })
                }
            }

            function f(e) {
                var t = $(e).find(".mobile-content__segments");
                return t.length > 0
            }

            function p() {
                V.matches && $(M).animate({
                    scrollTop: 0
                }, 0)
            }

            function h(e) {
                var t = $(e).find(".mobile-content__industry__title").text(),
                    n = $(e).find(".mobile-content__industry__description").html();
                $(".solutions-panel__segments__title").text(t), $(".solutions-panel__segments__description").html(n)
            }

            function m(e) {
                var t = $(e).find(".nav__industry__title").text(),
                    n = $(e).find(".nav__industry__description").html();
                $(".nav-content__segment-header__title").text(t), $(".nav-content__segment-header__description").html(n)
            }

            function _(e) {
                var t = $(e).find(".nav__segment__item"),
                    n = $(e).find(".nav__solutions");
                $(".nav-content__segments").remove(), $(".nav-content__segment__solutions").remove(), t.length > 0 ? v(t) : k(n), S.find(".nav__segment__title").removeClass("nav__segment__title").addClass("nav-content__segment__title"), S.find(".nav__segment__subtitle").removeClass("nav__segment__subtitle").addClass("nav-content__segment__subtitle"), S.find(".nav__solutions").removeClass("nav__solutions").addClass("nav-content__segment__solutions"), S.find(".nav__solution").removeClass("nav__solution").addClass("nav-content__solution");
				bindAllProductsEvents();
            }

            function g(e) {
                var t = $(e).find(".mobile-content__segment__item"),
                    n = [];
                $(t).each(function(e) {
                    var t = $(this),
                        o = t.find(".mobile-content__segment__title").text();
                    n += '<li class="solutions-panel__segments__segments-list__item" data-segment-index="' + e + '">' + o + "</li>"
                }), $(".solutions-panel__segments__segments-list").append(n)
            }

            function v(e) {
                var t = '<ul class="nav-content__segments">';
                H = [], q = [], F = [], $(e).each(function(e) {
                    var n = $(this),
                        o = n.attr("id"),
                        a = "nav-content__segment__item" + (e + 1),
                        r = $(n).find(".nav__segment__title").attr("id");
                    n.find(".nav-content__solutions").length > 0 && (H.push(o), q.push(a), F.push(r), t += '<li id="' + a + '" class="nav-content__segments__items">' + n.html() + "</li>")
                }), t += "</ul>", $(".nav-content__content").append(t)
            }

            function b(e) {
                var t = $(e).find(".mobile-content__industry__title").text(),
                    n = $(e).find(".mobile-content__industry__description").html();
                $(".solutions-panel__solutions__title").text(t), $(".solutions-panel__solutions__description").html(n)
            }

            function w(e) {
                var t = "";
                if (f(e)) {
                    var n = $(e).find(".mobile-content__segment__item");
                    $(n).each(function(e) {
                        $(this).find(".mobile-content__solutions").length > 0 && (t += '<li class="mobile-content__segments__segment" id="mobile-content__segment' + e + '">\n' + $(this).html() + "\n</li>\n")
                    })
                } else {
                    var o = $(e).find(".mobile-content__solutions__solution");
                    $(o).each(function() {
                        t += '<li class="mobile-content__solutions__solution' + ($(this).hasClass("nav-content__letterchange")? " nav-content__letterchange" : "") + ($(this).hasClass("allproducts_nav_item")? " allproducts_nav_item" : "") + '">\n' + $(this).html() + "\n</li>\n"
                    })
                }
                $(".solutions-panel__solutions__solutions-list").append(t);
				bindAllProductsEvents();
            }

            function k(e) {
                var t = '<ul class="nav-content__segment__solutions">';
                $(e).each(function() {
                    $(this).find(".nav-content__solutions").length > 0 && (t += $(this).html())
                }), t += "</ul>", $(".nav-content__content").append(t)
            }

            function y() {
                $(".solutions-panel__segments__segments-list").empty()
            }

            function C() {
                $(".solutions-panel__solutions__solutions-list").empty()
            }

            function x() {
                window.controller = window.controller || new ScrollMagic.Controller({
                    container: ".nav-content__content-wrapper"
                });
                var e = [];
                $(H).each(function(t) {
				var n= 10;
				if(document.getElementById(q[t])){
                    n = document.getElementById(q[t]).scrollHeight;
					}
                    e[t] = TweenMax.from("#" + q[t], .5, {}), U[t] = new ScrollMagic.Scene({
                        triggerElement: "#" + q[t],
                        triggerHook: ".1",
                        duration: n,
                        reverse: !0
                    }).setTween(e[t]).addTo(window.controller).on("enter leave", function(e) {
                        var n = $(".nav-content #" + F[t]);
                        if ("enter" === e.type) {
                            n.addClass("pinned");
                            var o = parseInt(n.css("padding-top")) + parseInt(n.css("padding-bottom"));
                            $("<div />").addClass("placeholder").css("height", o + "px").insertBefore(n)
                        } else n.removeClass("pinned").prev(".placeholder").remove()
                    })
                })
            }

            function T() {
                if (U.length > 0)
                    for (var e = 0; e < U.length; e++) U[e].destroy("reset")
            }

            function E() {
                var e, t, n, o, a, r = $(".nav-content__segments__items"),
                    i = $(".nav-content__segments");
                r.length > 0 && (e = r.length, t = $(window).innerHeight(), n = document.getElementsByClassName("nav-content__segments__items")[e - 1], o = n.offsetHeight, a = t - o, t > n.offsetHeight && i.css({
                    paddingBottom: a + "px"
                }))
            }
            var N = $(document),
                S = $(".nav-content"),
                A = $(".nav__industry"),
                M = $(".nav-content__content-wrapper"),
                j = $(".nav-panel"),
                R = $(".nav-content__content"),
                D = $(".mobile-content"),
                L = $(".solutions-panel__wrapper"),
                O = $(".solutions-panel__segments__wrapper"),
                P = $(".solutions-panel__solutions__wrapper"),
                B = $("#primary-flyout-close"),
                I = $(".nav-panel__nav-background"),
                H = [],
                q = [],
                F = [],
                U = [],
                V = window.matchMedia("(min-width: 1024px)");
            N.on("navigation:open", t), N.on("navigation:close", n), N.on("navigation:buildAffix", x), N.on("navigation:animateOut", a), N.on("navigation:animateIn", o), V.addListener(e), $(window).resize(function() {
                E()
            }), A.on("click", function(e) {
                e.preventDefault();
                var t = $(this);
                V.matches && (T(), p(), A.removeClass("active"), t.addClass("active"), m(t), _(t), E(), $(this).find(".nav__segments").length > 0 && x())
            }), j.on("click", ".nav__primary__item", function() {
                "products-solutions" === $(this).attr("id") && (r("animate-in"), s("animate-in"), i("animate-out"), $(".mobile-content__industries").addClass("active"))
            }), D.on("click", ".mobile-content__industry", function() {
                var e = $(this),
                    t = "#" + e.attr("id");
                $(".mobile-content__industry").removeClass("active"), O.removeClass("active"), P.removeClass("active"), e.addClass("active"), l("animate-in"), y(), C(), f(t) ? (h(t), g(t), b(t), O.addClass("active")) : (b(t), w(t), P.addClass("active"), u("hide"), d("snap"))
            }), D.on("click", ".solutions-panel__segments-list__item", function() {
                var e = $(".mobile-content__industry.active");
                b(e), u("hide"), d("animate")
            }), D.on("click", ".solutions-panel__segments__segments-list__item", function() {
                function e() {
                    //var e = $(n).offset().top - 60;
                    P.attr('style', '');
                    var e = $(n).position().top;
                    L.animate({
                        scrollTop: e
                    }, 0)
                }
                var t = $(".mobile-content__industry.active");
            	n = "#mobile-content__segment" + $(this).data("segment-index");
                O.removeClass("active"), P.addClass("active"), C(), b(t), w(t), u("animate-out"), d("animate-in");
                navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/) ? setTimeout(e, 200) : e();
            }), D.on("click", ".solutions-panel__segments__title", function() {
                var e = $(".mobile-content__industry.active");
                P.addClass("active"), b(e), w(e), u("animate-out"), d("animate-in")
            }), D.on("click", ".solutions-panel__back", function() {
                var e = $(".mobile-content__industry.active");
                C(), P.hasClass("active") && f(e) ? (O.addClass("active"), P.removeClass("active"), L.animate({
                    scrollTop: 0
                }, 0, function() {
                    u("animate-in"), d("animate-out")
                })) : O.hasClass("active") ? ($(".mobile-content__industry").removeClass("active"), O.removeClass("active"), l("animate-out")) : (P.removeClass("active"), $(".mobile-content__industry").removeClass("active"), l("animate-out"))
            }), D.on("click", ".solutions-panel__close", function() {
                N.trigger("flyout:close")
            }), D.on("click", ".mobile-content__solutions-panel", function(e) {
                e.stopPropagation()
            }), $(".flyout").on("click", ".nav__segment__item", function(e) {
                e.preventDefault();
                var t, n, o = $(this).index();
                t = $(".nav-content__segments__items")[o];
                n = $(t).position().top;
                M.stop().animate({
                    scrollTop: n
                }, 500);
            }), $(".flyout-back").on("click", function() {
                s("animate-out"), r("animate-out"), i("animate-in")
            })
        })
    }, {}],
    19: [function(e, t, n) {
        $(function() {
            $(".notification-action-close").on("click", function() {
                $(this).closest(".notification").slideUp("swing", function() {
                    window.controller && window.controller.update()
                })
            })
        })
    }, {}],
    20: [function(e, t, n) {
        $(function() {
            $(".product-specs__link").on("click", function(e) {
                e.preventDefault(), $(".product-specs__content-wrapper").slideToggle(400, function() {
                    $("html, body").animate({
                        scrollTop: $(".product-specs").offset().top - $(".header").outerHeight()
                    }, 500)
                }), $(".product-specs").toggleClass("specs-open")
            })
        })
    }, {}],
    21: [function(e, t, n) {
        $(function() {
            $(".search-box__input").on("keyup change", function() {
                var e = $(this),
                    t = e.siblings(".search-box__clear");
                "" === e.val() ? t.addClass("inactive") : t.removeClass("inactive")
            }), $(".search-box__clear").on("click", function(e) {
                e.preventDefault(), $(this).parent().find(".search-box__input").val("").change()
            })
        })
    }, {}],
    22: [function(e, t, n) {
        $(function() {
            function e(e) {
                if (e.matches) {
                    window.controller = window.controller || new ScrollMagic.Controller;
                    var n = $(".segment-solutions__solution-wrapper");
                    $.each(n, function(e) {
                        var n = $(this).find(".segment-solutions__solution__container"),
                            o = $(this).find(".segment-solutions__solution__content"),
                            a = n.height(),
                            r = o.height();
                        o.attr("id", "br-stats-" + e), n.attr("id", "solution-container-" + e);
                        var i = r - a,
                            s = "#solution-container-" + e;
                        t[e] = new ScrollMagic.Scene({
                            triggerElement: "#br-stats-" + e,
                            triggerHook: "onLeave",
                            duration: i,
                            offset: -100,
                            reverse: !0
                        }).setPin(s, {
                            pushFollowers: !1
                        }).addTo(window.controller)
                    })
                } else if (t.length > 0)
                    for (var o = 0; o < t.length; o++) t[o].destroy("reset")
            }
            var t = [],
                n = window.matchMedia("(min-width: 1024px)");
            n.addListener(e), e(n)
        })
    }, {}],
    23: [function(e, t, n) {
        $(function() {
            function e() {
                $(".footer__nav-links__item__title").off("click", t), $(window).width() <= 768 && $(".footer__nav-links__item__title").on("click", t)
            }

            function t() {
                var e = $(this).parent(".footer__nav-links__item__nav-wrapper");
                $(".footer__nav-links__item__nav-wrapper").not(e).removeClass("open"), e.toggleClass("open");
                var t = $(this).closest(".footer__nav-links__item").find(".footer__nav-links__item__list");
                "none" === t.css("display") ? ($(".footer__nav-links__item__list").slideUp(), t.slideDown()) : $(".footer__nav-links__item__list").slideUp()
            }

            function n() {
                $(".footer__language-dropdown__selected").on("click", function() {
                    $(this).parent(".footer__language-dropdown").toggleClass("open");
                    var e = $(this).siblings(".footer__language-dropdown__list");
                    "none" === e.css("display") ? $(".footer__language-dropdown__list").slideDown() : $(".footer__language-dropdown__list").slideUp()
                })
            }
            e(), n(), $(window).resize(function() {
                e()
            })
        })
    }, {}],
    24: [function(e, t, n) {
        $(function() {
            function e(e) {
                if (e.matches) {
                    window.controller = window.controller || new ScrollMagic.Controller;
                    var n = $(".solution-products__product-wrapper");
                    $.each(n, function(e) {
                        var n = $(this).find(".solution-products__product__container"),
                            o = $(this).find(".solution-products__product__content"),
                            a = n.height(),
                            r = o.height();
                        o.attr("id", "sp-stats-" + e), n.attr("id", "product-container-" + e);
                        var i = r - a,
                            s = "#product-container-" + e;
                        t[e] = new ScrollMagic.Scene({
                            triggerElement: "#sp-stats-" + e,
                            triggerHook: "onLeave",
                            duration: i,
                            offset: -100,
                            reverse: !0
                        }).setPin(s, {
                            pushFollowers: !1
                        }).addTo(window.controller)
                    })
                } else if (t.length > 0)
                    for (var o = 0; o < t.length; o++) t[o].destroy("reset")
            }
            var t = [],
                n = window.matchMedia("(min-width: 1024px)");
            n.addListener(e), e(n)
        })
    }, {}],
    25: [function(e, t, n) {
        $(function() {
            function e() {
                var e = $(r.data("content-selector"));
                switch ($(e).attr("id")) {
                    case "nav-desktop":
                        o.trigger("navigation:close");
                        break;
                    case "nav-mobile":
                        o.trigger("navigation:close");
                        break;
                    default:
                        n()
                }
                $("body").removeClass("flyout--preserve-nav"), $(".flyout").removeClass("hide-close")
            }

            function t(t) {
                "#" === $(t.target).attr("href") && t.preventDefault();
                var n = $(this),
                    i = $(n.data("flyoutContent")),
                    s = $(i).attr("id"),
                    l = Math.random().toString(36).substring(7),
                    c = $("<i/>").hide().attr("id", l),
                    u = n.data("flyout-close-btn-color"),
                    d = n.data("flyout-animation"),
                    f = n.data("flyout-preserve-nav");
                if (r.data("content-placeholder")) {
                    var p = $(r.data("content-selector")),
                        h = $(r.data("content-placeholder"));
                    p.detach().hide().insertBefore(h)
                }
                if (a.addClass("flyout-open"), f ? ($("body").addClass("flyout--preserve-nav"), $(".flyout").addClass("hide-close")) : ($("body").removeClass("flyout--preserve-nav"), $(".flyout").removeClass("hide-close")), $(".header__search__close").on("click", function(t) {
                        t.stopPropagation(), t.preventDefault(), e()
                    }), void 0 !== u && ($(r).find("#close-btn").attr("class", "").addClass(u), $(r).find("#back-btn").attr("class", "").addClass(u)), i.length) switch (r.find(".flyout-close").on("click", e), c.insertAfter(i), r.data("content-placeholder", "#" + l), r.data("content-selector", n.data("flyout-content")), r.data("current-content", s), s) {
                    case "nav-desktop":
                        r.css({
                            display: "block",
                            height: "100vh"
                        }), i.detach().appendTo(r), i.css({
                            display: "block"
                        }), o.trigger("navigation:open"), o.trigger("navigation:buildAffix"), $(".flyout-close").addClass("extra-spacer");
                        break;
                    case "nav-mobile":
                        r.css({
                            display: "block",
                            height: "100vh"
                        }), i.detach().appendTo(r), i.css({
                            display: "block"
                        }), o.trigger("navigation:open");
                        break;
                    case "hero-video-flyout":
                        $(document).on("flyout:closed", function() {
                            LimelightPlayer && LimelightPlayer.doPause && LimelightPlayer.doPause()
                        }), r.show(), n.data("flyout-fullscreen") && (d ? r.animate({
                            height: "100vh"
                        }) : r.css("height", "100vh")), i.detach().appendTo(r).slideDown("fast", function() {
                            "" !== n.data("focus-target") && $(n.data("focus-target")).focus()
                        }), o.trigger("flyout:opened");
                        break;
                    default:
                        r.show(), n.data("flyout-fullscreen") && (d ? r.animate({
                            height: "100vh"
                        }) : r.css("height", "100vh")), i.detach().appendTo(r).slideDown("fast", function() {
                            "" !== n.data("focus-target") && $(n.data("focus-target")).focus()
                        }), o.trigger("flyout:opened")
                }
            }

            function n() {
                var t = $(r.data("content-selector")),
                    n = $(t).attr("id"),
                    i = $(r.data("content-placeholder"));
                switch ($(".flyout-close").removeClass("extra-spacer"), a.removeClass("flyout-open"), n) {
                    case "nav-desktop":
                        r.data("content-placeholder", "").data("content-selector", "").css({
                            display: "none"
                        }).find(".flyout-close").off("click", e), t.detach().css({
                            display: "none"
                        }).insertBefore(i), i.remove(), o.trigger("flyout:closed");
                        break;
                    case "nav-mobile":
                        r.data("content-placeholder", "").data("content-selector", "").css({
                            display: "none"
                        }).find(".flyout-close").off("click", e), t.detach().css({
                            display: "none"
                        }).insertBefore(i), i.remove(), o.trigger("flyout:closed");
                        break;
                    default:
                        r.data("content-placeholder", "").data("content-selector", "").css("height", "").slideUp().find(".flyout-close").off("click", e), t.detach().hide().insertBefore(i), i.remove(), o.trigger("flyout:closed")
                }
            }
            var o = $(document),
                a = $("body"),
                r = $("#Top-Flyout");
            $("[data-flyout-content]").each(function() {
                var e = $(this).data("flyout-content");
                $(e).hide()
            }).click(t), o.on("flyout:open", t), o.on("flyout:close", e), o.on("flyout:destroy", n)
        })
    }, {}]
}, {}, [3]);