const taskConst = Object.freeze({
    PROPERTY: {
        STATUS: "status",
        PRIORITY: "priority",
    },
    STATUS: {
        INCOMPLETE: "incomplete",
        INPROGRESS: "inprogress",
        COMPLETE: "complete",
    },
    PRIORITY: {
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high",
        EXTREME: "extreme",
    },
});

// default task icon should be checkmark
const MATERIAL_ICONS = Object.freeze([
    "check", //default
    "alarm",
    "bookmark",
    "calculate",
    "code",
    "delete",
    "edit",
    "group",
    "home",
    "mail",
    "phone",
    "settings",
    "star",
    "task",
]);

export { taskConst, MATERIAL_ICONS };
