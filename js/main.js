define(["jquery", "debugwriter", "skillbuilder"], function($, DebugWriter, SkillBuilder) {
    "use strict";

    var Main = function Main(debugWriter) {
        this.document = $(document);
        this.abilities = {
            XMLID_3_: "Ability: Ultima",
            XMLID_11_: "Level 4",
            XMLID_8_: "Level 4",
            XMLID_12_: "Level 4",
            XMLID_7_: "Level 4",
            XMLID_28_: "Health +200",
            XMLID_27_: "Defense +2",
            XMLID_26_: "Attack +2",
            XMLID_21_: "Ability: Scan",
            XMLID_30_: "Mana +20",
            XMLID_17_: "Spirit +2",
            XMLID_18_: "Defense +2",
            XMLID_31_: "Attack +2",
            XMLID_23_: "Health +200",
            XMLID_24_: "Accuracy +2",
            XMLID_14_: "Ability: Lancet",
            XMLID_16_: "Agility +1"
        };
        if(!debugWriter) {
            throw Error("No DebugWriter given. :(");
        }
        this.debug = debugWriter;
        this.skills = new SkillBuilder("Tidus");
        this.bootstrap();
    };

    Main.prototype.bootstrap = function() {
        var _cont = this;
        // click action on skill bubbles
        this.document.on('click', 'svg', function(e) {
            var element = $(e.target);
            _cont.debug.writeMessage("Click: " + element.attr("id"));
            if(element.attr('skill') === '') {
                var classes = element.attr('class').split(' ');
                var remove = false;
                $.each(classes, function(index, item){
                    if(item === 'clicked') {
                        element.removeClass('clicked');
                        _cont.skills.remove(element);
                        remove = true;
                    }
                });
                if(!remove) {
                    $(e.target).addClass('clicked');
                    _cont.skills.add(element);
                }
            }
        });

        // click action for printing the current skill build
        $('#debug-skillbuild').click(function() {
            _cont.debug.writeMessage(_cont.skills.toString());
        });

        $('#debug-skillclear').click(function() {
            var skillIDs = _cont.skills.skills;
            _cont.skills.purge();
            for(var i = 0; i < skillIDs.length; i++) {
                $('#' + skillIDs[i]).removeClass('clicked');
            }
        });

        // mouse over of skill bubbles
        this.document.on('mouseover', 'svg', function(e) {
            var id = $(e.target).attr('id');
            if(_cont.abilities[id]) {
                $('.popup').show().text(_cont.abilities[id]);
                _cont.debug.writeMessage("Hover: " + id + ": " + _cont.abilities[id]);
            } else {
                if(id !== "svg") {
                    _cont.debug.writeMessage("Hover: " + id);
                }
                $('.popup').hide()
            }
        });

        // general event listener for the popup div
        this.document.mousemove(function(e){
            $('.popup').css('top', e.pageY).css('left', e.pageX + 20);
        });
    };

    return Main;

});