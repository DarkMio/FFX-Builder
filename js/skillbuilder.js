define(["jquery"], function($) {
    var SkillBuilder = function SkillBuilder(nickname) {
        this.name = nickname;
        this.skills = [];
    };

    SkillBuilder.prototype.add = function(element) {
        var id = element.attr('id');
        this.skills.push(id);
    };

    SkillBuilder.prototype.remove = function(element) {
        var id = element.attr('id');
        var index = this.skills.indexOf(id);
        if(index > -1) {
            this.skills.splice(index, 1);
        }
    };

    SkillBuilder.prototype.purge = function() {
        this.skills = [];
    };


    SkillBuilder.prototype.toString = function() {
        var str = "Selected skills: ";
        if(this.skills.length > 0) {
            for (var i = 0; i < this.skills.length; i++) {
                str += this.skills[i] + ", "
            }
        } else {
            str += "None selected";
        }
        return str;
    };

    return SkillBuilder;
});