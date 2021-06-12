import axios from '../../src/index'

interface ResponseData<T = any> {
    code: number
    result: T
    message: string
}

interface User {
    name: string
    age: number
}


// interface Counter {
//     (start: number): string;
//     interval: number;
//     reset(): void;
// }

// function getCounter(): Counter {
//     let counter = <Counter>function (start: number) {return 12 };
//     counter.interval = 123;
//     counter.reset = function () { };
//     return counter;
// }

// let c = getCounter();
// c(10);
// c.reset();
// c.interval = 5.0;

// interface SearchFunc {
//     (a: string, b: string): boolean
//     (a: string): boolean
// }
// let cc = function (c: string): boolean {
//     return false
// }
// cc as SearchFunc
// cc('1', '2')

// axios({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hi'
//     }
// })

// axios('/extend/post', {
//     method: 'post',
//     data: {
//         msg: 'hello'
//     }
// })
// axios.request({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hello'
//     }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })