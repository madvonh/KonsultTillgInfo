class Consultant {
    constructor(name, customer, start, end, extent, expertiees, change, reason) {
        this.name= name,
        this.customer = customer,
        this.start =start,
        this.end = end,
        this.extent =extent,
        this.expertiees = expertiees,
        this.change = change,
        this.reason = reason,
        this.timeleft =1000;
    }
    static Sort(consults){
        consults.sort(function(a,b) {
        // Sort on reason
            if (a.reason === b.reason) {
                // Sort on time left on assignment
                if (a.getTimeLeft() === b.getTimeLeft()) {
                    // Sort on name
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else if (a.getTimeLeft() < b.getTimeLeft()) {
                    return -1;
                } else if (a.getTimeLeft() > b.getTimeLeft()) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (a.reason === 'unassigned' || (a.reason === 'ends' && b.reason !== 'unassigned')) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
        return consults;
    }

    getTimeLeft() {
        if (this.timeleft!=1000) {
            return this.timeleft;
        }

        let date;
        let end = this.end;
        let start = this.start;
        let today = new Date();
        var diffDays;
        var timeDiff;
        if ((end==undefined ||end.isNullOrUndefined || end=='') && (start== undefined || start.isNullOrUndefined ||start=='')) {
            this.timeleft=null;
            return null;
        } else if (end!=undefined &&!end.isNullOrUndefined && end!='') {
            date = new Date(end);
        } else {
            date = new Date(start);
        }
        timeDiff = Math.abs(date.getTime() -today.getTime());
        if (date<=today) {
            diffDays= -Math.ceil(timeDiff / (1000 * 3600 * 24));
        } else {
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
        this.timeleft = diffDays;
        return diffDays;
    }
}

module.exports = Consultant;