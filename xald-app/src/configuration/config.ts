export const config = {
    version: process.env.REACT_APP_VERSION,
    apis: {
        answers: {
            url: process.env.REACT_APP_API_ANSWERS
        },
        airports: {
            url: process.env.REACT_APP_API_AIRPORTS
        }
    },
}