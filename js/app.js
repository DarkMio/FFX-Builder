/**
 * This Module is the core of Final Fantasy X Builder
 * Started in 2016
 * Copyright: @DarkMio
 * Libraries:
 *  - SVG-Pan-Zoom: https://github.com/ariutta/svg-pan-zoom
 *  - Jquery
 */

requirejs.config({
    baseUrl: 'js/',
    paths: {
        jquery: [
            'https://code.jquery.com/jquery-2.2.3.min',
            'lib/jquery-2.2.3.min'
        ],
        'svg-pan-zoom': [
            'https://ariutta.github.io/svg-pan-zoom/dist/svg-pan-zoom',
            'lib/svg-pan-zoom'
        ],
        main: 'main',
        debugwriter: 'util/debugwriter',
        skillbuilder: 'skillbuilder'
    }
});

define(["jquery", 'svg-pan-zoom', "main", "debugwriter"], function($, svgPanZoom, MainController, DebugWriter) {
    $(function() {
        "use strict";

        var debug = new DebugWriter(25);
        // SVG Pan Zoom, core functionality
        var panZoom = window.panZoom = svgPanZoom('#svg', {
            zoomEnabled: true,
            dblClickZoomEnabled: false,
            controlIconsEnabled: true,
            fit: true,
            center: true,
            minZoom: 0.1
        });
        panZoom.zoom(0.7);

        $(window).resize(function() {
            panZoom.resize();
            panZoom.center();
        });

        var mainController = new MainController(debug);
        debug.writeMessage("FFX Builder initialized.");
    });
});