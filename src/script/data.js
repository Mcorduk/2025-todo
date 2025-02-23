import { taskConst } from "./constants";
// TODO: Make this file JSON
const todos = [
    {
        icon: "home",
        name: "Home",
        tasks: [
            {
                icon: "alarm",
                name: "Wake Up Early",
                description: "Wake Up Before 9AM and Clean Your Desk",
                time: "08am",
                date: undefined,
                status: taskConst.STATUS.COMPLETE,
                priority: taskConst.PRIORITY.HIGH,
            },
            {
                icon: "local_cafe",
                name: "Brewing Coffee",
                description: "Dispersing Morning Brain Fog",
                time: "09am",
                date: undefined,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.HIGH,
            },
            {
                icon: "calculate",
                name: "Doing Leetcode",
                description: "Study Data Structures and Algorithms",
                time: "10am",
                date: undefined,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.LOW,
            },
            {
                icon: "code",
                name: "Coding Todo App",
                description: "Code Vanilla JS Todo App",
                time: "12pm",
                date: null,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.EXTREME,
            },
        ],
    },

    {
        icon: "mail",
        name: "Mails",
        tasks: [
            {
                icon: "check",
                name: "Check Emails",
                description: "Any Return From Job Applications?",
                time: "09am",
                date: undefined,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.MEDIUM,
            },
            {
                icon: "check",
                name: "Reach Out to Recruiters",
                description: "Never Know Who Will Answer Back",
                time: "10am",
                date: undefined,
                status: taskConst.STATUS.COMPLETE,
                priority: taskConst.PRIORITY.LOW,
            },
        ],
    },
    {
        icon: "group",
        name: "Meeting",
        tasks: [
            {
                icon: "local_cafe",
                name: "Catch Up With Friends",
                description: "It's Been a While, They Forgot Me!",
                time: undefined,
                date: undefined,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.LOW,
            },
        ],
    },
    {
        icon: "volunteer_activism",
        name: "Oni",
        tasks: [
            {
                icon: "alarm",
                name: "Get a Job",
                description: "Find a Remote Programming Job",
                time: undefined,
                date: undefined,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.EXTREME,
            },
            {
                icon: "favorite",
                name: "Marry Snomoni",
                description: "A Smile Worth Thousand Bouquets",
                time: undefined,
                date: undefined,
                status: taskConst.STATUS.INCOMPLETE,
                priority: taskConst.PRIORITY.EXTREME,
            },
            {
                icon: "star",
                name: "Decide on Marriage",
                description: "It Only Took Four Years Love",
                time: undefined,
                date: undefined,
                status: taskConst.STATUS.COMPLETE,
                priority: taskConst.PRIORITY.EXTREME,
            },
            {
                icon: "delete",
                name: "Send Dad Away",
                description: "She Would be All Over Him...",
                time: undefined,
                date: undefined,
                status: taskConst.STATUS.COMPLETE,
                priority: taskConst.PRIORITY.LOW,
            },
        ],
    },
];

export { todos };
