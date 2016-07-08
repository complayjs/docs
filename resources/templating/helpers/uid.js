(function () {
    module.exports.register = function (Handlebars, options) {
        /*
         * Item helper.
         *
         * @return n elements
         */
        Handlebars.registerHelper('uid', function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        });
    };
}).call(this);