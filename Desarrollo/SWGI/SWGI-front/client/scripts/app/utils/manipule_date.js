

require('moment');

module.exports = {

    getDaysForChoose: function () {
        return [
            { choose: false, name: 'Do' }, { choose: false, name: 'Lu' }, { choose: false, name: 'Ma' },
            { choose: false, name: 'Mi' }, { choose: false, name: 'Ju' }, { choose: false, name: 'Vi' },
            { choose: false, name: 'Sa' }]
    },
    getLegendDays: function () {
        return ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    },
    getRangeHour: function () {
        let range = {};
        range['start'] = moment().startOf('week').startOf('day').set({
            'hour': 8,
            'minute': 0,
            'second': 0
        });
        range['end'] = moment().startOf('week').endOf('day').set({
            'hour': 17,
            'minute': 0,
            'second': 0
        });
        return range;
    },
    plusAYearFrom: function (datePivote) {
        return new Date(
            datePivote.getFullYear() + 1,
            datePivote.getMonth(),
            datePivote.getDate());
    },
    plusWeekFrom: function (datePivote, numberRepeat) {
        return new Date(datePivote.getFullYear(),
            datePivote.getMonth(),
            datePivote.getDate() + (numberRepeat * 7));
    },
    getDurationFrom: function (rangeHours) {
        var duration = moment.duration(rangeHours.end.diff(rangeHours.start));
        var minutes = duration.asMinutes();
        return this.getMinutesAsString(minutes);
    },

    getAsHour(hourString) {
        var values = hourString.split(':');
        var hourObject = {};
        hourObject['nHour'] = +values[0];
        hourObject['nMin'] = +values[1];
        return hourObject;
    },
    getNumberMinutes(hourObject) {
        return hourObject.nHour * 60 + hourObject.nMin;
    },
    getMinutesAsString(minutes) {
        var hours = Math.floor(minutes / 60);
        var minu = Math.floor(minutes % 60);
        if (hours < 1) return minu + 'minutos';
        if (hours == 1) return hours + ' hora, ' + minu + ' minutos';
        if (hours > 1) return hours + ' horas, ' + minu + ' minutos';
    }

};