import {app} from "../../app";

app.service('tasks').hooks({
    before: {},
    after: {
        all: []
    },
    error: {}
});