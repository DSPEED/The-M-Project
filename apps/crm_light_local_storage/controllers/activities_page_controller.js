CRMLight.ActivitiesPageController = M.Controller.extend({

    activities: null,

    aL: NO,

    cL: NO,

    init: function(isFirstTime) {

        if(isFirstTime) {
            M.LoaderView.show();
            CRMLight.Activity.find();
            this.setActivities();
        }
    },

    setActivities: function() {
        M.LoaderView.hide();
        var data = CRMLight.Activity.records();
        var icons = {
            'Erledigt': 'check',
            'Abgesagt': 'absence',
            'In Bearbeitung': 'campaign'
        };
        var activities = {};
        for(var i in data) {
            var day = data[i].get('beginDate').format('yyyy/mm/dd');
            var obj = {
                date: data[i].get('beginDate').toJSON(),
                activityName: M.Cypher.utf8_decode(data[i].get('activityReason')),
                icon: icons[data[i].get('status')] ? icons[data[i].get('status')] : 'default',
                customerId: data[i].get('customerId')
            }
            if(!activities[day]) {
                activities[day] = [];
            }
            activities[day].push(obj);
        }

        /* no sort the activites */
        var sorted = {};
        var key = [];
        var a = [];

        for(key in activities) {
            if (activities.hasOwnProperty(key)) {
                a.push(key);
            }
        }

        a.sort();

        for (key = 0; key < a.length; key++) {
            sorted[M.Date.create(a[key]).format('dddd dd.mm.yyyy')] = activities[a[key]];
        }

        /* save the activities, but do not push to the view (no use of set()) */
        this.activities = sorted;

        /* now load the customers */
        M.LoaderView.show();
        CRMLight.Customer.find();
        this.setCustomers();
    },

    setCustomers: function() {
        M.LoaderView.hide();
        var activities = this.activities;
        var data = CRMLight.Customer.records();
        for(var i in activities) {
            for(var j in activities[i]) {
                var customer = _.detect(data, function(customer) {
                    return parseInt(customer.get('nr')) === parseInt(activities[i][j].customerId);
                });
                delete activities[i][j].customerId;
                activities[i][j].companyName = M.Cypher.utf8_decode(customer.get('customerName') + ' | ' + customer.get('city'));
                activities[i][j].companyCity = M.Cypher.utf8_decode(customer.get('city'));
            }
        }
        this.set('activities', activities);
    },

    openSearchPage: function() {
        this.switchToPage(M.ViewManager.getPage('activitiesSearchPage'));
    },

    openNewSelectPage: function() {
        this.switchToPage(M.ViewManager.getPage('activitiesNewSelectPage'));
    },

    openStartPage: function() {
        this.switchToPage(M.ViewManager.getPage('startPage'), null, YES);
    },

    parseDate: function(dateStr) {
        // $1: year: 2010
        // $2: month: 11
        // $3: day: 09
        // $4: hour: 07
        // $5: minutes: 45
        // $6: seconds: 13
        var dateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/
        var res = dateRegex.exec(dateStr);
        return M.Date.create(res[1]+'/'+res[2]+'/'+res[3]+' '+res[4]+':'+res[5]+':'+res[6]);
    },

    loadInitData: function() {
        M.LoaderView.show();
        for(var i in CRMLight.ActivityFixtures.content) {
            var activity = CRMLight.ActivityFixtures.content[i];
            var activityRecord = CRMLight.Activity.createRecord(activity);
            activityRecord.save();
        }
        for(var i in CRMLight.CustomerFixtures.content) {
            var customer = CRMLight.CustomerFixtures.content[i];
            var customerRecord = CRMLight.Customer.createRecord(customer);
            customerRecord.save();
        }
        M.LoaderView.hide();
    }

});